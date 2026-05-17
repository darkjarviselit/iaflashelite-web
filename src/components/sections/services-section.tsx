"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Code2, MessageCircle, Workflow } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    MessageCircle,
    Workflow,
    Bot,
    Code2,
};

export function ServicesSection() {
    return (
        <section id="servicios" className="relative py-28 lg:py-32 bg-onyx">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-6 mb-16 max-w-2xl">
                    <SectionLabel>Servicios</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
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
                                className="group relative h-full flex flex-col gap-5 p-8 rounded-xl bg-surface border border-border-dark hover:border-flash/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-flash/10 border border-flash/20 text-flash">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-text-muted">
                                        / {service.number}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-paper tracking-tight mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                <ul className="grid sm:grid-cols-2 gap-1.5">
                                    {service.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-2 text-[13px] text-paper/85"
                                        >
                                            <ArrowRight size={12} className="text-flash mt-1 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-dark">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
                                            Rango
                                        </span>
                                        <span className="text-2xl font-bold text-flash tracking-tight">
                                            {service.priceFrom}–{service.priceTo}€
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full bg-flash/10 text-flash border border-flash/20">
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
