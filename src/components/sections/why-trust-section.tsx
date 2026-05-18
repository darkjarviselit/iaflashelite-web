"use client";

import { motion } from "framer-motion";
import { Gem, Handshake, Shield, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { BRAND_VALUES } from "@/lib/constants";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    shield: Shield,
    gem: Gem,
    handshake: Handshake,
    zap: Zap,
};

export function WhyTrustSection() {
    return (
        <section className="relative py-28 lg:py-32 bg-surface border-y border-border-dark">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-6 mb-14 max-w-2xl">
                    <SectionLabel>Por qué trabajamos así</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        Construimos herramientas. No vendemos datos.
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">
                        En 2026 todo el mundo quiere tus datos. La industria de la IA está
                        construida sobre extraer información de gente que no sabe qué está
                        cediendo. Nosotros no trabajamos así.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {BRAND_VALUES.map((value, idx) => {
                        const Icon = ICONS[value.icon] ?? Shield;
                        return (
                            <motion.article
                                key={value.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="p-6 rounded-2xl bg-onyx border border-border-dark hover:border-flash/40 transition-colors"
                            >
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-flash/10 border border-flash/20 text-flash mb-5">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="text-lg font-semibold text-paper tracking-tight mb-1">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
