"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SERVICE_LABELS = [
    "/ Bots de Telegram",
    "/ Automatización",
    "/ Chatbots IA",
    "/ Scripts a medida",
];

const HERO_STATS = [
    { value: "48h", label: "Entrega garantizada" },
    { value: "+10", label: "Proyectos entregados" },
    { value: "100%", label: "Satisfacción" },
];

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
    return (
        <section className="relative min-h-screen pt-28 pb-24 bg-onyx overflow-hidden">
            <div className="absolute inset-0 bg-dot-grid opacity-60" aria-hidden />
            <div
                className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-50"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0) 60%)",
                }}
                aria-hidden
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-start gap-8 min-h-[calc(100vh-7rem)] justify-center">
                <motion.div {...fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <Badge>● Entrega en 48h garantizada</Badge>
                </motion.div>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center gap-x-6 gap-y-2"
                >
                    {SERVICE_LABELS.map((label) => (
                        <span
                            key={label}
                            className="text-xs sm:text-sm text-text-secondary tracking-tight"
                        >
                            {label}
                        </span>
                    ))}
                </motion.div>

                <motion.h1
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="font-extrabold tracking-[-0.035em] leading-[0.95] text-paper max-w-5xl text-[clamp(2.75rem,7vw,5rem)]"
                >
                    Automatiza tu negocio antes de que termine la semana.
                </motion.h1>

                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg text-text-secondary leading-relaxed max-w-[560px]"
                >
                    Bots, chatbots y scripts con IA. Entregados en 48h, sin saltos al vacío.
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center gap-3"
                >
                    <Button href="/contacto" size="lg">
                        Empezar proyecto <ArrowRight size={16} />
                    </Button>
                    <Button href="/casos" variant="secondary" size="lg">
                        Ver casos
                    </Button>
                </motion.div>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-wrap items-end gap-10 sm:gap-14"
                >
                    {HERO_STATS.map((s) => (
                        <div key={s.label} className="flex flex-col gap-1">
                            <span className="text-4xl sm:text-5xl font-bold text-paper tracking-tight">
                                {s.value}
                            </span>
                            <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
