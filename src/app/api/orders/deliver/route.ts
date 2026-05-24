// Endpoint para entrega manual desde Jarvis tras confirmar pago Bizum /
// transferencia. Autenticación Bearer simple con DELIVER_SECRET_TOKEN.

import { NextResponse } from "next/server";
import { GUARANTEE_POLICY_VERSION, PRODUCTS } from "@/lib/constants";
import { getDownloadUrl, sendDeliveryEmail } from "@/lib/email";

interface DeliverBody {
    customerEmail?: string;
    customerName?: string;
    productSlug?: string;
}

export async function POST(request: Request) {
    const expectedToken = (process.env.DELIVER_SECRET_TOKEN ?? "").trim();
    if (!expectedToken) {
        console.error("[deliver] DELIVER_SECRET_TOKEN no configurado");
        return NextResponse.json({ error: "deliver_not_configured" }, { status: 503 });
    }

    const authHeader = request.headers.get("authorization") ?? "";
    if (authHeader !== `Bearer ${expectedToken}`) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    let body: DeliverBody;
    try {
        body = (await request.json()) as DeliverBody;
    } catch {
        return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const customerEmail = (body.customerEmail ?? "").trim();
    const customerName = (body.customerName ?? "").trim() || "Cliente";
    const productSlug = (body.productSlug ?? "").trim();

    if (!customerEmail || !productSlug) {
        return NextResponse.json({ error: "missing_params" }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(customerEmail)) {
        return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) {
        return NextResponse.json({ error: "product_not_found" }, { status: 404 });
    }
    if ((product.type ?? "download") !== "download") {
        return NextResponse.json({ error: "not_a_download" }, { status: 400 });
    }

    const downloadUrl = getDownloadUrl(productSlug);
    if (!downloadUrl) {
        return NextResponse.json({ error: "no_download_url" }, { status: 500 });
    }

    // La prueba histórica de consentimiento vive en el pedido manual reenviado a giris-agent.
    // Este endpoint solo ejecuta la entrega tras confirmar pago fuera del checkout.
    const sent = await sendDeliveryEmail({
        to: customerEmail,
        customerName,
        productName: product.name,
        productSlug,
        downloadUrl,
        amount: String(product.price),
        customerEmail,
        policyVersion: GUARANTEE_POLICY_VERSION,
        deliverySource: "manual_delivery",
    });

    if (!sent) {
        return NextResponse.json({ error: "email_failed" }, { status: 500 });
    }

    console.log(
        `[deliver] manual delivery sent to ${customerEmail} for ${productSlug}`,
    );

    return NextResponse.json({ ok: true, downloadUrl });
}

export const runtime = "nodejs";
