"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export function StatsSection() {
    return (
        <section className="relative py-24 bg-onyx border-y border-border-dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col gap-3"
                        >
                            <span className="text-5xl sm:text-6xl font-bold text-flash tracking-[-0.04em] leading-none">
                                {s.value}
                            </span>
                            <span className="text-xs sm:text-sm tracking-tight text-text-secondary leading-relaxed max-w-[180px]">
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
