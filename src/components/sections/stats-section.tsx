"use client";

import { motion } from "framer-motion";
import { STATS, STATS_UPDATED_AT } from "@/lib/constants";

export function StatsSection() {
    return (
        <section className="relative py-24 bg-onyx border-y border-border-dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                        Stats honestos
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-paper">
                        Lo que ves es lo que hay.
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col gap-3"
                        >
                            <span className="text-4xl sm:text-5xl font-bold text-flash tracking-[-0.04em] leading-none">
                                {s.value}
                            </span>
                            <span className="text-xs sm:text-sm tracking-tight text-text-secondary leading-relaxed max-w-[180px]">
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
                <p className="text-xs text-text-muted leading-relaxed max-w-2xl">
                    Stats actualizados {STATS_UPDATED_AT}. Sin métricas inventadas. Si
                    dudas algo, escríbeme a{" "}
                    <a href="mailto:iaflashelite@gmail.com" className="text-flash underline hover:no-underline">
                        iaflashelite@gmail.com
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
