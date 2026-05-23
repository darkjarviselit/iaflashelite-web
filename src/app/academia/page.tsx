import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Headphones, Sparkles } from "lucide-react";
import { EmailInterestForm } from "@/components/email-interest-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Academia — iaflashelite.com",
    description:
        "Mini guías y cursos cortos de seguridad digital INCLUIDOS gratis con cada compra. Sin precios inflados, sin trampas. Solo material útil honesto.",
};

const TIERS = [
    {
        emoji: "📘",
        name: "Mini guía",
        priceRange: "Productos 9–19€",
        items: [
            "1 audio (~15 min)",
            "1 PDF (3 páginas)",
            "Tema concreto: contraseñas, phishing básico o detección de webs falsas",
        ],
    },
    {
        emoji: "📗",
        name: "Curso básico",
        priceRange: "Productos 29–39€",
        items: [
            "3 audios (~30 min total)",
            "1 PDF (10 páginas)",
            "Tema: «Internet Seguro: lo esencial»",
        ],
        recommended: true,
    },
    {
        emoji: "📕",
        name: "Curso intermedio",
        priceRange: "Productos 49€+",
        items: [
            "5 audios (~1h)",
            "2 PDFs (15 + 10 páginas)",
            "Tema: «Seguridad Digital para PYMES y profesionales»",
        ],
    },
];

const STEPS = [
    {
        num: "01",
        title: "Compras un producto",
        description: "De 9€ a 249€. Eliges según tu necesidad.",
    },
    {
        num: "02",
        title: "Recibes el ZIP + material correspondiente",
        description: "Junto al producto recibes el material de seguridad de ese tier.",
    },
    {
        num: "03",
        title: "Aprendes a tu ritmo",
        description:
            "Audios para escuchar en cualquier momento. PDFs para consultar. Tuyo para siempre.",
    },
];

export default function AcademiaPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold inline-flex items-center gap-2">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Academia
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Aprende a protegerte. Gratis.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Mini guías y cursos cortos sobre seguridad digital. Cada
                            compra incluye material según el producto.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Por qué
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Por qué incluimos formación.
                        </h2>
                        <div className="flex flex-col gap-4 text-gray-700 leading-relaxed">
                            <p>
                                No queremos venderte un producto y desaparecer. Queremos
                                que sepas USARLO y, sobre todo, queremos que sepas
                                PROTEGERTE en internet.
                            </p>
                            <p>
                                Por eso cada producto incluye material de seguridad
                                <span className="font-semibold text-gray-900"> GRATIS</span>.
                                Audios y PDFs descargables.{" "}
                                <span className="font-semibold text-gray-900">
                                    Sin coste extra. Sin letra pequeña. Sin precios
                                    inflados.
                                </span>
                            </p>
                            <p>
                                Es una manera honesta de aportar más que el código que te
                                vendemos.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Tiers
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Qué se incluye con cada compra.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {TIERS.map((tier) => (
                                <article
                                    key={tier.name}
                                    className={`relative flex flex-col gap-4 p-6 rounded-2xl bg-white border transition-all duration-200 ease-out ${
                                        tier.recommended
                                            ? "border-cyan-500 shadow-lg"
                                            : "border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl"
                                    }`}
                                >
                                    {tier.recommended && (
                                        <span className="absolute -top-3 right-6 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase text-white bg-cyan-600">
                                            Más común
                                        </span>
                                    )}
                                    <span className="text-4xl">{tier.emoji}</span>
                                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                                        {tier.name}
                                    </h3>
                                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-700 font-semibold">
                                        {tier.priceRange}
                                    </span>
                                    <ul className="flex flex-col gap-2 mt-2">
                                        {tier.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed"
                                            >
                                                <Sparkles
                                                    size={14}
                                                    className="text-cyan-600 mt-0.5 shrink-0"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto pt-4 border-t border-gray-200">
                                        <Badge variant="muted">
                                            Próximamente
                                        </Badge>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-col gap-2 text-sm text-gray-800 leading-relaxed">
                            <p>
                                💼{" "}
                                <span className="font-semibold text-gray-900">
                                    Servicios 149–249€
                                </span>{" "}
                                incluyen TODO el material anterior + plantilla
                                adicional.
                            </p>
                            <p>
                                🎯{" "}
                                <span className="font-semibold text-gray-900">
                                    Servicios Pro 249€
                                </span>{" "}
                                además incluyen 30 min de consultoría 1-a-1.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                                Cómo funciona
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paper">
                                3 pasos. Sin trámites.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-6">
                            {STEPS.map((step) => (
                                <article
                                    key={step.num}
                                    className="flex flex-col gap-4"
                                >
                                    <span className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] leading-none text-flash">
                                        {step.num}
                                    </span>
                                    <h3 className="text-lg font-semibold tracking-tight text-paper">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Honestidad
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            ¿Y si quiero el material sin comprar producto?
                        </h2>
                        <div className="flex flex-col gap-4 text-gray-700 leading-relaxed">
                            <p>
                                Por ahora el material va incluido SOLO con la compra de
                                productos. Es nuestro modo de aportar más a quienes
                                confían en nosotros.
                            </p>
                            <p>
                                Más adelante podríamos venderlos por separado a precios
                                honestos (no inflados). Pero hoy: forman parte natural
                                de cada compra.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Aviso de lanzamiento
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            ¿Quieres saber cuando estén listos los cursos?
                        </h2>
                        <p className="text-gray-700 leading-relaxed max-w-xl">
                            Estamos preparando los materiales en PDF y audio. Te
                            avisamos por email cuando los publiquemos. Sin spam.
                        </p>
                        <EmailInterestForm
                            topic="academia"
                            headline="Avísame cuando publiquemos los primeros cursos"
                            subtext="Estamos preparando materiales en PDF, vídeo y audio. Te avisaremos cuando estén listos."
                            submitLabel="Avisarme de la academia"
                            successMessage="Perfecto. Te avisaremos cuando publiquemos los primeros materiales."
                        />
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
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-flash/10 border border-flash/20 text-flash">
                            <Headphones className="w-5 h-5" />
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            Empieza con cualquier producto.
                        </h2>
                        <p className="text-text-secondary max-w-xl leading-relaxed">
                            El material te llega cuando esté listo. Te avisamos por
                            email.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Button href="/productos" size="lg" variant="gradient">
                                Ver productos <ArrowRight size={16} />
                            </Button>
                            <Button href="/servicios" size="lg" variant="secondary">
                                Ver servicios
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
