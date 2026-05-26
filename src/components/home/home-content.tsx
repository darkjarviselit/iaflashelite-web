"use client";

import { motion } from "framer-motion";
import {
    Boxes,
    Check,
    ChevronDown,
    ChevronRight,
    Dices,
    FileSearch,
    Globe,
    GraduationCap,
    HardDrive,
    Mail,
    MessageCircle,
    Monitor,
    Send,
    Shield,
    ShieldCheck,
    ShoppingBag,
    UtensilsCrossed,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const WHATSAPP_HOME =
    "https://wa.me/34603315247?text=Hola%2C%20vengo%20desde%20la%20home%20de%20iaflashelite.com%20y%20quiero%20hablar%20con%20el%20equipo";
const WHATSAPP_HABLAR =
    "https://wa.me/34603315247?text=Hola%2C%20vengo%20desde%20la%20home%20de%20iaflashelite.com%20y%20quiero%20hablar%20con%20el%20equipo";
const WHATSAPP_FINAL =
    "https://wa.me/34603315247?text=Hola%2C%20vengo%20desde%20iaflashelite.com";
const MAILTO =
    "mailto:iaflashelite@gmail.com?subject=Vengo%20desde%20iaflashelite.com";
const TELEGRAM = "https://t.me/iaflashelite";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

const viewportOnce = { once: true, margin: "-80px" };
const ease = [0.22, 1, 0.36, 1] as const;

function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            {children}
        </span>
    );
}

function HomeDivider() {
    return (
        <div className="mx-auto max-w-7xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
    );
}

function Section({
    id,
    children,
    className,
}: {
    id?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            id={id}
            className={`mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:px-8${
                className ? ` ${className}` : ""
            }`}
        >
            {children}
        </section>
    );
}

export default function HomeContent() {
    return (
        <main className="relative overflow-hidden">
            {/* Ambient global: el body ya aporta el fondo #0a0a0a fijo; los orbs
                viven detrás del contenido translúcido (glassmorphism). */}
            <div
                aria-hidden
                className="pointer-events-none fixed right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px]"
            />
            <div
                aria-hidden
                className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[120px]"
            />

            <HeroBlock />
            <CredibilidadBlock />
            <HomeDivider />
            <SelectorBlock />
            <HomeDivider />
            <ProductBlock
                id="noxis"
                number="1.0"
                name="Noxis"
                title="La capa de seguridad e inteligencia que vive en tu ordenador."
                paragraph="Local-first absoluto. Vigilancia web 24/7. Copiloto que habla en cristiano, no en jerga. App nativa de escritorio. Tus datos cifrados en tu máquina. Nadie más los ve."
                bullets={[
                    "Vigilancia continua de tu web y avisos en lenguaje humano",
                    "Copiloto que conecta los puntos: web, correo, calendario, marketing",
                    "Datos cifrados localmente. Cero servidor. Cero terceros.",
                ]}
                ctaLabel="Ver Noxis →"
                ctaHref="/noxis"
                reverse={false}
                visual={
                    <DesktopMockup
                        icon={Monitor}
                        title="Noxis Desktop"
                        meta="macOS · Windows"
                    />
                }
            />
            <HomeDivider />
            <ProductBlock
                id="kenvo"
                number="2.0"
                name="Kenvo"
                title="Tu gestor de tareas e ingresos en una sola app de escritorio."
                paragraph="App nativa. Pago único. Sin nube ajena. Sin suscripción mensual. Funciona offline. Tareas, ingresos y clientes en una sola pantalla, viviendo en tu ordenador."
                bullets={[
                    "Tareas, ingresos y clientes en una sola pantalla",
                    "Pago único: descarga, instala, dueño para siempre",
                    "Funciona offline. Sin conexión obligatoria. Sin telemetría.",
                ]}
                ctaLabel="Ver Kenvo →"
                ctaHref="/kenvo"
                reverse={true}
                visual={
                    <DesktopMockup
                        icon={Boxes}
                        title="Kenvo Desktop"
                        meta=".dmg / .exe"
                    />
                }
            />
            <HomeDivider />
            <ProductBlock
                id="aprende"
                number="3.0"
                name="Aprende"
                title="De chats sueltos a un sistema IA que tu empresa puede usar de verdad."
                paragraph="3 cursos. Bundle 59€ (ahorras 18€). 3 sesiones en directo desde 49€. La sesión VIP es 1 alumno, 2 horas, 100% personalizada al problema real de tu negocio."
                bullets={[
                    "Ruta Academy: bundle 59€ — 3 cursos + plantillas + audios",
                    "Sesiones en directo: Fundador 49€ · Práctica 149€ · VIP 390€",
                    "Cero humo. Prometemos sistema funcional, no ventas garantizadas.",
                ]}
                ctaLabel="Ver formación →"
                ctaHref="/aprende"
                reverse={false}
                visual={<AprendeVisual />}
            />
            <HomeDivider />
            <ProductBlock
                id="servicios"
                number="4.0"
                name="Servicios"
                title="Proyectos a medida con revisión humana y código auditable."
                paragraph="Auditoría inicial gratuita. Implementación con código que tu equipo puede leer. Formación incluida. Sin cajas negras. Sin promesas vacías. Probado en retail, restauración, comercio online y casas de apuestas."
                bullets={[
                    "Auditoría inicial gratuita: sin compromiso, sin script de venta",
                    "Código auditable: nada de cajas negras, todo inspeccionable",
                    "Sectores probados: retail, restauración, e-commerce, apuestas",
                ]}
                ctaLabel="Ver servicios →"
                ctaHref="/servicios"
                reverse={true}
                visual={<ServiciosVisual />}
            />
            <HomeDivider />
            <WhyBlock />
            <HomeDivider />
            <FounderBlock />
            <HomeDivider />
            <FinalCtaBlock />
        </main>
    );
}

