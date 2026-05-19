// Sube los ZIPs de productos a Vercel Blob (acceso público).
// Requiere BLOB_READ_WRITE_TOKEN en .env.local — crea primero el store
// en vercel.com → Storage → Blob, o vía `npx vercel blob create-store …`.
//
// Imprime al final las líneas DOWNLOAD_URL_* que tienes que pegar en .env.local.

import { put } from '@vercel/blob';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '..', '.env.local') });

if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Falta BLOB_READ_WRITE_TOKEN en .env.local — crea el Blob store antes.');
    process.exit(1);
}

const HOME = process.env.HOME ?? '/Users/dark_jarvis';

// Los slugs son los REALES del catálogo (constants.ts). No los de marketing.
const PRODUCTS = [
    {
        slug: 'generador-contrasenas-basico',
        zipPath: `${HOME}/Desktop/iaflashelite-pwgen-basico-v1.0.zip`,
        filename: 'iaflashelite-pwgen-basico-v1.0.zip',
    },
    {
        slug: 'verificador-urls',
        zipPath: `${HOME}/Desktop/iaflashelite-url-checker-v1.0.zip`,
        filename: 'iaflashelite-url-checker-v1.0.zip',
    },
    {
        slug: 'anti-phishing',
        zipPath: `${HOME}/Desktop/iaflashelite-anti-phishing-v1.0.zip`,
        filename: 'iaflashelite-anti-phishing-v1.0.zip',
    },
    {
        slug: 'auditor-web',
        zipPath: `${HOME}/Desktop/iaflashelite-auditor-web-v1.0.zip`,
        filename: 'iaflashelite-auditor-web-v1.0.zip',
    },
];

function envKey(slug) {
    return 'DOWNLOAD_URL_' + slug.toUpperCase().replace(/-/g, '_');
}

console.log('Subiendo ZIPs a Vercel Blob...\n');

const urls = {};

for (const product of PRODUCTS) {
    if (!existsSync(product.zipPath)) {
        console.error(`❌ No encontrado: ${product.zipPath}`);
        continue;
    }
    const buffer = readFileSync(product.zipPath);
    const blob = await put(
        `products/${product.slug}/${product.filename}`,
        buffer,
        {
            access: 'public',
            contentType: 'application/zip',
            allowOverwrite: true,
        },
    );
    urls[product.slug] = blob.downloadUrl;
    console.log(`✅ ${product.slug}`);
    console.log(`   ${blob.downloadUrl}\n`);
}

console.log('=== Añade estas líneas a .env.local ===');
for (const [slug, url] of Object.entries(urls)) {
    console.log(`${envKey(slug)}=${url}`);
}
