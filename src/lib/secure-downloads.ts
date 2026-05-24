import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PACK_ARRANQUE_PRODUCT_SLUG } from "@/lib/constants";

export const PACK_ARRANQUE_FILE_VERSION = "pack-arranque-ia-v1";
export const PACK_ARRANQUE_ZIP_FILENAME = "pack-arranque-ia-v1.zip";
export const PACK_ARRANQUE_ZIP_PATH = join(
    process.cwd(),
    "dist",
    "academia",
    PACK_ARRANQUE_ZIP_FILENAME,
);

const DOWNLOAD_TOKEN_TTL_MS = 1000 * 60 * 60 * 72;

export interface DownloadTokenPayload {
    productSlug: string;
    emailHash: string;
    orderId: string;
    fileVersion: string;
    expiresAt: number;
}

export type DownloadTokenValidation =
    | { ok: true; payload: DownloadTokenPayload }
    | {
          ok: false;
          reason:
              | "missing_secret"
              | "missing_token"
              | "malformed_token"
              | "invalid_signature"
              | "invalid_payload"
              | "expired";
      };

function getTokenSecret(): string | null {
    const secret = (process.env.DOWNLOAD_TOKEN_SECRET ?? "").trim();
    return secret.length >= 32 ? secret : null;
}

export function isPackArranqueSecureDeliveryConfigured(): boolean {
    return getTokenSecret() !== null && existsSync(PACK_ARRANQUE_ZIP_PATH);
}

export function hashBuyerEmail(email: string): string {
    return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export function createPackArranqueDownloadUrl({
    customerEmail,
    orderId,
    baseUrl,
    now = Date.now(),
}: {
    customerEmail: string;
    orderId: string;
    baseUrl?: string;
    now?: number;
}): string {
    const token = createDownloadToken({
        productSlug: PACK_ARRANQUE_PRODUCT_SLUG,
        emailHash: hashBuyerEmail(customerEmail),
        orderId,
        fileVersion: PACK_ARRANQUE_FILE_VERSION,
        expiresAt: now + DOWNLOAD_TOKEN_TTL_MS,
    });
    const siteUrl = (
        baseUrl ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://iaflashelite-web.vercel.app"
    ).replace(/\/+$/, "");
    return `${siteUrl}/api/downloads/${PACK_ARRANQUE_PRODUCT_SLUG}?token=${encodeURIComponent(token)}`;
}

function createDownloadToken(payload: DownloadTokenPayload): string {
    const secret = getTokenSecret();
    if (!secret) {
        throw new Error("download_token_secret_missing");
    }
    const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
        "base64url",
    );
    const signature = sign(encodedPayload, secret);
    return `${encodedPayload}.${signature}`;
}

export function validateDownloadToken(token: string): DownloadTokenValidation {
    const secret = getTokenSecret();
    if (!secret) return { ok: false, reason: "missing_secret" };

    const trimmed = token.trim();
    if (!trimmed) return { ok: false, reason: "missing_token" };

    const [encodedPayload, signature, extra] = trimmed.split(".");
    if (!encodedPayload || !signature || extra !== undefined) {
        return { ok: false, reason: "malformed_token" };
    }

    const expectedSignature = sign(encodedPayload, secret);
    if (!safeEqual(signature, expectedSignature)) {
        return { ok: false, reason: "invalid_signature" };
    }

    let parsed: unknown;
    try {
        const json = Buffer.from(encodedPayload, "base64url").toString("utf8");
        parsed = JSON.parse(json);
    } catch {
        return { ok: false, reason: "invalid_payload" };
    }

    if (!isDownloadTokenPayload(parsed)) {
        return { ok: false, reason: "invalid_payload" };
    }

    if (parsed.expiresAt < Date.now()) {
        return { ok: false, reason: "expired" };
    }

    return { ok: true, payload: parsed };
}

function sign(encodedPayload: string, secret: string): string {
    return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
    const leftBuffer = Buffer.from(left, "base64url");
    const rightBuffer = Buffer.from(right, "base64url");
    if (leftBuffer.length !== rightBuffer.length) return false;
    return timingSafeEqual(leftBuffer, rightBuffer);
}

function isDownloadTokenPayload(value: unknown): value is DownloadTokenPayload {
    if (typeof value !== "object" || value === null) return false;
    const record = value as Record<string, unknown>;
    return (
        typeof record.productSlug === "string" &&
        typeof record.emailHash === "string" &&
        typeof record.orderId === "string" &&
        typeof record.fileVersion === "string" &&
        typeof record.expiresAt === "number" &&
        Number.isFinite(record.expiresAt)
    );
}
