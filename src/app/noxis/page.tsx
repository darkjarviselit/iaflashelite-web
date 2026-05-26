import {
	ArrowRight,
	Layers,
	type LucideIcon,
	MessageCircle,
	Monitor,
	MousePointerClick,
	ShieldCheck,
	X,
} from "lucide-react";
import type { Metadata } from "next";
import { LogoFull } from "@/components/brand/logo-full";
import { EmailInterestForm } from "@/components/email-interest-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Noxis · Super-agente local-first para empresarios | IAFlashElite",
	description:
		"App de escritorio que conoce tu negocio entero. Vive en tu ordenador. Tus datos no salen de aquí. Lista de espera abierta.",
	openGraph: {
		title: "Noxis · Super-agente local-first para empresarios",
		description:
			"App de escritorio que conoce tu negocio entero. Vive en tu ordenador. Tus datos no salen de aquí. Lista de espera abierta.",
		type: "website",
	},
};

const VALUE_POINTS: ReadonlyArray<{ icon: LucideIcon; text: string }> = [
	{
		icon: ShieldCheck,
		text: "Local-first absoluto. Cero servidor. Tus datos viven en tu ordenador. Ni Anthropic, ni Google, ni nosotros los vemos.",
	},
	{
		icon: Monitor,
		text: "App nativa de escritorio para Mac y Windows. Pago único, sin suscripción obligatoria.",
	},
	{
		icon: Layers,
		text: "Plataforma de capas. Empieza por la seguridad de tu web. Crece a integraciones, marketing y análisis estratégico cuando quieras.",
	},
	{
		icon: MessageCircle,
		text: "Le hablas en lenguaje normal. Sin jerga técnica. Sin formularios complicados.",
	},
	{
		icon: MousePointerClick,
		text: "Tú decides qué ejecuta. Confirmación humana en cada acción importante.",
	},
];

const NOT_IS = [
	"No es un SaaS en la nube. No requiere conexión permanente.",
	"No vende tus datos. No los puede vender. No salen de tu ordenador.",
	"No actúa por su cuenta en cosas importantes. Tú apruebas siempre.",
] as const;

export default function NoxisPage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-onyx text-paper">
			<div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
			<div
				className="absolute inset-x-0 top-0 h-[680px] pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0) 72%)",
				}}
				aria-hidden
			/>

			<div className="relative mx-auto flex w-full max-w-[1100px] flex-col px-6 lg:px-8">
				{/* ─── Top bar ─────────────────────────────────────── */}
				<div className="flex items-center justify-between py-8">
					<LogoFull href="/" size="md" />
					<a
						href="mailto:iaflashelite@gmail.com"
						className="hidden text-sm font-medium text-text-secondary transition-colors hover:text-flash sm:inline-flex"
					>
						iaflashelite@gmail.com
					</a>
				</div>

				{/* ─── 1 · Hero ────────────────────────────────────── */}
				<section className="flex flex-col items-center gap-7 py-20 text-center lg:py-28">
					<span className="inline-flex w-fit items-center rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
						Producto de IAFlashElite · Próximo lanzamiento
					</span>
					<h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-paper sm:text-5xl lg:text-6xl">
						Tu super-agente de empresa.{" "}
						<span className="text-flash">Vive en tu ordenador.</span>
					</h1>
					<p className="max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
						Conoce tu web, tus correos, tu calendario y tus clientes. Te ayuda a
						decidir y a ejecutar. Tus datos no salen de tu equipo. Nadie más los
						ve.
					</p>
					<Button href="#waitlist" size="lg" variant="gradient">
						Apúntate a la lista de espera
						<ArrowRight className="h-4 w-4" />
					</Button>
				</section>

				{/* ─── 2 · Valor ───────────────────────────────────── */}
				<section className="py-14">
					<ul className="mx-auto flex max-w-3xl flex-col gap-4">
						{VALUE_POINTS.map(({ icon: Icon, text }) => (
							<li
								key={text}
								className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
							>
								<span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-flash/20 bg-flash/10 text-flash">
									<Icon className="h-5 w-5" />
								</span>
								<p className="text-base leading-7 text-text-secondary">
									{text}
								</p>
							</li>
						))}
					</ul>
				</section>

				{/* ─── 3 · Lo que NO es ────────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:p-10">
						<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
							Sin humo
						</span>
						<h2 className="mt-3 text-2xl font-bold tracking-tight text-paper sm:text-3xl">
							Lo que Noxis NO es.
						</h2>
						<ul className="mt-6 flex flex-col gap-3">
							{NOT_IS.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-base leading-7 text-text-secondary"
								>
									<X className="mt-1 h-4 w-4 shrink-0 text-text-muted" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* ─── 4 · Demo placeholder ────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
						<p className="text-base font-medium text-paper">
							Vídeo demo en preparación.
						</p>
						<p className="text-sm leading-6 text-text-secondary">
							Apúntate y te avisamos cuando esté listo.
						</p>
					</div>
				</section>

				{/* ─── 5 · Waitlist ────────────────────────────────── */}
				<section id="waitlist" className="scroll-mt-24 py-16">
					<div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
						<h2 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl">
							Apúntate a la lista de espera.
						</h2>
						<p className="text-base leading-7 text-text-secondary">
							Te avisamos cuando esté listo. Sin spam. Sin presión.
						</p>
					</div>
					<div className="mt-8 flex flex-col items-center gap-4">
						<EmailInterestForm
							topic="noxis"
							headline="Apúntate a la lista de espera"
							subtext="Te escribimos solo cuando Noxis esté listo para usarse."
							submitLabel="Avisarme del lanzamiento"
							successMessage="Anotado. Te avisaremos cuando Noxis esté listo."
						/>
						<p className="mx-auto max-w-md text-center text-xs leading-6 text-text-muted">
							Solo te escribiremos para anunciar el lanzamiento y novedades
							importantes. Nada más.
						</p>
					</div>
				</section>

				{/* ─── 6 · Quién hay detrás ────────────────────────── */}
				<footer className="mt-10 flex flex-col items-center gap-2 border-t border-border-dark py-12 text-center">
					<p className="text-sm leading-7 text-text-secondary">
						Producto de IAFlashElite. Diseñado para empresarios PYME que quieren
						control real de su negocio.
					</p>
					<a
						href="/sobre"
						className="text-sm font-medium text-text-muted underline decoration-text-muted/40 underline-offset-4 transition-colors hover:text-flash"
					>
						Sobre IAFlashElite
					</a>
				</footer>
			</div>
		</main>
	);
}
