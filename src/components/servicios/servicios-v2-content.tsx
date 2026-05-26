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
    MessageCircle,
    SearchCheck,
    Send,
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
    anchor?: string;
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
        title: "Auditoría IA para tu negocio",
        anchor: "servicio-auditoria",
        description:
            "En 5 días sabes exactamente qué partes de tu negocio se pueden automatizar, cuánto tiempo ahorrarías y por dónde empezar. Sin compromiso de continuar.",
        includes: [
            "Estudio de hasta 5 procesos de tu negocio",
            "Informe en PDF con recomendaciones claras",
            "Sesión de presentación contigo (vídeo o llamada)",
            "Plan para los siguientes pasos",
        ],
        cta: "Solicitar auditoría",
        asunto: "Auditoría IA para tu negocio",
        icon: SearchCheck,
    },
    {
        badge: "MÁS SOLICITADO",
        badgeTone: "border-white/15 bg-white/[0.06] text-paper",
        price: "desde 590€",
        title: "Automatización a medida",
        anchor: "servicio-automatizacion",
        description:
            "Tu proceso repetitivo deja de hacerse a mano. En 5-7 días tienes el sistema funcionando, conectado a las herramientas que ya usas y con manual claro para tu equipo.",
        includes: [
            "Estudio de tu caso sin coste ni compromiso",
            "Construcción a medida (sin plantillas)",
            "Conexión con las herramientas que ya usas",
            "Manual claro para tu equipo",
            "Soporte durante los primeros 30 días",
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
        anchor: "servicio-agente",
        description:
            "Tu negocio gana un miembro más en el equipo: un asistente IA que atiende lo que tú decidas (clientes, correos, informes, búsquedas internas). Vive en tus propios equipos. No depende de plataformas de terceros.",
        includes: [
            "Asistente que recuerda tu negocio y tu forma de trabajar",
            "Tono ajustado a tu marca y a tus clientes",
            "Conectado a las herramientas que necesites (correo, calendario, búsqueda de archivos, lo que pidas)",
            "Funciona en tus propios equipos o servidor",
            "Manual claro para que tu equipo lo use desde el día 1",
        ],
        cta: "Solicitar agente",
        asunto: "Agente IA privado",
        icon: Bot,
        featured: true,
    },
    {
        badge: "SIN PREOCUPARTE DE NADA",
        badgeTone: "border-purple-400/25 bg-purple-400/10 text-purple-200",
        price: "99€/mes o 199€/mes",
        title: "Mantenimiento de tu agente",
        description:
            "Una vez tu agente esté funcionando, lo mantenemos vivo: vigilamos que vaya bien, lo actualizamos cuando hace falta y te avisamos si algo no funciona. Tú te dedicas a tu negocio.",
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
        asunto: "Mantenimiento de tu agente",
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
        title: "Tu equipo pierde horas haciendo cosas a mano.",
        text: "Pasar datos de un sitio a otro, contestar el mismo email diez veces, generar siempre los mismos informes. Tareas que no aportan valor pero que alguien tiene que hacer.",
    },
    {
        icon: Bot,
        title: "Las herramientas genéricas no encajan con tu negocio.",
        text: "ChatGPT, plantillas y SaaS estándar no entienden cómo trabajas, cómo hablas a tus clientes ni cómo son tus procesos. Acaban arrinconadas porque no resuelven lo tuyo.",
    },
    {
        icon: TriangleAlert,
        title: "No quieres que tus datos acaben en manos de otros.",
        text: "Información de clientes, contratos, conversaciones privadas. Lo que pasa por tu negocio se queda en tu negocio. Sin servidores ajenos, sin telemetría, sin sorpresas.",
    },
];

const STEPS: ReadonlyArray<{ title: string; text: string }> = [
    {
        title: "Auditoría",
        text: "Estudiamos contigo qué procesos repites cada día, cada semana y cada mes. Te entregamos un plan con qué se puede automatizar, en qué orden y cuánto cuesta.",
    },
    {
        title: "Propuesta cerrada",
        text: "Recibes alcance, precio y tiempo por escrito antes de pagar nada. Si no encaja, no hay compromiso.",
    },
    {
        title: "Construcción",
        text: "Construimos el sistema en 5-15 días. Te enseñamos cómo funciona con una demo personalizada antes de entregarlo.",
    },
    {
        title: "Mantenimiento",
        text: "Lo dejamos vivo con un plan mensual o te lo entregamos con manual claro para que tu equipo lo use sin depender de nadie. Tú decides.",
    },
];

const FOR_YES: ReadonlyArray<string> = [
    "Tienes un negocio con procesos que se repiten cada semana o cada mes.",
    "Sabes que pierdes horas en tareas manuales que se podrían automatizar.",
    "Te importa que tus datos no acaben en servidores de otros.",
    "Prefieres una propuesta clara por escrito antes que una presentación de PowerPoint.",
];

