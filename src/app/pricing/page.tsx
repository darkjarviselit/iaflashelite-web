"use client";

import {
    ArrowRight,
    Check,
    ChevronDown,
    Code2,
    FileSearch,
    ShieldCheck,
    Sparkles,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

type PricingMode = "one-time" | "recurring";

type PricingCard = {
    badge?: string;
    cta: string;
    description?: string;
    featured?: boolean;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    includes: ReadonlyArray<string>;
    price: string;
    title: string;
};

type FaqItem = {
    answer: string;
    question: string;
};

type ComparisonRow = {
    agency: string;
    flash: string;
    inHouse: string;
    metric: string;
};

const ONE_TIME_PLANS: ReadonlyArray<PricingCard> = [
    {
        badge: "ENTRADA",
        title: "Herramientas",
        price: "desde 9€",
        description:
            "Scripts y utilidades descargables. Auditor web, anti-phishing, verificador URLs, backup cifrado.",
        includes: [
            "Código fuente completo",
            "Guía de instalación PDF",
            "Prompts para Claude/ChatGPT incluidos",
            "Soporte 30 días",
            "Garantía Flash incluida",
        ],
        cta: "Ver herramientas",
        href: "/productos",
        icon: Code2,
    },
    {
        badge: "RECOMENDADO",
        title: "Auditoría IA",
        price: "490€",
        description:
            "Analizamos tus procesos e identificamos dónde la IA te ahorra tiempo y dinero.",
        includes: [
            "Análisis de 3-5 procesos",
            "Informe PDF detallado",
            "Sesión de presentación",
            "Hoja de ruta de implementación",
        ],
        cta: "Solicitar auditoría",
        href: "/contacto",
        icon: FileSearch,
    },
    {
        badge: "MÁS SOLICITADO",
        title: "Automatización",
        price: "desde 590€",
        description:
            "Flujo de trabajo automatizado a medida. Integración con tus sistemas actuales.",
        includes: [
            "Análisis de requisitos sin coste",
            "Desarrollo sin plantillas",
            "Documentación técnica",
            "Soporte 30 días",
        ],
        cta: "Solicitar presupuesto",
        href: "/contacto",
        icon: Zap,
    },
    {
        badge: "MAYOR IMPACTO",
        title: "Agente IA privado",
        price: "desde 1.500€",
        description:
            "Tu propio agente con memoria y herramientas. Desplegado en tu infraestructura.",
        includes: [
            "Agente con memoria persistente",
            "Personalidad a medida",
            "Herramientas personalizadas",
            "Despliegue en tu servidor",
            "Manual de uso",
        ],
        cta: "Solicitar agente",
        href: "/contacto",
        icon: Sparkles,
        featured: true,
    },
];

const RECURRING_PLANS: ReadonlyArray<PricingCard> = [
    {
        title: "Basic",
        price: "99€/mes",
        includes: [
            "Actualizaciones mensuales",
            "Monitorización básica",
            "Soporte por email",
            "Informe mensual",
        ],
        cta: "Empezar Basic",
        href: "/contacto",
        icon: Wrench,
    },
    {
        badge: "RECOMENDADO",
        title: "Pro",
        price: "199€/mes",
        includes: [
            "Actualizaciones semanales",
            "Monitorización 24/7",
            "Soporte prioritario",
            "Mejoras menores incluidas",
            "Informe semanal",
        ],
        cta: "Empezar Pro",
        href: "/contacto",
        icon: ShieldCheck,
        featured: true,
    },
];

const COMPARISON_ROWS: ReadonlyArray<ComparisonRow> = [
    { metric: "Precio", flash: "desde 9€", agency: "+3.000€", inHouse: "+4.500€/mes" },
    { metric: "Plazo", flash: "48h-7 días", agency: "4-8 semanas", inHouse: "2-6 meses" },
    { metric: "Personalización", flash: "Total", agency: "Limitada", inHouse: "Total" },
    { metric: "Código auditable", flash: "Sí", agency: "No", inHouse: "Variable" },
    { metric: "Sin plantillas", flash: "Sí", agency: "No", inHouse: "Sí" },
    { metric: "Soporte directo", flash: "Sí", agency: "Account mgr", inHouse: "Interno" },
];

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
    {
        question: "¿Hay costes ocultos?",
        answer:
            "No. El precio acordado es el precio final. Si durante el desarrollo surge algo no previsto, te lo comunicamos antes de continuar. Nunca cobramos extras sin tu aprobación.",
    },
    {
        question: "¿Cómo funciona el pago?",
        answer:
            "50% al inicio del proyecto, 50% al entregar. Para herramientas descargables, pago único antes de la entrega. Aceptamos transferencia bancaria y PayPal.",
    },
    {
        question: "¿Qué pasa si no quedo satisfecho?",
        answer:
            "La Garantía Flash cubre problemas reales de entrega, archivo, descripción o funcionamiento. Para proyectos a medida, trabajamos contigo hasta que la entrega cumpla el alcance acordado en el briefing inicial.",
    },
    {
        question: "¿Puedo pedir presupuesto sin compromiso?",
        answer:
            "Sí. Cuéntanos tu proyecto en el formulario de contacto y te respondemos con un presupuesto detallado en menos de 24h. Sin compromiso de contratación.",
    },
    {
        question: "¿Los precios incluyen IVA?",
        answer:
            "Los precios mostrados son sin IVA. Para empresas españolas se aplica el 21% de IVA. Para empresas fuera de España (UE con VAT number o fuera de UE), puede aplicar exención. Consulta tu caso concreto.",
    },
];

