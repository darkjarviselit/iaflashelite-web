"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { COMPARISON } from "@/lib/constants";

const COLUMNS = [
    { key: "flash", label: "IA Flash Elite", highlight: true },
    { key: "agencies", label: "Otras agencias", highlight: false },
    { key: "inhouse", label: "Contratar in-house", highlight: false },
] as const;

function isPositive(value: string): boolean {
    if (value === "Sí" || value === "Total") return true;
    if (value.startsWith("Desde")) return true;
    if (value.includes("48h")) return true;
    return false;
}

export function WhyUsSection() {
    return (
        <section className="relative py-32 bg-surface border-y border-border-dark">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col gap-6 mb-16 max-w-2xl">
                    <SectionLabel>Por qué nosotros</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        Construido para resultados reales.
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-x-auto rounded-2xl border border-border-dark bg-onyx"
                >
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="border-b border-border-dark">
                                <th className="text-left text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium px-6 py-5">
                                    Característica
                                </th>
                                {COLUMNS.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`text-left text-[11px] tracking-[0.18em] uppercase font-medium px-6 py-5 ${col.highlight ? "text-flash" : "text-text-secondary"}`}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row) => (
                                <tr
                                    key={row.feature}
                                    className="border-b border-border-dark last:border-b-0"
                                >
                                    <td className="px-6 py-5 text-sm text-paper font-medium">
                                        {row.feature}
                                    </td>
                                    {COLUMNS.map((col) => {
                                        const value = row[col.key];
                                        const positive = isPositive(value);
                                        return (
                                            <td
                                                key={col.key}
                                                className={`px-6 py-5 text-sm ${col.highlight ? "text-flash" : positive ? "text-paper" : "text-text-secondary"}`}
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    {col.highlight ? (
                                                        <Check size={14} className="shrink-0 text-flash" />
                                                    ) : !positive && value === "Limitada" ? (
                                                        <X size={14} className="shrink-0 text-text-muted" />
                                                    ) : null}
                                                    {value}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
}
