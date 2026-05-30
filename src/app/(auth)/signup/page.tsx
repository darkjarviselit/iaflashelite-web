"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { AuthShell } from "../auth-shell";

export default function SignupPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const value = email.trim();
		if (!/.+@.+\..+/.test(value)) {
			setStatus("error");
			setError("Escribe un email válido.");
			return;
		}
		setStatus("loading");
		setError("");
		const { error: sendError } = await authClient.signIn.magicLink({
			email: value,
			callbackURL: "/dashboard",
		});
		if (sendError) {
			setStatus("error");
			setError(
				"No pudimos enviar el enlace. Inténtalo de nuevo en un momento.",
			);
			return;
		}
		router.push(`/verify?email=${encodeURIComponent(value)}`);
	}

	return (
		<AuthShell
			title="Crea tu cuenta en Kenvo Cloud"
			subtitle="Tu workspace IA en la nube. Sin contraseñas: te enviamos un enlace mágico para entrar."
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<label className="flex flex-col gap-2 text-sm">
					<span className="text-text-secondary">Tu email</span>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="tu@empresa.com"
						autoComplete="email"
						className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-paper outline-none transition focus:border-flash"
					/>
				</label>
				{status === "error" && (
					<p className="text-sm text-amber-400" role="alert">
						{error}
					</p>
				)}
				<Button
					type="submit"
					variant="gradient"
					size="lg"
					className="w-full justify-center"
					disabled={status === "loading"}
				>
					{status === "loading" ? "Enviando enlace…" : "Crear cuenta"}
					{status !== "loading" && <ArrowRight className="h-4 w-4" />}
				</Button>
			</form>
			<p className="mt-6 text-center text-sm text-text-secondary">
				¿Ya tienes cuenta?{" "}
				<Link href="/login" className="text-flash hover:underline">
					Entrar
				</Link>
			</p>
		</AuthShell>
	);
}
