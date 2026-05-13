"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { FAQS } from "@/lib/constants";

export function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-32 bg-onyx">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col gap-6 mb-16">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        ¿Tienes dudas?
                    </h2>
                </div>

                <div className="space-y-0">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div key={faq.q} className="border-b border-border-dark">
                                <button
                                    type="button"
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg sm:text-xl font-semibold text-paper tracking-tight group-hover:text-flash transition-colors duration-200">
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-dark text-paper transition-transform duration-300 ${isOpen ? "rotate-45 border-flash/50 text-flash" : ""}`}
                                    >
                                        <Plus size={16} />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-6 pr-12 text-base text-text-secondary leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
