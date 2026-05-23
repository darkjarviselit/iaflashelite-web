"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

interface EmailInterestFormProps {
	topic: "casos" | "academia";
	headline: string;
	subtext?: string;
	submitLabel?: string;
	successMessage?: string;
}

export function EmailInterestForm({
	topic,
	headline,
	subtext,
	submitLabel = "Apuntarme",
	successMessage = "Anotado. Te avisaremos por email.",
}: EmailInterestFormProps) {
	const [email, setEmail] = useState("");
	const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
	const [website, setWebsite] = useState("");
	const [sending, setSending] = useState(false);
	const [done, setDone] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (!email.trim()) {
			setError("missing_email");
			return;
		}
		if (!acceptedPrivacy) {
			setError("privacy_not_accepted");
			return;
		}

		setSending(true);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "—",
					email,
					message: `interés:${topic}`,
					service: topic,
					acceptedPrivacy,
					website,
				}),
			});
			const data = (await res.json()) as { ok: boolean; error?: string };
			if (!res.ok || !data.ok) {
				setError(data.error ?? "send_failed");
			} else {
				setDone(true);
			}
		} catch {
			setError("network_error");
		} finally {
			setSending(false);
		}
	}

	if (done) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="w-full max-w-md mx-auto p-8 rounded-3xl border border-emerald-200 bg-white shadow-sm flex flex-col items-center text-center gap-4"
			>
				<span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
					<CheckCircle2 size={26} />
				</span>
				<h3 className="text-xl font-semibold text-gray-900 tracking-tight">
					Anotado.
				</h3>
				<p className="text-gray-700 leading-relaxed">{successMessage}</p>
			</motion.div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-md mx-auto p-8 rounded-3xl border border-gray-200 bg-white shadow-sm flex flex-col gap-5 text-left"
		>
			<header className="flex flex-col gap-2">
				<span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
					Aviso por email
				</span>
				<h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
					{headline}
				</h3>
				{subtext && (
					<p className="text-sm text-gray-600 leading-relaxed">{subtext}</p>
				)}
			</header>

			<label className="flex flex-col gap-2">
				<span className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
					Email *
				</span>
				<input
					type="email"
					required
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="tu@email.com"
					className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
				/>
			</label>

			<input
				type="text"
				name="website"
				tabIndex={-1}
				autoComplete="off"
				value={website}
				onChange={(e) => setWebsite(e.target.value)}
				aria-hidden="true"
				style={{
					position: "absolute",
					left: "-10000px",
					width: "1px",
					height: "1px",
					opacity: 0,
				}}
			/>

			<div className="flex items-start gap-3">
				<input
					type="checkbox"
					id={`eif-privacy-${topic}`}
					checked={acceptedPrivacy}
					onChange={(e) => setAcceptedPrivacy(e.target.checked)}
					required
					className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
				/>
				<label
					htmlFor={`eif-privacy-${topic}`}
					className="text-sm text-gray-700 leading-relaxed"
				>
					Acepto la{" "}
					<a
						href="/legal/privacidad"
						target="_blank"
						rel="noopener noreferrer"
						className="text-cyan-600 underline hover:no-underline"
					>
						política de privacidad
					</a>
					.
				</label>
			</div>

			{error && <p className="text-sm text-red-600">⚠ {error}</p>}

			<Button
				size="lg"
				type="submit"
				variant="gradient"
				disabled={sending || !acceptedPrivacy}
			>
				{sending ? "Enviando…" : submitLabel}
			</Button>
		</form>
	);
}
