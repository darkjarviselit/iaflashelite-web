import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/productos/checkout-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
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

    const isService = product.type === "service";

    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col gap-6 mb-10">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            {isService ? "Solicitud de servicio" : "Pedido"}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                            {isService ? "Solicita tu landing." : "Confirma tu pedido."}
                        </h1>
                        <p className="text-gray-600 leading-relaxed">
                            {isService
                                ? "Te respondemos en menos de 12 h con los datos de pago y un breve cuestionario inicial. La entrega es 48h desde que recibimos pago + cuestionario."
                                : "Te respondemos en menos de 12 h con las instrucciones de pago. Una vez confirmado, recibes el ZIP por email."}
                        </p>
                    </div>

                    <CheckoutForm
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                        type={product.type ?? "download"}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
