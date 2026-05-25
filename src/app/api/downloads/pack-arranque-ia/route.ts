import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { PACK_ARRANQUE_PRODUCT_SLUG } from "@/lib/constants";
import {
    PACK_ARRANQUE_FILE_VERSION,
    PACK_ARRANQUE_ZIP_FILENAME,
    PACK_ARRANQUE_ZIP_PATH,
    validateDownloadToken,
} from "@/lib/secure-downloads";

const ERROR_STATUS: Record<string, number> = {
    missing_secret: 503,
    missing_token: 401,
    malformed_token: 401,
    invalid_signature: 401,
    invalid_payload: 401,
    expired: 403,
};

export async function GET(request: Request) {
    const token = new URL(request.url).searchParams.get("token") ?? "";
    const validation = validateDownloadToken(token);

    if (!validation.ok) {
        return NextResponse.json(
            { error: validation.reason },
            { status: ERROR_STATUS[validation.reason] ?? 401 },
        );
    }

    const { payload } = validation;
    if (
        payload.productSlug !== PACK_ARRANQUE_PRODUCT_SLUG ||
        payload.fileVersion !== PACK_ARRANQUE_FILE_VERSION
    ) {
        return NextResponse.json({ error: "invalid_product" }, { status: 403 });
    }

    let fileStat: Awaited<ReturnType<typeof stat>>;
    try {
        fileStat = await stat(PACK_ARRANQUE_ZIP_PATH);
    } catch {
        return NextResponse.json({ error: "file_not_available" }, { status: 503 });
    }

    const nodeStream = createReadStream(PACK_ARRANQUE_ZIP_PATH);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new Response(webStream, {
        headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${PACK_ARRANQUE_ZIP_FILENAME}"`,
            "Content-Length": String(fileStat.size),
            "Cache-Control": "private, no-store, max-age=0",
            "X-Content-Type-Options": "nosniff",
        },
    });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
