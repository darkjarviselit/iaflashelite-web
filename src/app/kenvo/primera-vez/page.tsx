import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { MacFirstRun } from "@/components/kenvo/mac-first-run";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Cómo abrir Kenvo la primera vez en Mac | Kenvo",
	description:
		"Guía paso a paso para abrir Kenvo la primera vez en Mac. La app es de un estudio independiente (sin firma de Apple): macOS pide una confirmación extra solo la primera vez.",
	robots: { index: true, follow: true },
};

export default function KenvoPrimeraVezPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-onyx text-paper">
				<section className="relative overflow-hidden pt-32 pb-10">
					<div
						className="absolute inset-0 bg-dot-grid opacity-35"
						aria-hidden
					/>
					<div
						className="absolute inset-x-0 top-0 h-[480px] pointer-events-none"
						style={{
							background:
								"radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0) 74%)",
						}}
						aria-hidden
					/>
					<div className="relative mx-auto max-w-3xl px-6 lg:px-8">
						<span className="inline-flex w-fit rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
							Guía de instalación
						</span>
						<h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-paper sm:text-5xl">
							Abrir Kenvo la primera vez en Mac
						</h1>
						<p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
							Kenvo es una app de un estudio independiente, sin la firma de pago
							de Apple. Por eso macOS pide una confirmación extra la primera
							vez. No es un riesgo: el código es auditable y no hay telemetría.
							Sigue estos pasos una sola vez.
						</p>
					</div>
				</section>

				<MacFirstRun />

				<section className="relative border-t border-border-dark bg-onyx py-16">
					<div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
						<p className="text-sm leading-7 text-text-secondary">
							¿Aún no tienes Kenvo? Consíguelo con acceso fundador.
						</p>
						<Button href="/kenvo/comprar" size="lg" variant="gradient">
							Conseguir Kenvo — 150 €
							<ArrowRight className="h-4 w-4" />
						</Button>
						<p className="text-xs text-text-muted">
							¿Dudas o algo no funciona? Responde al email de tu compra y te
							ayudamos.
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