export default function PricingPage() {
    const [mode, setMode] = useState<PricingMode>("one-time");
    const [openFaq, setOpenFaq] = useState<string | null>(FAQ_ITEMS[0].question);

    const cards = mode === "one-time" ? ONE_TIME_PLANS : RECURRING_PLANS;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <HeroBlock />
                <section className="px-6 py-20 lg:py-24">
                    <div className="mx-auto max-w-[1240px]">
                        <div className="mb-10 flex justify-center">
                            <div className="inline-grid grid-cols-2 rounded-full border border-white/10 bg-[#111111] p-1">
                                <button
                                    type="button"
                                    onClick={() => setMode("one-time")}
                                    className={
                                        mode === "one-time"
                                            ? "rounded-full bg-flash px-5 py-2 text-sm font-semibold text-onyx transition-colors"
                                            : "rounded-full px-5 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-paper"
                                    }
                                >
                                    Proyectos únicos
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("recurring")}
                                    className={
                                        mode === "recurring"
                                            ? "rounded-full bg-flash px-5 py-2 text-sm font-semibold text-onyx transition-colors"
                                            : "rounded-full px-5 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-paper"
                                    }
                                >
                                    Recurrente
                                </button>
                            </div>
                        </div>

                        <div
                            className={
                                mode === "one-time"
                                    ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                                    : "mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
                            }
                        >
                            {cards.map((plan) => (
                                <PricingCard key={plan.title} plan={plan} />
                            ))}
                        </div>
                    </div>
                </section>

                <ComparisonBlock />
                <FaqBlock openFaq={openFaq} setOpenFaq={setOpenFaq} />
            </main>
            <Footer />
        </>
    );
}

function HeroBlock() {
    return (
        <section className="relative overflow-hidden px-6 pb-20 pt-32 text-center lg:pb-24 lg:pt-40">
            <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[65%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.12),transparent_64%)]"
                aria-hidden
            />
            <div className="relative mx-auto max-w-4xl">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    Pricing
                </span>
                <h1 className="mt-6 text-5xl font-black leading-[0.98] text-paper sm:text-6xl lg:text-7xl">
                    Precios claros, sin sorpresas
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Sabes exactamente lo que pagas antes de empezar. Sin costes
                    ocultos, sin letra pequeña.
                </p>
            </div>
        </section>
    );
}

