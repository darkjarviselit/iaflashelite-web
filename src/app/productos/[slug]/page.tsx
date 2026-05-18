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
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-16">
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
                    <section className="relative py-20 bg-white">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-6 mb-10">
                                <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                    Qué incluye
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                    Todo lo necesario para usarlo hoy.
                                </h2>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {product.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200"
                                    >
                                        <Check
                                            size={16}
                                            className="text-cyan-600 mt-0.5 shrink-0"
                                        />
                                        <span className="text-sm text-gray-800 leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <section className="relative py-20 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-10">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Garantías
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Sin letra pequeña.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Garantía {product.guarantee_days} días
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Devolución 100% sin preguntas.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Soporte {product.support_days} días
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Email iaflashelite@gmail.com. Respuesta &lt; 24h L–V.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <Download className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Privacidad total
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Funciona en local. Tus datos nunca salen de tu equipo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative py-20 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-8">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                ¿Cómo se entrega?
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Flujo manual, sin intermediarios.
                            </h2>
                        </div>
                        <ol className="flex flex-col gap-4">
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">
                                    01
                                </span>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Rellenas el formulario con tu nombre, email y método de
                                    pago preferido (Bizum o transferencia).
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">
                                    02
                                </span>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Te respondemos en menos de 12 h con los datos para pagar.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">
                                    03
                                </span>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Una vez confirmado el pago, te enviamos el ZIP del
                                    producto al email. Empiezan a contar tus 7 días de
                                    garantía y 30 días de soporte.
                                </p>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className="relative py-20 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-5">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            ¿No eres técnico?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Te ayudamos con prompts Claude/Codex.
                        </h2>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Cada producto incluye prompts pre-hechos. Los copias y los pegas
                            en Claude, ChatGPT o Codex y la IA te guía paso a paso para
                            instalar, ejecutar o personalizar el producto. Sin saber
                            programar.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
                            >
                                ¿Algo a medida? Pídelo aquí{" "}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>

                {!available && (
                    <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
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

                {available && (
                    <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                        <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                        <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                                ¿Listo para empezar?
                            </h2>
                            <p className="text-text-secondary max-w-xl leading-relaxed">
                                Confirma tu pedido en menos de 2 minutos. Te enviamos
                                instrucciones de pago en menos de 12h.
                            </p>
                            <Button
                                href={`/productos/${product.slug}/comprar`}
                                size="lg"
                                variant="gradient"
                            >
                                Comprar {product.name} · {product.price}€ <ArrowRight size={16} />
                            </Button>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
