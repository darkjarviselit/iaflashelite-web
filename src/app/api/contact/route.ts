import { NextResponse } from "next/server";

interface ContactPayload {
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    message?: string;
    urgency?: string;
    budget?: string;
}

function bad(reason: string) {
    return NextResponse.json({ ok: false, error: reason }, { status: 400 });
}

export async function POST(request: Request) {
    let payload: ContactPayload;
    try {
        payload = (await request.json()) as ContactPayload;
    } catch {
        return bad("invalid_json");
    }
    const name = (payload.name ?? "").trim();
    const email = (payload.email ?? "").trim();
    const message = (payload.message ?? "").trim();
    if (!name || !email || !message) return bad("missing_required_fields");
    if (!/.+@.+\..+/.test(email)) return bad("invalid_email");

    // TODO: conectar a giris-agent /leads cuando esté expuesto.
    console.info("[contact] new lead", {
        name,
        email,
        company: payload.company ?? "",
        service: payload.service ?? "",
        urgency: payload.urgency ?? "",
        budget: payload.budget ?? "",
        messagePreview: message.slice(0, 200),
        receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
