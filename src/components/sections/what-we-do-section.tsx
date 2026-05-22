"use client";

import { motion } from "framer-motion";
import { Bot, Shield, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Capability = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
};

const CAPABILITIES: ReadonlyArray<Capability> = [
    {
        icon: Bot,
        title: "Agentes IA",
        description:
            "Automatizaciones inteligentes con memoria, herramientas y aprendizaje supervisado. Adaptados a tu negocio.",
    },
    {
        icon: Zap,
        title: "Automatizaciones",
        description:
            "Flujos de trabajo automáticos que eliminan tareas repetitivas. Integración con tus sistemas actuales.",
    },
    {
        icon: Shield,
        title: "Herramientas Seguras",
        description:
            "Scripts y utilidades con enfoque en ciberseguridad. Código auditable, sin dependencias ocultas.",
    },
];

export function WhatWeDoSection() {
    return (
        <section className="relative bg-onyx py-24 text-paper lg:py-32">
            <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden />
            <div className="relative mx-auto max-w-[1200px] px-6">
                <div className="mb-14 flex max-w-2xl flex-col gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Qué hacemos
                    </span>
                    <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-paper sm:text-5xl">
                        IA práctica para operaciones reales.
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {CAPABILITIES.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.06,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex min-h-[280px] flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-colors duration-200 hover:border-flash/45"
                            >
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-flash/25 bg-flash/10 text-flash">
                                    <Icon className="h-7 w-7" />
                                </span>
                                <div>
                                    <h3 className="text-2xl font-semibold tracking-tight text-paper">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
