"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Code2, User } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { AUDIENCES } from "@/lib/constants";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "building-2": Building2,
    user: User,
    "code-2": Code2,
};

export function AudienceSection() {
    return (
        <section className="relative py-28 lg:py-32 bg-onyx">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-6 mb-14 max-w-2xl">
                    <SectionLabel>¿Quién eres tú?</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                        Elige tu perfil y te llevamos directo a lo que te interesa.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {AUDIENCES.map((a, idx) => {
                        const Icon = ICONS[a.icon] ?? User;
                        return (
                            <motion.div
                                key={a.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <Link
                                    href={`/soluciones/${a.id}`}
                                    className="group h-full flex flex-col gap-5 p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-flash/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)] transition-all duration-200 ease-out"
                                >
                                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-flash/10 border border-flash/20 text-flash">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-paper tracking-tight mb-1.5">
                                            {a.label}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {a.description}
                                        </p>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-flash group-hover:gap-2 transition-all">
                                        Ver soluciones <ArrowRight size={14} />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
