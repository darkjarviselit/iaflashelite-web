import type { Metadata } from "next";
import { ArrowRight, CalendarClock, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsGrid } from "@/components/productos/products-grid";
import { Button } from "@/components/ui/button";
import { PRODUCTS, SLOTS_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Servicios — iaflashelite.com",
    description:
        "Servicios profesionales con entrega garantizada en 48h. Landing pages y trabajos personalizados. Pagas una vez, lo tienes listo.",
};

export default function ServiciosPage() {
    const services = PRODUCTS.filter((p) => p.type === "service");
    const normalFull = SLOTS_CONFIG.normal_available === 0;
    const expressFull = SLOTS_CONFIG.express_available === 0;

    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative pt-32 pb-16 bg-white">
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-5">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Servicios
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900">
                            Servicios profesionales.
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                            Trabajos personalizados con entrega garantizada en 48h. Pagas
                            una vez. Lo tienes listo. Sin suscripciones, sin paquetes
                            mensuales.
                        </p>
                    </div>
                </section>

                <section className="relative pb-10">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <article className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-5">
                            <div className="flex items-center gap-2.5">
                                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                    <CalendarClock className="w-4 h-4" />
                                </span>
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                                    Disponibilidad — {SLOTS_CONFIG.current_month}
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <SlotCard
                                    label="Servicio normal"
                                    icon={<Clock className="w-4 h-4" />}
                                    available={SLOTS_CONFIG.normal_available}
                                    total={SLOTS_CONFIG.normal_per_month}
                                    delivery="Entrega 48h"
                                    price="Tarifa estándar"
                                    full={normalFull}
                                    fullMessage={`Lista de espera. Próximo hueco: ${SLOTS_CONFIG.next_slot_date}`}
                                />
                                <SlotCard
                                    label="Servicio express"
                                    icon={<Zap className="w-4 h-4" />}
                                    available={SLOTS_CONFIG.express_available}
                                    total={SLOTS_CONFIG.express_per_month}
                                    delivery="Entrega 24h"
                                    price="+29€ / +49€"
                                    accent
                                    full={expressFull}
                                    fullMessage="Express no disponible esta semana. Solo modo normal."
                                />
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Actualizamos esta disponibilidad manualmente al
                                confirmar cada pedido. Si ves huecos, son reales.
                            </p>
                        </article>

                        {SLOTS_CONFIG.working_days_note && (
                            <article className="mt-4 p-6 sm:p-7 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-col gap-4">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-base">📌</span>
                                    <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                                        Cómo trabajamos
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {SLOTS_CONFIG.working_days_note}
                                </p>
                                <ul className="flex flex-col gap-1.5 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-700 font-semibold">·</span>
                                        <span>
                                            <span className="font-semibold text-gray-900">
                                                Lunes–jueves:
                                            </span>{" "}
                                            revisamos pedidos y comunicamos.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-700 font-semibold">·</span>
                                        <span>
                                            <span className="font-semibold text-gray-900">
                                                Viernes–sábado:
                                            </span>{" "}
                                            trabajamos entregas intensivamente.
                                        </span>
                                    </li>
                                </ul>
                            </article>
                        )}
                    </div>
                </section>

                <section className="relative pb-24">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {services.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                                <p className="text-gray-900 text-base mb-2">
                                    Estamos preparando nuevos servicios.
                                </p>
                                <p className="text-sm text-gray-600 mb-5">
                                    Mientras tanto, cuéntanos qué necesitas y te
                                    respondemos con una tarifa fija en menos de 24h.
                                </p>
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:opacity-95 transition-opacity"
                                >
                                    Cuéntanos tu caso →
                                </Link>
                            </div>
                        ) : (
                            <ProductsGrid products={services} hideFilters />
                        )}
                    </div>
                </section>

                <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿Necesitas algo a medida?
                        </h2>
                        <p className="text-text-secondary max-w-xl leading-relaxed">
                            Si tu caso no encaja en estos servicios, cuéntanoslo.
                            Diseñamos una propuesta con tarifa fija y plazo cerrado.
                        </p>
                        <Button href="/contacto" size="lg" variant="gradient">
                            Cuéntanos tu caso <ArrowRight size={16} />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function SlotCard({
    label,
    icon,
    available,
    total,
    delivery,
    price,
    full,
    fullMessage,
    accent = false,
}: {
    label: string;
    icon: React.ReactNode;
    available: number;
    total: number;
    delivery: string;
    price: string;
    full: boolean;
    fullMessage: string;
    accent?: boolean;
}) {
    return (
        <div
            className={`p-5 rounded-2xl border ${
                accent
                    ? "border-cyan-200 bg-cyan-50"
                    : "border-gray-200 bg-gray-50"
            }`}
        >
            <div className="flex items-center gap-2 mb-3">
                <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${
                        accent
                            ? "bg-white border border-cyan-200 text-cyan-700"
                            : "bg-white border border-gray-200 text-gray-700"
                    }`}
                >
                    {icon}
                </span>
                <span className="text-sm font-semibold text-gray-900 tracking-tight">
                    {label}
                </span>
            </div>
            {full ? (
                <p className="text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 leading-relaxed">
                    {fullMessage}
                </p>
            ) : (
                <div className="flex flex-col gap-1.5">
                    <span className={`text-2xl font-bold tracking-tight leading-none ${accent ? "text-cyan-700" : "text-gray-900"}`}>
                        {available} / {total}{" "}
                        <span className="text-sm font-medium text-gray-600">huecos</span>
                    </span>
                    <span className="text-xs text-gray-700">{delivery}</span>
                    <span className="text-xs text-gray-500">{price}</span>
                </div>
            )}
        </div>
    );
}
