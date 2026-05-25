import {
	ArrowRight,
	Brain,
	CheckCircle2,
	FileText,
	type LucideIcon,
	Plug,
	ScrollText,
	Shield,
	ShieldCheck,
	Sparkles,
	Users,
	X,
} from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Kenvo — Workspace IA privado para profesionales",
	description:
		"Tu asistente IA que corre en tu ordenador. Sin nube, sin suscripción. Tus datos, solo tuyos. Pago único.",
	openGraph: {
		title: "Kenvo — Workspace IA privado",
		description:
			"Workspace completo de IA que corre en tu ordenador. Sin datos en la nube.",
		type: "website",
	},
};

const PROBLEMS = [
	{
		title: "Tus conversaciones en servidores ajenos",
		text: "Cada mensaje que mandas a ChatGPT o Claude web queda en servidores de empresas americanas. Sin control real sobre qué hacen con ellos.",
	},
	{
		title: "RGPD y el AI Act aprietan en 2026",
		text: "La regulación europea exige saber dónde están tus datos. La nube no te lo puede garantizar con la misma certeza que tu propio ordenador.",
	},
	{
		title: "El contexto que pierdes cada sesión",
		text: "Los asistentes de nube no recuerdan nada entre sesiones. Empiezan de cero cada vez. Tu contexto de trabajo se pierde.",
	},
] as const;

const FEATURES: ReadonlyArray<{
	icon: LucideIcon;
	title: string;
	text: string;
}> = [
	{
		icon: Shield,
		title: "Privado por arquitectura",
		text: "Corre en 127.0.0.1. Cero telemetría. Código auditable. RGPD por diseño.",
	},
	{
		icon: Brain,
		title: "Memoria que aprende de ti",
		text: "Recuerda tus proyectos, decisiones y estilo. No empieza de cero en cada conversación.",
	},
	{
		icon: Users,
		title: "Tres agentes especializados",
		text: "Asistente para el día a día, analista para documentos, redactor para comunicaciones.",
	},
	{
		icon: FileText,
		title: "RAG sobre tus documentos",
		text: "Sube PDFs y el agente los lee y responde. Sin subir nada a ningún servidor.",
	},
	{
		icon: Plug,
		title: "Conecta tus herramientas",
		text: "MCP integrado: GitHub, Notion, Drive, Slack. Sin intermediarios.",
	},
	{
		icon: ScrollText,
		title: "Audit log RGPD-completo",
		text: "Ve exactamente qué hizo la IA, cuándo y por qué. Sin secretos.",
	},
];

const STEPS = [
	{
		title: "Descarga e instala",
		text: "Un comando en terminal o instalador .dmg/.exe. Node.js es el único requisito.",
	},
	{
		title: "Configura tu workspace",
		text: "kenvo setup te guía por terminal. Nombre, tipo de workspace, API key de tu proveedor IA favorito.",
	},
	{
		title: "Añade tu contexto",
		text: "Pon tus documentos en ~/.kenvo/documents/ y tus notas en ~/.kenvo/knowledge/. El agente los indexa automáticamente.",
	},
	{
		title: "Empieza a trabajar",
		text: "Abre Kenvo, elige tu agente y empieza. La IA recuerda y aprende con cada sesión.",
	},
] as const;

const FOR_YES = [
	"Consultores con información confidencial de clientes",
	"Despachos profesionales (legal, financiero, técnico)",
	"Fundadores de startups con IP que proteger",
	"Freelancers que trabajan con datos sensibles",
	"Equipos pequeños que necesitan IA sin riesgo",
] as const;

const FOR_NO = [
	"Quienes buscan un chatbot genérico de nube",
	"Quienes no quieren configurar nada técnico",
	"Quienes necesitan IA en todos sus dispositivos a la vez",
	"Quienes prefieren pago mensual a pago único",
] as const;

const NOT_PROMISED = [
	"No gestiona tus impuestos ni emite facturas",
	"No garantiza cumplimiento legal automático",
	"No actúa de forma autónoma sin tu aprobación",
	"No funciona sin conexión a internet para el LLM (a menos que uses Ollama local)",
	"No sustituye el criterio profesional del usuario",
] as const;

const INCLUDED = [
	"Workspace IA privado y local (Mac + Windows)",
	"Multi-agente: asistente, analista, redactor",
	"Memoria semántica persistente local",
	"RAG sobre tus documentos sin subir nada",
	"MCP: conecta tus herramientas existentes",
	"Audit log RGPD-completo",
	"Pago único — tuyo para siempre",
	"Acceso prioritario a la beta privada",
	"Canal directo con el fundador",
	"Precio bloqueado para los fundadores",
] as const;

