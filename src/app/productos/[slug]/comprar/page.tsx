import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/productos/checkout-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionLabel } from "@/components/ui/section-label";
import { PRODUCTS } from "@/lib/constants";

export function generateStaticParams() {
    return PRODUCTS.filter((p) => p.status === "available").map((p) => ({
        slug: p.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return { title: "Producto no encontrado — iaflashelite.com" };
    return {
        title: `Comprar ${product.name} — iaflashelite.com`,
        description: `Confirma tu pedido de ${product.name} por ${product.price}€.`,
    };
}

export default async function ComprarPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product || product.status !== "available") notFound();

    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col gap-6 mb-10">
                        <SectionLabel>Pedido</SectionLabel>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Confirma tu pedido.
                        </h1>
                        <p className="text-text-secondary leading-relaxed">
                            Te respondemos en menos de 12 h con las instrucciones de pago.
                            Una vez confirmado, recibes el ZIP por email.
                        </p>
                    </div>

                    <CheckoutForm
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
