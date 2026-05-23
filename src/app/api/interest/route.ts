import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";

interface InterestPayload {
	email?: string;
	topic?: string;
	acceptedPrivacy?: boolean;
	website?: string;
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
	if (cachedTransporter) return cachedTransporter;
	cachedTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_APP_PASSWORD,
		},
	});
	return cachedTransporter;
}

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

function bad(reason: string, status = 400) {
	return NextResponse.json({ ok: false, error: reason }, { status });
}

const VALID_TOPICS = new Set(["casos", "academia"]);

export async function POST(request: Request) {
	const ip = getClientIp(request);
	if (!checkRateLimit(ip)) {
		return NextResponse.json(
			{ ok: false, error: "too_many_requests" },
			{ status: 429 },
		);
	}

	let payload: InterestPayload;
	try {
		payload = (await request.json()) as InterestPayload;
	} catch {
		return bad("invalid_json");
	}

	if (payload.website && payload.website.trim().length > 0) {
		return NextResponse.json({ ok: true });
	}

	if (payload.acceptedPrivacy !== true) return bad("privacy_not_accepted");

	const email = (payload.email ?? "").trim();
	const topic = (payload.topic ?? "").trim();

	if (!email || !/.+@.+\..+/.test(email)) return bad("invalid_email");
	if (!VALID_TOPICS.has(topic)) return bad("invalid_topic");

	const gmailUser = (process.env.GMAIL_USER ?? "").trim();
	const gmailPass = (process.env.GMAIL_APP_PASSWORD ?? "").trim();
	if (!gmailUser || !gmailPass) {
		console.error("[interest] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
		return bad("mail_not_configured", 503);
	}

	const timestamp = new Date().toISOString();
	const userAgent = request.headers.get("user-agent") ?? "";
	const subject = `[interés:${topic}] ${email}`;
	const text = [
		"Nueva captación de interés desde la web.",
		"",
		`Topic: ${topic}`,
		`Email: ${email}`,
		`IP: ${ip}`,
		`User-Agent: ${userAgent}`,
		`Timestamp: ${timestamp}`,
	].join("\n");

	try {
		await getTransporter().sendMail({
			from: `"IAFlashElite Web" <${gmailUser}>`,
			to: gmailUser,
			subject,
			text,
		});
		console.log(`[interest] new signup ${topic}: ${email}`);
		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("[interest] sendMail failed:", err);
		return bad("send_failed", 500);
	}
}

export const runtime = "nodejs";
