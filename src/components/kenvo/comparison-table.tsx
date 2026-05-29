import { Check, Minus, X } from "lucide-react";

type Cell = boolean | string;

const ROWS: ReadonlyArray<{ label: string; free: Cell; kenvo: Cell }> = [
	{ label: "Chat con IA en tu ordenador", free: true, kenvo: true },
	{
		label: "Multi-agente: asistente, analista, redactor",
		free: false,
		kenvo: true,
	},
	{
		label: "Responde sobre tus propios documentos (RAG)",
		free: "A veces",
		kenvo: true,
	},
	{ label: "Memoria que persiste entre sesiones", free: false, kenvo: true },
	{ label: "Cifrado de tus datos en disco", free: false, kenvo: true },
	{ label: "Registro de actividad (audit log) RGPD", free: false, kenvo: true },
	{ label: "Soporte humano directo", free: false, kenvo: true },
	{ label: "Mejoras de por vida incluidas", free: false, kenvo: true },
	{
		label: "Sin terminal: instalas y usas",
		free: "Requiere terminal",
		kenvo: true,
	},
];

function CellValue({ value, accent }: { value: Cell; accent?: boolean }) {
	if (value === true) {
		return (
			<span
				className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${accent ? "bg-flash/15 text-flash" : "bg-white/10 text-text-secondary"}`}
			>
				<Check className="h-4 w-4" />
			</span>
		);
	}
	if (value === false) {
		return (
			<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-text-muted">
				<X className="h-4 w-4" />
			</span>
		);
	}
	return (
		<span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
			<Minus className="h-3.5 w-3.5" />
			{value}
		</span>
	);
}

export function ComparisonTable() {
	return (
		<section className="relative border-y border-border-dark bg-onyx py-24">
			<div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
			<div className="relative mx-auto max-w-5xl px-6 lg:px-8">
				<div className="max-w-2xl">
					<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
						IA gratis vs Kenvo
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
						¿Por qué pagar si hay IA gratis?
					</h2>
					<p className="mt-4 text-sm leading-7 text-text-secondary">
						Porque un chat suelto no es un espacio de trabajo. Kenvo recuerda,
						organiza, cifra y se instala sin que toques una terminal.
					</p>
				</div>

				<div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
					<div className="grid grid-cols-[1.6fr_0.7fr_0.7fr] items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-4 sm:px-7">
						<span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
							Lo que necesitas
						</span>
						<span className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
							IA gratis
						</span>
						<span className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-flash">
							Kenvo
						</span>
					</div>
					<ul>
						{ROWS.map((row, index) => (
							<li
								key={row.label}
								className={`grid grid-cols-[1.6fr_0.7fr_0.7fr] items-center gap-2 px-5 py-4 sm:px-7 ${index % 2 === 1 ? "bg-white/[0.02]" : ""}`}
							>
								<span className="text-sm leading-6 text-paper">
									{row.label}
								</span>
								<span className="flex justify-center">
									<CellValue value={row.free} />
								</span>
								<span className="flex justify-center">
									<CellValue value={row.kenvo} accent />
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
