"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    ChevronDown,
    DatabaseBackup,
    EyeOff,
    FileCheck,
    FileSearch,
    GitFork,
    HardDrive,
    Link2,
    Lock,
    MailWarning,
    MessageCircle,
    RotateCcw,
    ScanSearch,
    ShieldCheck,
    X,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { BRAND, PRODUCTS } from "@/lib/constants";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

function waLink(message: string): string {
    return `https://wa.me/${BRAND.phoneRaw.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

const WA_HERO = waLink(
    "Hola, vengo desde iaflashelite.com/seguridad y quiero hablar con el equipo",
);
const WA_FINAL = waLink(
    "Hola, vengo desde iaflashelite.com/seguridad y tengo preguntas sobre seguridad",
);

// Precio "desde X€" leído de constants.ts. Misma fuente de verdad que el
// checkout: nunca se hardcodea un precio en el JSX.
function priceLabel(slug: string): string {
    const product = PRODUCTS.find((item) => item.slug === slug);
    return product ? `desde ${product.price}€` : "Consultar";
}

const PILARES: ReadonlyArray<{
    icon: IconComponent;
    title: string;
    description: string;
}> = [
    {
        icon: HardDrive,
        title: "Local-first",
        description:
            "Tus datos viven en tu ordenador. No en nuestros servidores. No en nube de Google. No en gestor de nadie. Tuyos siempre.",
    },
    {
        icon: FileSearch,
        title: "Código auditable",
        description:
            "Nada de cajas negras. Todo lo que entregamos puede leerse, inspeccionarse y entenderse. Si no lo entiendes, te lo explicamos.",
    },
    {
        icon: ShieldCheck,
        title: "Cero humo",
        description:
            "No prometemos lo que no podemos cumplir. No vendemos visiones. Vendemos productos funcionales y entregables.",
    },
];

const PRACTICAS: ReadonlyArray<{
    icon: IconComponent;
    title: string;
    description: string;
}> = [
    {
        icon: FileCheck,
        title: "Auditas tú con IA",
        description:
            "Antes de comprar, le pides a Claude o ChatGPT que audite el código del producto. Si algo te huele mal, no compras.",
    },
    {
        icon: Lock,
        title: "Datos en tu máquina",
        description:
            "Los productos descargables funcionan en tu ordenador. Tus datos no pasan por nuestros servidores. Tu Mac, tu disco, tu control.",
    },
    {
        icon: EyeOff,
        title: "Cero telemetría",
        description:
            "No mandamos analytics, no rastreamos uso, no recolectamos datos de cómo usas las herramientas. Las descargas y se acabó la relación con nosotros.",
    },
    {
        icon: GitFork,
        title: "Sin plantillas reutilizadas",
        description:
            "Cada producto tiene su código propio. No vendemos el mismo template reciclado a 100 clientes con cambios cosméticos.",
    },
    {
        icon: RotateCcw,
        title: "Devolución 14 días",
        description:
            "Si no funciona como describimos, devolución sin preguntas. Compra protegida real, no marketing.",
    },
];

const COMPARISON: ReadonlyArray<{
    criterio: string;
    flash: string;
    generico: string;
}> = [
    {
        criterio: "Código propio",
        flash: "Tuyo",
        generico: "Propietario de la plataforma",
    },
    {
        criterio: "Auditable",
        flash: "Revisable con IA",
        generico: "Caja negra",
    },
    {
        criterio: "Sin plantillas reutilizadas",
        flash: "Código propio por producto",
        generico: "Mismo template para todos",
    },
    {
        criterio: "Datos",
        flash: "En tu servidor",
        generico: "En la nube de la plataforma",
    },
    {
        criterio: "Compra protegida",
        flash: "Devolución 14 días",
        generico: "Suscripción mensual",
    },
    {
        criterio: "Documentación",
        flash: "Guía técnica + no-técnica",
        generico: "Wiki genérica",
    },
    {
        criterio: "Precio",
        flash: "Pago único desde 19€",
        generico: "Suscripción mensual",
    },
    {
        criterio: "Dependencia",
        flash: "Funciona offline",
        generico: "Requiere conexión y cuenta activa",
    },
];

const PRODUCTOS: ReadonlyArray<{
    slug: string;
    title: string;
    description: string;
    icon: IconComponent;
}> = [
    {
        slug: "auditor-web",
        title: "Auditor Web Rápido",
        description: "Escanea tu web en 5 minutos. Reporte PDF con prioridades.",
        icon: ScanSearch,
    },
    {
        slug: "anti-phishing",
        title: "Anti-Phishing Emails",
        description:
            "Pega un email sospechoso. Veredicto en 30 segundos. 100% offline.",
        icon: MailWarning,
    },
    {
        slug: "verificador-urls",
        title: "Verificador de URLs",
        description: "Pega un link y te decimos si es seguro antes de clicar.",
        icon: Link2,
    },
    {
        slug: "backup-cifrado",
        title: "Backup Cifrado Mac",
        description: "Copia cifrada diaria y automática en tu Mac. Sin suscripción.",
        icon: DatabaseBackup,
    },
];

const NO_PROMETEMOS: ReadonlyArray<{ title: string; description: string }> = [
    {
        title: "NO somos SOC 2 Type 2",
        description:
            "No tenemos auditoría compliance enterprise. Si la necesitas, Vercel o AWS son tu opción.",
    },
    {
        title: "NO somos ISO 27001",
        description:
            "Cero certificación internacional de gestión de seguridad. No la hemos pagado.",
    },
    {
        title: "NO hacemos pen testing de terceros",
        description:
            "No contratamos auditores externos. El que audita el código eres tú con tu IA.",
    },
    {
        title: "NO ofrecemos SLA enterprise",
        description:
            "Sin compromisos de uptime contractuales. Somos un equipo pequeño, no Microsoft.",
    },
];

const SI_DAMOS: ReadonlyArray<{ title: string; description: string }> = [
    {
        title: "SÍ código auditable",
        description:
            "El código viaja contigo, lo puedes leer entero antes y después de comprar.",
    },
    {
        title: "SÍ datos locales",
        description: "Tu Mac. Tu disco. Sin pasar por nadie.",
    },
    {
        title: "SÍ devolución 14 días",
        description: "Si no funciona, te devolvemos sin preguntas.",
    },
    {
        title: "SÍ honestidad pre-venta",
        description: "Si tu caso no encaja, te lo decimos antes de cobrarte.",
    },
];

const FAQS: ReadonlyArray<{ q: string; a: ReactNode }> = [
    {
        q: "¿Cumplís RGPD?",
        a: (
            <>
                Cuando vendemos productos descargables, recogemos: email para enviar
                el archivo, datos de PayPal para procesar pago. Nada más. No
                recolectamos datos de uso. Política completa en{" "}
                <Link
                    href="/legal/privacidad"
                    className="text-cyan-400 underline hover:no-underline"
                >
                    /legal/privacidad
                </Link>
                .
            </>
        ),
    },
    {
        q: "¿Cifráis los datos del cliente?",
        a: "Los productos descargables funcionan en tu ordenador. Tus datos sensibles nunca llegan a nuestros servidores. Lo que pasa en tu Mac, se queda en tu Mac.",
    },
    {
        q: "¿Qué subprocesadores usáis?",
        a: "Vercel (hosting de esta web), PayPal (pagos), Gmail (envío de productos). Esos son los únicos terceros que ven datos parciales del proceso de compra.",
    },
    {
        q: "¿Qué hago si encuentro un bug de seguridad?",
        a: (
            <>
                Escríbenos a{" "}
                <a
                    href={`mailto:${BRAND.email}?subject=Bug%20de%20seguridad`}
                    className="text-cyan-400 underline hover:no-underline"
                >
                    {BRAND.email}
                </a>{" "}
                con "Bug de seguridad" en el asunto. Respondemos en 24h. No tenemos
                programa de bug bounty pagado todavía, pero reconocemos públicamente a
                quien reporta.
            </>
        ),
    },
    {
        q: "¿Puedo auditar el código antes de comprar?",
        a: (
            <>
                Sí. Para cada producto en{" "}
                <Link
                    href="/productos"
                    className="text-cyan-400 underline hover:no-underline"
                >
                    /productos
                </Link>{" "}
                hay descripción técnica detallada. Si necesitas más detalles,
                escríbenos antes de comprar. Si compras y no es lo que esperabas, 14
                días para devolución.
            </>
        ),
    },
];

const primaryBtn =
    "inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-cyan-400";
const secondaryBtn =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-cyan-500/40 hover:bg-white/[0.03]";

function Eyebrow({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 ${className ?? ""}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            {children}
        </span>
    );
}

function SeguridadDivider() {
    return (
        <div className="mx-auto max-w-7xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
    );
}

function SectionHeader({
    eyebrow,
    title,
    subtitle,
    center,
}: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    center?: boolean;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.45, ease }}
            className={center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}
        >
            <Eyebrow className={center ? "mx-auto w-fit" : undefined}>
                {eyebrow}
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-5 text-base leading-7 text-white/60 md:text-lg">
                    {subtitle}
                </p>
            ) : null}
        </motion.div>
    );
}

export function SeguridadContent() {
    return (
        <main className="relative overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none fixed right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px]"
            />
            <div
                aria-hidden
                className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[120px]"
            />

            {/* BLOQUE 1 — HERO MANIFIESTO */}
            <section className="px-4 py-24 text-center md:px-6 md:py-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease }}
                    className="mx-auto flex max-w-4xl flex-col items-center gap-6"
                >
                    <Eyebrow>Seguridad</Eyebrow>
                    <h1 className="text-4xl font-bold tracking-tight leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                        La seguridad no se promete.
                        <br />
                        <span className="text-cyan-400">Se enseña.</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/70 md:text-xl">
                        Productos auditables, locales y sin humo. Sin certificaciones
                        que no tenemos. Sin promesas que no podemos cumplir.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                        <a href="#productos" className={primaryBtn}>
                            Ver productos <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href={WA_HERO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={secondaryBtn}
                        >
                            <MessageCircle className="h-4 w-4" />
                            Habla con el equipo
                        </a>
                    </div>
                </motion.div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 2 — TRES PRINCIPIOS NO NEGOCIABLES */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
                <SectionHeader eyebrow="Tres reglas" title="Que no rompemos." />
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {PILARES.map((pilar, idx) => {
                        const Icon = pilar.icon;
                        return (
                            <motion.article
                                key={pilar.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: idx * 0.08,
                                    ease,
                                }}
                                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                            >
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                    <Icon className="h-6 w-6" />
                                </span>
                                <h3 className="text-xl font-semibold text-white">
                                    {pilar.title}
                                </h3>
                                <p className="text-sm leading-7 text-white/70">
                                    {pilar.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 3 — CÓMO LO HACEMOS */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
                <SectionHeader
                    eyebrow="Cómo lo hacemos"
                    title="5 prácticas reales, no slogans."
                />
                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    {PRACTICAS.map((practica, idx) => {
                        const Icon = practica.icon;
                        return (
                            <motion.article
                                key={practica.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: idx * 0.06,
                                    ease,
                                }}
                                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                            >
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        {practica.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-white/70">
                                        {practica.description}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 4 — VS ALTERNATIVAS (genérico, sin nombres) */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
                <SectionHeader
                    eyebrow="Comparativa"
                    title="IAFlashElite vs herramientas no-code genéricas."
                    subtitle="Comparativa honesta. No te decimos que somos mejores en todo: te decimos en qué somos distintos."
                />

                {/* Desktop: tabla */}
                <div className="mt-12 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-sm text-white/50">
                                <th className="px-5 py-4 font-semibold">Criterio</th>
                                <th className="px-5 py-4 font-semibold text-cyan-400">
                                    IAFlashElite
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Herramientas no-code genéricas
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row) => (
                                <tr
                                    key={row.criterio}
                                    className="border-b border-white/10 last:border-0"
                                >
                                    <th className="px-5 py-4 text-sm font-semibold text-white">
                                        {row.criterio}
                                    </th>
                                    <td className="px-5 py-4 text-sm">
                                        <span className="inline-flex items-center gap-2 text-white">
                                            <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                                            {row.flash}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <span className="inline-flex items-center gap-2 text-white/55">
                                            <X className="h-4 w-4 shrink-0 text-red-400/70" />
                                            {row.generico}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: cards */}
                <div className="mt-12 flex flex-col gap-4 md:hidden">
                    {COMPARISON.map((row) => (
                        <div
                            key={row.criterio}
                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                        >
                            <p className="text-sm font-semibold text-white">
                                {row.criterio}
                            </p>
                            <div className="mt-3 flex flex-col gap-2">
                                <span className="inline-flex items-center gap-2 text-sm text-white">
                                    <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                                    {row.flash}
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm text-white/55">
                                    <X className="h-4 w-4 shrink-0 text-red-400/70" />
                                    {row.generico}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 5 — PRODUCTOS DE SEGURIDAD */}
            <section
                id="productos"
                className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8"
            >
                <SectionHeader
                    eyebrow="Productos"
                    title="Herramientas que ya puedes descargar."
                    subtitle="Pago único. Sin suscripción. Auditables."
                />
                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {PRODUCTOS.map((producto, idx) => {
                        const Icon = producto.icon;
                        return (
                            <motion.div
                                key={producto.slug}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                transition={{
                                    duration: 0.45,
                                    delay: idx * 0.06,
                                    ease,
                                }}
                            >
                                <Link
                                    href={`/productos/${producto.slug}`}
                                    className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-white">
                                        {producto.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-white/70">
                                        {producto.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-2">
                                        <span className="text-sm font-semibold text-cyan-400">
                                            {priceLabel(producto.slug)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors group-hover:text-cyan-400">
                                            Ver producto{" "}
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 6 — LO QUE NO PROMETEMOS */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
                <SectionHeader
                    eyebrow="Honestidad radical"
                    title="Lo que NO prometemos."
                    subtitle="Esto es lo que un comercial nunca te dirá. Léelo."
                />
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        {NO_PROMETEMOS.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-start gap-4 rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5"
                            >
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400/80">
                                    <X className="h-5 w-5" />
                                </span>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-base font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-white/65">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {SI_DAMOS.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-start gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.04] p-5"
                            >
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                    <Check className="h-5 w-5" />
                                </span>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-base font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-white/65">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 7 — FAQ HONESTO */}
            <section className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-32">
                <SectionHeader
                    eyebrow="Preguntas honestas"
                    title="Lo que la gente nos pregunta de verdad."
                    center
                />
                <div className="mt-12 flex flex-col gap-4">
                    {FAQS.map((faq) => (
                        <details
                            key={faq.q}
                            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                                {faq.q}
                                <ChevronDown className="h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-300 group-open:rotate-180" />
                            </summary>
                            <p className="mt-4 text-sm leading-7 text-white/70">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            <SeguridadDivider />

            {/* BLOQUE 8 — CTA FINAL */}
            <section className="px-4 py-24 md:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease }}
                    className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
                >
                    <Eyebrow className="mx-auto w-fit">Empecemos</Eyebrow>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Audita el código antes de comprar.
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-white/60 md:text-lg">
                        Si tienes dudas técnicas, escríbenos. Si quieres ver los
                        productos, aquí abajo.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/productos" className={primaryBtn}>
                            Ver productos <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                            href={WA_FINAL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={secondaryBtn}
                        >
                            <MessageCircle className="h-4 w-4" />
                            Hablar con el equipo
                        </a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
