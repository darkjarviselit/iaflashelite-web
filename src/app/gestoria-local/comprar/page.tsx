import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CheckoutForm } from "@/components/productos/checkout-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
    GESTORIA_LOCAL_ASSISTANCE_ADDON_ID,
    GESTORIA_LOCAL_PRODUCT_SLUG,
    PRODUCTS,
    getProductAddons,
} from "@/lib/constants";

export const metadata: Metadata = {
    title: "Comprar GestorIA Local — iaflashelite.com",
    description:
        "Compra GestorIA Local por 490 € con entrega digital, guías de instalación y asistencia opcional.",
};

const INCLUDED_ITEMS = [
    "Paquete instalable GestorIA Local",
    "Instaladores para macOS/Linux y Windows",
    "Guías de instalación y configuración",
    "Manifest de versión y verificación",
    "Garantía Flash de entrega y funcionamiento",
] as const;

const LIMIT_ITEMS = [
    "No toca AEAT ni es VeriFactu.",
    "No emite facturas oficiales.",
    "No sustituye tu software fiscal ni tu criterio profesional.",
    "Si configuras proveedor IA, Telegram u otros servicios externos, se aplican sus condiciones.",
] as const;

export default function ComprarGestoriaLocalPage() {
    const product = PRODUCTS.find(
        (item) => item.slug === GESTORIA_LOCAL_PRODUCT_SLUG,
    );
    if (!product || product.status !== "available") notFound();

    const addons = getProductAddons(product.slug).filter(
        (addon) => addon.id === GESTORIA_LOCAL_ASSISTANCE_ADDON_ID,
    );

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32 pb-24 text-gray-900">
                <section className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                    <div className="flex flex-col gap-8">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                                Compra directa
                            </span>
                            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
                                GestorIA Local — 490 €
                            </h1>
                            <p className="mt-5 text-base leading-7 text-gray-600">
                                Producto digital para gestorías pequeñas: paquete
                                instalable, instaladores, PDFs y guías para organizar
                                clientes, documentos, vencimientos y revisión humana en tu
                                ordenador.
                            </p>
                        </div>

                        <InfoCard title="Incluye" items={INCLUDED_ITEMS} tone="positive" />
                        <InfoCard title="Límites claros" items={LIMIT_ITEMS} tone="neutral" />

                        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                                <p className="text-sm leading-6 text-cyan-950">
                                    Puedes añadir asistencia de instalación y configuración
                                    por 59 €. Si la añades, te indicaremos por email cómo
                                    coordinar la ayuda inicial tras la compra.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <CheckoutForm
                            slug={product.slug}
                            name={product.name}
                            price={product.price}
                            type={product.type ?? "download"}
                            addons={addons}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function InfoCard({
    title,
    items,
    tone,
}: {
    title: string;
    items: readonly string[];
    tone: "positive" | "neutral";
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                {title}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                        <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                                tone === "positive" ? "text-cyan-600" : "text-gray-500"
                            }`}
                        />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
