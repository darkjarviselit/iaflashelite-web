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
    customerEmail?: string;
    orderId?: string | null;
    transactionId?: string | null;
    policyVersion?: string;
    deliverySource?: "paypal_direct" | "manual_delivery";
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
    const {
        to,
        customerName,
        productName,
        downloadUrl,
        amount,
        customerEmail,
        orderId,
        transactionId,
        policyVersion,
    } = params;
    const user = (process.env.GMAIL_USER ?? "").trim();
    if (!user || !(process.env.GMAIL_APP_PASSWORD ?? "").trim()) {
        console.error("[email] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
        return false;
    }
    const deliveredAt = new Date().toISOString();
    const buyerEmail = customerEmail ?? to;
    const orderLine = orderId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Pedido PayPal:</strong> ${escapeHtml(orderId)}</p>`
        : "";
    const transactionLine = transactionId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Transacción:</strong> ${escapeHtml(transactionId)}</p>`
        : "";
    const policyLine = policyVersion
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Política aplicada:</strong> ${escapeHtml(policyVersion)}</p>`
        : "";

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0891b2; font-size: 24px;">⚡ iaflashelite</h1>
  </div>

  <h2 style="color: #1e293b;">Tu pedido está listo</h2>

  <p>Hola <strong>${escapeHtml(customerName)}</strong>,</p>

  <p>Tu pedido está listo. Hemos iniciado la entrega digital solicitada de
  <strong>${escapeHtml(productName)}</strong> por <strong>${escapeHtml(amount)}€</strong>.</p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 20px 0;">
    <p style="margin: 4px 0; color: #475569;"><strong>Email comprador:</strong> ${escapeHtml(buyerEmail)}</p>
    <p style="margin: 4px 0; color: #475569;"><strong>Fecha de entrega:</strong> ${escapeHtml(deliveredAt)}</p>
    ${orderLine}
    ${transactionLine}
    ${policyLine}
  </div>

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
      <strong>Garantía Flash:</strong> Si el enlace falla, el archivo está dañado
      o el producto no funciona según lo descrito, responde a este email:
      lo revisamos y te damos solución.
    </p>
  </div>

  <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
    Al haberse iniciado la entrega digital solicitada, el derecho de
    desistimiento de 14 días deja de aplicarse cuando empieza el acceso,
    descarga o envío. Mantienes tus derechos si hay un problema real de
    entrega, archivo, descripción o funcionamiento.
  </p>

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
        `Tu pedido está listo. Hemos iniciado la entrega digital solicitada de ${productName} por ${amount}€.`,
        `Email comprador: ${buyerEmail}`,
        `Fecha de entrega: ${deliveredAt}`,
        orderId ? `Pedido PayPal: ${orderId}` : ``,
        transactionId ? `Transacción: ${transactionId}` : ``,
        policyVersion ? `Política aplicada: ${policyVersion}` : ``,
        ``,
        `Descarga tu ${productName} aquí:`,
        ``,
        downloadUrl,
        ``,
        `Garantía Flash: si el enlace falla, el archivo está dañado o el producto no funciona según lo descrito, responde a este email y lo revisamos contigo.`,
        `Al haberse iniciado la entrega digital solicitada, el derecho de desistimiento de 14 días deja de aplicarse cuando empieza el acceso, descarga o envío.`,
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
