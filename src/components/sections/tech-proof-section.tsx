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
                            GIRU es nuestro laboratorio de agentes IA con memoria,
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
                    <div className="mb-8 rounded-2xl border border-flash/20 bg-onyx/60 p-6">
                        <svg
                            viewBox="0 0 520 320"
                            role="img"
                            aria-labelledby="giru-brain-title"
                            className="h-auto w-full"
                        >
                            <title id="giru-brain-title">
                                Cerebro estático de G.I.R.U con nodos conectados
                            </title>
                            <rect width="520" height="320" rx="24" fill="#0a0a0a" />
                            <g stroke="#00E5FF" strokeOpacity="0.38" strokeWidth="2">
                                <line x1="260" y1="160" x2="132" y2="74" />
                                <line x1="260" y1="160" x2="388" y2="74" />
                                <line x1="260" y1="160" x2="94" y2="172" />
                                <line x1="260" y1="160" x2="426" y2="172" />
                                <line x1="260" y1="160" x2="144" y2="254" />
                                <line x1="260" y1="160" x2="376" y2="254" />
                                <line x1="260" y1="160" x2="260" y2="48" />
                                <line x1="260" y1="160" x2="260" y2="272" />
                            </g>
                            <g fill="#00E5FF">
                                <circle cx="132" cy="74" r="8" opacity="0.82" />
                                <circle cx="388" cy="74" r="8" opacity="0.82" />
                                <circle cx="94" cy="172" r="8" opacity="0.82" />
                                <circle cx="426" cy="172" r="8" opacity="0.82" />
                                <circle cx="144" cy="254" r="8" opacity="0.82" />
                                <circle cx="376" cy="254" r="8" opacity="0.82" />
                                <circle cx="260" cy="48" r="8" opacity="0.82" />
                                <circle cx="260" cy="272" r="8" opacity="0.82" />
                            </g>
                            <circle
                                cx="260"
                                cy="160"
                                r="70"
                                fill="#00E5FF"
                                fillOpacity="0.08"
                                stroke="#00E5FF"
                                strokeWidth="2"
                            />
                            <circle
                                cx="260"
                                cy="160"
                                r="47"
                                fill="#00E5FF"
                                fillOpacity="0.14"
                                stroke="#00E5FF"
                                strokeOpacity="0.65"
                            />
                            <text
                                x="260"
                                y="168"
                                fill="#EAFBFF"
                                fontFamily="Inter, Arial, sans-serif"
                                fontSize="22"
                                fontWeight="700"
                                textAnchor="middle"
                            >
                                G.I.R.U
                            </text>
                        </svg>
                    </div>
                    <p className="text-base leading-8 text-text-secondary">
                        No vendemos humo. Nuestros productos nacen de investigación real.
                        Puedes auditarlos tú mismo con Claude o ChatGPT.
                    </p>
                    <Button href="/mundo-giruia" variant="secondary" className="mt-8">
                        Ver laboratorio <ArrowRight size={16} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
