import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/constants";

interface OrderPayload {
    productSlug?: string;
    name?: string;
    email?: string;
    paymentMethod?: string;
    comments?: string;
    website?: string;
    acceptedPrivacy?: boolean;
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
    const paymentMethod = (payload.paymentMethod ?? "").trim();

    if (!name || !email || !productSlug || !paymentMethod) {
        return bad("missing_required_fields");
    }
    if (!/.+@.+\..+/.test(email)) return bad("invalid_email");
    if (!["bizum", "transferencia", "otro"].includes(paymentMethod)) {
        return bad("invalid_payment_method");
    }

    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) return bad("product_not_found");
    if (product.status !== "available") return bad("product_not_available");

    const forwardPayload = {
        type: "order",
        product: product.slug,
        product_name: product.name,
        price: product.price,
        customer: { name, email },
        payment_method: paymentMethod,
        comments: (payload.comments ?? "").trim(),
        accepted_privacy: true,
        accepted_at: new Date().toISOString(),
        ip,
        user_agent: request.headers.get("user-agent") ?? "",
    };

    console.log("[orders] new order:", JSON.stringify(forwardPayload));
    await forwardOrder(forwardPayload);

    return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
