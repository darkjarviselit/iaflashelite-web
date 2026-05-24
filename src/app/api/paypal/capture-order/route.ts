import { NextResponse } from "next/server";
import { GUARANTEE_POLICY_VERSION, PRODUCTS } from "@/lib/constants";
import { getDownloadUrl, sendDeliveryEmail } from "@/lib/email";

const PAYPAL_API =
    (process.env.PAYPAL_API_BASE ?? "https://api-m.paypal.com").replace(/\/+$/, "");
const GIRIS_URL = process.env.GIRIS_AGENT_URL ?? "http://localhost:5318";
const GIRIS_TIMEOUT_MS = 5000;

interface CaptureBody {
    orderID?: string;
    customerName?: string;
    customerEmail?: string;
    productSlug?: string;
    consentDigital?: boolean | null;
    consentDigitalAt?: string | null;
    consentTimestamp?: string | null;
    policyVersion?: string | null;
    consentSummary?: string | null;
}

async function getAccessToken(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
    const secret = process.env.PAYPAL_SECRET ?? "";
    if (!clientId || !secret) throw new Error("paypal_credentials_missing");
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
    const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`paypal_token_${res.status}:${txt.slice(0, 200)}`);
    }
    const data = (await res.json()) as { access_token?: string };
    if (!data.access_token) throw new Error("paypal_token_missing");
    return data.access_token;
}

function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }
    return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

interface PaypalCapture {
    id?: string;
    status?: string;
    purchase_units?: Array<{
        payments?: {
            captures?: Array<{
                amount?: { value?: string; currency_code?: string };
                id?: string;
                create_time?: string;
            }>;
        };
    }>;
    payer?: {
        email_address?: string;
    };
}

export async function POST(request: Request) {
    let body: CaptureBody;
    try {
        body = (await request.json()) as CaptureBody;
    } catch {
        return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const orderID = (body.orderID ?? "").trim();
    if (!orderID) {
        return NextResponse.json({ error: "missing_order_id" }, { status: 400 });
    }

    const customerName = (body.customerName ?? "").trim();
    const customerEmail = (body.customerEmail ?? "").trim();
    const productSlug = (body.productSlug ?? "").trim();
    const consentDigital = body.consentDigital === true;
    const consentDigitalAt = (body.consentDigitalAt ?? "").trim();
    const consentTimestamp = (body.consentTimestamp ?? consentDigitalAt).trim();
    const policyVersion =
        (body.policyVersion ?? "").trim() || GUARANTEE_POLICY_VERSION;
    const consentSummary = (body.consentSummary ?? "").trim();

    if (!customerName || !customerEmail || !productSlug) {
        return NextResponse.json({ error: "missing_customer_or_product" }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(customerEmail)) {
        return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!consentDigital || !consentTimestamp) {
        return NextResponse.json({ error: "missing_digital_consent" }, { status: 400 });
    }

    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) {
        return NextResponse.json({ error: "product_not_found" }, { status: 404 });
    }

    let captureData: PaypalCapture;
    try {
        const accessToken = await getAccessToken();
        const captureRes = await fetch(
            `${PAYPAL_API}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            },
        );
        captureData = (await captureRes.json()) as PaypalCapture;
        if (!captureRes.ok || captureData.status !== "COMPLETED") {
            console.error("[paypal] capture failed:", captureRes.status, captureData);
            return NextResponse.json(
                { error: "capture_failed", status: captureData.status ?? null },
                { status: 400 },
            );
        }
    } catch (err) {
        console.error("[paypal] capture exception:", err);
        return NextResponse.json({ error: "capture_error" }, { status: 500 });
    }

    const capture = captureData.purchase_units?.[0]?.payments?.captures?.[0];
    const amount = capture?.amount?.value ?? product.price.toFixed(2);
    const currency = capture?.amount?.currency_code ?? "EUR";
    const paypalOrderId = captureData.id ?? orderID;
    const paypalCaptureId = capture?.id ?? null;
    const captureTime = capture?.create_time ?? new Date().toISOString();
    const payerEmail = captureData.payer?.email_address ?? null;
    const downloadUrl = getDownloadUrl(productSlug);
    const deliveryStatus = downloadUrl ? "email_delivery_requested" : "download_url_missing";

    // Forward a giris-agent — fire-and-forget, no rompemos respuesta al cliente.
    const forwardPayload = {
        type: "order",
        product: product.slug,
        product_name: product.name,
        product_type: product.type ?? "download",
        price: product.price,
        total_price: Number(amount),
        currency,
        is_express: false,
        express_surcharge: 0,
        customer: { name: customerName, email: customerEmail },
        payment_method: "paypal_direct",
        payment_method_label: "PayPal (pago directo)",
        paypal_order_id: paypalOrderId,
        paypal_capture_id: paypalCaptureId,
        paypal_payer_email: payerEmail,
        paypal_capture_time: captureTime,
        comments: "",
        accepted_privacy: true,
        accepted_at: new Date().toISOString(),
        consent_digital: true,
        consent_digital_at: consentTimestamp,
        consent_timestamp: consentTimestamp,
        consent_summary: consentSummary || null,
        policy_version: policyVersion,
        delivery_status: deliveryStatus,
        ip: getClientIp(request),
        user_agent: request.headers.get("user-agent") ?? "",
    };

    console.log(
        `[PAYPAL_DOWNLOAD_ORDER] captured ${paypalOrderId}:`,
        JSON.stringify(forwardPayload),
    );

    void (async () => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), GIRIS_TIMEOUT_MS);
        try {
            const res = await fetch(`${GIRIS_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(forwardPayload),
                signal: ctrl.signal,
            });
            if (!res.ok) {
                console.error("[paypal capture] giris-agent respondió", res.status);
            }
        } catch (err) {
            console.error("[paypal capture] giris forward error:", err);
            console.error("[paypal capture] PAYLOAD (fallback):", JSON.stringify(forwardPayload));
        } finally {
            clearTimeout(timer);
        }
    })();

    // Entrega automática del ZIP por email — fire-and-forget.
    if (downloadUrl) {
        void sendDeliveryEmail({
            to: customerEmail,
            customerName,
            productName: product.name,
            productSlug,
            downloadUrl,
            amount: String(amount),
            orderId: paypalOrderId,
            transactionId: paypalCaptureId,
            customerEmail,
            policyVersion,
        }).catch((err) => {
            console.error("[paypal capture] delivery email error:", err);
        });
    } else {
        console.error(`[paypal capture] sin URL de descarga para slug: ${productSlug}`);
    }

    return NextResponse.json({
        ok: true,
        paypalOrderId,
        amount: Number(amount),
        currency,
        downloadUrl: downloadUrl ?? null,
        policyVersion,
        deliveryStatus,
    });
}

export const runtime = "nodejs";
