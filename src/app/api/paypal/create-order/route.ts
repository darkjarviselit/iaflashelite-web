import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/constants";

const PAYPAL_API =
    (process.env.PAYPAL_API_BASE ?? "https://api-m.paypal.com").replace(/\/+$/, "");

interface CreateOrderBody {
    amount?: number | string;
    productName?: string;
    productSlug?: string;
}

async function getAccessToken(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
    const secret = process.env.PAYPAL_SECRET ?? "";
    if (!clientId || !secret) {
        throw new Error("paypal_credentials_missing");
    }
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

export async function POST(request: Request) {
    let body: CreateOrderBody;
    try {
        body = (await request.json()) as CreateOrderBody;
    } catch {
        return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const productSlug = (body.productSlug ?? "").trim();
    const productName = (body.productName ?? "").trim();
    const amountRaw = body.amount;
    if (!productSlug || !productName || amountRaw === undefined || amountRaw === null) {
        return NextResponse.json({ error: "missing_params" }, { status: 400 });
    }

    // Cruzar contra catálogo: el precio nunca lo dicta el cliente, lo dicta
    // PRODUCTS. Y solo aplicamos PayPal directo a productos descargables.
    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) {
        return NextResponse.json({ error: "product_not_found" }, { status: 404 });
    }
    if (product.status !== "available") {
        return NextResponse.json({ error: "product_not_available" }, { status: 400 });
    }
    const productType = product.type ?? "download";
    if (productType !== "download") {
        return NextResponse.json({ error: "paypal_direct_only_for_downloads" }, { status: 400 });
    }

    const amount = product.price.toFixed(2);

    try {
        const accessToken = await getAccessToken();
        const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: { currency_code: "EUR", value: amount },
                        description: product.name,
                        custom_id: product.slug,
                    },
                ],
                application_context: {
                    brand_name: "iaflashelite",
                    locale: "es-ES",
                    user_action: "PAY_NOW",
                    shipping_preference: "NO_SHIPPING",
                },
            }),
        });
        const orderData = (await orderRes.json()) as { id?: string; message?: string };
        if (!orderRes.ok || !orderData.id) {
            console.error("[paypal] create-order failed:", orderRes.status, orderData);
            return NextResponse.json({ error: "paypal_error" }, { status: 502 });
        }
        return NextResponse.json({ id: orderData.id });
    } catch (err) {
        console.error("[paypal] create-order exception:", err);
        return NextResponse.json({ error: "paypal_error" }, { status: 500 });
    }
}

export const runtime = "nodejs";
