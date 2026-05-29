import path from "node:path";
import {
	KENVO_MAC_ARM_PRODUCT_SLUG,
	KENVO_MAC_INTEL_PRODUCT_SLUG,
	PACK_ARRANQUE_PRODUCT_SLUG,
	PRIMER_SISTEMA_IA_VENDIBLE_PRODUCT_SLUG,
	SISTEMA_IA_PRO_PRODUCT_SLUG,
} from "@/lib/constants";
import {
	getSecureDownloadProduct,
	type SecureDownloadProduct,
} from "@/lib/secure-downloads";

// Una fuente es un archivo local empaquetado en el deployment (material de
// academia, pocos MB) o una URL de Vercel Blob (binarios grandes que no caben
// en el deployment, como los instaladores de Kenvo). El env var con la URL se
// lee en tiempo de request, no en build.
interface SecureDownloadFileConfig {
	zipPath?: string;
	zipUrlEnv?: string;
	// URL pública directa (GitHub Releases). Kenvo se distribuye gratis desde
	// el repo público kenvo-releases; el endpoint /api/downloads redirige (302)
	// a esta URL tras validar el token firmado de compra.
	releaseUrl?: string;
}

export interface SecureDownloadFile extends SecureDownloadProduct {
	zipPath?: string;
	zipUrl?: string;
	releaseUrl?: string;
}

const KENVO_RELEASE_BASE =
	"https://github.com/darkjarviselit/kenvo-releases/releases/download/v0.8.0";

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
	[KENVO_MAC_ARM_PRODUCT_SLUG]: {
		releaseUrl: `${KENVO_RELEASE_BASE}/Kenvo-0.8.0-arm64.dmg`,
	},
	[KENVO_MAC_INTEL_PRODUCT_SLUG]: {
		releaseUrl: `${KENVO_RELEASE_BASE}/Kenvo-0.8.0.dmg`,
	},
};

export function getSecureDownloadFile(
	productSlug: string,
): SecureDownloadFile | null {
	const product = getSecureDownloadProduct(productSlug);
	const file = SECURE_DOWNLOAD_FILES[productSlug];
	if (!product || !file) return null;

	if (file.releaseUrl) {
		return { ...product, releaseUrl: file.releaseUrl };
	}
	if (file.zipUrlEnv) {
		const zipUrl = (process.env[file.zipUrlEnv] ?? "").trim();
		if (!zipUrl) return null;
		return { ...product, zipUrl };
	}
	if (file.zipPath) {
		return { ...product, zipPath: file.zipPath };
	}
	return null;
}
