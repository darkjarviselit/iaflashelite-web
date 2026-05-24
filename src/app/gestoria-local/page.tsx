import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import {
    ArrowRight,
    CheckCircle2,
    Headphones,
    LockKeyhole,
    MailCheck,
    PlayCircle,
    Sparkles,
    XCircle,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "GestorIA Local | Copiloto privado para gestorías pequeñas",
    description:
        "GestorIA Local ordena clientes, documentos, vencimientos y revisión humana en tu ordenador. No toca AEAT, no emite facturas oficiales y no sustituye tu software fiscal.",
};

const CONTACT_HREF = "/contacto?asunto=GestorIA%20Local";
const DEMO_CONTACT_HREF = "/contacto?asunto=Demo%20GestorIA%20Local";
const DEMO_VIDEO_PUBLIC_PATH = "/gestoria-local/gestoria-local-demo-guiada.mp4";
const DEMO_POSTER_PUBLIC_PATH =
    "/gestoria-local/gestoria-local-demo-poster.webp";
const publicDir = join(process.cwd(), "public");
const hasDemoVideo = existsSync(
    join(publicDir, "gestoria-local", "gestoria-local-demo-guiada.mp4"),
);
const hasDemoPoster = existsSync(
    join(publicDir, "gestoria-local", "gestoria-local-demo-poster.webp"),
);

const AUDIO_GUIDES = [
    {
        title: "Qué es GestorIA Local",
        description:
            "Una explicación clara del copiloto privado para gestorías pequeñas: qué hace, qué no hace y cómo encaja junto a tu software fiscal.",
        src: "/gestoria-local/audio/gestoria-local-audio-01-que-es.mp3",
    },
    {
        title: "Cómo funciona el Piloto Founders",
        description:
            "Instalación guiada, configuración inicial, 30 días de acompañamiento, soporte y mantenimiento opcional.",
        src: "/gestoria-local/audio/gestoria-local-audio-02-piloto-founders.mp3",
    },
] as const;

const FIT_ITEMS = [
    "Asesoría fiscal-laboral mixta.",
    "Gestoría administrativa con expedientes por cliente.",
    "Despacho contable pequeño con Excel, email, carpetas o mensajería como apoyo operativo.",
] as const;

const NOT_FIT_ITEMS = [
    "Buscas software fiscal oficial.",
    "Necesitas AEAT o VeriFactu.",
    "Necesitas integración Holded, Quipu, Sage o A3 desde el primer día.",
    "Necesitas multiusuario robusto o un ERP completo.",
] as const;

const DOES_ITEMS = [
    "Fichas de clientes.",
    "Checklists documentales.",
    "Documentos pendientes.",
    "Intake desde PDF o carpeta vigilada si se configura.",
    "Cola de revisión humana.",
    "Calendario y vencimientos.",
    "Borradores o propuestas revisables.",
    "Notificaciones por Telegram o email SMTP si se configuran.",
    "Memoria persistente local.",
    "Proveedor LLM configurable, incluido Ollama local si se configura.",
] as const;

const DOES_NOT_ITEMS = [
    "No emite facturas oficiales.",
    "No presenta impuestos.",
    "No toca AEAT.",
    "No es VeriFactu.",
    "No se conecta a Holded, Quipu, Sage ni A3 por ahora.",
    "No es WhatsApp bidireccional.",
    "No sustituye el criterio profesional.",
    "No garantiza OCR/RAG universal.",
] as const;

const FOUNDER_ITEMS = [
    "Instalación remota asistida.",
    "Configuración inicial.",
    "30 días de seguimiento.",
    "Hasta 3 ajustes iniciales.",
    "Soporte por email en horario definido.",
    "Sin permanencia.",
    "Mantenimiento opcional después: 69 €/mes.",
] as const;

const STEPS = [
    {
        title: "Solicitas el piloto",
        text: "Nos escribes con el tamaño del despacho, sistema actual y principal bloqueo operativo.",
    },
    {
        title: "Revisamos si encaja",
        text: "Te respondemos por email con una valoración honesta. Si no encaja, lo decimos antes de cobrar.",
    },
    {
        title: "Instalación guiada",
        text: "Configuramos GestorIA Local contigo y dejamos 30 días para seguimiento y ajustes iniciales.",
    },
] as const;

