import nodemailer, { type Transporter } from "nodemailer";
import {
    GESTORIA_LOCAL_ASSISTANCE_ADDON_ID,
    GESTORIA_LOCAL_DELIVERY_LINKS,
    GESTORIA_LOCAL_PRODUCT_SLUG,
    PACK_ARRANQUE_PRODUCT_SLUG,
    SISTEMA_IA_PRO_PRODUCT_SLUG,
    type ProductAddon,
} from "@/lib/constants";
import {
    createSecureDownloadUrl,
    getSecureDownloadProduct,
} from "@/lib/secure-downloads";

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

export interface GestoriaLocalDeliveryEmailParams {
    to: string;
    customerName: string;
    productName: string;
    amount: string;
    customerEmail?: string;
    orderId?: string | null;
    transactionId?: string | null;
    policyVersion?: string;
    selectedAddons?: readonly ProductAddon[];
    paymentMethodLabel?: string;
}

export interface PackArranqueDeliveryEmailParams {
    to: string;
    customerName: string;
    productName: string;
    amount: string;
    customerEmail?: string;
    orderId?: string | null;
    transactionId?: string | null;
    policyVersion?: string;
    paymentMethodLabel?: string;
}

export interface SecureDownloadDeliveryEmailParams
    extends PackArranqueDeliveryEmailParams {
    productSlug: string;
}

// Slugs reales del catálogo (constants.ts). Las env vars siguen la convención
// DOWNLOAD_URL_<SLUG_UPPER_SNAKE>. Las URLs se generan con scripts/upload-zips.mjs.
const DOWNLOAD_URL_BY_SLUG: Record<string, () => string | undefined> = {
    [GESTORIA_LOCAL_PRODUCT_SLUG]: () =>
        publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.package),
    [PACK_ARRANQUE_PRODUCT_SLUG]: () => undefined,
    [SISTEMA_IA_PRO_PRODUCT_SLUG]: () => undefined,
    "generador-contrasenas-basico": () => process.env.DOWNLOAD_URL_GENERADOR_CONTRASENAS_BASICO,
    "verificador-urls": () => process.env.DOWNLOAD_URL_VERIFICADOR_URLS,
    "anti-phishing": () => process.env.DOWNLOAD_URL_ANTI_PHISHING,
    "auditor-web": () => process.env.DOWNLOAD_URL_AUDITOR_WEB,
    "backup-cifrado": () => process.env.DOWNLOAD_URL_BACKUP_CIFRADO,
};

