"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Bot,
    Check,
    Code2,
    Mail,
    SearchCheck,
    ShieldCheck,
    Wrench,
    Zap,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

type MainOffer = {
    badge: string;
    badgeTone: string;
    cta: string;
    description: string;
    featured?: boolean;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    includes: ReadonlyArray<string>;
    price: string;
    priceNote?: string;
    title: string;
};

type SecondaryOffer = {
    cta: string;
    description: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    price: string;
    title: string;
};

const MAIN_OFFERS: ReadonlyArray<MainOffer> = [
    {
        badge: "RECOMENDADO PARA EMPEZAR",
        badgeTone: "border-cyan-400/25 bg-cyan-400/10 text-flash",
        price: "490€",
        priceNote: "pago único",
        title: "Auditoría IA para empresas",
        description:
            "Analizamos tus procesos e identificamos exactamente dónde la IA te ahorra tiempo y dinero. Entregamos un informe detallado con prioridades y presupuesto estimado.",
        includes: [
            "Análisis de 3-5 procesos clave",
            "Informe PDF con recomendaciones",
            "Sesión de presentación de resultados",
            "Hoja de ruta de implementación",
        ],
        cta: "Solicitar auditoría",
        icon: SearchCheck,
    },
    {
        badge: "MÁS SOLICITADO",
        badgeTone: "border-white/15 bg-white/[0.06] text-paper",
        price: "desde 590€",
        title: "Automatización a medida",
        description:
            "Diseñamos e implementamos el flujo de trabajo automatizado que necesitas. Integración con tus sistemas actuales. Entrega en 5-7 días hábiles.",
        includes: [
            "Análisis de requisitos sin coste",
            "Desarrollo a medida (sin plantillas)",
            "Integración con tus herramientas",
            "Documentación técnica incluida",
            "Soporte 30 días post-entrega",
        ],
        cta: "Solicitar presupuesto",
        icon: Zap,
    },
    {
        badge: "MAYOR IMPACTO",
        badgeTone: "border-cyan-400 bg-cyan-400/15 text-flash",
        price: "desde 1.500€",
        title: "Agente IA privado",
        description:
            "Tu propio agente con memoria, personalidad y herramientas. Aprende de tus procesos. Desplegado en tu infraestructura, no en servidores compartidos.",
        includes: [
            "Agente con memoria persistente",
            "Personalidad y tono ajustado a tu marca",
            "Herramientas personalizadas (búsqueda, calendar, email)",
            "Despliegue en tu servidor o cloud",
            "Manual de uso incluido",
        ],
        cta: "Solicitar agente",
        icon: Bot,
        featured: true,
    },
    {
        badge: "INGRESOS RECURRENTES",
        badgeTone: "border-purple-400/25 bg-purple-400/10 text-purple-200",
        price: "99€/mes o 199€/mes",
        title: "Mantenimiento de agente",
        description:
            "Mantenemos tu agente actualizado, monitorizado y funcionando. Sin sorpresas, sin coste oculto.",
        includes: [
            "Basic 99€/mes: actualizaciones mensuales",
            "Basic 99€/mes: monitorización básica",
            "Basic 99€/mes: soporte por email",
            "Pro 199€/mes: actualizaciones semanales",
            "Pro 199€/mes: monitorización 24/7",
            "Pro 199€/mes: soporte prioritario y mejoras menores incluidas",
        ],
        cta: "Ver planes",
        icon: Wrench,
    },
];

