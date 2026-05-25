import type { Metadata } from "next";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    FileAudio,
    FileText,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Pack Arranque IA — IAFlashElite Academy",
    description:
        "Pack descargable para preparar tu agente IA y tu flujo de trabajo con contexto, instrucciones, skills y una primera prueba real.",
};

const INCLUDED = [
    {
        title: "PDF principal",
        text: "Manual paso a paso para preparar contexto, instrucciones y método de trabajo.",
        icon: FileText,
    },
    {
        title: "Audio guía breve",
        text: "Acompañamiento para entender el pack y seguirlo con más claridad.",
        icon: FileAudio,
    },
    {
        title: "Plantillas copiables",
        text: "Currículum IA, contexto maestro, instrucciones del proyecto y CLAUDE.md base.",
        icon: ClipboardList,
    },
    {
        title: "5 skills base",
        text: "Planificador diario, auditoría quirúrgica, revisor de ideas, prompt builder técnico y checklist final.",
        icon: Sparkles,
    },
] as const;

const RESULTS = [
    "Tu Currículum IA personal creado.",
    "Contexto maestro de tu proyecto preparado.",
    "Instrucciones de trabajo para tu IA o proyecto.",
    "Estructura mínima para trabajar con ChatGPT, Claude, Gemini, Grok, Codex o Claude Code.",
    "Primera prueba real hecha con una tarea tuya.",
] as const;

const NOT_PROMISED = [
    "No promete ingresos ni resultados económicos.",
    "No es una promesa cerrada aplicable a todos los casos.",
    "No convierte una idea en negocio automáticamente.",
    "No sustituye tu criterio ni la ejecución real del proyecto.",
] as const;

export default function PackArranquePage() {
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
                                    Pack Arranque IA
                                </h1>
                                <p className="max-w-2xl text-xl font-semibold leading-8 text-paper sm:text-2xl">
                                    Prepara tu agente y tu flujo de trabajo antes
                                    de tocar un proyecto real.
                                </p>
                                <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                                    El flujo de arranque que usamos en IAFlashElite
                                    para preparar colaboradores y agentes IA antes
                                    de trabajar en proyectos reales.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    href="/productos/pack-arranque-ia/comprar"
                                    size="lg"
                                    variant="gradient"
                                    className="w-full whitespace-nowrap sm:w-auto"
                                >
                                    Comprar Pack Arranque IA — 7 €
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    href="#incluye"
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    Ver qué incluye
                                </Button>
                            </div>
                        </div>

                        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                Resultado esperado
                            </p>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-paper">
                                Termina la tarde con tu IA mejor preparada.
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
                        </aside>
                    </div>
                </section>

                <section id="incluye" className="bg-white py-24 text-gray-900">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Qué incluye
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Un pack pequeño, completo y accionable.
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
                                Para empezar con método.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Para personas que quieren usar IA en proyectos
                                reales y necesitan preparar contexto, reglas,
                                instrucciones y primeras skills antes de pedir
                                resultados complejos.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Qué no promete
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                Sin humo y sin urgencia falsa.
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
                        <h2 className="text-3xl font-bold tracking-tight text-paper sm:text-5xl">
                            ¿Quieres preparar tu IA de trabajo hoy?
                        </h2>
                        <p className="max-w-xl text-base leading-7 text-text-secondary">
                            Compra el pack, descarga el ZIP y sigue el flujo con
                            tu herramienta IA de confianza.
                        </p>
                        <Button
                            href="/productos/pack-arranque-ia/comprar"
                            size="lg"
                            variant="gradient"
                            className="whitespace-nowrap"
                        >
                            Comprar Pack Arranque IA — 7 €
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