function publicUrl(path: string): string {
    const siteUrl = (
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaflashelite-web.vercel.app"
    ).replace(/\/+$/, "");
    return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

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

export async function sendGestoriaLocalDeliveryEmail(
    params: GestoriaLocalDeliveryEmailParams,
): Promise<boolean> {
    const {
        to,
        customerName,
        productName,
        amount,
        customerEmail,
        orderId,
        transactionId,
        policyVersion,
        selectedAddons = [],
        paymentMethodLabel,
    } = params;
    const user = (process.env.GMAIL_USER ?? "").trim();
    if (!user || !(process.env.GMAIL_APP_PASSWORD ?? "").trim()) {
        console.error("[email] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
        return false;
    }

    const deliveredAt = new Date().toISOString();
    const buyerEmail = customerEmail ?? to;
    const hasAssistance = selectedAddons.some(
        (addon) => addon.id === GESTORIA_LOCAL_ASSISTANCE_ADDON_ID,
    );
    const packageUrl = publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.package);
    const macInstallerUrl = publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.macInstaller);
    const windowsInstallerUrl = publicUrl(
        GESTORIA_LOCAL_DELIVERY_LINKS.windowsInstaller,
    );
    const startGuideUrl = publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.startGuide);
    const aiGuideUrl = publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.aiGuide);
    const manifestUrl = publicUrl(GESTORIA_LOCAL_DELIVERY_LINKS.manifest);
    const orderLine = orderId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Pedido PayPal:</strong> ${escapeHtml(orderId)}</p>`
        : "";
    const transactionLine = transactionId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Transacción:</strong> ${escapeHtml(transactionId)}</p>`
        : "";
    const paymentLine = paymentMethodLabel
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Método de pago:</strong> ${escapeHtml(paymentMethodLabel)}</p>`
        : "";
    const policyLine = policyVersion
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Política aplicada:</strong> ${escapeHtml(policyVersion)}</p>`
        : "";
    const assistanceHtml = hasAssistance
        ? `<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #1e40af;">
      <strong>Asistencia añadida:</strong> Has añadido asistencia de instalación y configuración.
      Te indicaremos por email cómo coordinar la ayuda inicial.
    </p>
  </div>`
        : "";

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0891b2; font-size: 24px;">iaflashelite</h1>
  </div>

  <h2 style="color: #1e293b;">Tu acceso a GestorIA Local está listo</h2>

  <p>Hola <strong>${escapeHtml(customerName)}</strong>,</p>

  <p>Tu compra de <strong>${escapeHtml(productName)}</strong> por
  <strong>${escapeHtml(amount)}€</strong> está registrada. Aquí tienes el paquete,
  instaladores y guías de instalación y configuración.</p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 20px 0;">
    <p style="margin: 4px 0; color: #475569;"><strong>Email comprador:</strong> ${escapeHtml(buyerEmail)}</p>
    <p style="margin: 4px 0; color: #475569;"><strong>Fecha de entrega:</strong> ${escapeHtml(deliveredAt)}</p>
    ${paymentLine}
    ${orderLine}
    ${transactionLine}
    ${policyLine}
  </div>

  <div style="background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0 0 10px; color: #155e75;"><strong>Descargas principales</strong></p>
    <ul style="margin: 0; padding-left: 20px; color: #164e63; line-height: 1.7;">
      <li><a href="${packageUrl}">Paquete GestorIA Local (.tgz)</a></li>
      <li><a href="${macInstallerUrl}">Instalador macOS/Linux</a></li>
      <li><a href="${windowsInstallerUrl}">Instalador Windows PowerShell</a></li>
      <li><a href="${startGuideUrl}">Guía de inicio e instalación</a></li>
      <li><a href="${aiGuideUrl}">Guía de configuración de motores IA</a></li>
      <li><a href="${manifestUrl}">Manifest de versión y verificación</a></li>
    </ul>
  </div>

  ${assistanceHtml}

  <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #854d0e;">
      GestorIA Local no toca AEAT, no es VeriFactu, no emite facturas oficiales
      y no sustituye tu software fiscal ni el criterio profesional.
    </p>
  </div>

  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #166534;">
      <strong>Garantía Flash:</strong> si el enlace falla, el archivo está dañado
      o el producto no funciona según lo descrito, responde a este email y lo
      revisamos contigo.
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
</body>
</html>`;

    const textLines = [
        `Hola ${customerName},`,
        ``,
        `Tu compra de ${productName} por ${amount}€ está registrada.`,
        `Email comprador: ${buyerEmail}`,
        `Fecha de entrega: ${deliveredAt}`,
        paymentMethodLabel ? `Método de pago: ${paymentMethodLabel}` : ``,
        orderId ? `Pedido PayPal: ${orderId}` : ``,
        transactionId ? `Transacción: ${transactionId}` : ``,
        policyVersion ? `Política aplicada: ${policyVersion}` : ``,
        ``,
        `Descargas principales:`,
        `Paquete GestorIA Local (.tgz): ${packageUrl}`,
        `Instalador macOS/Linux: ${macInstallerUrl}`,
        `Instalador Windows PowerShell: ${windowsInstallerUrl}`,
        `Guía de inicio e instalación: ${startGuideUrl}`,
        `Guía de configuración de motores IA: ${aiGuideUrl}`,
        `Manifest de versión y verificación: ${manifestUrl}`,
        ``,
        hasAssistance
            ? `Has añadido asistencia de instalación y configuración. Te indicaremos por email cómo coordinar la ayuda inicial.`
            : ``,
        `GestorIA Local no toca AEAT, no es VeriFactu, no emite facturas oficiales y no sustituye tu software fiscal ni el criterio profesional.`,
        `Garantía Flash: si el enlace falla, el archivo está dañado o el producto no funciona según lo descrito, responde a este email y lo revisamos contigo.`,
        `Al haberse iniciado la entrega digital solicitada, el derecho de desistimiento de 14 días deja de aplicarse cuando empieza el acceso, descarga o envío.`,
        `Cualquier duda: iaflashelite@gmail.com`,
        ``,
        `iaflashelite`,
    ].filter((line) => line.length > 0);

    try {
        await getTransporter().sendMail({
            from: `"iaflashelite" <${user}>`,
            to,
            subject: `Tu acceso a GestorIA Local — iaflashelite`,
            text: textLines.join("\n"),
            html,
        });
        console.log(`[email] Entrega GestorIA Local enviada a ${to}`);
        return true;
    } catch (error) {
        console.error("[email] Error enviando GestorIA Local:", error);
        return false;
    }
}

export async function sendSecureDownloadDeliveryEmail(
    params: SecureDownloadDeliveryEmailParams,
): Promise<boolean> {
    const {
        to,
        customerName,
        productName,
        productSlug,
        amount,
        customerEmail,
        orderId,
        transactionId,
        policyVersion,
        paymentMethodLabel,
    } = params;
    const secureProduct = getSecureDownloadProduct(productSlug);
    if (!secureProduct) {
        console.error(`[email] Producto sin entrega segura: ${productSlug}`);
        return false;
    }

    const user = (process.env.GMAIL_USER ?? "").trim();
    if (!user || !(process.env.GMAIL_APP_PASSWORD ?? "").trim()) {
        console.error("[email] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
        return false;
    }

    let downloadUrl: string;
    try {
        downloadUrl = createSecureDownloadUrl({
            productSlug,
            customerEmail: customerEmail ?? to,
            orderId: orderId ?? transactionId ?? `manual-${Date.now()}`,
        });
    } catch (error) {
        console.error("[email] No se pudo generar enlace seguro:", error);
        return false;
    }

    const deliveredAt = new Date().toISOString();
    const buyerEmail = customerEmail ?? to;
    const orderLine = orderId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Pedido:</strong> ${escapeHtml(orderId)}</p>`
        : "";
    const transactionLine = transactionId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Transacción:</strong> ${escapeHtml(transactionId)}</p>`
        : "";
    const paymentLine = paymentMethodLabel
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Método de pago:</strong> ${escapeHtml(paymentMethodLabel)}</p>`
        : "";
    const policyLine = policyVersion
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Política aplicada:</strong> ${escapeHtml(policyVersion)}</p>`
        : "";

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0891b2; font-size: 24px;">iaflashelite</h1>
  </div>

  <h2 style="color: #1e293b;">Tu ${escapeHtml(productName)} está listo</h2>

  <p>Hola <strong>${escapeHtml(customerName)}</strong>,</p>

  <p>Tu compra de <strong>${escapeHtml(productName)}</strong> por
  <strong>${escapeHtml(amount)}€</strong> está lista. El enlace de descarga es
  temporal para proteger el material.</p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 20px 0;">
    <p style="margin: 4px 0; color: #475569;"><strong>Email comprador:</strong> ${escapeHtml(buyerEmail)}</p>
    <p style="margin: 4px 0; color: #475569;"><strong>Fecha de entrega:</strong> ${escapeHtml(deliveredAt)}</p>
    ${paymentLine}
    ${orderLine}
    ${transactionLine}
    ${policyLine}
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${downloadUrl}"
       style="background-color: #0891b2; color: white; padding: 16px 32px;
              text-decoration: none; border-radius: 8px; font-size: 18px;
              font-weight: bold; display: inline-block;">
      Descargar ${escapeHtml(productName)}
    </a>
  </div>

  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #166534;">
      <strong>Garantía de calidad — 14 días:</strong> cubre la calidad y
      completitud del material descargable. No cubre resultados económicos ni
      ejecución incorrecta por parte del comprador.
    </p>
  </div>

  <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
    Al haberse iniciado la entrega digital solicitada, el derecho de
    desistimiento de 14 días deja de aplicarse cuando empieza el acceso,
    descarga o envío. Mantienes tus derechos si hay un problema real de
    entrega, archivo, descripción o funcionamiento.
  </p>

  <p>Si necesitas reenvío del enlace, responde a este email o escribe a
    <a href="mailto:iaflashelite@gmail.com" style="color: #0891b2;">iaflashelite@gmail.com</a>.
  </p>
</body>
</html>`;

    const textLines = [
        `Hola ${customerName},`,
        ``,
        `Tu ${productName} está listo.`,
        `Producto: ${productName}`,
        `Importe: ${amount}€`,
        `Email comprador: ${buyerEmail}`,
        `Fecha de entrega: ${deliveredAt}`,
        paymentMethodLabel ? `Método de pago: ${paymentMethodLabel}` : ``,
        orderId ? `Pedido: ${orderId}` : ``,
        transactionId ? `Transacción: ${transactionId}` : ``,
        policyVersion ? `Política aplicada: ${policyVersion}` : ``,
        ``,
        `Descarga temporal:`,
        downloadUrl,
        ``,
        `Garantía de calidad — 14 días: cubre la calidad y completitud del material descargable. No cubre resultados económicos ni ejecución incorrecta por parte del comprador.`,
        `Si necesitas reenvío del enlace, responde a este email.`,
        ``,
        `iaflashelite`,
    ].filter((line) => line.length > 0);

    try {
        await getTransporter().sendMail({
            from: `"iaflashelite" <${user}>`,
            to,
            subject: `Tu ${productName} está listo — iaflashelite`,
            text: textLines.join("\n"),
            html,
        });
        console.log(`[email] Entrega segura ${secureProduct.displayName} enviada a ${to}`);
        return true;
    } catch (error) {
        console.error("[email] Error enviando entrega segura:", error);
        return false;
    }
}

