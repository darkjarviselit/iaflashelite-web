"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Code2, MessageCircle, Workflow } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SERVICES } from "@/lib/constants";

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
