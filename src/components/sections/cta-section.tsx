"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="relative py-24 bg-onyx">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-3xl border border-border-dark bg-surface p-10 sm:p-16 lg:p-20"
                >
                    <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
                    <div
                        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-60"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0) 60%)",
                        }}
                        aria-hidden
                    />
                    <div className="relative flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
                        <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿Listo para automatizar?
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Cuéntanos tu proceso. Te ayudamos a identificar qué se puede automatizar y entregamos en 48h.
                        </p>
                        <Button href="/contacto" size="lg">
                            Consulta gratuita <ArrowRight size={16} />
                        </Button>
                        <a
                            href={`mailto:${BRAND.email}`}
                            className="text-sm text-text-secondary hover:text-flash transition-colors"
                        >
                            o escríbenos a {BRAND.email}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
