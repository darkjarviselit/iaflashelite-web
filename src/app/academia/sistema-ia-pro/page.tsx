import type { Metadata } from "next";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    FileAudio,
    FileText,
    LockKeyhole,
    Route,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Sistema IA Pro — IAFlashElite Academy",
    description:
        "Pack descargable para montar proyectos IA profesionales en ChatGPT, Claude o Gemini y usarlos para investigar, planificar, crear prompts técnicos y revisar resultados con método.",
};

const PROJECTS = [
    {
        title: "Estrategia y mejoras",
        text: "Ideas, prioridades, riesgos, oportunidades y decisiones sobre qué hacer primero.",
    },
    {
        title: "Marketing y ventas",
        text: "Oferta, precio, copy, contenido, mensajes y posicionamiento sin sonar genérico.",
    },
    {
        title: "Prompt Builder técnico",
        text: "Prompts completos para Claude Code, Codex u otras herramientas técnicas con límites y validaciones.",
    },
] as const;

const INCLUDED = [
    {
        title: "PDF Sistema IA Pro",
        text: "Manual editorial para crear tus proyectos IA y trabajar con un flujo controlado.",
        icon: FileText,
    },
    {
        title: "Audio guía breve",
        text: "Acompañamiento para entender el sistema y aplicarlo con más claridad.",
        icon: FileAudio,
    },
    {
        title: "Prompt 0",
        text: "Arranque técnico para definir objetivo, contexto, límites, validaciones y reporte esperado.",
        icon: ClipboardCheck,
    },
    {
        title: "Flujo Candado",
        text: "Método para preparar, ejecutar, revisar y decidir la siguiente fase sin perder control.",
        icon: LockKeyhole,
    },
] as const;

const NOT_PROMISED = [
    "No promete resultados económicos.",
    "No sustituye tu criterio ni la revisión humana.",
    "No convierte una idea en proyecto terminado sin ejecución.",
    "No es un curso pasivo ni una colección de prompts sueltos.",
] as const;

export default function SistemaIaProPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <section className="relative overflow-hidden pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-35" aria-hidden />
                    <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.02fr_0.78fr] lg:items-center lg:px-8">
                        <div className="flex max-w-3xl flex-col gap-7">
                            <span className="inline-flex w-fit rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                IAFlashElite Academy
                            </span>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                                    Sistema IA Pro
                                </h1>
                                <p className="max-w-2xl text-xl font-semibold leading-8 text-paper sm:text-2xl">
                                    Crea proyectos IA que trabajan contigo.
                                </p>
                                <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                                    Aprende a montar proyectos IA en ChatGPT,
                                    Claude o Gemini para investigar, planificar,
                                    dirigir Claude Code/Codex y revisar
                                    resultados con método.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                    Precio único
                                </p>
                                <div className="mt-3 flex flex-wrap items-end gap-3">
                                    <span className="text-5xl font-bold leading-none text-flash">
                                        19 €
                                    </span>
                                    <span className="pb-1 text-sm text-text-secondary">
                                        PDF + audio guía + plantillas descargables
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    href="/productos/sistema-ia-pro/comprar"
                                    size="lg"
                                    variant="gradient"
                                    className="w-full whitespace-nowrap sm:w-auto"
                                >
                                    Comprar Sistema IA Pro — 19 €
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    href="#flujo-candado"
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    Ver Flujo Candado
                                </Button>
                            </div>
                        </div>

                        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                Diferencia con Pack Arranque IA
                            </p>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-paper">
                                Pasas de preparar contexto a dirigir proyectos.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-text-secondary">
                                Pack Arranque IA deja preparada tu base:
                                Currículum IA, contexto e instrucciones.
                                Sistema IA Pro usa esa base para montar espacios
                                de trabajo y operar con revisión, prompts
                                técnicos y cierre profesional.
                            </p>
                            <Link
                                href="/academia/pack-arranque"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flash hover:text-cyan-200"
                            >
                                Ver Pack Arranque IA <ArrowRight className="h-4 w-4" />
                            </Link>
                        </aside>
                    </div>
                </section>

                <section className="bg-white py-24 text-gray-900">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Los 3 proyectos IA
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Un centro de mando, no un chat suelto.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                El pack te guía para separar estrategia,
                                marketing y prompts técnicos, de forma que cada
                                espacio tenga instrucciones y objetivos claros.
                            </p>
                        </div>
                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {PROJECTS.map((project) => (
                                <article
                                    key={project.title}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-600">
                                        <Route className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        {project.text}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="flujo-candado"
                    className="border-y border-gray-200 bg-gray-50 py-24 text-gray-900"
                >
                    <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:px-8">
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Prompt 0
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                Antes de ejecutar, defines el trabajo.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Prompt 0 obliga a aclarar objetivo, contexto,
                                repo, límites, archivos prohibidos, validaciones
                                y formato de reporte. Sirve para empezar
                                trabajos técnicos con menos improvisación.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Flujo Candado
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                La IA trabaja, tú mantienes el control.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                El proyecto IA audita y prepara el prompt. Tú lo
                                pegas en Claude Code/Codex. Después devuelves el
                                resultado al proyecto IA para revisar riesgos,
                                cambios y siguiente fase.
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
                                Material práctico para montar el sistema.
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
                                Para quien ya quiere trabajar con método.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Para creadores, profesionales y pequeños negocios
                                que quieren usar IA como apoyo de estrategia,
                                marketing y trabajo técnico, manteniendo lectura
                                crítica y control de decisiones.
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
                        <h2 className="text-3xl font-bold tracking-tight text-paper sm:text-5xl">
                            ¿Quieres montar tu sistema de proyectos IA?
                        </h2>
                        <p className="max-w-xl text-base leading-7 text-text-secondary">
                            Descarga el pack, crea tus tres proyectos y prueba el
                            Flujo Candado con una tarea real.
                        </p>
                        <Button
                            href="/productos/sistema-ia-pro/comprar"
                            size="lg"
                            variant="gradient"
                            className="whitespace-nowrap"
                        >
                            Comprar Sistema IA Pro — 19 €
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