const SECONDARY_OFFERS: ReadonlyArray<SecondaryOffer> = [
    {
        title: "Pack Seguridad PYME",
        price: "79€",
        description:
            "Herramientas esenciales de ciberseguridad para proteger tu negocio digital.",
        cta: "Ver pack",
        href: "/productos",
        icon: ShieldCheck,
    },
    {
        title: "Herramientas descargables",
        price: "desde 9€",
        description:
            "Scripts y utilidades listas para usar. Auditor web, anti-phishing, verificador URLs, backup cifrado.",
        cta: "Ver herramientas",
        href: "/productos",
        icon: Code2,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

export function ServiciosV2Content() {
    return (
        <main className="min-h-screen bg-onyx text-paper">
            <HeroBlock />
            <MainOffersBlock />
            <ToolsBlock />
            <FinalCtaBlock />
        </main>
    );
}

function HeroBlock() {
    return (
        <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
            <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[65%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.12),transparent_64%)]"
                aria-hidden
            />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex max-w-4xl flex-col gap-6 text-center"
            >
                <span className="mx-auto w-fit text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    Servicios B2B
                </span>
                <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                    Servicios de IA para empresas
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Agentes inteligentes, automatizaciones y herramientas de
                    ciberseguridad. Sin humo, sin plantillas, sin dependencias ocultas.
                </p>
            </motion.div>
        </section>
    );
}

function MainOffersBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {MAIN_OFFERS.map((offer, index) => {
                        const Icon = offer.icon;
                        return (
                            <motion.article
                                key={offer.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={
                                    offer.featured
                                        ? "flex min-h-[640px] flex-col rounded-2xl border border-flash bg-[#111111] p-6 shadow-[0_0_50px_rgba(0,229,255,0.16)]"
                                        : "flex min-h-[640px] flex-col rounded-2xl border border-white/10 bg-[#111111] p-6"
                                }
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${offer.badgeTone}`}
                                    >
                                        {offer.badge}
                                    </span>
                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-flash">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-4xl font-bold tracking-tight text-paper">
                                            {offer.price}
                                        </span>
                                        {offer.priceNote ? (
                                            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                                                {offer.priceNote}
                                            </span>
                                        ) : null}
                                    </div>
                                    <h2 className="mt-7 text-2xl font-bold tracking-tight text-paper">
                                        {offer.title}
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                                        {offer.description}
                                    </p>
                                </div>

                                <div className="mt-7 border-t border-white/10 pt-6">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                                        Incluye
                                    </span>
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {offer.includes.map((item) => (
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

                                <Button href="/contacto" variant="gradient" className="mt-auto w-full">
                                    {offer.cta} <ArrowRight size={16} />
                                </Button>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ToolsBlock() {
    return (
        <section className="bg-[#111111] px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1200px]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 max-w-2xl"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        También disponible
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Herramientas listas para usar.
                    </h2>
                    <p className="mt-5 text-base leading-7 text-text-secondary">
                        Herramientas listas para usar. Código auditable incluido.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2">
                    {SECONDARY_OFFERS.map((offer, index) => {
                        const Icon = offer.icon;
                        return (
                            <motion.article
                                key={offer.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-70px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex flex-col rounded-2xl border border-white/10 bg-onyx p-7"
                            >
                                <div className="flex items-start justify-between gap-5">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <span className="text-right text-3xl font-bold tracking-tight text-flash">
                                        {offer.price}
                                    </span>
                                </div>
                                <h3 className="mt-7 text-2xl font-bold tracking-tight text-paper">
                                    {offer.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-text-secondary">
                                    {offer.description}
                                </p>
                                <Button href={offer.href} variant="secondary" className="mt-8 w-fit">
                                    {offer.cta} <ArrowRight size={16} />
                                </Button>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FinalCtaBlock() {
    return (
        <section className="px-6 py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-white/10 bg-[#111111] p-8 text-center sm:p-12"
            >
                <h2 className="text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                    ¿No sabes por dónde empezar?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                    Cuéntanos tu situación y te decimos qué encaja mejor. Sin compromiso,
                    respuesta en menos de 24h.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <Button href="/contacto" size="lg" variant="gradient">
                        Hablar con el equipo <ArrowRight size={16} />
                    </Button>
                    <a
                        href={`mailto:${BRAND.email}`}
                        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-flash"
                    >
                        <Mail size={16} />
                        {BRAND.email}
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
