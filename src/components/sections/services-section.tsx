"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Code2, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Button } from "@/components/ui/button";

type Offer = {
    cta: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    price: string;
    description: string;
};

const OFFERS: ReadonlyArray<Offer> = [
    {
        cta: "Solicitar auditoría",
        icon: Sparkles,
        title: "Auditoría IA para empresas",
        price: "490€",
        description:
            "Analizamos tus procesos e identificamos dónde la IA te ahorra tiempo y dinero.",
    },
    {
        cta: "Automatizar proceso",
        icon: Zap,
        title: "Automatización a medida",
        price: "desde 590€",
        description:
            "Flujo de trabajo automatizado adaptado a tu negocio. Entrega en 5-7 días.",
    },
    {
        cta: "Pedir agente",
        icon: Bot,
        title: "Agente IA privado",
        price: "desde 1.500€",
        description:
            "Tu propio agente con memoria, personalidad y herramientas. Desplegado en tu infraestructura.",
    },
    {
        cta: "Ver soporte",
        icon: Wrench,
        title: "Mantenimiento de agente",
        price: "99€/mes",
        description:
            "Actualizaciones, monitorización y soporte continuo para tu agente IA.",
    },
    {
        cta: "Ver pack",
        icon: ShieldCheck,
        title: "Pack Seguridad PYME",
        price: "79€",
        description:
            "Herramientas de ciberseguridad esenciales para proteger tu negocio digital.",
    },
    {
        cta: "Ver catálogo",
        icon: Code2,
        title: "Herramientas descargables",
        price: "desde 9€",
        description:
            "Scripts y utilidades listas para usar. Código auditable incluido.",
    },
];

export function ServicesSection() {
    return (
        <section
            id="servicios"
            className="relative bg-white py-24 text-gray-900 lg:py-32"
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="mb-16 flex max-w-2xl flex-col gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                        Servicios B2B
                    </span>
                    <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
                        Ofertas claras para automatizar tu empresa.
                    </h2>
                    <p className="text-base leading-relaxed text-gray-600">
                        Desde auditorías de oportunidad hasta agentes privados mantenidos
                        en tu propia infraestructura.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {OFFERS.map((offer, index) => {
                        const Icon = offer.icon;
                        return (
                            <motion.article
                                key={offer.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-70px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex min-h-[320px] flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-600">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <span className="text-right text-2xl font-bold tracking-tight text-cyan-600">
                                        {offer.price}
                                    </span>
                                </div>

                                <div className="mt-7">
                                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                                        {offer.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-gray-600">
                                        {offer.description}
                                    </p>
                                </div>

                                <Button href="/contacto" variant="gradient" className="mt-auto w-fit">
                                    {offer.cta} <ArrowRight size={14} />
                                </Button>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
