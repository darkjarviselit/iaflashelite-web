import { PACK_ARRANQUE_PRODUCT_SLUG } from "@/lib/constants";
import { GET as getSecureDownload } from "../[slug]/route";

export function GET(request: Request) {
    return getSecureDownload(request, {
        params: Promise.resolve({ slug: PACK_ARRANQUE_PRODUCT_SLUG }),
    });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
