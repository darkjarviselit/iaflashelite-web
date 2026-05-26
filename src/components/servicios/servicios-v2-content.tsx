"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Bot,
    Check,
    CheckCircle2,
    Code2,
    Hourglass,
    Mail,
    SearchCheck,
    ShieldCheck,
    TriangleAlert,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

type Plan = {
    name: string;
    price: string;
    forWho: string;
    bullets: ReadonlyArray<string>;
};

type MainOffer = {
    badge: string;
    badgeTone: string;
    cta: string;
    asunto: string;
    description: string;
    featured?: boolean;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    includes?: ReadonlyArray<string>;
    plans?: ReadonlyArray<Plan>;
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
        asunto: "Auditoría IA para empresas",
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
        asunto: "Automatización a medida",
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
        asunto: "Agente IA privado",
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
        plans: [
            {
                name: "Basic",
                price: "99€/mes",
                forWho: "Una automatización activa",
                bullets: [
                    "Soporte por email (48h)",
                    "Actualizaciones críticas",
                    "Reporte mensual automático",
                ],
            },
            {
                name: "Pro",
                price: "199€/mes",
                forWho: "Agente completo o varios procesos",
                bullets: [
                    "Soporte prioritario (24h) + 1 llamada/mes",
                    "Actualizaciones críticas + mejoras",
                    "Monitorización continua",
                    "Reporte mensual + revisión con Oscar",
                ],
            },
        ],
        cta: "Solicitar mantenimiento",
        asunto: "Mantenimiento de agente",
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

const PROBLEMS: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    text: string;
}> = [
    {
        icon: Hourglass,
        title: "Tu equipo invierte horas en tareas repetitivas.",
        text: "Mover datos, copiar listas, responder correos predecibles. Tiempo que tu negocio paga en sueldos y que no genera valor.",
    },
    {
        icon: Bot,
        title: "Has probado herramientas de IA genéricas y no encajan.",
        text: "ChatGPT y plantillas estándar no entienden tu negocio, tus clientes ni tus procesos. Acaban arrinconadas.",
    },
    {
        icon: TriangleAlert,
        title: "Te asusta perder el control de tus datos.",
        text: "No quieres que tu información de clientes acabe entrenando modelos ajenos. Quieres soluciones que vivan donde tú decidas.",
    },
];

const STEPS: ReadonlyArray<{ title: string; text: string }> = [
    {
        title: "Auditoría",
        text: "Analizamos tu negocio y te entregamos un plan con qué automatizar, en qué orden y cuánto cuesta.",
    },
    {
        title: "Propuesta cerrada",
        text: "Recibes alcance, precio y tiempo por escrito antes de pagar nada. Si no encaja, no hay compromiso.",
    },
    {
        title: "Construcción",
        text: "Construimos el sistema en 5-15 días. Te enseñamos cómo funciona con una demo grabada con tus datos.",
    },
    {
        title: "Mantenimiento",
        text: "Lo dejamos vivo con un plan mensual, o te entregamos el código y tú lo mantienes. Tú decides.",
    },
];

const FOR_YES: ReadonlyArray<string> = [
    "Tienes una PYME entre 5 y 100 empleados.",
    "Pierdes horas reales en tareas que sabes que son automatizables.",
    "Quieres control de tus datos y entender qué hace el sistema.",
    "Aceptas pagar por valor entregado, no por horas vagas.",
];

const FOR_NO: ReadonlyArray<string> = [
    "Buscas un SaaS genérico tipo Zapier o un wrapper de ChatGPT.",
    "Esperas resultados sin involucrarte en la auditoría inicial.",
    "Necesitas un cumplimiento legal complejo (LOPDGDD avanzado) sin equipo legal propio.",
    "Quieres decidir hoy sin ver primero la propuesta cerrada.",
];

export function ServiciosV2Content() {
    return (
        <main className="min-h-screen bg-onyx text-paper">
            <HeroBlock />
            <ProblemaBlock />
            <ProcesoBlock />
            <ParaQuienBlock />
            <MainOffersBlock />
            <GarantiaFlashBlock />
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
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Servicios principales
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Cuatro maneras de empezar.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-text-secondary">
                        Desde una auditoría inicial hasta un agente IA completo con
                        mantenimiento. Sin compromisos largos, sin sorpresas.
                    </p>
                </motion.div>
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
                                    {offer.plans ? (
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            {offer.plans.map((plan) => (
                                                <div
                                                    key={plan.name}
                                                    className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4"
                                                >
                                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                                        {plan.name}
                                                    </span>
                                                    <span className="mt-2 text-xl font-bold tracking-tight text-paper">
                                                        {plan.price}
                                                    </span>
                                                    <span className="mt-1 text-xs leading-5 text-text-muted">
                                                        {plan.forWho}
                                                    </span>
                                                    <ul className="mt-3 flex flex-col gap-2">
                                                        {plan.bullets.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="flex items-start gap-2 text-xs leading-5 text-text-secondary"
                                                            >
                                                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flash" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                                                Incluye
                                            </span>
                                            <ul className="mt-4 flex flex-col gap-3">
                                                {offer.includes?.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                                                    >
                                                        <Check className="mt-1 h-4 w-4 shrink-0 text-flash" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>

                                <Button
                                    href={`/contacto?asunto=${encodeURIComponent(offer.asunto)}`}
                                    variant="gradient"
                                    className="mt-auto w-full"
                                >
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

function ProblemaBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        El problema
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Esto es lo que te cuesta no automatizar.
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {PROBLEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.article
                                key={item.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-70px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                            >
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-flash/20 bg-flash/10 text-flash">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mb-2 text-base font-semibold text-paper">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-text-secondary">
                                    {item.text}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ProcesoBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Cómo trabajamos
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        De idea a sistema funcionando, en 4 pasos.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                        Sin reuniones eternas. Sin sorpresas de precio.
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => (
                        <motion.article
                            key={step.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-70px" }}
                            variants={fadeUp}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                        >
                            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-flash/20 bg-flash/10 text-sm font-bold text-flash">
                                {index + 1}
                            </span>
                            <h3 className="mb-2 text-base font-semibold text-paper">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary">
                                {step.text}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ParaQuienBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        ¿Es para ti?
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Honestidad antes que humo.
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-70px" }}
                        variants={fadeUp}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-paper">
                            Encaja contigo si…
                        </h3>
                        <ul className="space-y-3">
                            {FOR_YES.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-flash" />
                                    <span className="text-sm leading-relaxed text-text-secondary">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-70px" }}
                        variants={fadeUp}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-paper">
                            No es para ti si…
                        </h3>
                        <ul className="space-y-3">
                            {FOR_NO.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                                    <span className="text-sm leading-relaxed text-text-secondary">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function GarantiaFlashBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-3xl flex-col items-center text-center"
            >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                    <ShieldCheck className="h-12 w-12" />
                </span>
                <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    Garantía Flash
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                    Alcance cerrado. Si no lo cumplimos, lo corregimos.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                    Trabajamos siempre sobre un alcance, precio y plazo cerrados por
                    escrito antes de empezar. Si lo que entregamos no cumple lo
                    acordado, lo corregimos sin coste. Si tras la revisión no logramos
                    resolverlo, valoramos un reembolso total o parcial.
                </p>
                <a
                    href="/legal/garantias"
                    className="mt-6 text-sm text-flash hover:underline"
                >
                    Ver política completa →
                </a>
            </motion.div>
        </section>
    );
}