function HeroBlock() {
    return (
        <section className="relative overflow-hidden px-4 py-32 md:px-6 md:py-48">
            <div
                aria-hidden
                className="absolute inset-0 -z-[1]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
                }}
            />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
                className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
            >
                <Eyebrow>IAFlashElite · Ecosistema premium</Eyebrow>
                <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                    Automatiza lo que te quita tiempo.
                    <br />
                    <span className="text-cyan-400/70">
                        Conserva lo que importa.
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-base text-white/60 sm:text-lg">
                    Productos, servicios a medida y formación para empresas que quieren
                    centrarse en lo único que no se delega.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="#productos"
                        className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-black transition-colors hover:bg-cyan-400"
                    >
                        Explora nuestros sistemas →
                    </a>
                    <a
                        href={WHATSAPP_HOME}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:border-cyan-500/50"
                    >
                        Habla con el equipo
                    </a>
                </div>
            </motion.div>
            <div className="mt-20 hidden flex-col items-center gap-2 text-white/50 md:flex">
                <span className="text-xs uppercase tracking-widest">Desplázate</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
        </section>
    );
}

const CREDS: ReadonlyArray<{ value: string; desc: string }> = [
    { value: "8 AÑOS", desc: "Ciberseguridad y arquitectura técnica" },
    { value: "4 AÑOS", desc: "Estudiando y aplicando IA real" },
    {
        value: "2 AÑOS",
        desc: "Automatizando procesos en empresa española: retail, restauración, comercio online, casas de apuestas",
    },
];