// Builder puro (sin side-effects) del email del Pack Arranque IA. Lo separamos
// del envío para poder renderizarlo a archivo durante revisión visual sin
// invocar nodemailer. La función no toca el transporter ni firma tokens —
// recibe ya la downloadUrl firmada.
export interface BuildPackArranqueDeliveryEmailInput {
    customerName: string;
    customerEmail?: string;
    productName: string;
    amount: string;
    downloadUrl: string;
    deliveredAt: string;
    orderId?: string | null;
    transactionId?: string | null;
    policyVersion?: string;
    paymentMethodLabel?: string;
}

export interface BuiltDeliveryEmail {
    subject: string;
    html: string;
    text: string;
}

export function buildPackArranqueDeliveryEmail(
    input: BuildPackArranqueDeliveryEmailInput,
): BuiltDeliveryEmail {
    const {
        customerName,
        customerEmail,
        productName,
        amount,
        downloadUrl,
        deliveredAt,
        orderId,
        transactionId,
        policyVersion,
        paymentMethodLabel,
    } = input;

    const buyerEmail = customerEmail ?? "";
    const orderLine = orderId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Pedido:</strong> ${escapeHtml(orderId)}</p>`
        : "";
    const transactionLine = transactionId
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Transacción:</strong> ${escapeHtml(transactionId)}</p>`
        : "";
    const paymentLine = paymentMethodLabel
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Método de pago:</strong> ${escapeHtml(paymentMethodLabel)}</p>`
        : "";
    const policyLine = policyVersion
        ? `<p style="margin: 4px 0; color: #475569;"><strong>Política aplicada:</strong> ${escapeHtml(policyVersion)}</p>`
        : "";

    const subject = `Ya tienes tu ${productName} — empieza por aquí`;

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0891b2; font-size: 24px; margin: 0;">iaflashelite</h1>
  </div>

  <h2 style="color: #1e293b;">Tu ${escapeHtml(productName)} está listo</h2>

  <p>Hola <strong>${escapeHtml(customerName)}</strong>,</p>

  <p>Gracias por confiar en este primer pack. Aquí lo tienes: tu copia de
  <strong>${escapeHtml(productName)}</strong> por
  <strong>${escapeHtml(amount)}€</strong>. El enlace de descarga es temporal
  para proteger el material.</p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 20px 0;">
    <p style="margin: 4px 0; color: #475569;"><strong>Email comprador:</strong> ${escapeHtml(buyerEmail)}</p>
    <p style="margin: 4px 0; color: #475569;"><strong>Fecha de entrega:</strong> ${escapeHtml(deliveredAt)}</p>
    ${paymentLine}
    ${orderLine}
    ${transactionLine}
    ${policyLine}
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${downloadUrl}"
       style="background-color: #0891b2; color: white; padding: 16px 32px;
              text-decoration: none; border-radius: 8px; font-size: 18px;
              font-weight: bold; display: inline-block;">
      Descargar ${escapeHtml(productName)}
    </a>
  </div>

  <div style="background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 8px; padding: 18px; margin: 28px 0;">
    <h3 style="color: #0e7490; font-size: 16px; margin: 0 0 12px 0;">Por dónde empezar</h3>
    <p style="margin: 0 0 12px 0; color: #164e63;">
      Reserva una tarde de unas 3 horas y media. No abras los 15 archivos a la
      vez — se siguen en orden:
    </p>
    <ol style="margin: 0 0 12px 20px; padding: 0; color: #164e63;">
      <li style="margin-bottom: 6px;">Abre <strong>00-pack-arranque-ia.pdf</strong> y léelo de principio a fin.</li>
      <li style="margin-bottom: 6px;">Escucha <strong>01-audio-guia.mp3</strong> mientras trabajas o de fondo.</li>
      <li style="margin-bottom: 6px;">Empieza por <strong>plantillas/curriculum-ia-personal.md</strong>; el PDF te guía paso a paso desde ahí.</li>
    </ol>
    <p style="margin: 0; color: #164e63; font-size: 14px;">
      Si solo tienes una hora hoy, haz el paso 3. El resto puede esperar a otra sesión.
    </p>
  </div>

  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0; color: #166534;">
      <strong>Garantía de calidad — 14 días:</strong> cubre la calidad y
      completitud del material descargable. No cubre resultados económicos ni
      ejecución incorrecta por parte del comprador.
    </p>
  </div>

  <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
    Al haberse iniciado la entrega digital solicitada, el derecho de
    desistimiento de 14 días deja de aplicarse cuando empieza el acceso,
    descarga o envío. Mantienes tus derechos si hay un problema real de
    entrega, archivo, descripción o funcionamiento.
  </p>

  <p>Si necesitas reenvío del enlace, responde a este email o escribe a
    <a href="mailto:iaflashelite@gmail.com" style="color: #0891b2;">iaflashelite@gmail.com</a>.
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />

  <div style="margin: 0 0 8px 0;">
    <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 8px 0;">Tu siguiente paso, cuando estés listo</h3>
    <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
      Sin prisa: primero saca partido de este pack. Cuando termines el arranque
      y quieras aprender a usar tu IA para ejecutar proyectos completos con
      auditoría, prompts controlados y revisión, el siguiente paso natural es
      <strong>Sistema IA Pro</strong>.
    </p>
    <p style="margin: 0; color: #64748b; font-size: 13px;">
      Más info en <a href="https://iaflashelite.com/academia/sistema-ia-pro" style="color: #0891b2;">iaflashelite.com/academia/sistema-ia-pro</a>.
    </p>
  </div>
</body>
</html>`;

    const textLines = [
        `Hola ${customerName},`,
        ``,
        `Gracias por confiar en este primer pack. Aquí tienes tu ${productName}.`,
        ``,
        `Producto: ${productName}`,
        `Importe: ${amount}€`,
        buyerEmail ? `Email comprador: ${buyerEmail}` : ``,
        `Fecha de entrega: ${deliveredAt}`,
        paymentMethodLabel ? `Método de pago: ${paymentMethodLabel}` : ``,
        orderId ? `Pedido: ${orderId}` : ``,
        transactionId ? `Transacción: ${transactionId}` : ``,
        policyVersion ? `Política aplicada: ${policyVersion}` : ``,
        ``,
        `Descarga temporal:`,
        downloadUrl,
        ``,
        `POR DÓNDE EMPEZAR`,
        `Reserva una tarde de unas 3 horas y media. No abras los 15 archivos a la vez — se siguen en orden:`,
        `1. Abre 00-pack-arranque-ia.pdf y léelo de principio a fin.`,
        `2. Escucha 01-audio-guia.mp3 mientras trabajas o de fondo.`,
        `3. Empieza por plantillas/curriculum-ia-personal.md; el PDF te guía paso a paso desde ahí.`,
        ``,
        `Si solo tienes una hora hoy, haz el paso 3. El resto puede esperar a otra sesión.`,
        ``,
        `Garantía de calidad — 14 días: cubre la calidad y completitud del material descargable. No cubre resultados económicos ni ejecución incorrecta por parte del comprador.`,
        ``,
        `Si necesitas reenvío del enlace, responde a este email o escribe a iaflashelite@gmail.com.`,
        ``,
        `---`,
        ``,
        `TU SIGUIENTE PASO, CUANDO ESTÉS LISTO`,
        `Sin prisa: primero saca partido de este pack. Cuando termines el arranque y quieras aprender a usar tu IA para ejecutar proyectos completos con auditoría, prompts controlados y revisión, el siguiente paso natural es Sistema IA Pro.`,
        `Más info en https://iaflashelite.com/academia/sistema-ia-pro`,
        ``,
        `iaflashelite`,
    ].filter((line) => line.length > 0);

    return { subject, html, text: textLines.join("\n") };
}

