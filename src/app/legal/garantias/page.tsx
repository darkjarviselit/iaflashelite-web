import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Garantías y devoluciones — iaflashelite.com",
    description:
        "Política de garantías y devoluciones de iaflashelite. Productos digitales y servicios. Base legal: Directiva EU 2011/83/UE y RDL 1/2007.",
};

export default function GarantiasPage() {
    return (
        <>
            <h1>Política de garantías y devoluciones</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                Última actualización: Mayo 2026
            </p>

            <p>
                Clara, justa y legalmente válida en España y la Unión Europea.
                Diferenciamos productos digitales descargables y servicios
                personalizados porque la normativa los trata distinto.
            </p>

            {/* Bloque 1: Productos descargables */}
            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <h2 className="!mt-0 !mb-0">Productos digitales (9€ – 39€)</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-emerald-50 border border-emerald-200 text-emerald-700">
                    Con garantía de funcionamiento
                </span>

                <p className="mt-4">
                    Nuestros productos digitales están exentos del derecho de
                    desistimiento de 14 días según la{" "}
                    <a
                        href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32011L0083"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Directiva EU 2011/83/UE, Art. 16(m)
                    </a>
                    , al tratarse de contenido digital ejecutado con consentimiento
                    expreso del comprador antes de recibir el enlace de descarga.
                </p>

                <h3 className="!text-base !font-semibold !text-gray-900 !mt-6 !mb-2">
                    ✅ Tienes derecho a devolución si:
                </h3>
                <ul>
                    <li>El producto presenta un fallo técnico que impide su uso normal.</li>
                    <li>Comunicas el fallo a <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a> con capturas del error.</li>
                    <li>El fallo no se resuelve en un plazo de 48 horas hábiles.</li>
                </ul>

                <h3 className="!text-base !font-semibold !text-gray-900 !mt-6 !mb-2">
                    ❌ No aplica devolución si:
                </h3>
                <ul>
                    <li>El producto funciona correctamente pero no cumple tus expectativas.</li>
                    <li>Ya descargaste el producto y decides que no lo necesitas.</li>
                    <li>El problema es de compatibilidad con tu sistema, estando éste fuera de los requisitos publicados en la página del producto.</li>
                </ul>

                <h3 className="!text-base !font-semibold !text-gray-900 !mt-6 !mb-2">
                    Cómo reclamar:
                </h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-gray-700 leading-relaxed">
                    <li>
                        Email a <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a> con asunto «Garantía técnica — [nombre del producto]».
                    </li>
                    <li>Incluir capturas del error o descripción detallada de los pasos para reproducirlo.</li>
                    <li>Respuesta del equipo en menos de 12h.</li>
                    <li>Resolución o devolución en 48h hábiles desde la respuesta.</li>
                </ol>
            </section>

            {/* Bloque 2: Servicios */}
            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <h2 className="!mt-0 !mb-0">Servicios (149€ – 249€)</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-cyan-50 border border-cyan-200 text-cyan-700">
                    Garantía de entrega
                </span>

                <p className="mt-4">
                    Los servicios profesionales (landing pages, trabajos
                    personalizados) tienen garantía vinculada al cumplimiento del
                    plazo y el alcance acordado por escrito antes de iniciar el
                    trabajo.
                </p>

                <h3 className="!text-base !font-semibold !text-gray-900 !mt-6 !mb-2">
                    ✅ Tienes derecho a devolución si:
                </h3>
                <ul>
                    <li>No entregamos en el plazo acordado (confirmado por escrito antes de empezar el trabajo).</li>
                    <li>La entrega final no incluye lo pactado en el encargo inicial.</li>
                </ul>

                <h3 className="!text-base !font-semibold !text-gray-900 !mt-6 !mb-2">
                    ❌ No aplica devolución si:
                </h3>
                <ul>
                    <li>Rechazas las revisiones ofrecidas sin justificación técnica objetiva.</li>
                    <li>Cambias los requisitos tras el inicio del trabajo (cambio de alcance unilateral).</li>
                    <li>Motivos puramente estéticos subjetivos una vez entregado lo pactado.</li>
                </ul>

                <p className="mt-5 text-sm text-gray-600">
                    <strong>Nota:</strong> siempre confirmamos plazo y alcance por
                    escrito antes de empezar y de cobrar. Si vemos que no podemos
                    cumplir, lo comunicamos antes de cobrarte.
                </p>
            </section>

            {/* Bloque 3: Base legal */}
            <section className="mt-10">
                <h3 className="!text-base !font-semibold !text-gray-900 !mt-2 !mb-2">
                    Base legal
                </h3>
                <p className="!text-sm !text-gray-600">
                    Esta política se basa en la{" "}
                    <a
                        href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32011L0083"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Directiva 2011/83/UE del Parlamento Europeo y del Consejo
                    </a>
                    , artículo 16, letra m), transpuesta al ordenamiento español
                    mediante el{" "}
                    <a
                        href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Real Decreto Legislativo 1/2007
                    </a>{" "}
                    (Ley General para la Defensa de los Consumidores y Usuarios,
                    art. 103). En caso de disputa el organismo competente es la{" "}
                    <a
                        href="https://www.consumo.gob.es/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Dirección General de Consumo
                    </a>{" "}
                    del Ministerio de Derechos Sociales, Consumo y Agenda 2030
                    (anterior AECOSAN).
                </p>
            </section>

            {/* CTA */}
            <section className="mt-12 p-6 rounded-2xl bg-onyx text-paper border border-border-dark flex flex-col gap-4">
                <h3 className="!text-xl !font-semibold !text-paper !mt-0 !mb-0">
                    ¿Tienes un problema técnico?
                </h3>
                <p className="!text-text-secondary">
                    Escríbenos con capturas del error. Te respondemos en menos de
                    12h y resolvemos o devolvemos en 48h hábiles.
                </p>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="mailto:iaflashelite@gmail.com?subject=Garant%C3%ADa%20t%C3%A9cnica"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-semibold text-onyx bg-flash hover:scale-[1.02] transition-all !no-underline"
                    >
                        Solicitar garantía técnica
                    </a>
                    <Link
                        href="/productos"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium text-paper border border-border-dark hover:border-flash/40 transition-all !no-underline"
                    >
                        Ver todos los productos
                    </Link>
                </div>
            </section>
        </>
    );
}
