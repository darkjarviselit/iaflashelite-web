import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { getSecureDownloadFile } from "@/lib/secure-download-files";
import { validateDownloadToken } from "@/lib/secure-downloads";

const ERROR_STATUS: Record<string, number> = {
    missing_secret: 503,
    missing_token: 401,
    malformed_token: 401,
    invalid_signature: 401,
    invalid_payload: 401,
    expired: 403,
};

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const secureProduct = getSecureDownloadFile(slug);
    if (!secureProduct) {
        return NextResponse.json({ error: "download_not_found" }, { status: 404 });
    }

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
        payload.productSlug !== secureProduct.productSlug ||
        payload.fileVersion !== secureProduct.fileVersion
    ) {
        return NextResponse.json({ error: "invalid_product" }, { status: 403 });
    }

    const baseHeaders: Record<string, string> = {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${secureProduct.zipFilename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
    };

    // Fuente remota (Vercel Blob): los binarios grandes no caben en el
    // deployment, así que el ZIP se hace streaming desde Blob. La URL real de
    // Blob nunca se expone al cliente: solo ve este endpoint protegido por token.
    if (secureProduct.zipUrl) {
        let upstream: Response;
        try {
            upstream = await fetch(secureProduct.zipUrl);
        } catch {
            return NextResponse.json({ error: "file_not_available" }, { status: 503 });
        }
        if (!upstream.ok || !upstream.body) {
            return NextResponse.json({ error: "file_not_available" }, { status: 503 });
        }
        const length = upstream.headers.get("content-length");
        if (length) baseHeaders["Content-Length"] = length;
        return new Response(upstream.body, { headers: baseHeaders });
    }

    // Fuente local (material de academia empaquetado en el deployment).
    if (!secureProduct.zipPath) {
        return NextResponse.json({ error: "file_not_available" }, { status: 503 });
    }

    let fileStat: Awaited<ReturnType<typeof stat>>;
    try {
        fileStat = await stat(secureProduct.zipPath);
    } catch {
        return NextResponse.json({ error: "file_not_available" }, { status: 503 });
    }

    const nodeStream = createReadStream(secureProduct.zipPath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new Response(webStream, {
        headers: {
            ...baseHeaders,
            "Content-Length": String(fileStat.size),
        },
    });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
