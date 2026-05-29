import { Check, Download, MousePointerClick } from "lucide-react";

const STEPS: ReadonlyArray<{ title: string; text: string }> = [
	{
		title: "Abre el .dmg y arrastra Kenvo a Aplicaciones",
		text: "Como cualquier app de Mac. Tardas diez segundos.",
	},
	{
		title: "La primera vez, macOS te avisará",
		text: "Verás «no se puede abrir porque procede de un desarrollador no identificado». Es totalmente normal en apps de estudios independientes: Kenvo no paga la firma de Apple, y ese ahorro va a tu precio.",
	},
	{
		title: "Click derecho sobre Kenvo → «Abrir»",
		text: "En el aviso que aparece, pulsa «Abrir» otra vez. Solo hace falta la primera vez; después se abre con doble clic normal.",
	},
];

export function MacFirstRun() {
	return (
		<section className="relative border-y border-border-dark bg-onyx py-24">
			<div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
			<div className="relative mx-auto max-w-4xl px-6 lg:px-8">
				<div className="max-w-2xl">
					<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
						Primer arranque en Mac
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
						Cómo abrir Kenvo la primera vez.
					</h2>
					<p className="mt-4 text-sm leading-7 text-text-secondary">
						Kenvo es una app de un estudio independiente, sin firma de Apple.
						Por eso macOS pide una confirmación extra la primera vez. No es un
						riesgo: el código es auditable y no hay telemetría.
					</p>
				</div>

				<ol className="mt-10 flex flex-col gap-4">
					{STEPS.map((step, index) => (
						<li
							key={step.title}
							className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
						>
							<span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-flash/20 bg-flash/10 text-sm font-bold text-flash">
								{index + 1}
							</span>
							<div>
								<h3 className="text-base font-semibold tracking-tight text-paper">
									{step.title}
								</h3>
								<p className="mt-1 text-sm leading-6 text-text-secondary">
									{step.text}
								</p>
							</div>
						</li>
					))}
				</ol>

				<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-flash/15 bg-flash/[0.06] px-5 py-4 text-sm text-text-secondary">
					<span className="inline-flex items-center gap-2 font-medium text-paper">
						<Download className="h-4 w-4 text-flash" /> Descarga
					</span>
					<span className="inline-flex items-center gap-2 font-medium text-paper">
						<MousePointerClick className="h-4 w-4 text-flash" /> Click derecho ·
						Abrir
					</span>
					<span className="inline-flex items-center gap-2 font-medium text-paper">
						<Check className="h-4 w-4 text-flash" /> Listo, solo la primera vez
					</span>
				</div>
			</div>
		</section>
	);
}
