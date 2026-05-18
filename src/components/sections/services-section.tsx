"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Clock, Code2, MessageCircle, MonitorSmartphone, Sparkles, Workflow } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { SERVICES } from "@/lib/constants";

const LANDING_CARDS = [
    {
        slug: "landing-page-basica",
        name: "Landing Page Básica",
        price: 149,
        tagline:
            "Tu landing profesional lista en 48h. Diseño moderno estilo Make.com.",
        icon: MonitorSmartphone,
    },
    {
        slug: "landing-page-pro",
        name: "Landing Page Pro",
        price: 249,
        tagline:
            "Landing premium con tema híbrido, animaciones, 2 idiomas y 2 revisiones.",
        icon: Sparkles,
    },
] as const;

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    MessageCircle,
    Workflow,
    Bot,
    Code2,
};

export function ServicesSection() {
    return (
        <section
            id="servicios"
            className="relative py-24 lg:py-32 bg-white text-gray-900"
        >
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-16 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        Servicios
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                        Construido para simplificar tu negocio.
                    </h2>
                </div>

                <div className="flex flex-col gap-4 mb-10 mt-6">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        Landing Pages profesionales
                    </span>
                    <div className="grid md:grid-cols-2 gap-5">
                        {LANDING_CARDS.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={card.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <Link
                                        href={`/productos/${card.slug}`}
                                        className="group h-full flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-cyan-50 border border-cyan-200 text-cyan-700">
                                                <Clock className="w-3 h-3" /> Entrega 48h
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-1.5">
                                                {card.name} — {card.price}€
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {card.tagline}
                                            </p>
                                        </div>
                                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 group-hover:text-cyan-700 group-hover:gap-2 transition-all">
                                            Ver detalles <ArrowRight size={14} />
                                        </span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {SERVICES.map((service, idx) => {
                        const Icon = ICONS[service.icon] ?? Bot;
                        return (
                            <motion.article
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 0.55,
                                    delay: idx * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group relative h-full flex flex-col gap-5 p-8 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-gray-400">
                                        / {service.number}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                <ul className="grid sm:grid-cols-2 gap-1.5">
                                    {service.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-2 text-[13px] text-gray-700"
                                        >
                                            <ArrowRight
                                                size={12}
                                                className="text-cyan-600 mt-1 shrink-0"
                                            />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500">
                                            Rango
                                        </span>
                                        <span className="text-2xl font-bold text-cyan-600 tracking-tight">
                                            {service.priceFrom}–{service.priceTo}€
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                                        ⚡ 48h
                                    </span>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
