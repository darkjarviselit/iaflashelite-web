import type { Metadata } from "next";
import { ArrowRight, Bell, Check, Download, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductAvailability } from "@/components/productos/product-availability";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { PRODUCTS } from "@/lib/constants";

export function generateStaticParams() {
    return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
        return { title: "Producto no encontrado — iaflashelite.com" };
    }
    return {
        title: `${product.name} — iaflashelite.com`,
        description: product.tagline,
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) notFound();

    const available = product.status === "available";

    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <section className="relative pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-7">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant={available ? "cyan" : "muted"}>
                                {available ? "Disponible" : "Próximamente"}
                            </Badge>
                            <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            {product.name}
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {product.tagline}
                        </p>
                        <p className="text-base text-text-secondary leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-border-dark">
                            <div className="flex flex-col">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
                                    Precio único
                                </span>
                                <span className="text-5xl font-bold text-flash tracking-[-0.03em] leading-none">
                                    {product.price}€
                                </span>
                            </div>
                            <ProductAvailability
                                slug={product.slug}
                                name={product.name}
                                status={product.status}
                                price={product.price}
                            />
                        </div>
                    </div>
                </section>

                {available && (
                    <section className="relative py-20 border-t border-border-dark bg-surface">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-6 mb-10">
                                <SectionLabel>Qué incluye</SectionLabel>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                    Todo lo necesario para usarlo hoy.
                                </h2>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {product.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-onyx border border-border-dark"
                                    >
                                        <Check
                                            size={16}
                                            className="text-flash mt-0.5 shrink-0"
                                        />
                                        <span className="text-sm text-paper leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <section className="relative py-20 border-t border-border-dark">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-10">
                            <SectionLabel>Garantías</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Sin letra pequeña.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-flash/10 border border-flash/20 text-flash mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-paper mb-1">
                                    Garantía {product.guarantee_days} días
                                </h3>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Devolución 100% sin preguntas.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-flash/10 border border-flash/20 text-flash mb-4">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-paper mb-1">
                                    Soporte {product.support_days} días
                                </h3>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Email iaflashelite@gmail.com. Respuesta &lt; 24h L–V.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-surface border border-border-dark">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-flash/10 border border-flash/20 text-flash mb-4">
                                    <Download className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-paper mb-1">
                                    Privacidad total
                                </h3>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Funciona en local. Tus datos nunca salen de tu equipo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark bg-surface">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-8">
                            <SectionLabel>¿Cómo se entrega?</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Flujo manual, sin intermediarios.
                            </h2>
                        </div>
                        <ol className="flex flex-col gap-4">
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-flash mt-1">
                                    01
                                </span>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Rellenas el formulario con tu nombre, email y método de
                                    pago preferido (Bizum o transferencia).
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-flash mt-1">
                                    02
                                </span>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Te respondemos en menos de 12 h con los datos para pagar.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-flash mt-1">
                                    03
                                </span>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Una vez confirmado el pago, te enviamos el ZIP del
                                    producto al email. Empiezan a contar tus 7 días de
                                    garantía y 30 días de soporte.
                                </p>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-5">
                        <SectionLabel>¿No eres técnico?</SectionLabel>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                            Te ayudamos con prompts Claude/Codex.
                        </h2>
                        <p className="text-base text-text-secondary leading-relaxed">
                            Cada producto incluye prompts pre-hechos. Los copias y los pegas
                            en Claude, ChatGPT o Codex y la IA te guía paso a paso para
                            instalar, ejecutar o personalizar el producto. Sin saber
                            programar.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 text-sm font-medium text-flash hover:gap-3 transition-all"
                            >
                                ¿Algo a medida? Pídelo aquí{" "}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>

                {!available && (
                    <section className="relative py-20 border-t border-border-dark bg-surface">
                        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
                            <Bell className="text-flash" size={28} />
                            <h2 className="text-3xl font-bold tracking-[-0.02em] text-paper">
                                Lanzamiento próximo.
                            </h2>
                            <p className="text-text-secondary">
                                Usa el botón &quot;Avísame&quot; arriba para recibir un
                                email único cuando salga.
                            </p>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
