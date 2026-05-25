// Empaqueta cada instalador de Kenvo (.dmg / .exe) junto al manual en un ZIP
// y lo sube a Vercel Blob (acceso público con sufijo aleatorio, de modo que la
// URL no es adivinable). La URL nunca se entrega al cliente: la descarga pasa
// por /api/downloads/[slug], protegida por token firmado (secure-downloads).
//
// Requiere BLOB_READ_WRITE_TOKEN en .env.local.
// Imprime al final las líneas KENVO_*_BLOB_URL para pegar en .env.local
// y en las variables de entorno de Vercel.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env.local") });

if (!process.env.BLOB_READ_WRITE_TOKEN) {
	console.error(
		"❌ Falta BLOB_READ_WRITE_TOKEN en .env.local — crea el Blob store antes.",
	);
	process.exit(1);
}

// kenvo/ es hermano de iaflashelite-web/ dentro de la misma carpeta.
const KENVO_DIR = resolve(__dirname, "..", "..", "kenvo");
const MANUAL_PATH = join(KENVO_DIR, "docs", "MANUAL_INSTALACION_KENVO.md");

if (!existsSync(MANUAL_PATH)) {
	console.error(`❌ No encontrado el manual: ${MANUAL_PATH}`);
	process.exit(1);
}

// Cada plataforma: envKey debe coincidir con secure-download-files.ts y
// zipFilename con KENVO_*_ZIP_FILENAME en secure-downloads.ts.
const PLATFORMS = [
	{
		envKey: "KENVO_MAC_ARM_BLOB_URL",
		installer: join(KENVO_DIR, "dist", "Kenvo-0.8.0-arm64.dmg"),
		zipFilename: "kenvo-0.8.0-mac-arm64.zip",
	},
	{
		envKey: "KENVO_MAC_INTEL_BLOB_URL",
		installer: join(KENVO_DIR, "dist", "Kenvo-0.8.0.dmg"),
		zipFilename: "kenvo-0.8.0-mac-intel.zip",
	},
	{
		envKey: "KENVO_WINDOWS_BLOB_URL",
		installer: join(KENVO_DIR, "dist", "Kenvo Setup 0.8.0.exe"),
		zipFilename: "kenvo-0.8.0-windows.zip",
	},
];

console.log("Empaquetando y subiendo instaladores de Kenvo a Vercel Blob...\n");

const urls = {};

for (const platform of PLATFORMS) {
	if (!existsSync(platform.installer)) {
		console.warn(`⏭️  Saltado (instalador no encontrado): ${platform.installer}`);
		continue;
	}

	const zipPath = join(tmpdir(), platform.zipFilename);
	rmSync(zipPath, { force: true });

	// -0 (store): el .dmg/.exe ya está comprimido, recomprimir solo cuesta tiempo.
	// -j: sin rutas; -X: sin atributos extra del sistema de archivos.
	execFileSync("zip", ["-0", "-j", "-X", zipPath, platform.installer, MANUAL_PATH], {
		stdio: ["ignore", "ignore", "inherit"],
	});

	const buffer = readFileSync(zipPath);
	const blob = await put(`products/kenvo/${platform.zipFilename}`, buffer, {
		access: "public",
		addRandomSuffix: true,
		contentType: "application/zip",
	});
	rmSync(zipPath, { force: true });

	urls[platform.envKey] = blob.downloadUrl;
	console.log(`✅ ${platform.zipFilename}`);
	console.log(`   ${blob.downloadUrl}\n`);
}

if (Object.keys(urls).length === 0) {
	console.error("❌ No se subió ningún ZIP. Revisa las rutas de los instaladores.");
	process.exit(1);
}

console.log("=== Añade estas líneas a .env.local y a las env vars de Vercel ===");
for (const [envKey, url] of Object.entries(urls)) {
	console.log(`${envKey}=${url}`);
}
