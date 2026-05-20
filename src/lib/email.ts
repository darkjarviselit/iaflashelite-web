import nodemailer, { type Transporter } from "nodemailer";

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

export interface DeliveryEmailParams {
    to: string;
    customerName: string;
    productName: string;
    productSlug: string;
    downloadUrl: string;
    amount: string;
}

// Slugs reales del catálogo (constants.ts). Las env vars siguen la convención
// DOWNLOAD_URL_<SLUG_UPPER_SNAKE>. Las URLs se generan con scripts/upload-zips.mjs.
const DOWNLOAD_URL_BY_SLUG: Record<string, () => string | undefined> = {
    "generador-contrasenas-basico": () => process.env.DOWNLOAD_URL_GENERADOR_CONTRASENAS_BASICO,
    "verificador-urls": () => process.env.DOWNLOAD_URL_VERIFICADOR_URLS,
    "anti-phishing": () => process.env.DOWNLOAD_URL_ANTI_PHISHING,
    "auditor-web": () => process.env.DOWNLOAD_URL_AUDITOR_WEB,
    "backup-cifrado": () => process.env.DOWNLOAD_URL_BACKUP_CIFRADO,
};

export function getDownloadUrl(productSlug: string): string | null {
    const resolver = DOWNLOAD_URL_BY_SLUG[productSlug];
    if (!resolver) return null;
    const url = resolver();
    return url && url.trim() ? url.trim() : null;
}

export async function sendDeliveryEmail(params: DeliveryEmailParams): Promise<boolean> {
    const { to, customerName, productName, downloadUrl, amount } = params;
    const user = (process.env.GMAIL_USER ?? "").trim();
    if (!user || !(process.env.GMAIL_APP_PASSWORD ?? "").trim()) {
        console.error("[email] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
        return false;
    }

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0891b2; font-size: 24px;">⚡ iaflashelite</h1>
  </div>

  <h2 style="color: #1e293b;">✅ Tu pedido está listo</h2>

  <p>Hola <strong>${escapeHtml(customerName)}</strong>,</p>

  <p>Tu pago de <strong>${escapeHtml(amount)}€</strong> se ha procesado correctamente.
  Aquí tienes tu descarga de <strong>${escapeHtml(productName)}</strong>:</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${downloadUrl}"
       style="background-color: #0891b2; color: white; padding: 16px 32px;
              text-decoration: none; border-radius: 8px; font-size: 18px;
              font-weight: bold; display: inline-block;">
      ⬇️ Descargar ${escapeHtml(productName)}
    </a>
  </div>

  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #166534;">
      <strong>🛡️ Garantía técnica:</strong> Si tienes algún problema técnico con el producto
      en las próximas 48h, escríbenos y lo resolvemos o te devolvemos el dinero.
    </p>
  </div>

  <p>Cualquier duda:
    <a href="mailto:iaflashelite@gmail.com" style="color: #0891b2;">iaflashelite@gmail.com</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

  <p style="font-size: 12px; color: #94a3b8; text-align: center;">
    iaflashelite · Barcelona, España ·
    <a href="https://iaflashelite-web.vercel.app/legal/garantias" style="color: #94a3b8;">Política de garantías</a>
  </p>
</body>
</html>`;

    const text = [
        `Hola ${customerName},`,
        ``,
        `Tu pago de ${amount}€ se ha procesado correctamente.`,
        `Descarga tu ${productName} aquí:`,
        ``,
        downloadUrl,
        ``,
        `Garantía técnica: fallo no resuelto en 48h = devolución 100%.`,
        `Cualquier duda: iaflashelite@gmail.com`,
        ``,
        `— iaflashelite`,
    ].join("\n");

    try {
        await getTransporter().sendMail({
            from: `"iaflashelite" <${user}>`,
            to,
            subject: `✅ Tu descarga: ${productName} — iaflashelite`,
            text,
            html,
        });
        console.log(`[email] Entrega enviada a ${to} para ${productName}`);
        return true;
    } catch (error) {
        console.error("[email] Error enviando entrega:", error);
        return false;
    }
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
