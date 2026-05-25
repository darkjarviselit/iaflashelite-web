import path from "node:path";
import {
    PACK_ARRANQUE_PRODUCT_SLUG,
    PRIMER_SISTEMA_IA_VENDIBLE_PRODUCT_SLUG,
    SISTEMA_IA_PRO_PRODUCT_SLUG,
} from "@/lib/constants";
import {
    getSecureDownloadProduct,
    type SecureDownloadProduct,
} from "@/lib/secure-downloads";

interface SecureDownloadFileConfig {
    zipPath: string;
}

export interface SecureDownloadFile extends SecureDownloadProduct {
    zipPath: string;
}

const SECURE_DOWNLOAD_FILES: Record<string, SecureDownloadFileConfig> = {
    [PACK_ARRANQUE_PRODUCT_SLUG]: {
        zipPath: path.join(
            /*turbopackIgnore: true*/ process.cwd(),
            "dist",
            "academia",
            "pack-arranque-ia-v1.zip",
        ),
    },
    [SISTEMA_IA_PRO_PRODUCT_SLUG]: {
        zipPath: path.join(
            /*turbopackIgnore: true*/ process.cwd(),
            "dist",
            "academia",
            "sistema-ia-pro-v1.zip",
        ),
    },
    [PRIMER_SISTEMA_IA_VENDIBLE_PRODUCT_SLUG]: {
        zipPath: path.join(
            /*turbopackIgnore: true*/ process.cwd(),
            "dist",
            "academia",
            "primer-sistema-ia-vendible-v1.zip",
        ),
    },
};

export function getSecureDownloadFile(productSlug: string): SecureDownloadFile | null {
    const product = getSecureDownloadProduct(productSlug);
    const file = SECURE_DOWNLOAD_FILES[productSlug];
    if (!product || !file) return null;
    return {
        ...product,
        zipPath: file.zipPath,
    };
}
