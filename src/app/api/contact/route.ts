import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import { BRAND } from "@/lib/constants";

interface ContactPayload {
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    message?: string;
    urgency?: string;
    budget?: string;
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

async function forwardLeadToGiris(lead: {
    name: string;
    email: string;
    company: string;
    service: string;
    urgency: string;
    budget: string;
    message: string;
}): Promise<void> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FORWARD_TIMEOUT_MS);
    try {
        const res = await fetch(`${GIRIS_URL}/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
            signal: ctrl.signal,
        });
        if (!res.ok) {
            console.error("[contact] giris-agent /leads respondió", res.status);
        }
    } catch (err) {
        console.error("[contact] fallo enviando lead a giris-agent:", err);
    } finally {
        clearTimeout(timer);
    }
}

let leadMailTransporter: Transporter | null = null;

function getLeadMailTransporter(): Transporter | null {
    const user = (process.env.GMAIL_USER ?? "").trim();
    const pass = (process.env.GMAIL_APP_PASSWORD ?? "").trim();
    if (!user || !pass) return null;
    if (!leadMailTransporter) {
        leadMailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user, pass },
        });
    }
    return leadMailTransporter;
}

// Quita CR/LF para evitar inyección de cabeceras al interpolar en el subject.
function stripHeaderInjection(value: string): string {
    return value.replace(/[\r\n]+/g, " ").trim();
}

// Backup defensivo: notifica el lead por email a BRAND.email. Independiente de
// giris-agent, con su propio try/catch — nunca afecta la respuesta al usuario.
// Cuerpo en text/plain: sin vector de inyección HTML.
async function sendLeadEmail(
    lead: {
        name: string;
        email: string;
        company: string;
        service: string;
        urgency: string;
        budget: string;
        message: string;
    },
    ip: string,
): Promise<void> {
    const transporter = getLeadMailTransporter();
    if (!transporter) {
        console.error("[contact] email skipped: smtp_not_configured");
        return;
    }
    const user = (process.env.GMAIL_USER ?? "").trim();
    const subject = `Nuevo lead web · ${stripHeaderInjection(lead.name).slice(0, 100)}`;
    const text = [
        `Nombre: ${lead.name}`,
        `Email: ${lead.email}`,
        `Empresa: ${lead.company || "(no indicada)"}`,
        `Servicio: ${lead.service || "(no indicado)"}`,
        `Urgencia: ${lead.urgency || "(no indicada)"}`,
        `Presupuesto: ${lead.budget || "(no indicado)"}`,
        "",
        "Mensaje:",
        lead.message,
        "",
        `Fecha: ${new Date().toISOString()}`,
        `IP: ${ip || "(no disponible)"}`,
    ].join("\n");
    try {
        await transporter.sendMail({
            from: `"iaflashelite leads" <${user}>`,
            to: BRAND.email,
            subject,
            text,
        });
        console.log("[contact] email ok");
    } catch (err) {
        const reason =
            (err as { code?: string; name?: string }).code ??
            (err as { name?: string }).name ??
            "unknown";
        console.error("[contact] email failed:", reason);
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

    let payload: ContactPayload;
    try {
        payload = (await request.json()) as ContactPayload;
    } catch {
        return bad("invalid_json");
    }

    if (payload.website && payload.website.trim().length > 0) {
        return NextResponse.json({ ok: true });
    }

    if (payload.acceptedPrivacy !== true) return bad("privacy_not_accepted");

    const name = (payload.name ?? "").trim();
    const email = (payload.email ?? "").trim();
    const message = (payload.message ?? "").trim();
    if (!name || !email || !message) return bad("missing_required_fields");
    if (!/.+@.+\..+/.test(email)) return bad("invalid_email");

    const lead = {
        name,
        email,
        company: (payload.company ?? "").trim(),
        service: (payload.service ?? "").trim(),
        urgency: (payload.urgency ?? "").trim(),
        budget: (payload.budget ?? "").trim(),
        message,
    };

    // giris-agent (principal) + email (backup) son independientes: cada uno
    // captura sus propios errores; la respuesta al usuario no depende de ellos.
    await Promise.allSettled([forwardLeadToGiris(lead), sendLeadEmail(lead, ip)]);

    return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
