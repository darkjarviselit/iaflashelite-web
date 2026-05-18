"use client";

import { motion } from "framer-motion";
import { Gem, Handshake, Shield, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { BRAND_VALUES } from "@/lib/constants";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    shield: Shield,
    gem: Gem,
    handshake: Handshake,
    zap: Zap,
};

export function WhyTrustSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-gray-50 text-gray-900 border-y border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        Por qué trabajamos así
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                        Construimos herramientas. No vendemos datos.
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed">
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
                                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                            >
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-1">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
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
