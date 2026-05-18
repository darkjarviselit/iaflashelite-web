"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Code2, User } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { AUDIENCES } from "@/lib/constants";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "building-2": Building2,
    user: User,
    "code-2": Code2,
};

export function AudienceSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-white text-gray-900">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        ¿Quién eres tú?
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
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
                                    className="group h-full flex flex-col gap-5 p-7 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                >
                                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-1.5">
                                            {a.label}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {a.description}
                                        </p>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 group-hover:text-cyan-700 group-hover:gap-2 transition-all">
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