function PricingCard({ plan }: { plan: PricingCard }) {
    const Icon = plan.icon;

    return (
        <article
            className={
                plan.featured
                    ? "flex min-h-[520px] flex-col rounded-2xl border border-flash bg-[#151515] p-7 shadow-[0_0_46px_rgba(0,229,255,0.14)]"
                    : "flex min-h-[520px] flex-col rounded-2xl border border-white/10 bg-[#111111] p-7"
            }
        >
            <div className="flex min-h-12 items-start justify-between gap-4">
                {plan.badge ? (
                    <span className="inline-flex rounded-full border border-flash/25 bg-flash/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-flash">
                        {plan.badge}
                    </span>
                ) : (
                    <span />
                )}
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-flash">
                    <Icon className="h-5 w-5" />
                </span>
            </div>

            <div className="mt-7">
                    <span className="text-4xl font-bold text-paper">
                    {plan.price}
                </span>
                <h2 className="mt-6 text-2xl font-bold text-paper">
                    {plan.title}
                </h2>
                {plan.description ? (
                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                        {plan.description}
                    </p>
                ) : null}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Qué incluye
                </span>
                <ul className="mt-4 flex flex-col gap-3">
                    {plan.includes.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                        >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-flash" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Button href={plan.href} variant="gradient" className="mt-auto w-full">
                {plan.cta} <ArrowRight size={16} />
            </Button>
        </article>
    );
}

function ComparisonBlock() {
    return (
        <section className="bg-[#111111] px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-10 max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Comparativa
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Frente a alternativas tradicionales.
                    </h2>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[760px] border-collapse bg-onyx text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-sm text-text-muted">
                                <th className="px-5 py-4 font-semibold"> </th>
                                <th className="px-5 py-4 font-semibold text-flash">IAFlashElite</th>
                                <th className="px-5 py-4 font-semibold">Agencia</th>
                                <th className="px-5 py-4 font-semibold">In-house</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.metric} className="border-b border-white/10 last:border-0">
                                    <th className="px-5 py-4 text-sm font-semibold text-paper">
                                        {row.metric}
                                    </th>
                                    <td className="px-5 py-4 text-sm text-paper">
                                        <Value value={row.flash} positive />
                                    </td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        <Value value={row.agency} />
                                    </td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        <Value value={row.inHouse} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function Value({ positive = false, value }: { positive?: boolean; value: string }) {
    if (value === "Sí") {
        return (
            <span className={positive ? "inline-flex items-center gap-2 text-flash" : "inline-flex items-center gap-2 text-paper"}>
                <Check className="h-4 w-4" />
                Sí
            </span>
        );
    }

    if (value === "No") {
        return (
            <span className="inline-flex items-center gap-2 text-text-muted">
                <X className="h-4 w-4" />
                No
            </span>
        );
    }

    return <span>{value}</span>;
}

function FaqBlock({
    openFaq,
    setOpenFaq,
}: {
    openFaq: string | null;
    setOpenFaq: (question: string | null) => void;
}) {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-3xl">
                <div className="mb-10 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        FAQ precios
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Preguntas frecuentes sobre precios.
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openFaq === item.question;
                        return (
                            <article
                                key={item.question}
                                className="rounded-2xl border border-white/10 bg-[#111111]"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(isOpen ? null : item.question)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base font-semibold text-paper">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={
                                            isOpen
                                                ? "h-5 w-5 shrink-0 rotate-180 text-flash transition-transform"
                                                : "h-5 w-5 shrink-0 text-flash transition-transform"
                                        }
                                    />
                                </button>
                                {isOpen ? (
                                    <p className="border-t border-white/10 px-5 py-5 text-sm leading-7 text-text-secondary">
                                        {item.answer}
                                    </p>
                                ) : null}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
