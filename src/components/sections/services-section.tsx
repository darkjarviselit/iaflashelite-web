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
        <section id="servicios" className="relative py-32 bg-onyx">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col gap-6 mb-20 max-w-2xl">
                    <SectionLabel>Servicios</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        Construido para simplificar tu negocio.
                    </h2>
                </div>

                <div className="space-y-6">
                    {SERVICES.map((service, idx) => {
                        const Icon = ICONS[service.icon] ?? Bot;
                        const reversed = idx % 2 === 1;
                        return (
                            <motion.article
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="grid lg:grid-cols-12 gap-6 lg:gap-10 p-6 lg:p-10 rounded-3xl bg-surface border border-border-dark hover:border-flash/30 transition-colors duration-300"
                            >
                                <div className={`lg:col-span-7 flex flex-col gap-6 order-2 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                            / {service.number}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-flash">
                                            ⚡ 48h
                                        </span>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight text-paper">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-text-secondary leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mt-2">
                                        {service.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-start gap-2.5 text-sm text-paper/90"
                                            >
                                                <ArrowRight size={14} className="text-flash mt-1 shrink-0" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-baseline gap-3 mt-4">
                                        <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                            Desde
                                        </span>
                                        <span className="text-3xl font-bold text-flash tracking-tight">
                                            {service.priceFrom}€
                                        </span>
                                    </div>
                                </div>

                                <div className={`lg:col-span-5 relative rounded-2xl bg-onyx border border-border-dark overflow-hidden min-h-[280px] flex items-center justify-center order-1 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-60"
                                        style={{
                                            background: reversed
                                                ? "radial-gradient(circle at 30% 50%, rgba(0,229,255,0.18), transparent 60%)"
                                                : "radial-gradient(circle at 70% 50%, rgba(0,229,255,0.18), transparent 60%)",
                                        }}
                                        aria-hidden
                                    />
                                    <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-onyx border border-flash/30">
                                        <Icon className="w-12 h-12 text-flash" />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
