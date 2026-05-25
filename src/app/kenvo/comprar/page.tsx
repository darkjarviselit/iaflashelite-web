import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PlatformCheckout } from "./platform-checkout";

export const metadata: Metadata = {
	title: "Comprar Kenvo — Elige tu plataforma | IAFlashElite",
	description:
		"Elige tu plataforma (Mac Apple Silicon o Mac Intel), paga 150 € por PayPal y descarga Kenvo al instante con su manual de instalación.",
	robots: {
		index: false,
		follow: true,
	},
};

export default function ComprarKenvoPage() {
	return (
		<>
			<Header />
			<main className="relative min-h-screen overflow-hidden bg-onyx text-paper pt-32 pb-24">
				<div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
				<div
					className="absolute inset-x-0 top-0 h-[620px] pointer-events-none"
					style={{
						background:
							"radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0) 72%)",
					}}
					aria-hidden
				/>

				<section className="relative mx-auto flex max-w-3xl flex-col gap-10 px-6 lg:px-8">
					<div className="flex flex-col gap-4">
						<span className="inline-flex w-fit rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
							Kenvo · Acceso Fundador · 150 €
						</span>
						<h1 className="text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl">
							Elige tu plataforma
						</h1>
						<p className="max-w-xl text-lg leading-8 text-text-secondary">
							Selecciona tu sistema, paga 150 € de forma segura con PayPal o
							tarjeta y descarga Kenvo al instante con su manual de instalación.
						</p>
						<p className="flex items-start gap-2 text-xs leading-6 text-text-muted">
							<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
							<span>
								Pago único, sin suscripción. Garantía de calidad 14 días sobre
								la entrega y el funcionamiento del instalador.
							</span>
						</p>
					</div>

					<PlatformCheckout />
				</section>
			</main>
			<Footer />
		</>
	);
}