const FOR_NO: ReadonlyArray<string> = [
    "Buscas una suscripción mensual genérica que sirva para todo.",
    "Quieres una solución sin estudiar antes qué procesos tienes y cómo los haces.",
    "Necesitas que alguien gestione el cumplimiento legal de tu empresa (eso lo hace tu asesoría).",
    "Quieres decidir hoy sin ver primero qué te proponemos, cuánto cuesta y en cuánto tiempo.",
];

export function ServiciosV2Content() {
    return (
        <main className="min-h-screen bg-onyx text-paper">
            <HeroBlock />
            <SelectorCaminoBlock />
            <ProblemaBlock />
            <MainOffersBlock />
            <ProcesoBlock />
            <ParaQuienBlock />
            <GarantiaFlashBlock />
            <QuienHayDetrasBlock />
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
                    Automatización y seguridad con IA
                </span>
                <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                    Aplicamos IA a tu negocio. Sin humo, sin plantillas, sin perder el
                    control de tus datos.
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Automatizamos procesos repetitivos, construimos agentes a tu medida
                    y protegemos tu información con herramientas de ciberseguridad.
                    Estudio del caso, propuesta cerrada por escrito y entrega con manual
                    claro para tu equipo.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button href="#servicios-principales" size="lg" variant="gradient">
                        Ver servicios <ArrowRight size={16} />
                    </Button>
                    <Button
                        href={`/contacto?asunto=${encodeURIComponent("Auditoría IA para tu negocio")}`}
                        size="lg"
                        variant="secondary"
                    >
                        Solicitar auditoría
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}

function MainOffersBlock() {
    return (
        <section id="servicios-principales" className="px-6 py-20 lg:py-24">
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
                                id={offer.anchor}
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
                                        ? "flex min-h-[640px] scroll-mt-24 flex-col rounded-2xl border border-flash bg-[#111111] p-6 shadow-[0_0_50px_rgba(0,229,255,0.16)]"
                                        : "flex min-h-[640px] scroll-mt-24 flex-col rounded-2xl border border-white/10 bg-[#111111] p-6"
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
                    Cuéntanos qué procesos pierdes a mano cada semana o qué te preocupa
                    de la seguridad de tus datos. Te decimos qué encaja mejor en menos
                    de 24 horas. Sin compromiso, sin venta insistente.
                </p>
                <div className="mt-8 flex flex-col items-center gap-5">
                    <Button href={BRAND.whatsappUrl} size="lg" variant="gradient">
                        <MessageCircle size={18} />
                        WhatsApp {BRAND.phoneDisplay}
                    </Button>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-text-secondary">
                        <a
                            href={`mailto:${BRAND.email}`}
                            className="inline-flex items-center gap-2 transition-colors hover:text-flash"
                        >
                            <Mail size={16} />
                            {BRAND.email}
                        </a>
                        <span className="text-text-muted" aria-hidden>
                            ·
                        </span>
                        <a
                            href={BRAND.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 transition-colors hover:text-flash"
                        >
                            <Send size={16} />
                            @iaflashelite en Telegram
                        </a>
                    </div>
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
                    escrito antes de pagar nada. Si lo que entregamos no cumple lo
                    acordado, lo corregimos sin coste. Y si no logramos resolverlo,
                    buscamos una solución justa contigo.
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

function SelectorCaminoBlock() {
    const caminos = [
        {
            estado: "Estoy explorando",
            situacion:
                "Quiero saber qué se puede automatizar en mi negocio antes de comprometerme.",
            label: "Auditoría",
            href: "#servicio-auditoria",
        },
        {
            estado: "Sé qué automatizar",
            situacion: "Tengo un proceso concreto que me roba horas cada semana.",
            label: "Automatización",
            href: "#servicio-automatizacion",
        },
        {
            estado: "Necesito un asistente",
            situacion: "Quiero una IA propia que atienda tareas en mi negocio.",
            label: "Agente IA",
            href: "#servicio-agente",
        },
    ];
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
                        ¿Por dónde empiezo?
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Elige tu situación y te llevamos a tu servicio.
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {caminos.map((camino, index) => (
                        <motion.a
                            key={camino.href}
                            href={camino.href}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-70px" }}
                            variants={fadeUp}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-0.5 hover:border-flash/30"
                        >
                            <span className="font-semibold text-paper">
                                {camino.estado}
                            </span>
                            <span className="mt-2 text-sm leading-relaxed text-text-secondary">
                                {camino.situacion}
                            </span>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm text-flash">
                                {camino.label}
                                <ArrowRight size={16} />
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

function QuienHayDetrasBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl text-center"
            >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    Quién hay detrás
                </span>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                    8 años de ingeniería. 4 estudiando IA. 2 aplicándola a empresas
                    reales.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-text-secondary">
                    Detrás de IAFlashElite hay un ingeniero de ciberseguridad con 8 años
                    de experiencia, 4 estudiando automatización con IA y 2 trabajando en
                    una empresa importante automatizando procesos en sectores muy
                    distintos: retail, restauración, casas de apuestas, comercio y más.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                    La conclusión de esos años es simple: la IA no es magia. Es saber
                    qué automatizar y hacerlo bien. Eso es lo que aplicamos aquí, sin
                    humo y sin promesas vacías.
                </p>
            </motion.div>
        </section>
    );
}
