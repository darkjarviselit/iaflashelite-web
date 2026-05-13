import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";

const CASES = [
    {
        title: "Bot de reservas para restaurante",
        industry: "Hostelería",
        status: "Coming soon",
        impact: "Reducción del tiempo en gestión de mesas y confirmaciones automáticas.",
    },
    {
        title: "Chatbot IA para clínica dental",
        industry: "Salud",
        status: "Coming soon",
        impact: "Citas, FAQ y triage de pacientes resueltos sin intervención humana.",
    },
    {
        title: "Automatización de facturas",
        industry: "Servicios profesionales",
        status: "Coming soon",
        impact: "Extracción + clasificación + envío automático a contabilidad.",
    },
    {
        title: "Scraping + alertas de mercado",
        industry: "E-commerce",
        status: "Coming soon",
        impact: "Monitor de precios competitivos con alertas en Telegram en tiempo real.",
    },
];

export default function CasosPage() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-24 bg-onyx min-h-screen">
                <section className="relative">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-5xl mx-auto px-6 lg:px-8 flex flex-col gap-8 pb-16">
                        <Badge>● Casos en producción próximamente</Badge>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper max-w-3xl">
                            Casos de uso.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Estamos cerrando los primeros pilotos. Si tu industria no aparece, probablemente sea perfecta para ser la primera.
                        </p>
                    </div>
                </section>

                <section className="relative pb-20">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
                            <SectionLabel>En el horno</SectionLabel>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {CASES.map((c) => (
                                <article
                                    key={c.title}
                                    className="group p-7 rounded-2xl bg-surface border border-border-dark hover:border-flash/40 transition-colors duration-300"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                            {c.industry}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-flash">
                                            <Sparkles size={11} />
                                            {c.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-paper tracking-tight mb-3">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {c.impact}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark bg-surface">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿Quieres ser el primero?
                        </h2>
                        <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                            Los primeros 5 clientes entran con condiciones especiales a cambio de un caso de estudio publicable.
                        </p>
                        <Button href="/contacto" size="lg">
                            Contactar ahora <ArrowRight size={16} />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
