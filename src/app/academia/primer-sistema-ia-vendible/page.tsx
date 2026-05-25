import type { Metadata } from "next";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    ClipboardList,
    FileAudio,
    FileText,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Primer Sistema IA Vendible — IAFlashElite Academy",
    description:
        "Pack descargable para crear un sistema que recibe solicitudes de clientes, las ordena con IA y prepara respuestas revisables con control humano.",
};

const FLOW = [
    {
        title: "Formulario",
        text: "Recibes una solicitud de cliente con los datos mínimos para entender el caso.",
    },
    {
        title: "Orden",
        text: "Guardas la entrada en una hoja, documento o base sencilla que puedas revisar.",
    },
    {
        title: "Análisis IA",
        text: "La IA resume, detecta datos faltantes, marca riesgos y prepara una propuesta inicial.",
    },
    {
        title: "Revisión humana",
        text: "Tú corriges tono, alcance, precio, plazos y promesas antes de responder.",
    },
    {
        title: "Respuesta final",
        text: "El cliente recibe una respuesta clara, humana y revisada.",
    },
] as const;

const INCLUDED = [
    {
        title: "PDF principal",
        text: "Manual editorial para construir el sistema paso a paso.",
        icon: FileText,
    },
    {
        title: "2 audios",
        text: "Audio guía principal y bonus sobre herramientas, tokens y mentalidad de proyecto.",
        icon: FileAudio,
    },
    {
        title: "Prompt procesador",
        text: "Plantilla para convertir solicitudes desordenadas en análisis y propuesta revisable.",
        icon: ClipboardCheck,
    },
    {
        title: "12 plantillas",
        text: "Formulario, respuesta inicial, Flujo Candado, revisión humana y adaptaciones sectoriales.",
        icon: ClipboardList,
    },
] as const;

const RESULTS = [
    "Formulario de solicitud definido.",
    "Sistema básico para guardar y ordenar respuestas.",
    "Prompt procesador listo para usar.",
    "Plantilla de respuesta/propuesta inicial.",
    "Checklist de revisión humana.",
    "Demo con tres solicitudes simuladas.",
] as const;

const NOT_PROMISED = [
    "No promete ventas ni resultados económicos.",
    "No sustituye revisión humana ni criterio profesional.",
    "No crea un SaaS completo.",
    "No convierte una solicitud incompleta en una propuesta perfecta sin revisión.",
    "No acredita títulos ni formación reglada.",
] as const;

export default function PrimerSistemaIaVendiblePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <section className="relative overflow-hidden pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-35" aria-hidden />
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
                                IAFlashElite Academy
                            </span>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                                    Primer Sistema IA Vendible
                                </h1>
                                <p className="max-w-2xl text-xl font-semibold leading-8 text-paper sm:text-2xl">
                                    Crea un sistema que recibe solicitudes de
                                    clientes, las ordena con IA y prepara
                                    respuestas revisables antes de enviarlas.
                                </p>
                                <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                                    Construye un flujo funcional para captar
                                    solicitudes, detectar información faltante y
                                    preparar una respuesta inicial con control
                                    humano.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                    Precio único
                                </p>
                                <div className="mt-3 flex flex-wrap items-end gap-3">
                                    <span className="text-5xl font-bold leading-none text-flash">
                                        49 €
                                    </span>
                                    <span className="pb-1 text-sm text-text-secondary">
                                        PDF + 2 audios + plantillas descargables
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    href="/productos/primer-sistema-ia-vendible/comprar"
                                    size="lg"
                                    variant="gradient"
                                    className="w-full whitespace-nowrap sm:w-auto"
                                >
                                    Comprar Primer Sistema IA Vendible — 49 €
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    href="#flujo"
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    Ver el flujo
                                </Button>
                            </div>
                        </div>

                        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                Qué vas a construir
                            </p>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-paper">
                                Un sistema pequeño, demostrable y revisable.
                            </h2>
                            <ul className="mt-6 flex flex-col gap-3">
                                {RESULTS.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/academia/sistema-ia-pro"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flash hover:text-cyan-200"
                            >
                                Viene después de Sistema IA Pro
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </aside>
                    </div>
                </section>

                <section id="flujo" className="bg-white py-24 text-gray-900">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Flujo del sistema
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                De solicitud desordenada a respuesta revisable.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                El pack enseña una versión sencilla y adaptable:
                                primero manual, luego automatizable solo si el
                                flujo ya se entiende y se puede revisar.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-5">
                            {FLOW.map((step, index) => (
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

                <section className="border-y border-gray-200 bg-gray-50 py-24 text-gray-900">
                    <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:px-8">
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Prompt procesador
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                La pieza central del sistema.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Convierte una solicitud en resumen ejecutivo,
                                problema real, datos faltantes, urgencia,
                                dificultad, riesgos, propuesta inicial y
                                preguntas para responder al cliente.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Revisión humana
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                La IA prepara. Tú decides.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                El sistema no envía respuestas solo. Tú revisas
                                tono, alcance, precio, plazos, riesgos y
                                promesas antes de enviar cualquier mensaje.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24 text-gray-900">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Qué incluye
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Material completo para montar tu primer flujo.
                            </h2>
                        </div>
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {INCLUDED.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article
                                        key={item.title}
                                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                    >
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-600">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="mt-5 text-lg font-semibold tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            {item.text}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="border-y border-gray-200 bg-gray-50 py-24 text-gray-900">
                    <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:px-8">
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Para quién es
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                Para builders que quieren vender algo concreto.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Encaja si quieres crear una demo útil para
                                agencias web, automatizaciones IA, gestorías,
                                inmobiliarias o servicios locales, manteniendo
                                revisión humana y límites claros.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Qué no promete
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                Sin humo ni piloto automático.
                            </h2>
                            <ul className="mt-5 flex flex-col gap-3">
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
                    </div>
                </section>

                <section className="bg-white py-24 text-gray-900">
                    <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                            Garantía de calidad
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            14 días para revisar el material.
                        </h2>
                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Si después de recibir el material consideras que no
                            entrega lo prometido en la página de venta, se
                            devuelve el importe. La garantía cubre la calidad y
                            completitud del material descargable. No cubre
                            resultados económicos ni ejecución incorrecta.
                        </p>
                    </div>
                </section>

                <section className="relative border-t border-border-dark bg-onyx py-24">
                    <div className="absolute inset-0 bg-dot-grid opacity-35" aria-hidden />
                    <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                            <Sparkles className="h-5 w-5" />
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-paper sm:text-5xl">
                            ¿Montamos tu primer sistema vendible?
                        </h2>
                        <p className="max-w-xl text-base leading-7 text-text-secondary">
                            Descarga el pack, crea el formulario, prueba el
                            prompt procesador y prepara una demo con tres
                            solicitudes simuladas.
                        </p>
                        <Button
                            href="/productos/primer-sistema-ia-vendible/comprar"
                            size="lg"
                            variant="gradient"
                            className="whitespace-nowrap"
                        >
                            Comprar Primer Sistema IA Vendible — 49 €
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
