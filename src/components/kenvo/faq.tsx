import { ChevronDown } from "lucide-react";

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
	{
		q: "¿Por qué pagar 150 € si hay IA gratis?",
		a: "Las opciones gratis son un chat suelto: olvidan el contexto entre sesiones, no leen tus documentos de forma fiable, no cifran tus datos y muchas requieren terminal. Kenvo es un workspace que recuerda, organiza, cifra en disco y se instala sin que toques una línea de comandos. Pagas una vez y es tuyo para siempre.",
	},
	{
		q: "¿Necesito conocimientos técnicos para usarlo?",
		a: "No. Instalas la app, la abres y un asistente visual te guía para conectar tu motor de IA en un par de minutos. Cero terminal, cero configuración manual.",
	},
	{
		q: "Si uso un proveedor de IA en la nube, ¿mis datos salen de mi ordenador?",
		a: "Solo el texto de esa conversación concreta, exactamente igual que cuando usas la web oficial de ese proveedor con tu propia clave. Kenvo no almacena nada en servidores propios. Si quieres privacidad total, usa Ollama en local: en ese modo nada sale de tu máquina.",
	},
	{
		q: "¿Las actualizaciones son de por vida?",
		a: "Sí. El pago único incluye las mejoras de Kenvo de por vida. Sin suscripción y sin coste adicional.",
	},
	{
		q: "¿Funciona sin internet?",
		a: "La app funciona en local. Si usas Ollama (modelo en tu ordenador), trabajas 100 % sin conexión. Si usas un proveedor en la nube, ese sí necesita internet para generar las respuestas.",
	},
	{
		q: "¿Puedo probarlo antes? ¿Hay garantía?",
		a: "Tienes 14 días de garantía: si Kenvo no es lo que esperabas, te devuelvo el dinero. Sin letra pequeña.",
	},
	{
		q: "¿Cuándo llega la versión para Windows?",
		a: "Pronto. Hoy Kenvo está disponible para Mac (Apple Silicon e Intel). La versión de Windows está en camino; si la necesitas, escríbeme y te aviso en cuanto salga.",
	},
	{
		q: "¿Cómo verifico que no hay telemetría?",
		a: "El código es auditable: puedes revisarlo antes de instalar. El servidor de Kenvo se vincula solo a 127.0.0.1 (tu propio ordenador) y no envía datos de uso a ningún sitio.",
	},
	{
		q: "¿Cómo instalo la app la primera vez en Mac?",
		a: "Kenvo es una app de un estudio independiente, sin la firma de pago de Apple. La primera vez, haz click derecho sobre la app y pulsa «Abrir»; confirma el aviso y listo. Solo es necesario una vez. Lo tienes explicado paso a paso más arriba.",
	},
];

export function KenvoFaq() {
	return (
		<section id="faq" className="bg-white py-24 text-gray-900">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				<div className="max-w-2xl">
					<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
						Preguntas frecuentes
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
						Lo que la gente pregunta antes de comprar.
					</h2>
				</div>

				<div className="mt-10 flex flex-col gap-3">
					{FAQS.map((item) => (
						<details
							key={item.q}
							className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-tight text-gray-900">
								{item.q}
								<ChevronDown className="h-5 w-5 shrink-0 text-cyan-600 transition-transform duration-200 group-open:rotate-180" />
							</summary>
							<p className="mt-3 text-sm leading-7 text-gray-600">{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
