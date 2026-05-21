"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Lock, ScanSearch, ShieldAlert } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

const CARDS: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}> = [
    {
        icon: Lock,
        title: "Código abierto a auditoría",
        description:
            "Cada producto incluye el código fuente legible. Sin compiladores, sin ofuscación, sin trucos.",
    },
    {
        icon: Bot,
        title: "Prompts pre-hechos",
        description:
            "Te entregamos los prompts listos para copiar a Claude/ChatGPT. Verificación en 2 minutos.",
    },
    {
        icon: ShieldAlert,
        title: "Tu IA, tu veredicto",
        description:
            "No te pedimos confianza ciega. Te enseñamos a verificar. Si la IA dice «sospechoso», no instales.",
    },
];

export function AuditableSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-gray-50 text-gray-900 border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold inline-flex items-center gap-2">
                        <ScanSearch className="w-3.5 h-3.5" />
                        Auditable
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                        🔍 Auditable por cualquiera.
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed">
                        No confíes solo en nuestra palabra. Te damos los prompts para
                        que pases nuestro código por Claude o ChatGPT y compruebes tú
                        mismo que es seguro. Esto NO lo hace nadie más en el sector.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                            >
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-white border border-cyan-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">
                            ⚠️ Importante:
                        </span>{" "}
                        ninguna verificación es 100% infalible, pero pasar el código por
                        una IA detecta el 95% del malware conocido en minutos. Es una
                        capa de seguridad gratuita que recomendamos SIEMPRE — no solo
                        con nosotros, sino con CUALQUIER software que descargues.
                    </p>
                </div>

                <div className="mt-8 flex">
                    <Link
                        href="/como-verificar"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
                    >
                        Ver cómo verificar nuestro código <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
