import {
	ArrowRight,
	Brain,
	CheckCircle2,
	FileText,
	Lock,
	type LucideIcon,
	ScrollText,
	Shield,
	ShieldCheck,
	Sparkles,
	Users,
	X,
} from "lucide-react";
import type { Metadata } from "next";
import { ComparisonTable } from "@/components/kenvo/comparison-table";
import { KenvoFaq } from "@/components/kenvo/faq";
import { MacFirstRun } from "@/components/kenvo/mac-first-run";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Kenvo — Workspace IA privado para profesionales",
	description:
		"Workspace de IA que corre en tu ordenador, sin servidores intermediarios. Multi-agente, memoria persistente y tus datos cifrados en disco. Pago único.",
	openGraph: {
		title: "Kenvo — Workspace IA privado y local",
		description:
			"Tu IA privada y local. Sin servidores intermediarios. Pago único, mejoras de por vida.",
		type: "website",
	},
};

const PROBLEMS = [
	{
		title: "Tus conversaciones en servidores ajenos",
		text: "Cada mensaje que mandas a un chat de IA en su web queda en servidores de empresas de fuera de la UE. Sin control real sobre qué hacen con ellos.",
	},
	{
		title: "RGPD y el AI Act aprietan en 2026",
		text: "La regulación europea exige saber dónde están tus datos. La nube no te lo garantiza con la misma certeza que tu propio ordenador.",
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
		text: "Corre en 127.0.0.1, sin telemetría y con código auditable. Con Ollama en local es modo privacidad total: nada sale de tu equipo.",
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
		text: "Arrastra tus PDFs y el agente los lee y responde. La indexación ocurre en tu ordenador.",
	},
	{
		icon: Lock,
		title: "Tus datos, cifrados en disco",
		text: "Conversaciones, memoria y documentos se cifran en reposo (AES-256). Si te roban el equipo, no leen nada.",
	},
	{
		icon: ScrollText,
		title: "Audit log RGPD-completo",
		text: "Ve qué hizo la IA, cuándo y por qué. Y borra todos tus datos cuando quieras, de verdad.",
	},
];

const STEPS = [
	{
		title: "Descarga e instala",
		text: "Descarga el instalador .dmg y arrastra Kenvo a Aplicaciones. Sin Node.js, sin terminal.",
	},
	{
		title: "Ábrelo y conéctalo",
		text: "Un asistente visual te guía: elige tu motor de IA (Ollama local o tu clave cloud) y verifica la conexión. Dos minutos.",
	},
	{
		title: "Añade tu contexto",
		text: "Arrastra tus documentos desde la app. Kenvo los indexa en local para responder sobre ellos.",
	},
	{
		title: "Empieza a trabajar",
		text: "Elige tu agente y trabaja. Kenvo recuerda y aprende con cada sesión.",
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
	"Quienes quieren una IA que actúe sola sin supervisión",
	"Quienes necesitan IA en todos sus dispositivos a la vez",
	"Quienes prefieren pago mensual a pago único",
] as const;

const NOT_PROMISED = [
	"No gestiona tus impuestos ni emite facturas",
	"No garantiza cumplimiento legal automático",
	"No actúa de forma autónoma sin tu aprobación",
	"No conecta (todavía) con herramientas externas vía MCP — está en el roadmap",
	"No funciona sin internet para el LLM, salvo que uses Ollama en local",
	"No sustituye el criterio profesional del usuario",
] as const;

const INCLUDED = [
	"Workspace IA privado y local (Mac · Windows pronto)",
	"Multi-agente: asistente, analista, redactor",
	"Memoria semántica persistente local",
	"RAG sobre tus documentos sin subir nada",
	"Tus datos cifrados en disco (AES-256)",
	"Audit log RGPD y borrado total de datos",
	"Onboarding visual sin terminal",
	"Pago único — tuyo para siempre",
	"Mejoras de por vida incluidas",
	"Canal directo con el fundador",
	"14 días de garantía de devolución",
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
									No es un chatbot. No es SaaS. Es un workspace de IA que corre
									en tu ordenador, sin servidores intermediarios.
								</p>
								<p className="max-w-2xl text-sm leading-7 text-text-secondary">
									Kenvo no almacena tus datos en ningún servidor. Con Ollama
									(recomendado) nada sale de tu ordenador. Con un proveedor
									cloud, sale lo mismo que cuando usas su web oficial — ni más,
									ni menos.
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
								IA seria, sin servidores intermediarios.
							</h2>
							<ul className="mt-6 flex flex-col gap-3">
								{[
									"Corre en tu Mac (Windows pronto)",
									"Con Ollama, nada sale de tu equipo",
									"Tus datos cifrados en disco",
									"Pago único, mejoras de por vida",
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
							<div className="mt-6 flex items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center text-xs text-text-muted">
								▸ Vídeo demo en camino
							</div>
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
								La IA que usas hoy envía tus datos fuera de la UE.
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
								Todo lo que necesitas para trabajar con IA, sin servidores
								intermediarios.
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

				{/* ─── IA gratis vs Kenvo ───────────────────────────── */}
				<ComparisonTable />

				{/* ─── Cómo funciona ────────────────────────────────── */}
				<section id="como-funciona" className="bg-white py-24 text-gray-900">
					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
								Cómo funciona
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								En marcha en menos de 5 minutos.
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

				{/* ─── Primer arranque en Mac ───────────────────────── */}
				<MacFirstRun />

				{/* ─── Para quién es ────────────────────────────────── */}
				<section className="bg-white py-24 text-gray-900">
					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
								Para quién es
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								Para profesionales con datos que proteger.
							</h2>
						</div>

						<div className="mt-10 grid gap-6 lg:grid-cols-2">
							<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
								<h3 className="text-lg font-semibold tracking-tight">
									Encaja contigo si eres…
								</h3>
								<ul className="mt-5 flex flex-col gap-3">
									{FOR_YES.map((item) => (
										<li
											key={item}
											className="flex items-start gap-3 text-sm leading-6 text-gray-600"
										>
											<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
								<h3 className="text-lg font-semibold tracking-tight">
									No es para ti si…
								</h3>
								<ul className="mt-5 flex flex-col gap-3">
									{FOR_NO.map((item) => (
										<li
											key={item}
											className="flex items-start gap-3 text-sm leading-6 text-gray-600"
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
				<section className="relative border-y border-border-dark bg-onyx py-24">
					<div
						className="absolute inset-0 bg-dot-grid opacity-25"
						aria-hidden
					/>
					<div className="relative mx-auto max-w-3xl px-6 lg:px-8">
						<div className="max-w-2xl">
							<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
								Sin humo
							</span>
							<h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
								Lo que Kenvo NO hace.
							</h2>
						</div>
						<ul className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
							{NOT_PROMISED.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
								>
									<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* ─── FAQ ──────────────────────────────────────────── */}
				<KenvoFaq />

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
							Garantía 14 días
						</span>
						<h2 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl">
							Pruébalo sin riesgo.
						</h2>
						<p className="max-w-xl text-base leading-7 text-text-secondary">
							Te devuelvo el dinero en 14 días si Kenvo no es lo que esperabas.
							Sin preguntas y sin letra pequeña. El riesgo es mío, no tuyo.
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
									Pago único · Descarga inmediata tras el pago · 14 días de
									garantía
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
