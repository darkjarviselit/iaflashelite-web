import type { Metadata } from "next";
import {
    ArrowRight,
    BookOpen,
    EyeOff,
    GraduationCap,
    InfinityIcon,
    KeyRound,
    ScanSearch,
    ShieldCheck,
    Siren,
    Unlock,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Manifiesto de seguridad — iaflashelite.com",
    description:
        "Todo el mundo vende IA. Nadie te enseña a protegerte. Aquí sí. Nuestros principios de seguridad y los límites honestos de lo que ofrecemos.",
};

const PROBLEMS = [
    "El phishing con IA generativa creció masivamente desde 2023",
    "1 de cada 3 PYMES españolas sufrió ciberataque en 2025",
    "El 67% de españoles reutiliza contraseñas en varios servicios",
    "El 80% del software open source tiene vulnerabilidades conocidas",
    "La mayoría de PYMES no tiene plan de respuesta a incidentes",
];

const PRINCIPLES = [
    {
        emoji: "🔍",
        title: "Transparencia radical",
        description:
            "Todo nuestro código es auditable. Te damos los prompts para verificarlo.",
    },
    {
        emoji: "🎓",
        title: "Educación incluida",
        description:
            "Cada compra incluye material formativo. Sin valores inflados, sin trampas.",
    },
    {
        emoji: "🛡️",
        title: "Privacy by design",
        description:
            "Sin nube, sin trackers, sin venta de datos. Lo tuyo se queda contigo.",
    },
    {
        emoji: "🔓",
        title: "Sin oscurantismo",
        description:
            "Código legible, sin ofuscar. Cualquier desarrollador puede revisarlo.",
    },
    {
        emoji: "♾️",
        title: "Pago único",
        description:
            "Sin suscripciones ocultas. Pagas una vez. Lo tienes para siempre.",
    },
    {
        emoji: "🚨",
        title: "Honestidad sobre límites",
        description:
            "No somos expertos certificados en élite ciberseguridad. Somos ingenieros honestos. Si tu caso necesita un pentester certificado, te lo decimos.",
    },
];

const NOT_US = [
    "❌ NO somos una agencia de ciberseguridad de élite",
    "❌ NO tenemos certificaciones CISSP, OSCP, CEH",
    "❌ NO vendemos miedo ni alarmismo",
    "❌ NO inflamos valores percibidos",
    "❌ NO tenemos call center 24/7",
];

const RESOURCES = [
    {
        emoji: "🔍",
        icon: ScanSearch,
        title: "Prompt verificador",
        description:
            "Audita CUALQUIER código con IA en 2 minutos. Disponible HOY.",
        cta: "Usar ahora",
        href: "/como-verificar",
    },
    {
        emoji: "🎓",
        icon: GraduationCap,
        title: "Academia",
        description:
            "Mini guías y cursos incluidos con cada compra. Próximamente.",
        cta: "Ver academia",
        href: "/academia",
    },
    {
        emoji: "🔐",
        icon: ShieldCheck,
        title: "Auditor Web",
        description:
            "Escanea tu web en 5 minutos. Reporte PDF con prioridades.",
        cta: "Ver producto",
        href: "/productos/auditor-web",
    },
    {
        emoji: "🔑",
        icon: KeyRound,
        title: "Generador de contraseñas",
        description: "Contraseñas seguras 100% offline. Sin cloud.",
        cta: "Ver producto",
        href: "/productos/generador-contrasenas-basico",
    },
];

const PRINCIPLE_ICONS = [
    ScanSearch,
    BookOpen,
    EyeOff,
    Unlock,
    InfinityIcon,
    Siren,
] as const;

export default function SeguridadPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold inline-flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Manifiesto de seguridad
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Todo el mundo vende IA. Nadie te enseña a protegerte.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Aquí sí. Y va incluido con cada compra.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            El problema
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            El problema en 2026.
                        </h2>
                        <div className="flex flex-col gap-4 text-gray-700 leading-relaxed">
                            <p>
                                En 2026 cualquier persona puede crear cualquier
                                herramienta con IA. Eso es maravilloso y también
                                peligroso.
                            </p>
                            <p className="font-semibold text-gray-900">La realidad:</p>
                            <ul className="flex flex-col gap-2">
                                {PROBLEMS.map((p) => (
                                    <li
                                        key={p}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm"
                                    >
                                        <span className="text-cyan-600">·</span>
                                        <span>{p}</span>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                La industria de la IA vende magia. La industria de la
                                ciberseguridad vende miedo.{" "}
                                <span className="font-semibold text-gray-900">
                                    Nosotros vendemos VERDAD:
                                </span>{" "}
                                enseñarte qué peligros existen y cómo protegerte SIN
                                exagerar.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Principios
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Nuestros principios.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {PRINCIPLES.map((p, idx) => {
                                const Icon = PRINCIPLE_ICONS[idx] ?? ShieldCheck;
                                return (
                                    <article
                                        key={p.title}
                                        className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <span className="text-2xl" aria-hidden="true">
                                                {p.emoji}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                            {p.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {p.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                            Límites honestos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paper">
                            Lo que NO somos (ni pretendemos serlo).
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {NOT_US.map((line) => (
                                <li
                                    key={line}
                                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-text-secondary leading-relaxed"
                                >
                                    {line}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-text-secondary leading-relaxed pt-4">
                            Somos UN ingeniero (UPC FIB + UPF) que se preocupa
                            genuinamente por la seguridad de sus clientes y construye
                            herramientas accesibles.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/sobre"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-flash hover:gap-3 transition-all"
                            >
                                Conoce más sobre nosotros <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-white border-t border-gray-200">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Recursos
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Recursos disponibles.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {RESOURCES.map((r) => {
                                const Icon = r.icon;
                                return (
                                    <article
                                        key={r.title}
                                        className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <span className="text-2xl" aria-hidden="true">
                                                {r.emoji}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                                            {r.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {r.description}
                                        </p>
                                        <Link
                                            href={r.href}
                                            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
                                        >
                                            {r.cta} <ArrowRight size={14} />
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.18) 0%, transparent 70%)",
                        }}
                        aria-hidden
                    />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            Tu primera capa de seguridad empieza hoy.
                        </h2>
                        <p className="text-text-secondary max-w-xl leading-relaxed">
                            No necesitas conocimientos técnicos. Empezamos por lo
                            simple.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Button href="/productos" size="lg" variant="gradient">
                                Ver herramientas <ArrowRight size={16} />
                            </Button>
                            <Button
                                href="/como-verificar"
                                size="lg"
                                variant="secondary"
                            >
                                Aprende cómo verificar
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
