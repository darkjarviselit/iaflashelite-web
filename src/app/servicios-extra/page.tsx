import type { Metadata } from "next";
import {
    ArrowRight,
    Globe,
    LayoutPanelTop,
    MessageSquare,
    RefreshCw,
    Server,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Servicios complementarios — iaflashelite.com",
    description:
        "Revisiones extra, consultoría, traducción y configuración de dominio para tu landing page de iaflashelite.com.",
};

interface Extra {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    asunto: string;
}

const EXTRAS: Extra[] = [
    {
        id: "revision-extra",
        name: "Revisión adicional de landing",
        description:
            "Una ronda extra de cambios sobre tu landing entregada: textos, colores, secciones o ajustes visuales.",
        price: 29,
        icon: RefreshCw,
        asunto: "Revisión adicional landing",
    },
    {
        id: "consultoria-30",
        name: "Consultoría 30 min sobre tu web",
        description:
            "Sesión 1:1 por videollamada para revisar tu web, sugerir mejoras y resolver dudas técnicas o de conversión.",
        price: 39,
        icon: MessageSquare,
        asunto: "Consultoría 30 min sobre mi web",
    },
    {
        id: "traduccion",
        name: "Adaptación a otro idioma",
        description:
            "Versión de tu landing en otro idioma (inglés, francés, alemán u otros). Incluye textos traducidos y revisados.",
        price: 49,
        icon: Globe,
        asunto: "Traducción landing a otro idioma",
    },
    {
        id: "seccion-extra",
        name: "Sección adicional para tu landing",
        description:
            "Una nueva sección a medida (testimonios, precios, FAQ, equipo, casos…) en el mismo estilo de tu landing.",
        price: 59,
        icon: LayoutPanelTop,
        asunto: "Sección adicional landing",
    },
    {
        id: "dominio",
        name: "Configuración del dominio en tu hosting",
        description:
            "Te configuramos el despliegue de la landing en tu hosting (Vercel, Netlify, Hostinger, etc.) y conectamos el dominio.",
        price: 39,
        icon: Server,
        asunto: "Configurar dominio para landing",
    },
];

export default function ServiciosExtraPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                            Servicios complementarios
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            ¿Necesitas algo más?
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Pequeños servicios extra para ampliar tu landing ya entregada
                            o resolver dudas concretas. Tarifas fijas, sin paquetes ni
                            suscripciones.
                        </p>
                    </div>
                </section>

                <section className="relative py-20 bg-white">
                    <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {EXTRAS.map((extra) => {
                            const Icon = extra.icon;
                            const href = `/contacto?asunto=${encodeURIComponent(extra.asunto)}`;
                            return (
                                <article
                                    key={extra.id}
                                    className="flex flex-col gap-5 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                >
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                                            {extra.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {extra.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-gray-200 flex items-end justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500">
                                                Precio fijo
                                            </span>
                                            <span className="text-2xl font-bold text-cyan-600 tracking-tight leading-none">
                                                {extra.price}€
                                            </span>
                                        </div>
                                        <Link
                                            href={href}
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
                                        >
                                            Solicitar <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿Otro tipo de servicio?
                        </h2>
                        <p className="text-text-secondary max-w-xl leading-relaxed">
                            Si lo que necesitas no está en la lista, cuéntanos. Te
                            respondemos en menos de 24h con una tarifa fija y plazo
                            cerrado.
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