const FAQS = [
    {
        question: "¿Sustituye a Holded, Quipu o A3?",
        answer:
            "No. GestorIA Local complementa tu software fiscal o de facturación. Sirve para ordenar trabajo, preparar revisión y reducir ruido operativo.",
    },
    {
        question: "¿Emite facturas oficiales?",
        answer:
            "No. No emite facturas oficiales ni pretende sustituir herramientas de facturación.",
    },
    {
        question: "¿Toca AEAT o VeriFactu?",
        answer:
            "No. No se conecta a AEAT, no es VeriFactu y no presenta impuestos. El control profesional sigue fuera del agente.",
    },
    {
        question: "¿Mis datos van a la nube?",
        answer:
            "Los datos se guardan localmente por defecto. Si activas un proveedor IA, Telegram u otros servicios externos, se aplican sus condiciones.",
    },
    {
        question: "¿Funciona sin internet?",
        answer:
            "Puede trabajar con datos locales, pero algunas funciones dependen de servicios externos si los configuras, como proveedor IA o Telegram.",
    },
    {
        question: "¿Qué necesito para instalarlo?",
        answer:
            "Un ordenador Mac o Windows compatible, Node.js moderno y una sesión guiada para configurar el entorno inicial.",
    },
    {
        question: "¿Es multiusuario?",
        answer:
            "No como ERP multiusuario robusto. El piloto está pensado para gestorías pequeñas que quieren empezar con un flujo local y guiado.",
    },
    {
        question: "¿Hay mantenimiento obligatorio?",
        answer:
            "No. El piloto incluye 30 días de seguimiento. Después puedes contratar mantenimiento opcional por 69 €/mes.",
    },
    {
        question: "¿Por qué solo 5 instalaciones guiadas al mes?",
        answer:
            "Porque cada instalación requiere acompañamiento real. El límite protege la calidad del seguimiento, no crea escasez artificial.",
    },
    {
        question: "¿Qué pasa si uso un proveedor IA externo?",
        answer:
            "La configuración se hace de forma guiada para que sepas qué proveedor se activa y qué datos pueden salir a ese servicio.",
    },
    {
        question: "¿Qué incluye el soporte?",
        answer:
            "Ayuda por email para instalación, configuración inicial, incidencias reproducibles y hasta 3 ajustes iniciales dentro del alcance.",
    },
    {
        question: "¿Qué ocurre si no encaja con mi despacho?",
        answer:
            "Primero revisamos el caso por email. Si no encaja, no forzamos la venta. Si ya está en piloto, aplicamos el alcance pactado y Garantía Flash.",
    },
] as const;

export default function GestoriaLocalPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <HeroSection />
                <AudioGuidesSection />
                <AudienceSection />
                <CapabilitiesSection />
                <PrivacySection />
                <ValidationSection />
                <FoundersSection />
                <HowItWorksSection />
                <FaqSection />
                <FinalCtaSection />
            </main>
            <Footer />
        </>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pb-14 pt-24 lg:pb-20 lg:pt-28">
            <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.14),transparent_64%)]"
                aria-hidden
            />
            <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-flash/25 bg-flash/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-flash">
                        <Sparkles className="h-4 w-4" />
                        GestorIA Local by IAFlashElite
                    </span>
                    <h1 className="mt-7 text-5xl font-black leading-[0.98] text-paper sm:text-6xl lg:text-7xl">
                        Ordena tu gestoría sin migrar a otro software.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                        Un copiloto privado para gestorías pequeñas. Organiza clientes,
                        documentos, vencimientos y revisiones en tu propio ordenador. La IA
                        propone; el profesional decide.
                    </p>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
                        No factura. No toca AEAT. No sustituye tu software fiscal.
                    </p>
                    <p className="mt-5 max-w-2xl rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold leading-6 text-paper">
                        Piloto Founders · 490 € pago único · máximo 5 instalaciones
                        guiadas al mes
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button href={CONTACT_HREF} size="lg" variant="gradient">
                            Solicitar Piloto Founders <ArrowRight size={18} />
                        </Button>
                        <Button
                            href="#audio-gestoria-local"
                            size="lg"
                            variant="secondary"
                        >
                            Escuchar guía <Headphones size={18} />
                        </Button>
                    </div>
                </div>

                <article className="rounded-2xl border border-white/10 bg-[#111111] p-4 shadow-2xl shadow-black/30">
                    <div className="px-1 pb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flash">
                            Demo real de GestorIA Local
                        </p>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/60">
                        {hasDemoVideo ? (
                            <video
                                className="h-full w-full bg-black object-contain"
                                controls
                                playsInline
                                preload="metadata"
                                poster={hasDemoPoster ? DEMO_POSTER_PUBLIC_PATH : undefined}
                            >
                                <source src={DEMO_VIDEO_PUBLIC_PATH} type="video/mp4" />
                                Tu navegador no puede reproducir este vídeo.
                            </video>
                        ) : (
                            <DemoFallback />
                        )}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                        Demo guiada de unos 3 minutos: instalación, configuración inicial,
                        Telegram y calendario con datos ficticios.
                    </p>
                </article>
            </div>
        </section>
    );
}

