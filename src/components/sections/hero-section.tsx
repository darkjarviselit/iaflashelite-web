"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
    return (
        <section className="relative py-32 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0) 70%)",
                }}
                aria-hidden
            />

            <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
                <motion.h1
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-black text-paper text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.0] tracking-[-0.04em]"
                >
                    Agentes IA y automatizaciones seguras para empresas
                </motion.h1>

                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl"
                >
                    Diseñamos agentes privados, flujos automatizados y herramientas
                    auditables para empresas que quieren usar IA sin perder control.
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                    <Button href="/contacto" size="lg" variant="gradient">
                        Solicitar propuesta →
                    </Button>
                    <Button href="#servicios" variant="secondary" size="lg">
                        Ver servicios ↓
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