export default function KenvoPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-onyx text-paper">
				{/* ─── Hero ─────────────────────────────────────────── */}
				<section className="relative overflow-hidden pt-32 pb-20">
					<div
						className="absolute inset-0 bg-dot-grid opacity-35"
						aria-hidden
					/>
					<div
						className="absolute inset-x-0 top-0 h-[620px] pointer-events-none"
						style={{
							background:
								"radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0) 74%)",
						}}
						aria-hidden
					/>

					<div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.02fr_0.78fr] lg:items-center lg:px-8">
						<div className="flex max-w-3xl flex-col gap-7">
							<span className="inline-flex w-fit rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Acceso fundador · Precio de lanzamiento
							</span>
							<div className="flex flex-col gap-5">
								<h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
									Tu workspace IA
									<br />
									privado y local
								</h1>
								<p className="max-w-2xl text-xl font-semibold leading-8 text-paper sm:text-2xl">
									No es un chatbot. No es SaaS. Es un workspace completo que
									corre en tu ordenador. Tus datos no salen de tu máquina.
									Nunca.
								</p>
							</div>

							<div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
								<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
									Precio fundador
								</p>
								<div className="mt-3 flex flex-wrap items-end gap-3">
									<span className="text-5xl font-bold leading-none text-flash">
										150 €
									</span>
									<span className="pb-1 text-lg text-text-muted line-through">
										290 €
									</span>
									<span className="pb-1 text-sm text-text-secondary">
										Pago único
									</span>
								</div>
								<p className="mt-3 text-sm leading-6 text-text-secondary">
									Precio de lanzamiento. Sube cuando cerremos el acceso
									fundador.
								</p>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row">
								<Button
									href="/kenvo/comprar"
									size="lg"
									variant="gradient"
									className="w-full whitespace-nowrap sm:w-auto"
								>
									Entrar como fundador — 150 €
									<ArrowRight className="h-4 w-4" />
								</Button>
								<Button
									href="#como-funciona"
									size="lg"
									variant="secondary"
									className="w-full sm:w-auto"
								>
									Ver cómo funciona
								</Button>
							</div>
						</div>

						<aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur">
							<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Lo esencial
							</p>
							<h2 className="mt-4 text-2xl font-bold tracking-tight text-paper">
								IA seria sin entregar tus datos a nadie.
							</h2>
							<ul className="mt-6 flex flex-col gap-3">
								{[
									"Corre en tu Mac o Windows",
									"Tus datos nunca salen de tu ordenador",
									"Pago único, tuyo para siempre",
									"Precio bloqueado para los fundadores",
								].map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
									>
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</aside>
					</div>
				</section>

				{/* ─── El problema ──────────────────────────────────── */}
				<section className="bg-white py-24 text-gray-900">
					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
								El problema
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								La IA que usas hoy envía tus datos a servidores de EEUU.
							</h2>
							<p className="mt-4 text-sm leading-7 text-gray-600">
								Para un profesional europeo con datos sensibles, eso es un
								riesgo real.
							</p>
						</div>

						<div className="mt-10 grid gap-5 md:grid-cols-3">
							{PROBLEMS.map((item) => (
								<article
									key={item.title}
									className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
								>
									<h3 className="text-lg font-semibold tracking-tight">
										{item.title}
									</h3>
									<p className="mt-3 text-sm leading-6 text-gray-600">
										{item.text}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* ─── Qué hace Kenvo ───────────────────────────────── */}
				<section className="relative border-y border-border-dark bg-onyx py-24">
					<div
						className="absolute inset-0 bg-dot-grid opacity-25"
						aria-hidden
					/>
					<div className="relative mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Qué hace Kenvo
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
								Un workspace completo en tu ordenador.
							</h2>
							<p className="mt-4 text-sm leading-7 text-text-secondary">
								Todo lo que necesitas para trabajar con IA, sin enviar nada a
								internet.
							</p>
						</div>

						<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
							{FEATURES.map((feature) => {
								const Icon = feature.icon;
								return (
									<article
										key={feature.title}
										className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
									>
										<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-flash/20 bg-flash/10 text-flash">
											<Icon className="h-5 w-5" />
										</span>
										<h3 className="mt-5 text-lg font-semibold tracking-tight text-paper">
											{feature.title}
										</h3>
										<p className="mt-2 text-sm leading-6 text-text-secondary">
											{feature.text}
										</p>
									</article>
								);
							})}
						</div>
					</div>
				</section>

				{/* ─── Cómo funciona ────────────────────────────────── */}
				<section id="como-funciona" className="bg-white py-24 text-gray-900">
					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
								Cómo funciona
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								En marcha en menos de 10 minutos.
							</h2>
						</div>

						<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
							{STEPS.map((step, index) => (
								<article
									key={step.title}
									className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
								>
									<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-sm font-bold text-cyan-700">
										{index + 1}
									</span>
									<h3 className="mt-5 text-base font-semibold tracking-tight">
										{step.title}
									</h3>
									<p className="mt-2 text-sm leading-6 text-gray-600">
										{step.text}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* ─── Para quién es ────────────────────────────────── */}
				<section className="relative border-y border-border-dark bg-onyx py-24">
					<div
						className="absolute inset-0 bg-dot-grid opacity-25"
						aria-hidden
					/>
					<div className="relative mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Para quién es
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
								Para profesionales con datos que proteger.
							</h2>
						</div>

						<div className="mt-10 grid gap-6 lg:grid-cols-2">
							<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
								<h3 className="text-lg font-semibold tracking-tight text-paper">
									Encaja contigo si eres…
								</h3>
								<ul className="mt-5 flex flex-col gap-3">
									{FOR_YES.map((item) => (
										<li
											key={item}
											className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
										>
											<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
								<h3 className="text-lg font-semibold tracking-tight text-paper">
									No es para ti si…
								</h3>
								<ul className="mt-5 flex flex-col gap-3">
									{FOR_NO.map((item) => (
										<li
											key={item}
											className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
										>
											<X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* ─── Qué NO promete ───────────────────────────────── */}
				<section className="bg-white py-24 text-gray-900">
					<div className="mx-auto max-w-3xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
								Sin humo
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								Lo que Kenvo NO hace.
							</h2>
						</div>
						<ul className="mt-8 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gray-50 p-8">
							{NOT_PROMISED.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-sm leading-6 text-gray-700"
								>
									<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* ─── Garantía ─────────────────────────────────────── */}
				<section className="relative border-t border-border-dark bg-onyx py-24">
					<div
						className="absolute inset-0 bg-dot-grid opacity-25"
						aria-hidden
					/>
					<div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
						<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
							<Shield className="h-5 w-5" />
						</span>
						<span className="inline-flex w-fit rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
							Garantía 4 meses
						</span>
						<h2 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl">
							Garantía de entrega.
						</h2>
						<p className="max-w-xl text-base leading-7 text-text-secondary">
							Si no entrego la versión completa de Kenvo en los próximos 4
							meses, te devuelvo el dinero completo sin preguntas. El riesgo es
							mío, no tuyo.
						</p>
					</div>
				</section>

				{/* ─── Precio y CTA final ───────────────────────────── */}
				<section className="relative overflow-hidden border-t border-border-dark bg-onyx py-24">
					<div
						className="absolute inset-x-0 bottom-0 h-[520px] pointer-events-none"
						style={{
							background:
								"radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0) 72%)",
						}}
						aria-hidden
					/>
					<div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
						<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
							<Sparkles className="h-5 w-5" />
						</span>
						<h2 className="text-3xl font-bold tracking-tight text-paper sm:text-5xl">
							Entra como fundador.
						</h2>

						<div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 text-left shadow-2xl shadow-black/25 backdrop-blur">
							<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Acceso fundador
							</p>
							<div className="mt-3 flex flex-wrap items-end gap-3">
								<span className="text-5xl font-bold leading-none text-flash">
									150 €
								</span>
								<span className="pb-1 text-lg text-text-muted line-through">
									290 €
								</span>
							</div>
							<p className="mt-2 text-sm text-text-secondary">
								Precio de lanzamiento. Sube cuando cerremos el acceso fundador.
							</p>

							<ul className="mt-6 grid gap-3 sm:grid-cols-2">
								{INCLUDED.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
									>
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
										<span>{item}</span>
									</li>
								))}
							</ul>

							<div className="mt-8 flex flex-col items-stretch gap-3">
								<Button
									href="/kenvo/comprar"
									size="lg"
									variant="gradient"
									className="w-full whitespace-nowrap"
								>
									Entrar como fundador — 150 €
									<ArrowRight className="h-4 w-4" />
								</Button>
								<p className="text-center text-xs leading-6 text-text-muted">
									Pago único · Reservas tu plaza y te envío el enlace de pago y
									los siguientes pasos · Garantía 4 meses
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
