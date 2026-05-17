"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { FlashMascot } from "@/components/brand/flash-mascot";
import { Button } from "@/components/ui/button";

const HERO_STATS = [
    { value: "48h", label: "Entrega garantizada" },
    { value: "IA", label: "Stack propio" },
    { value: "1:1", label: "Trato directo" },
];

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
    return (
        <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 bg-onyx overflow-hidden">
            <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
            <div
                className="absolute inset-y-0 left-0 w-[70%] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 35% 50%, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0) 60%)",
                }}
                aria-hidden
            />

            <div className="relative max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center">
                <div className="flex flex-col gap-7 lg:gap-8 order-2 lg:order-1">
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-flash/10 text-flash border border-flash/20 px-3 py-1 rounded-full">
                            ⚡ Entrega garantizada en 48h
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-extrabold text-paper text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]"
                    >
                        Automatiza tu negocio <span className="text-flash">antes de que termine</span> la semana.
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg text-text-secondary leading-relaxed max-w-[480px]"
                    >
                        Bots, chatbots y scripts con IA. Sin meses de espera, sin presupuestos inflados. Tu negocio automatizado en menos de 48h.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <Button href="/contacto" size="lg">
                            Empezar proyecto <ArrowRight size={16} />
                        </Button>
                        <Button href="#servicios" variant="secondary" size="lg">
                            Ver servicios <ArrowDown size={16} />
                        </Button>
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 flex items-end divide-x divide-border-dark"
                    >
                        {HERO_STATS.map((s, i) => (
                            <div
                                key={s.label}
                                className={`flex flex-col gap-1 ${i === 0 ? "pr-6" : "px-6"}`}
                            >
                                <span className="text-3xl sm:text-4xl font-bold text-paper tracking-tight leading-none">
                                    {s.value}
                                </span>
                                <span className="text-[11px] tracking-[0.16em] uppercase text-text-muted">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center justify-center order-1 lg:order-2"
                >
                    <div
                        className="absolute inset-0 pointer-events-none blur-3xl opacity-60"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0) 60%)",
                        }}
                        aria-hidden
                    />
                    <motion.div
                        animate={{ y: [-8, 8, -8] }}
                        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                        className="relative"
                    >
                        <FlashMascot pose="waving" size={280} className="lg:w-[320px] lg:h-auto" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
