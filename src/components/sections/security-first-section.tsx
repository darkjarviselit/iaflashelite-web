"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    GraduationCap,
    Megaphone,
    ScanSearch,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

const CARDS: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    emoji: string;
    title: string;
    description: string;
    cta: string;
    href: string;
}> = [
    {
        icon: ScanSearch,
        emoji: "🔍",
        title: "Código auditable",
        description:
            "Cada producto incluye prompts para verificarlo con IA antes de instalar.",
        cta: "Ver cómo",
        href: "/como-verificar",
    },
    {
        icon: GraduationCap,
        emoji: "🎓",
        title: "Mini guías incluidas",
        description:
            "Cada compra incluye material de seguridad digital según el producto.",
        cta: "Ver academia",
        href: "/academia",
    },
    {
        icon: ShieldCheck,
        emoji: "🛡️",
        title: "Privacy-first",
        description:
            "Sin nube, sin trackers, sin venta de datos. Tu información se queda contigo.",
        cta: "Ver garantías",
        href: "/como-trabajamos",
    },
    {
        icon: Megaphone,
        emoji: "🚨",
        title: "Educación honesta",
        description:
            "Te explicamos peligros reales sin alarmismo ni venta de miedo.",
        cta: "Ver manifiesto",
        href: "/seguridad",
    },
];

export function SecurityFirstSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-onyx text-paper border-y border-border-dark">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[50%] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 70%)",
                }}
                aria-hidden
            />
            <div className="relative max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-3xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold inline-flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Seguridad primero
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-paper">
                        Seguridad primero. Siempre.
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">
                        En 2026 cualquiera puede crear cualquier herramienta. Mucho
                        software circula online con código desordenado o vulnerable.
                        Por eso nosotros NO solo vendemos productos: te enseñamos a
                        protegerte.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CARDS.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <motion.article
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-flash/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all duration-200 ease-out"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-flash/10 border border-flash/20 text-flash">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="text-2xl" aria-hidden="true">
                                        {card.emoji}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight text-paper">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {card.description}
                                </p>
                                <Link
                                    href={card.href}
                                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-flash hover:gap-2 transition-all"
                                >
                                    {card.cta} <ArrowRight size={14} />
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
