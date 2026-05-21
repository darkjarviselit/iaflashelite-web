"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_STATS = [
    { value: "9–49€", label: "Herramientas descargables" },
    { value: "7 días", label: "Garantía devolución" },
    { value: "0 cuotas", label: "Sin suscripciones" },
];

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
                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-flash/10 text-flash border border-flash/20 px-3 py-1 rounded-full">
                        Pago único · Sin suscripciones
                    </span>
                </motion.div>

                <motion.h1
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-black text-paper text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.0] tracking-[-0.04em]"
                >
                    Herramientas de seguridad local.{" "}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, #00e5ff 0%, #00b8d4 50%, #ffffff 100%)",
                        }}
                    >
                        Pago único,
                    </span>{" "}
                    <span className="text-text-secondary/90">código auditable.</span>
                </motion.h1>

                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl"
                >
                    Software descargable para PYMES y particulares. Sin nube, sin
                    trackers, sin suscripciones. Compra una vez y úsalo siempre.
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                    <Button href="/productos" size="lg" variant="gradient">
                        Ver productos <ArrowRight size={16} />
                    </Button>
                    <Button href="#productos-destacados" variant="secondary" size="lg">
                        Destacados <ArrowDown size={16} />
                    </Button>
                </motion.div>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex flex-wrap items-end justify-center divide-x divide-border-dark"
                >
                    {HERO_STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col gap-1 ${
                                i === 0 ? "pr-6" : "px-6"
                            }`}
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
        </section>
    );
}
