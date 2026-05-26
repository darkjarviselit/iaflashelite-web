"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Brain,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock,
    Crown,
    Mail,
    MessageCircle,
    Send,
    ShieldCheck,
    Sparkles,
    TriangleAlert,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

// Mensaje WhatsApp prerellenado por tier / CTA. wa.me no admite el "+".
const waUrl = (message: string) =>
    `https://wa.me/${BRAND.phoneRaw.replace("+", "")}?text=${encodeURIComponent(message)}`;

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

function Eyebrow({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash${
                className ? ` ${className}` : ""
            }`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-flash shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            {children}
        </span>
    );
}

function AprendeDivider() {
    return (
        <div className="mx-auto max-w-7xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
    );
}

type Camino = {
    estado: string;
    situacion: string;
    label: string;
    href: string;
};

const CAMINOS: ReadonlyArray<Camino> = [
    {
        estado: "Quiero explorar a mi ritmo",
        situacion:
            "Cursos grabados con manuales, audios y plantillas listas para aplicar.",
        label: "Ver Ruta Academy →",
        href: "#ruta-academy",
    },
    {
        estado: "Quiero aprender en directo",
        situacion:
            "Sesiones prácticas de 1-2h conmigo y máximo 3 alumnos. Sales con un sistema montado.",
        label: "Ver sesiones →",
        href: "#sesiones-en-directo",
    },
    {
        estado: "Quiero algo solo para mí",
        situacion:
            "Sesión privada VIP 1-a-1. Tú decides qué construimos juntos.",
        label: "Ver VIP →",
        href: "#sesion-vip",
    },
];

const PROBLEMS: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    text: string;
}> = [
    {
        icon: BookOpen,
        title: "Cursos llenos de teoría que no aplicas.",
        text: "Vídeos largos, mil PDFs, y a las 2 semanas no recuerdas nada porque nunca llegaste a tocar nada de verdad.",
    },
    {
        icon: TriangleAlert,
        title: "Gurús que te venden la fórmula mágica.",
        text: "Prometen ventas garantizadas con IA sin que hagas nada. Pagas, ves el curso, y al final no sabes ni montar un prompt decente.",
    },
    {
        icon: Brain,
        title: "Aprendes técnicas sueltas, no un sistema.",
        text: "Un curso de prompts por aquí, otro de Claude Code por allá. Nunca tienes una base sólida que se enlace y produzca algo vendible.",
    },
];

const FOR_YES: ReadonlyArray<string> = [
    "Ya usas ChatGPT, Claude, Gemini, Codex o Claude Code pero sientes que cada conversación empieza de cero.",
    "Quieres dejar de hacer \"chats sueltos\" y construir un sistema de trabajo estable.",
    "Estás dispuesto a trabajar una tarde para configurar tu IA bien hecha.",
    "Te importa más sacar un sistema funcional que sentirte impresionado por humo.",
];

const FOR_NO: ReadonlyArray<string> = [
    "Buscas la fórmula mágica que te genere ingresos sin hacer nada.",
    "Quieres ver vídeos largos sin tocar tu IA en ningún momento.",
    "Esperas que la IA acierte siempre sin que revises lo que produce.",
    "No estás dispuesto a poner tu criterio en el trabajo.",
];

const BUNDLE_INCLUDES: ReadonlyArray<string> = [
    "3 manuales completos (14 + 16 + 19 secciones)",
    "4 audios guía (~16 min en total)",
    "29 plantillas listas para copiar y adaptar",
    "3 checklists finales",
    "Audio bonus: herramientas, ahorro de tokens y mentalidad",
    "Garantía de calidad 14 días",
];

type Course = {
    level: string;
    price: string;
    title: string;
    outcome: string;
    includes: ReadonlyArray<string>;
    duration: string;
    href: string;
    cta: string;
};

const COURSES: ReadonlyArray<Course> = [
    {
        level: "NIVEL BÁSICO · ENTRADA",
        price: "9€",
        title: "Pack Arranque IA",
        outcome:
            "Termina la tarde con tu IA configurada para saber quién eres, qué proyecto quieres construir y cómo debe ayudarte.",
        includes: [
            "Manual completo (14 secciones)",
            "Audio guía 5 min",
            "9 plantillas: Currículum IA, Contexto Maestro, Instrucciones, 5 Skills, CLAUDE.md base",
            "Checklist final + garantía 14 días",
        ],
        duration: "~3,5 horas de trabajo guiado",
        href: "/academia/pack-arranque",
        cta: "Ver detalle del Pack →",
    },
    {
        level: "NIVEL INTERMEDIO",
        price: "19€",
        title: "Sistema IA Pro",
        outcome:
            "Pasas de preguntar cosas sueltas a dirigir un sistema que investiga, planifica, prepara y revisa con vos como director.",
        includes: [
            "Manual completo (16 secciones)",
            "Audio guía 5 min",
            "8 plantillas: 3 Proyectos IA + Prompt 0 + Flujo Candado + Checklists",
            "Garantía 14 días",
        ],
        duration: "~2-3 horas, no en una noche",
        href: "/academia/sistema-ia-pro",
        cta: "Ver detalle →",
    },
    {
        level: "NIVEL APLICADO",
        price: "49€",
        title: "Primer Sistema IA Vendible",
        outcome:
            "Sales con un sistema funcional que puedes ofrecer como servicio: solicitud cliente → análisis IA → respuesta revisada.",
        includes: [
            "Manual completo (19 secciones)",
            "2 audios guía (5,5 min + bonus herramientas/tokens)",
            "12 plantillas: Formulario, Prompt procesador, Plantilla respuesta, 5 adaptaciones sectoriales",
            "Garantía 14 días",
        ],
        duration: "Una sesión de trabajo (varias horas)",
        href: "/academia/primer-sistema-ia-vendible",
        cta: "Ver detalle →",
    },
];

type Tier = {
    anchor?: string;
    featured?: boolean;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    badge: string;
    badgeTone: string;
    price: string;
    priceNote: string;
    title: string;
    duration: string;
    promise: string;
    includes: ReadonlyArray<string>;
    note: { label: string; text: string };
    cta: string;
    waMessage: string;
};

// Orden de render: Fundador · VIP (centro destacada) · Práctica, para que la
// sesión estrella quede en la columna central (md:grid-cols-3).
const TIERS: ReadonlyArray<Tier> = [
    {
        icon: Sparkles,
        badge: "PLAZAS LIMITADAS · OFERTA LANZAMIENTO",
        badgeTone: "border-white/15 bg-white/[0.06] text-paper",
        price: "49€",
        priceNote: "por sesión completa",
        title: "Sesión Fundador",
        duration: "1 hora · 1-3 alumnos",
        promise:
            "Sales con tu primer harness IA configurado y una plantilla del catálogo Academy lista para usar.",
        includes: [
            "1 hora en directo conmigo",
            "1 plantilla Academy a tu elección",
            "Grabación de la sesión (opcional)",
            "Acceso al canal de seguimiento 7 días",
        ],
        note: {
            label: "Límite honesto",
            text: "Esta oferta termina al alcanzar 10 alumnos fundadores. Después este precio no volverá.",
        },
        cta: "Reservar sesión Fundador",
        waMessage: "Hola, quiero reservar Sesión Fundador (49€, 1h).",
    },
    {
        anchor: "sesion-vip",
        featured: true,
        icon: Crown,
        badge: "⭐ PRODUCTO ESTRELLA",
        badgeTone:
            "border-flash/40 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-flash",
        price: "390€",
        priceNote: "sesión privada completa",
        title: "Sesión Privada VIP",
        duration: "2 horas · 1 alumno · Tema 100% personalizado",
        promise:
            "Tú decides qué construimos juntos. Yo solo trabajando contigo, dirigiendo y revisando en vivo. Sales con tu producto, tu sistema o tu flujo concreto montado.",
        includes: [
            "Pre-call gratuito de 15 min para acordar tema y objetivo",
            "2 horas en directo conmigo, 1-a-1",
            "Tema y entregable 100% personalizado a tu negocio",
            "Plantillas Academy adaptadas a tu caso",
            "Grabación + transcripción + canal de seguimiento 30 días",
            "Sesión de seguimiento opcional 30 días después (50% descuento)",
        ],
        note: {
            label: "Cómo empieza",
            text: "Antes de pagar agendamos un pre-call gratuito de 15 min para acordar exactamente qué vas a construir.",
        },
        cta: "Solicitar sesión VIP",
        waMessage: "Hola, quiero solicitar Sesión Privada VIP (390€, 2h).",
    },
    {
        icon: Users,
        badge: "MÁS POPULAR",
        badgeTone: "border-cyan-400/25 bg-cyan-400/10 text-flash",
        price: "149€",
        priceNote: "por alumno",
        title: "Sesión Práctica",
        duration: "2 horas · 1-3 alumnos",
        promise:
            "Sales con tu primer sistema IA vendible montado durante la sesión. Tema fijo elegido por mí para que aproveche al máximo a todos.",
        includes: [
            "2 horas en directo conmigo dirigiendo",
            "Tema fijo: monta tu sistema vendible",
            "Plantillas Academy aplicadas",
            "Grabación + canal de seguimiento 14 días",
            "Tu producto montado al terminar",
        ],
        note: {
            label: "Info",
            text: "Si solo se apunta 1 alumno, la sesión se hace igual.",
        },
        cta: "Reservar Sesión Práctica",
        waMessage: "Hola, quiero reservar Sesión Práctica (149€/alumno, 2h).",
    },
];

const STEPS: ReadonlyArray<{ title: string; text: string }> = [
    {
        title: "Reservas",
        text: "Eliges tier y reservas tu plaza. Para VIP, agendamos pre-call de 15 min para acordar exactamente qué quieres construir.",
    },
    {
        title: "Te preparo el entorno",
        text: "Antes de la sesión, te envío los materiales que necesitas instalados y configurados. Llegas listo, sin perder ni un minuto en setup.",
    },
    {
        title: "Sesión en directo",
        text: "Yo dirijo en tiempo real: tú prompt → yo pego respuesta → mientras dirijo, reviso y aseguro que todo va bien. Tu trabajo es decidir; el mío que salga bien.",
    },
    {
        title: "Te llevas tu sistema",
        text: "Al terminar tienes la grabación, las plantillas aplicadas, y acceso al canal de seguimiento para resolver dudas durante 7/14/30 días según tier.",
    },
];

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
    {
        q: "¿Por qué los cursos no tienen vídeo?",
        a: "Porque el valor no está en verme hablar, sino en lo que te llevas para usar hoy: manuales con los prompts copiables enteros, 29 plantillas listas y audios guía de acompañamiento. Es formato para aplicar mientras lees, no para mirar.",
    },
    {
        q: "¿Para qué quiero plantillas?",
        a: "Son el atajo. En vez de inventar desde cero, copias el Currículum IA, el Prompt 0, el prompt procesador, etc., y solo cambias tu sector y tus datos. Una plantilla que no describe tu realidad no sirve, por eso están hechas para personalizarse.",
    },
    {
        q: "¿Es para mí si no soy técnico?",
        a: "Sí. El Pack Arranque está pensado para usuarios no expertos, y Sistema IA Pro dice literal 'con método aunque no seas programador'. No escribes código: diriges la IA. Si nunca has tocado Claude Code, empiezas por el primer pack y vas subiendo.",
    },
    {
        q: "¿En cuánto tiempo lo aplico?",
        a: "Pack Arranque está minutado para una tarde (~3,5h) con entregables reales en cada paso. Sistema IA Pro y Primer Sistema Vendible son sesiones de trabajo de varias horas. No es teoría para acumular: cada pack termina con una prueba real hecha.",
    },
];

export function AprendeContent() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-onyx text-paper">
            <div
                className="pointer-events-none fixed left-0 top-1/4 z-0 h-[600px] w-[600px] rounded-full bg-flash/[0.05] blur-[120px]"
                aria-hidden
            />
            <div
                className="pointer-events-none fixed right-0 top-3/4 z-0 h-[500px] w-[500px] rounded-full bg-purple-400/[0.04] blur-[100px]"
                aria-hidden
            />
            <div className="relative z-10">
                <HeroBlock />
                <SelectorCaminoBlock />
                <AprendeDivider />
                <ProblemaBlock />
                <AprendeDivider />
                <ParaQuienBlock />
                <AprendeDivider />
                <RutaAcademyBlock />
                <AprendeDivider />
                <CursosDirectoBlock />
                <ComoFuncionaBlock />
                <AprendeDivider />
                <GarantiaBlock />
                <AprendeDivider />
                <QuienEnsenaBlock />
                <FaqBlock />
                <AprendeDivider />
                <FinalCtaBlock />
            </div>
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
            <div
                className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)]"
                aria-hidden
            />
            <div
                className="absolute left-0 top-0 z-0 h-80 w-80 bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)]"
                aria-hidden
            />
            <div
                className="absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
                aria-hidden
            />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center"
            >
                <Eyebrow className="mx-auto w-fit">Aprende conmigo</Eyebrow>
                <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                    De chats sueltos a un sistema IA que puedes vender.
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Cursos grabados con manual + audio + plantillas listas, y sesiones
                    en directo donde sales con tu propio sistema montado. Sin humo. Sin
                    gurús. Sin perder el control de tus datos.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button href="#ruta-academy" size="lg" variant="gradient">
                        Ver Ruta Academy <ArrowRight size={16} />
                    </Button>
                    <Button href="#sesiones-en-directo" size="lg" variant="secondary">
                        Reservar sesión privada
                    </Button>
                </div>
                <div className="mt-20 hidden flex-col items-center gap-2 text-text-secondary/50 md:flex">
                    <span className="text-xs">Desplázate</span>
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}

function SelectorCaminoBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow>¿Por dónde empiezo?</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Elige cómo quieres aprender.
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {CAMINOS.map((camino, index) => (
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
                            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-flash/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
                        >
                            <span className="font-semibold text-paper">
                                {camino.estado}
                            </span>
                            <span className="mt-2 text-sm leading-relaxed text-text-secondary">
                                {camino.situacion}
                            </span>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm text-flash">
                                {camino.label}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProblemaBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow>El problema</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Compras cursos. No terminas ninguno.
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
                                className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-flash/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
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

function ParaQuienBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow>Honestidad antes que humo</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Esto NO es un curso de guru.
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-70px" }}
                        variants={fadeUp}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl border border-flash/20 bg-white/[0.04] p-8"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-paper">
                            Encaja contigo si...
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
                        className="rounded-3xl border border-red-500/20 bg-white/[0.04] p-8"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-paper">
                            NO es para ti si...
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

function RutaAcademyBlock() {
    return (
        <section
            id="ruta-academy"
            className="scroll-mt-24 px-6 py-16 lg:py-20"
        >
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow className="mx-auto w-fit">Ruta Academy</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        De cero a un sistema IA vendible. En 3 packs.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-text-secondary">
                        3 cursos que se enlazan entre sí. Cada uno parte del anterior. Si
                        compras los 3 sueltos pagas 77€. Cómpralos juntos por 59€ y
                        ahorras 18€.
                    </p>
                </motion.div>

                <motion.article
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-col rounded-2xl border border-flash bg-[#111111] p-8 shadow-[0_0_50px_rgba(0,229,255,0.16)]"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="inline-flex rounded-full border border-flash/40 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-flash">
                            Recomendado · Ahorras 18€
                        </span>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-bold tracking-tight text-paper">
                                59€
                            </span>
                            <span className="pb-1 text-xl font-medium text-text-muted line-through">
                                77€
                            </span>
                        </div>
                    </div>

                    <h3 className="mt-8 text-3xl font-bold tracking-tight text-paper">
                        Ruta Academy completa
                    </h3>
                    <p className="mt-3 text-base font-medium text-flash">
                        Los 3 cursos juntos: Pack Arranque + Sistema IA Pro + Primer
                        Sistema Vendible.
                    </p>
                    <p className="mt-5 text-sm leading-7 text-text-secondary">
                        Empiezas configurando tu IA desde cero (Pack Arranque). Aprendes a
                        dirigirla con método y control (Sistema IA Pro). Y por último la
                        conviertes en un servicio real orientado a cliente (Primer Sistema
                        Vendible). Los 3 manuales se referencian entre sí. Sales con un
                        sistema completo y un primer producto vendible.
                    </p>

                    <div className="mt-7 border-t border-white/10 pt-6">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                            Incluye
                        </span>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                            {BUNDLE_INCLUDES.map((item) => (
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

                    {/* TODO(backlog): checkout directo del bundle Ruta Academy.
                        Por ahora placeholder no-navegable; la venta se canaliza por
                        WhatsApp hasta que exista el SKU comprable. */}
                    <button
                        type="button"
                        aria-disabled="true"
                        title="Pronto disponible para compra directa. Mientras tanto, escríbeme por WhatsApp."
                        onClick={(event) => event.preventDefault()}
                        className="mt-8 inline-flex h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#00e5ff_0%,#00b8d4_100%)] px-7 text-base font-semibold tracking-tight text-onyx opacity-90"
                    >
                        Comprar Ruta Academy · 59€
                    </button>
                    <span className="mt-3 text-center text-xs text-text-muted">
                        Pronto disponible para compra directa. Mientras tanto, escríbeme
                        por WhatsApp.
                    </span>
                </motion.article>

                <div className="mt-6 grid gap-5 md:grid-cols-3">
                    {COURSES.map((course, index) => (
                        <motion.article
                            key={course.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-70px" }}
                            variants={fadeUp}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-flash/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                        >
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flash/70">
                                {course.level}
                            </span>
                            <span className="mt-4 text-3xl font-bold tracking-tight text-paper">
                                {course.price}
                            </span>
                            <h3 className="mt-3 text-xl font-bold tracking-tight text-paper">
                                {course.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-text-secondary">
                                {course.outcome}
                            </p>

                            <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-5">
                                {course.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-xs leading-5 text-text-secondary"
                                    >
                                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flash" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <span className="mt-5 inline-flex items-center gap-2 text-xs text-text-muted">
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                {course.duration}
                            </span>

                            <Link
                                href={course.href}
                                className="mt-auto pt-6 text-sm font-medium text-flash transition-colors hover:text-cyan-300"
                            >
                                {course.cta}
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CursosDirectoBlock() {
    return (
        <section
            id="sesiones-en-directo"
            className="scroll-mt-24 px-6 py-16 lg:py-20"
        >
            <div className="mx-auto max-w-[1200px]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow className="mx-auto w-fit">Cursos en directo</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Conmigo, en vivo. Sales con tu sistema montado.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-text-secondary">
                        Cursos en directo de 1-2 horas. Máximo 3 alumnos. Sin teoría: te
                        dirijo en tiempo real para que salgas del directo con algo
                        funcional construido por ti.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-text-secondary">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-flash" />
                        Disponibilidad: viernes tarde · sábados completos · domingos por
                        la mañana
                    </span>
                </motion.div>

                <div className="mt-12 grid items-start gap-5 md:grid-cols-3">
                    {TIERS.map((tier, index) => {
                        const Icon = tier.icon;
                        return (
                            <motion.article
                                key={tier.title}
                                id={tier.anchor}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-70px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={
                                    tier.featured
                                        ? "flex scroll-mt-24 flex-col rounded-2xl border border-flash bg-[#111111] p-6 shadow-[0_0_50px_rgba(0,229,255,0.16)] md:-mt-4 md:pb-10"
                                        : "flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-flash/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                                }
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${tier.badgeTone}`}
                                    >
                                        {tier.badge}
                                    </span>
                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-flash">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                </div>

                                <div className="mt-8 flex flex-col gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-paper">
                                        {tier.price}
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                                        {tier.priceNote}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-2xl font-bold tracking-tight text-paper">
                                    {tier.title}
                                </h3>
                                <span className="mt-2 text-sm text-flash">
                                    {tier.duration}
                                </span>
                                <p className="mt-4 text-sm leading-7 text-text-secondary">
                                    {tier.promise}
                                </p>

                                <div className="mt-7 border-t border-white/10 pt-6">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                                        Incluye
                                    </span>
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {tier.includes.map((item) => (
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

                                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-flash">
                                        {tier.note.label}
                                    </span>
                                    <p className="mt-2 text-xs leading-5 text-text-secondary">
                                        {tier.note.text}
                                    </p>
                                </div>

                                <Button
                                    href={waUrl(tier.waMessage)}
                                    variant="gradient"
                                    className="mt-8 w-full"
                                >
                                    <MessageCircle size={16} />
                                    {tier.cta}
                                </Button>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ComoFuncionaBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <Eyebrow>Cómo funciona</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        De la reserva al producto montado, en 4 pasos.
                    </h2>
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
                            className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                        >
                            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-flash/40 bg-gradient-to-br from-flash/30 to-purple-400/20 text-xl font-bold text-flash shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                                {index + 1}
                            </span>
                            <h3 className="mb-2 text-base font-semibold text-paper">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary">
                                {step.text}
                            </p>
                            {index < STEPS.length - 1 ? (
                                <span
                                    className="absolute -right-[10px] top-9 hidden h-px w-5 bg-gradient-to-r from-flash/40 to-transparent lg:block"
                                    aria-hidden
                                />
                            ) : null}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GarantiaBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
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
                <Eyebrow className="mt-6">Garantía</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                    Si no cumple, lo corregimos.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                    Cursos grabados con garantía de calidad de 14 días. Sesiones en
                    directo con compromiso de calidad: si al terminar no tienes lo
                    prometido, lo solucionamos sin coste.
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

function QuienEnsenaBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl text-center"
            >
                <Eyebrow className="mx-auto w-fit">Quién enseña</Eyebrow>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                    Soy Oscar. No soy gurú.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-text-secondary">
                    Soy ingeniero informático con 8 años en ciberseguridad y 4 estudiando
                    y aplicando IA. Llevo 2 años trabajando en una empresa española
                    automatizando procesos reales en sectores muy distintos: retail,
                    restauración, comercio online, casas de apuestas. Los 3 cursos que
                    vendo aquí son el sistema que uso yo cada día. Las sesiones en directo
                    son cómo trabajo yo, paso a paso, sin filtros.
                </p>
            </motion.div>
        </section>
    );
}

function FaqBlock() {
    return (
        <section className="px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <Eyebrow className="mx-auto w-fit">Preguntas frecuentes</Eyebrow>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Antes de comprar.
                    </h2>
                </motion.div>

                <div className="mt-12 flex flex-col gap-4">
                    {FAQS.map((faq) => (
                        <details
                            key={faq.q}
                            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-paper">
                                {faq.q}
                                <ChevronDown className="h-5 w-5 shrink-0 text-flash transition-transform duration-300 group-open:rotate-180" />
                            </summary>
                            <p className="mt-4 text-sm leading-7 text-text-secondary">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FinalCtaBlock() {
    const waMessage =
        "Hola, vengo de iaflashelite.com/aprende y me gustaría comentar:";
    return (
        <section className="px-6 py-16 lg:py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-white/10 bg-[#111111] p-8 text-center sm:p-12"
            >
                <Eyebrow className="mx-auto w-fit">
                    ¿No sabes por dónde empezar?
                </Eyebrow>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                    Cuéntame qué quieres construir.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                    Te digo en menos de 24 horas qué te encaja mejor entre la Ruta Academy
                    y las sesiones en directo. Sin venta insistente, sin compromiso.
                </p>
                <div className="mt-8 flex flex-col items-center gap-5">
                    <Button href={waUrl(waMessage)} size="lg" variant="gradient">
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
