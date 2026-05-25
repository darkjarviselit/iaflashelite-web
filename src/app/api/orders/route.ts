import { NextResponse } from "next/server";
import {
    EXPRESS_SURCHARGE,
    GUARANTEE_POLICY_VERSION,
    PRODUCTS,
    calculateProductTotal,
} from "@/lib/constants";
import {
    isSecureDeliveryConfigured,
    isSecureDownloadProduct,
} from "@/lib/secure-downloads";

interface OrderPayload {
    productSlug?: string;
    addonIds?: unknown;
    name?: string;
    email?: string;
    paymentMethod?: string;
    comments?: string;
    website?: string;
    acceptedPrivacy?: boolean;
    isExpress?: boolean;
    // Consentimiento expreso renuncia al desistimiento de 14 días para
    // contenido digital (Directiva EU 2011/83/UE Art. 16(m)).
    // null = producto es servicio (no aplica).
    consentDigital?: boolean | null;
    consentDigitalAt?: string | null;
    consentTimestamp?: string | null;
    policyVersion?: string | null;
    consentSummary?: string | null;
}

const GIRIS_URL = process.env.GIRIS_AGENT_URL ?? "http://localhost:5318";
const FORWARD_TIMEOUT_MS = 5000;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true;
    }
    if (entry.count >= RATE_MAX_REQUESTS) return false;
    entry.count++;
    return true;
}

function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp.trim();
    return "unknown";
}

function bad(reason: string) {
    return NextResponse.json({ ok: false, error: reason }, { status: 400 });
}

function readAddonIds(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
}

async function forwardOrder(payload: Record<string, unknown>): Promise<void> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FORWARD_TIMEOUT_MS);
    try {
        const res = await fetch(`${GIRIS_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: ctrl.signal,
        });
        if (!res.ok) {
            console.error("[orders] giris-agent respondió", res.status);
        }
    } catch (err) {
        console.error("[orders] fallo enviando pedido a giris-agent:", err);
        console.error("[orders] PAYLOAD (fallback log):", JSON.stringify(payload));
    } finally {
        clearTimeout(timer);
    }
}

export async function POST(request: Request) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { ok: false, error: "too_many_requests" },
            { status: 429 },
        );
    }

    let payload: OrderPayload;
    try {
        payload = (await request.json()) as OrderPayload;
    } catch {
        return bad("invalid_json");
    }

    if (payload.website && payload.website.trim().length > 0) {
        return NextResponse.json({ ok: true });
    }

    if (payload.acceptedPrivacy !== true) return bad("privacy_not_accepted");

    const name = (payload.name ?? "").trim();
    const email = (payload.email ?? "").trim();
    const productSlug = (payload.productSlug ?? "").trim();
    const addonIds = readAddonIds(payload.addonIds);
    const paymentMethod = (payload.paymentMethod ?? "").trim();

    if (!name || !email || !productSlug || !paymentMethod) {
        return bad("missing_required_fields");
    }
    if (!/.+@.+\..+/.test(email)) return bad("invalid_email");
    const PAYMENT_METHOD_LABELS: Record<string, string> = {
        bizum: "Bizum",
        paypal: "PayPal",
        transferencia: "Transferencia bancaria",
    };
    if (!Object.prototype.hasOwnProperty.call(PAYMENT_METHOD_LABELS, paymentMethod)) {
        return bad("invalid_payment_method");
    }

    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) return bad("product_not_found");
    if (product.status !== "available") return bad("product_not_available");

    const productType = product.type ?? "download";
    const isExpress = payload.isExpress === true;
    if (isExpress && productType !== "service") {
        return bad("express_only_for_services");
    }
    const expressSurcharge = isExpress ? (EXPRESS_SURCHARGE[product.slug] ?? 0) : 0;
    if (isExpress && expressSurcharge === 0) {
        return bad("express_not_available_for_product");
    }
    const calculated = calculateProductTotal(product.slug, product.price, addonIds);
    if (!calculated) return bad("invalid_addons");
    if (isSecureDownloadProduct(product.slug) && !isSecureDeliveryConfigured(product.slug)) {
        return NextResponse.json(
            { ok: false, error: "secure_delivery_not_configured" },
            { status: 503 },
        );
    }
    const totalPrice = calculated.total + expressSurcharge;

    // Digital consent (EU 2011/83/UE Art. 16(m)) — required only for downloads.
    const consentDigital = payload.consentDigital === true;
    const consentDigitalAt = (payload.consentDigitalAt ?? "").trim();
    const consentTimestamp = (payload.consentTimestamp ?? consentDigitalAt ?? "").trim();
    const policyVersion =
        (payload.policyVersion ?? "").trim() || GUARANTEE_POLICY_VERSION;
    const consentSummary = (payload.consentSummary ?? "").trim();
    if (productType === "download" && !consentDigital) {
        return bad("missing_digital_consent");
    }

    const forwardPayload = {
        type: "order",
        product: product.slug,
        product_name: product.name,
        product_type: productType,
        price: product.price,
        addons: calculated.selectedAddons.map((addon) => ({
            id: addon.id,
            name: addon.name,
            price: addon.price,
        })),
        addons_total: calculated.addonsTotal,
        is_express: isExpress,
        express_surcharge: expressSurcharge,
        total_price: totalPrice,
        customer: { name, email },
        payment_method: paymentMethod,
        payment_method_label: PAYMENT_METHOD_LABELS[paymentMethod],
        comments: (payload.comments ?? "").trim(),
        accepted_privacy: true,
        accepted_at: new Date().toISOString(),
        // Digital consent audit trail (EU 2011/83/UE Art. 16(m))
        consent_digital: productType === "download" ? consentDigital : null,
        consent_digital_at: productType === "download" ? (consentDigitalAt || null) : null,
        consent_timestamp: consentTimestamp || new Date().toISOString(),
        consent_summary: consentSummary || null,
        policy_version: policyVersion,
        delivery_status:
            productType === "download" ? "pending_manual_delivery" : "pending_service_review",
        ip,
        user_agent: request.headers.get("user-agent") ?? "",
    };

    const baseTag = productType === "service" ? "[SERVICE_ORDER]" : "[DOWNLOAD_ORDER]";
    const logTag = isExpress ? `${baseTag}[EXPRESS]` : baseTag;
    console.log(`${logTag} new order:`, JSON.stringify(forwardPayload));
    await forwardOrder(forwardPayload);

    return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
