"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";
import { PROCESS_STEPS } from "@/lib/constants";

export function HowItWorksSection() {
    return (
        <section id="proceso" className="relative py-28 lg:py-32 bg-onyx">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-6 mb-16 max-w-2xl">
                    <SectionLabel>Cómo funciona</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        Un proceso simple y estructurado.
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    {PROCESS_STEPS.map((step, i) => (
                        <motion.article
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.12,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group relative p-8 rounded-xl bg-surface border border-border-dark hover:border-flash/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <span
                                aria-hidden
                                className="absolute -top-2 right-4 text-[120px] font-black text-flash/10 leading-none select-none pointer-events-none"
                            >
                                {step.number}
                            </span>
                            <span className="relative inline-block text-[11px] font-mono tracking-[0.18em] text-flash mb-6">
                                / {step.number}
                            </span>
                            <h3 className="relative text-xl font-semibold text-paper mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="relative text-sm text-text-secondary leading-relaxed">
                                {step.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