export async function sendPackArranqueDeliveryEmail(
    params: PackArranqueDeliveryEmailParams,
): Promise<boolean> {
    const {
        to,
        customerName,
        productName,
        amount,
        customerEmail,
        orderId,
        transactionId,
        policyVersion,
        paymentMethodLabel,
    } = params;

    const secureProduct = getSecureDownloadProduct(PACK_ARRANQUE_PRODUCT_SLUG);
    if (!secureProduct) {
        console.error(
            `[email] Producto sin entrega segura: ${PACK_ARRANQUE_PRODUCT_SLUG}`,
        );
        return false;
    }

    const user = (process.env.GMAIL_USER ?? "").trim();
    if (!user || !(process.env.GMAIL_APP_PASSWORD ?? "").trim()) {
        console.error("[email] GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
        return false;
    }

    let downloadUrl: string;
    try {
        downloadUrl = createSecureDownloadUrl({
            productSlug: PACK_ARRANQUE_PRODUCT_SLUG,
            customerEmail: customerEmail ?? to,
            orderId: orderId ?? transactionId ?? `manual-${Date.now()}`,
        });
    } catch (error) {
        console.error("[email] No se pudo generar enlace seguro:", error);
        return false;
    }

    const { subject, html, text } = buildPackArranqueDeliveryEmail({
        customerName,
        customerEmail: customerEmail ?? to,
        productName,
        amount,
        downloadUrl,
        deliveredAt: new Date().toISOString(),
        orderId,
        transactionId,
        policyVersion,
        paymentMethodLabel,
    });

    try {
        await getTransporter().sendMail({
            from: `"iaflashelite" <${user}>`,
            to,
            subject,
            text,
            html,
        });
        console.log(
            `[email] Entrega segura ${secureProduct.displayName} enviada a ${to}`,
        );
        return true;
    } catch (error) {
        console.error("[email] Error enviando entrega segura:", error);
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
