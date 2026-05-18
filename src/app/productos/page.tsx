import type { Metadata } from "next";
import { ArrowRight, Gem, Handshake, Shield, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsGrid } from "@/components/productos/products-grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { BRAND_VALUES, PRODUCTS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Productos — iaflashelite.com",
    description:
        "Herramientas digitales para automatización y seguridad. Productos descargables con privacidad por defecto. Garantía 7 días.",
};

const VALUE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    shield: Shield,
    gem: Gem,
    handshake: Handshake,
    zap: Zap,
};

export default function ProductosPage() {
    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <section className="relative pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-7">
                        <SectionLabel>Catálogo</SectionLabel>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Herramientas listas para usar.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Productos descargables creados con privacidad por defecto.
                            Pagas una vez, descargas el ZIP, funciona en tu equipo. Sin
                            suscripciones, sin nube, sin trackers.
                        </p>
                    </div>
                </section>

                <section className="relative pb-24">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <ProductsGrid products={PRODUCTS} />
                    </div>
                </section>

                <section className="relative py-24 border-t border-border-dark bg-surface">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
                            <SectionLabel>Nuestros pilares</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Construimos herramientas. No vendemos datos.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {BRAND_VALUES.map((value) => {
                                const Icon = VALUE_ICONS[value.icon] ?? Shield;
                                return (
                                    <article
                                        key={value.title}
                                        className="p-6 rounded-2xl bg-onyx border border-border-dark"
                                    >
                                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-flash/10 border border-flash/20 text-flash mb-5">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-lg font-semibold text-paper mb-1 tracking-tight">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {value.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 border-t border-border-dark">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <SectionLabel>Por qué confiar</SectionLabel>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                            Garantías reales, no letra pequeña.
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4 mt-2">
                            <li className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="text-sm font-semibold text-paper block mb-1">
                                    7 días devolución sin preguntas
                                </span>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                    Si no te gusta, te devolvemos el 100% en menos de 48h
                                    laborables.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="text-sm font-semibold text-paper block mb-1">
                                    30 días de soporte incluidos
                                </span>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                    Te ayudamos a instalar, ejecutar y personalizar. Respuesta
                                    en menos de 24h L–V.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="text-sm font-semibold text-paper block mb-1">
                                    Tus datos nunca salen de tu equipo
                                </span>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                    Todos los productos funcionan en local. Sin nube
                                    obligatoria, sin telemetría, sin trackers.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="text-sm font-semibold text-paper block mb-1">
                                    Código y prompts incluidos
                                </span>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                    Recibes el código, los manuales y prompts Claude/Codex
                                    para personalizarlo aunque no sepas programar.
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="relative py-24 border-t border-border-dark bg-surface">
                    <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿No encuentras lo que buscas?
                        </h2>
                        <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                            Si tu caso necesita algo a medida, lo desarrollamos. Bots,
                            chatbots y automatizaciones con IA en 48h.
                        </p>
                        <Button href="/contacto" size="lg">
                            Servicios custom <ArrowRight size={16} />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