function AudioGuidesSection() {
    return (
        <section
            id="audio-gestoria-local"
            className="scroll-mt-24 bg-[#111111] px-6 py-16 lg:py-24"
        >
            <div className="mx-auto max-w-[1180px]">
                <SectionIntro
                    eyebrow="Audio guía"
                    title="Escucha la guía de GestorIA Local"
                    text="Dos audios breves para entender qué hace GestorIA Local y cómo funciona el Piloto Founders antes de solicitar una instalación guiada."
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    {AUDIO_GUIDES.map((guide, index) => (
                        <article
                            key={guide.src}
                            className="rounded-2xl border border-white/10 bg-onyx p-5 shadow-xl shadow-black/20"
                        >
                            <div className="flex items-start gap-4">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-flash/25 bg-flash/10 text-flash">
                                    <Headphones className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold text-paper">
                                        {index + 1}. {guide.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                                        {guide.description}
                                    </p>
                                </div>
                            </div>
                            <audio
                                className="mt-5 w-full"
                                controls
                                controlsList="nodownload"
                                preload="metadata"
                            >
                                <source src={guide.src} type="audio/mpeg" />
                                Tu navegador no puede reproducir este audio.
                            </audio>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DemoFallback() {
    return (
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-flash/25 bg-flash/10 text-flash">
                <PlayCircle className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-paper">
                Demo guiada preparada
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                El bloque está listo para publicar el vídeo cuando el archivo se suba a
                /public/gestoria-local/gestoria-local-demo-guiada.mp4.
            </p>
            <Button href={DEMO_CONTACT_HREF} variant="secondary" className="mt-6">
                Solicitar demo personalizada <ArrowRight size={16} />
            </Button>
        </div>
    );
}

function AudienceSection() {
    return (
        <section className="bg-[#111111] px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-[1180px]">
                <SectionIntro
                    eyebrow="Para quién"
                    title="Pensado para despachos pequeños que ya trabajan con sus herramientas."
                    text="Pensado para gestorías y asesorías pequeñas, de 1 a 3 personas, que ya usan un software fiscal o de facturación y siguen perdiendo tiempo persiguiendo documentos, recordatorios y carpetas."
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    <ListCard title="Encaja si" items={FIT_ITEMS} tone="positive" />
                    <ListCard
                        title="No encaja si"
                        items={NOT_FIT_ITEMS}
                        tone="negative"
                    />
                </div>
            </div>
        </section>
    );
}

function CapabilitiesSection() {
    return (
        <section className="px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-[1180px]">
                <SectionIntro
                    eyebrow="Alcance real"
                    title="Qué hace y qué no hace GestorIA Local"
                    text="La landing prioriza claridad: GestorIA Local ayuda a ordenar y preparar trabajo, pero no toca sistemas fiscales oficiales ni sustituye el criterio profesional."
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    <ListCard title="Esto sí" items={DOES_ITEMS} tone="positive" />
                    <ListCard title="Esto no" items={DOES_NOT_ITEMS} tone="negative" />
                </div>
            </div>
        </section>
    );
}

function PrivacySection() {
    return (
        <section className="bg-[#111111] px-6 py-16 lg:py-24">
            <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-flash/25 bg-flash/10 text-flash">
                    <LockKeyhole className="h-8 w-8" />
                </span>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flash">
                        Privacidad local
                    </p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                        Privacidad local, sin promesas vacías
                    </h2>
                    <p className="mt-5 text-base leading-8 text-text-secondary">
                        GestorIA se instala en tu ordenador y guarda sus datos localmente
                        por defecto. Si configuras un proveedor IA, Telegram u otros
                        servicios externos, se aplican sus condiciones. La configuración del
                        piloto se hace de forma guiada para que sepas qué se activa y qué
                        no.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ValidationSection() {
    return (
        <section className="px-6 py-16 lg:py-24">
            <div className="mx-auto rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:max-w-[1180px]">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flash">
                            Validación técnica
                        </p>
                        <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                            Probado en Mac y Windows
                        </h2>
                    </div>
                    <p className="text-base leading-8 text-text-secondary">
                        Instalación y uso comprobados en Mac y Windows, con revisión técnica
                        externa. La prueba confirmó instalación sencilla, producto funcional
                        y capacidad de adaptación al modo de trabajo.
                    </p>
                </div>
            </div>
        </section>
    );
}

function FoundersSection() {
    return (
        <section className="bg-[#111111] px-6 py-16 lg:py-24">
            <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flash">
                        Piloto Founders
                    </p>
                    <h2 className="mt-4 text-5xl font-black tracking-tight text-paper">
                        490 € · pago único
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-text-secondary">
                        Cupo máximo mensual: 5 instalaciones guiadas.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                        El cupo existe para mantener calidad de instalación y seguimiento,
                        no como escasez artificial.
                    </p>
                </div>
                <ListCard title="Incluye" items={FOUNDER_ITEMS} tone="positive" />
            </div>
        </section>
    );
}

function HowItWorksSection() {
    return (
        <section className="px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-[1180px]">
                <SectionIntro
                    eyebrow="Cómo funciona"
                    title="Sin llamada comercial obligatoria."
                    text="El proceso empieza por email y solo avanza si el piloto encaja con tu despacho."
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {STEPS.map((step, index) => (
                        <article
                            key={step.title}
                            className="rounded-2xl border border-white/10 bg-[#111111] p-6"
                        >
                            <span className="text-sm font-semibold text-flash">
                                0{index + 1}
                            </span>
                            <h3 className="mt-4 text-2xl font-bold text-paper">
                                {step.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-text-secondary">
                                {step.text}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqSection() {
    return (
        <section className="bg-[#111111] px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-[1180px]">
                <SectionIntro
                    eyebrow="FAQ"
                    title="Preguntas que conviene responder antes de instalar."
                    text="Respuestas cortas para evitar malentendidos sobre fiscalidad, privacidad, mantenimiento y alcance real."
                />
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                    {FAQS.map((faq) => (
                        <article
                            key={faq.question}
                            className="rounded-2xl border border-white/10 bg-onyx p-5"
                        >
                            <h3 className="text-lg font-semibold leading-7 text-paper">
                                {faq.question}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-text-secondary">
                                {faq.answer}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FinalCtaSection() {
    return (
        <section className="px-6 py-20 lg:py-28">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <MailCheck className="h-12 w-12 text-flash" />
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                    ¿Probamos GestorIA Local en tu despacho?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
                    Escríbenos y revisamos por email si tu despacho encaja con el Piloto
                    Founders antes de avanzar.
                </p>
                <Button
                    href={CONTACT_HREF}
                    size="lg"
                    variant="gradient"
                    className="mt-8"
                >
                    Solicitar Piloto Founders <ArrowRight size={18} />
                </Button>
            </div>
        </section>
    );
}

function SectionIntro({
    eyebrow,
    text,
    title,
}: {
    readonly eyebrow: string;
    readonly text: string;
    readonly title: string;
}) {
    return (
        <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flash">
                {eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-paper sm:text-5xl">
                {title}
            </h2>
            <p className="mt-5 text-base leading-8 text-text-secondary">{text}</p>
        </div>
    );
}

function ListCard({
    items,
    title,
    tone,
}: {
    readonly items: readonly string[];
    readonly title: string;
    readonly tone: "negative" | "positive";
}) {
    const Icon = tone === "positive" ? CheckCircle2 : XCircle;
    const iconClass = tone === "positive" ? "text-flash" : "text-amber-200";

    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-2xl font-bold text-paper">{title}</h3>
            <ul className="mt-5 grid gap-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                    >
                        <Icon className={`mt-1 h-4 w-4 shrink-0 ${iconClass}`} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