function CredibilidadBlock() {
    return (
        <Section>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col items-center gap-12"
            >
                <Eyebrow>Probado en el terreno</Eyebrow>
                <div className="grid w-full gap-10 md:grid-cols-3">
                    {CREDS.map((cred) => (
                        <div key={cred.value} className="text-center">
                            <span className="text-5xl font-bold text-cyan-400 md:text-6xl">
                                {cred.value}
                            </span>
                            <p className="mt-2 text-sm text-white/60">{cred.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}

const SELECTOR: ReadonlyArray<{
    name: string;
    icon: Icon;
    badge: string;
    badgeClass: string;
    desc: string;
    href: string;
}> = [
    {
        name: "Noxis",
        icon: Shield,
        badge: "Próximamente",
        badgeClass: "bg-white/5 text-white/60",
        desc: "Super-agente local para tu negocio entero",
        href: "#noxis",
    },
    {
        name: "Kenvo",
        icon: Boxes,
        badge: "Disponible",
        badgeClass: "bg-cyan-500/10 text-cyan-400",
        desc: "Tu gestor de tareas e ingresos sin nube ajena",
        href: "#kenvo",
    },
    {
        name: "Aprende",
        icon: GraduationCap,
        badge: "Nuevo",
        badgeClass: "bg-cyan-500/10 text-cyan-400",
        desc: "De chats sueltos a un sistema IA que tu empresa puede usar",
        href: "#aprende",
    },
    {
        name: "Servicios",
        icon: Workflow,
        badge: "Activo",
        badgeClass: "bg-cyan-500/10 text-cyan-400",
        desc: "Proyectos a medida con código auditable y revisión humana",
        href: "#servicios",
    },
];

function SelectorBlock() {
    return (
        <Section id="productos">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-2xl text-center"
            >
                <Eyebrow>El ecosistema</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                    Cuatro formas de trabajar con IAFlashElite
                </h2>
                <p className="mt-4 text-base text-white/60">
                    Cada uno con un propósito distinto. Elige por dónde te interesa
                    empezar.
                </p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {SELECTOR.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            variants={fadeUp}
                            transition={{ duration: 0.45, delay: index * 0.05, ease }}
                            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
                        >
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-400">
                                    <ItemIcon className="h-5 w-5" />
                                </span>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${item.badgeClass}`}
                                >
                                    {item.badge}
                                </span>
                            </div>
                            <span className="mt-5 text-lg font-semibold text-white">
                                {item.name}
                            </span>
                            <span className="mt-2 text-sm leading-relaxed text-white/60">
                                {item.desc}
                            </span>
                        </motion.a>
                    );
                })}
            </div>
        </Section>
    );
}

function ProductBlock({
    id,
    number,
    name,
    title,
    paragraph,
    bullets,
    ctaLabel,
    ctaHref,
    reverse,
    visual,
}: {
    id: string;
    number: string;
    name: string;
    title: string;
    paragraph: string;
    bullets: ReadonlyArray<string>;
    ctaLabel: string;
    ctaHref: string;
    reverse: boolean;
    visual: ReactNode;
}) {
    return (
        <Section id={id}>
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease }}
                    className={reverse ? "lg:order-2" : "lg:order-1"}
                >
                    <span className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan-400">
                        {number} {name}
                        <ChevronRight className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                        {title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-white/70">
                        {paragraph}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                        {bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                                <span className="text-sm leading-relaxed text-white/70">
                                    {bullet}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href={ctaHref}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                        {ctaLabel}
                    </Link>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={fadeUp}
                    transition={{ duration: 0.45, delay: 0.08, ease }}
                    className={reverse ? "lg:order-1" : "lg:order-2"}
                >
                    {visual}
                </motion.div>
            </div>
        </Section>
    );
}

function DesktopMockup({
    icon: MockIcon,
    title,
    meta,
}: {
    icon: Icon;
    title: string;
    meta: string;
}) {
    return (
        <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03]">
            <MockIcon className="h-16 w-16 text-cyan-400" />
            <span className="text-lg font-semibold text-white">{title}</span>
            <span className="font-mono text-xs text-white/50">{meta}</span>
        </div>
    );
}

function AprendeVisual() {
    const courses = ["Pack Arranque", "Sistema IA Pro", "Primer Sistema Vendible"];
    return (
        <div className="relative flex aspect-video flex-col justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <span className="absolute right-4 top-4 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-400">
                59€ bundle
            </span>
            {courses.map((course) => (
                <div
                    key={course}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                    <GraduationCap className="h-5 w-5 shrink-0 text-cyan-400" />
                    <span className="text-sm text-white/80">{course}</span>
                </div>
            ))}
        </div>
    );
}

const SECTOR_ICONS: ReadonlyArray<{ icon: Icon; label: string }> = [
    { icon: ShoppingBag, label: "Retail" },
    { icon: UtensilsCrossed, label: "Restauración" },
    { icon: Globe, label: "E-commerce" },
    { icon: Dices, label: "Apuestas" },
];

function ServiciosVisual() {
    return (
        <div className="grid aspect-video grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {SECTOR_ICONS.map((sector) => {
                const SectorIcon = sector.icon;
                return (
                    <div
                        key={sector.label}
                        className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03]"
                    >
                        <SectorIcon className="h-8 w-8 text-cyan-400" />
                        <span className="text-xs text-white/60">{sector.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

const PILARES: ReadonlyArray<{ icon: Icon; title: string; text: string }> = [
    {
        icon: HardDrive,
        title: "Local-first",
        text: "Tus datos viven en tu ordenador. No en nuestros servidores. No en nube de Google. No en gestor de nadie. Tuyos siempre.",
    },
    {
        icon: FileSearch,
        title: "Código auditable",
        text: "Nada de cajas negras. Todo lo que entregamos puede leerse, inspeccionarse y entenderse. Si no lo entiendes, te lo explicamos.",
    },
    {
        icon: ShieldCheck,
        title: "Cero humo",
        text: "No prometemos lo que no podemos cumplir. No vendemos visiones. Vendemos productos funcionales y servicios entregables.",
    },
];

function WhyBlock() {
    return (
        <Section>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-2xl text-center"
            >
                <Eyebrow>Por qué elegir IAFlashElite</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                    Tres reglas que no rompemos.
                </h2>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
                {PILARES.map((pilar, index) => {
                    const PilarIcon = pilar.icon;
                    return (
                        <motion.article
                            key={pilar.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            variants={fadeUp}
                            transition={{ duration: 0.45, delay: index * 0.05, ease }}
                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                        >
                            <PilarIcon className="h-10 w-10 text-cyan-400" />
                            <h3 className="mt-5 text-xl font-semibold text-white">
                                {pilar.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/70">
                                {pilar.text}
                            </p>
                        </motion.article>
                    );
                })}
            </div>
        </Section>
    );
}

function FounderBlock() {
    return (
        <Section>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-3xl text-center"
            >
                <Eyebrow>Quién hay detrás</Eyebrow>
                <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                    El equipo detrás
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                    Un equipo con 8-10 años en ciberseguridad, 4+ años automatizando
                    agentes IA y 2 trabajando juntos en una empresa española. Hemos
                    automatizado procesos reales en retail, restauración, comercio online
                    y casas de apuestas. Ahora construimos la nuestra.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
                    IAFlashElite nace de aplicar lo que funciona en el mundo real, no lo
                    que vende Twitter. Si quieres hablar antes de decidir nada,
                    escríbenos. Sin script, sin presión.
                </p>
                <a
                    href={WHATSAPP_HABLAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-medium text-black transition-colors hover:bg-cyan-400"
                >
                    Hablamos →
                </a>
            </motion.div>
        </Section>
    );
}

const CONTACTS: ReadonlyArray<{
    icon: Icon;
    label: string;
    value: string;
    href: string;
    external: boolean;
}> = [
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+34 603 31 52 47",
        href: WHATSAPP_FINAL,
        external: true,
    },
    {
        icon: Mail,
        label: "Email",
        value: "iaflashelite@gmail.com",
        href: MAILTO,
        external: false,
    },
    {
        icon: Send,
        label: "Telegram",
        value: "@iaflashelite",
        href: TELEGRAM,
        external: true,
    },
];

function FinalCtaBlock() {
    return (
        <Section>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.45, ease }}
                className="mx-auto max-w-2xl text-center"
            >
                <Eyebrow>Empecemos</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                    ¿Tienes 10 minutos?
                </h2>
                <p className="mt-4 text-base text-white/60">
                    Cuéntanos qué te quita tiempo. Te respondemos si podemos ayudarte o
                    no. Sin presión.
                </p>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
                {CONTACTS.map((contact, index) => {
                    const ContactIcon = contact.icon;
                    return (
                        <motion.a
                            key={contact.label}
                            href={contact.href}
                            target={contact.external ? "_blank" : undefined}
                            rel={contact.external ? "noopener noreferrer" : undefined}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            variants={fadeUp}
                            transition={{ duration: 0.45, delay: index * 0.05, ease }}
                            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-cyan-500/50"
                        >
                            <ContactIcon className="h-8 w-8 text-cyan-400" />
                            <span className="text-sm font-semibold text-white">
                                {contact.label}
                            </span>
                            <span className="text-sm text-white/60">{contact.value}</span>
                        </motion.a>
                    );
                })}
            </div>
        </Section>
    );
}
