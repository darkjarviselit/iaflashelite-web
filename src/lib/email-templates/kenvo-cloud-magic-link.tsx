// Plantilla del email de acceso (magic link) de Kenvo Cloud.
// El repo NO usa React Email (no hay @react-email instalado): se construye HTML
// inline, igual que el resto de emails del proyecto (ver src/lib/email.ts).
// Sin dependencias nuevas. `url` lo genera Better Auth (no es input de usuario).

export function getMagicLinkEmail({ url }: { url: string }): {
	subject: string;
	html: string;
} {
	const subject = "Tu acceso a Kenvo Cloud";
	const html = `<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${subject}</title>
	</head>
	<body style="margin:0;padding:0;background-color:#0a0a0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e8e8ea;">
		<div style="max-width:520px;margin:0 auto;padding:40px 24px;">
			<div style="background:linear-gradient(135deg,rgba(0,229,255,0.16) 0%,rgba(0,229,255,0) 70%);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px 32px;">
				<p style="margin:0 0 20px;font-size:18px;font-weight:800;letter-spacing:-0.02em;color:#00e5ff;">Kenvo Cloud</p>
				<span style="display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#00e5ff;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);border-radius:999px;padding:4px 12px;">Acceso fundador</span>
				<h1 style="margin:24px 0 12px;font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">Entra en tu workspace</h1>
				<p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#a9a9b2;">Haz clic en el botón para entrar en Kenvo Cloud. Este enlace es de un solo uso y caduca pronto; ábrelo en este dispositivo.</p>
				<a href="${url}" style="display:inline-block;background:#00e5ff;color:#0a0a0b;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:12px;">Entrar en Kenvo Cloud →</a>
				<p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#7a7a82;">Si el botón no funciona, copia y pega esta dirección en tu navegador:</p>
				<p style="margin:8px 0 0;font-size:12px;line-height:1.5;word-break:break-all;color:#00e5ff;">${url}</p>
			</div>
			<p style="margin:24px 0 0;text-align:center;font-size:12px;color:#5a5a62;">Si no has solicitado este acceso, puedes ignorar este email.</p>
			<p style="margin:8px 0 0;text-align:center;font-size:12px;color:#5a5a62;">IAFlashElite · Kenvo Cloud</p>
		</div>
	</body>
</html>`;
	return { subject, html };
}
