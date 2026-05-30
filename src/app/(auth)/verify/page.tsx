"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { AuthShell } from "../auth-shell";

export default function VerifyPage() {
	const [email, setEmail] = useState("");
	const [resend, setResend] = useState<"idle" | "loading" | "done" | "error">(
		"idle",
	);

	// Se lee el email del query en cliente (window.location) para evitar el
	// requisito de Suspense de useSearchParams en Next 16.
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setEmail(params.get("email") ?? "");
	}, []);

	async function handleResend() {
		if (!email) return;
		setResend("loading");
		const { error } = await authClient.signIn.magicLink({
			email,
			callbackURL: "/dashboard",
		});
		setResend(error ? "error" : "done");
	}

	return (
		<AuthShell
			title="Revisa tu email"
			subtitle="Te hemos enviado un enlace mágico para entrar. Ábrelo en este dispositivo."
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
					<MailCheck className="h-6 w-6" />
				</span>
				{email ? (
					<p className="text-sm leading-6 text-text-secondary">
						Enviado a <span className="font-medium text-paper">{email}</span>.
						El enlace caduca pronto; si no lo ves, revisa la carpeta de spam.
					</p>
				) : (
					<p className="text-sm leading-6 text-text-secondary">
						Abre el enlace que te hemos enviado para entrar. Revisa también el
						spam.
					</p>
				)}
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={handleResend}
					disabled={!email || resend === "loading"}
				>
					{resend === "loading" ? "Reenviando…" : "Reenviar enlace"}
				</Button>
				{resend === "done" && (
					<p className="text-sm text-flash" role="status">
						Enlace reenviado. Revisa tu email.
					</p>
				)}
				{resend === "error" && (
					<p className="text-sm text-amber-400" role="alert">
						No pudimos reenviar el enlace. Inténtalo en un momento.
					</p>
				)}
				<Link href="/login" className="text-sm text-flash hover:underline">
					Volver a entrar
				</Link>
			</div>
		</AuthShell>
	);
}
