import type { Metadata } from "next";
import { ArrowRight, Gem, Handshake, Shield, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsGrid } from "@/components/productos/products-grid";
import { Button } from "@/components/ui/button";
import { BRAND_VALUES, PRODUCTS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Productos — iaflashelite.com",
    description:
        "Catálogo completo: herramientas descargables y servicios personalizados. Filtra por audiencia o categoría. Garantía 7 días.",
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
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative pt-20 pb-16 bg-white">
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-5">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Catálogo
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900">
                            Catálogo completo.
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                            Herramientas descargables y servicios personalizados. Pagas
                            una vez, lo tienes listo. Sin suscripciones, sin trackers,
                            sin letra pequeña.
                        </p>
                    </div>
                </section>

                <section className="relative pb-24">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <ProductsGrid products={PRODUCTS} />
                    </div>
                </section>

                <section className="relative py-24 border-t border-gray-200 bg-gray-50">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Nuestros pilares
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Construimos herramientas. No vendemos datos.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {BRAND_VALUES.map((value) => {
                                const Icon = VALUE_ICONS[value.icon] ?? Shield;
                                return (
                                    <article
                                        key={value.title}
                                        className="p-6 rounded-2xl bg-white border border-gray-200"
                                    >
                                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 border-t border-gray-200 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-4">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Por qué confiar
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Garantías reales, no letra pequeña.
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4 mt-4">
                            <li className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                <span className="text-sm font-semibold text-gray-900 block mb-1">
                                    7 días devolución sin preguntas
                                </span>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    Si no te gusta, te devolvemos el 100% en menos de 48h
                                    laborables.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                <span className="text-sm font-semibold text-gray-900 block mb-1">
                                    30 días de soporte incluidos
                                </span>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    Te ayudamos a instalar, ejecutar y personalizar. Respuesta
                                    en menos de 24h L–V.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                <span className="text-sm font-semibold text-gray-900 block mb-1">
                                    Tus datos nunca salen de tu equipo
                                </span>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    Todos los productos funcionan en local. Sin nube
                                    obligatoria, sin telemetría, sin trackers.
                                </span>
                            </li>
                            <li className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                <span className="text-sm font-semibold text-gray-900 block mb-1">
                                    Código y prompts incluidos
                                </span>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    Recibes el código, los manuales y prompts Claude/Codex
                                    para personalizarlo aunque no sepas programar.
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-white">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(6,182,212,0.18) 0%, transparent 70%)" }} aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
                            ¿No encuentras lo que buscas?
                        </h2>
                        <p className="text-gray-300 text-base leading-relaxed max-w-xl">
                            Si tu caso necesita algo a medida, lo desarrollamos. Bots,
                            chatbots y automatizaciones con IA en 48h.
                        </p>
                        <Button href="/contacto" size="lg" variant="gradient">
                            Servicios custom <ArrowRight size={16} />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
