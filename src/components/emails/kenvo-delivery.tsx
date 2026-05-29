// Plantilla de email premium de entrega de Kenvo (HTML string para nodemailer).
// No usa JSX: el sistema de email del proyecto envía HTML como string.

export interface KenvoDeliveryEmailContent {
	customerName: string;
	productName: string;
	platformLabel: string;
	/** Enlace seguro (tokenizado) de descarga para la plataforma comprada. */
	downloadUrl: string;
	/** URL pública de la página /kenvo/primera-vez. */
	firstRunUrl: string;
	amount: string;
	buyerEmail: string;
	deliveredAt: string;
	orderId?: string | null;
	transactionId?: string | null;
	paymentMethodLabel?: string;
	policyVersion?: string;
}

const ARM_DIRECT_URL =
	"https://github.com/darkjarviselit/kenvo-releases/releases/download/v0.8.0/Kenvo-0.8.0-arm64.dmg";
const INTEL_DIRECT_URL =
	"https://github.com/darkjarviselit/kenvo-releases/releases/download/v0.8.0/Kenvo-0.8.0.dmg";

function esc(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

const FIRST_RUN_STEPS: ReadonlyArray<[string, string]> = [
	[
		"Abre el .dmg y arrastra Kenvo a Aplicaciones",
		"Como cualquier app de Mac.",
	],
	[
		"La primera vez, macOS te avisará",
		"Verás «no se puede abrir porque procede de un desarrollador no identificado». Es normal: Kenvo es de un estudio independiente y no paga la firma de Apple.",
	],
	[
		"Click derecho sobre Kenvo → «Abrir»",
		"Pulsa «Abrir» otra vez en el aviso. Solo hace falta la primera vez.",
	],
];

export function renderKenvoDeliveryEmail(
	content: KenvoDeliveryEmailContent,
): string {
	const {
		customerName,
		productName,
		platformLabel,
		downloadUrl,
		firstRunUrl,
		amount,
		buyerEmail,
		deliveredAt,
		orderId,
		transactionId,
		paymentMethodLabel,
		policyVersion,
	} = content;

	const receiptRow = (label: string, value?: string | null) =>
		value
			? `<p style="margin:4px 0;color:#475569;font-size:13px;"><strong>${esc(label)}:</strong> ${esc(value)}</p>`
			: "";

	const steps = FIRST_RUN_STEPS.map(
		([title, text], i) => `
    <tr>
      <td style="vertical-align:top;padding:6px 12px 6px 0;width:28px;">
        <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:6px;background:#e0f2fe;color:#0891b2;font-weight:bold;font-size:13px;">${i + 1}</span>
      </td>
      <td style="vertical-align:top;padding:6px 0;">
        <p style="margin:0;color:#1e293b;font-weight:600;font-size:14px;">${esc(title)}</p>
        <p style="margin:2px 0 0;color:#64748b;font-size:13px;line-height:1.5;">${esc(text)}</p>
      </td>
    </tr>`,
	).join("");

	return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="text-align:center;margin-bottom:8px;">
      <span style="display:inline-block;font-size:22px;font-weight:800;color:#0891b2;letter-spacing:-0.5px;">iaflashelite</span>
    </div>
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;">
      <span style="display:inline-block;background:#ecfeff;color:#0e7490;border:1px solid #a5f3fc;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Acceso fundador</span>
      <h1 style="margin:18px 0 0;font-size:24px;color:#0f172a;">Tu acceso a Kenvo está listo</h1>
      <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#334155;">Hola <strong>${esc(customerName)}</strong>, gracias por confiar en Kenvo. Tu compra de <strong>${esc(productName)}</strong> está confirmada y lista para descargar.</p>

      <div style="text-align:center;margin:28px 0;">
        <a href="${esc(downloadUrl)}" style="background:#0891b2;color:#ffffff;padding:16px 34px;text-decoration:none;border-radius:10px;font-size:17px;font-weight:bold;display:inline-block;">Descargar Kenvo (${esc(platformLabel)})</a>
        <p style="margin:10px 0 0;font-size:12px;color:#94a3b8;">El enlace es personal y temporal (72 h). Guarda el .dmg en tu equipo.</p>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin:24px 0;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#0f172a;">Cómo abrir Kenvo la primera vez en Mac</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${steps}</table>
        <p style="margin:12px 0 0;font-size:13px;"><a href="${esc(firstRunUrl)}" style="color:#0891b2;font-weight:600;text-decoration:none;">Ver la guía paso a paso →</a></p>
      </div>

      <p style="margin:0 0 18px;font-size:13px;line-height:1.6;color:#64748b;">¿Compraste la versión equivocada? Descarga directa:
        <a href="${ARM_DIRECT_URL}" style="color:#0891b2;">Apple Silicon (M1–M4)</a> ·
        <a href="${INTEL_DIRECT_URL}" style="color:#0891b2;">Intel</a>.
      </p>

      <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:16px;margin:0 0 24px;">
        <p style="margin:0;color:#166534;font-size:13px;line-height:1.6;"><strong>Garantía 14 días:</strong> si Kenvo no es lo que esperabas, te devuelvo el dinero. Solo responde a este email.</p>
      </div>

      <p style="margin:0 0 6px;font-size:13px;color:#334155;">¿Dudas o algo no funciona? <strong>Responde a este email</strong> y te ayudo personalmente.</p>

      <div style="border-top:1px solid #e2e8f0;margin-top:22px;padding-top:16px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Recibo</p>
        ${receiptRow("Producto", productName)}
        ${receiptRow("Importe", `${amount} €`)}
        ${receiptRow("Email", buyerEmail)}
        ${receiptRow("Fecha", deliveredAt)}
        ${receiptRow("Método de pago", paymentMethodLabel)}
        ${receiptRow("Pedido", orderId)}
        ${receiptRow("Transacción", transactionId)}
        ${receiptRow("Política", policyVersion)}
      </div>
    </div>
    <p style="text-align:center;margin:18px 0 0;font-size:11px;color:#94a3b8;">IAFlashElite · Kenvo es un workspace IA privado y local · iaflashelite.com/kenvo</p>
  </div>
</body>
</html>`;
}
