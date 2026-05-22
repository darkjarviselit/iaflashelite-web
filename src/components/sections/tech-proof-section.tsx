"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TechProofSection() {
    return (
        <section className="relative overflow-hidden bg-[#111] py-24 text-paper lg:py-32">
            <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/40 to-transparent"
                aria-hidden
            />
            <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
                <div className="flex flex-col items-start gap-6">
                    <motion.span
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex rounded-full border border-flash/25 bg-flash/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash"
                    >
                        En desarrollo activo
                    </motion.span>
                    <div>
                        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-paper sm:text-5xl">
                            Tecnología propia en evolución
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                            G.I.R.U es nuestro laboratorio de agentes IA con memoria,
                            herramientas y aprendizaje supervisado.
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-l border-white/10 pl-6 lg:pl-10"
                >
                    <p className="text-base leading-8 text-text-secondary">
                        No vendemos humo. Nuestros productos nacen de investigación real.
                        Puedes auditarlos tú mismo con Claude o ChatGPT.
                    </p>
                    <Button href="/mundo-giruia" variant="secondary" className="mt-8">
                        Ver la tecnología <ArrowRight size={16} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
