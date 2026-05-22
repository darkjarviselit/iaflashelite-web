"use client";

import { motion } from "framer-motion";
import {
    HeadphonesIcon,
    Infinity as InfinityIcon,
    Lock,
    ShieldCheck,
    Timer,
    Wallet,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const GUARANTEES: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}> = [
    {
        icon: ShieldCheck,
        title: "7 días devolución",
        description:
            "Si no te convence, devuelvo el 100%. Sin preguntas. Sin justificaciones.",
    },
    {
        icon: Timer,
        title: "Plazo confirmado o devolución",
        description:
            "Antes de cobrar te confirmo el plazo exacto. Si fallo, devuelvo el dinero.",
    },
    {
        icon: Wallet,
        title: "Pago claro según producto",
        description:
            "Productos descargables con pago directo. Proyectos a medida con alcance y plazo confirmados antes de empezar.",
    },
    {
        icon: Lock,
        title: "Sin trackers ni nube",
        description:
            "Tus datos no se venden ni se almacenan en servidores ajenos. Privacy by design.",
    },
    {
        icon: InfinityIcon,
        title: "Pago único de por vida",
        description:
            "Sin suscripciones ocultas. Pagas una vez. Lo tienes para siempre.",
    },
    {
        icon: HeadphonesIcon,
        title: "Soporte 30 días incluido",
        description:
            "Durante 30 días resuelvo dudas y ajusto detalles sin coste adicional.",
    },
];

export function GuaranteesSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-white text-gray-900">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-14 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        Garantías
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                        Garantías reales. Sin asteriscos.
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                        Estas son las garantías. Las verás repetidas en cada producto
                        porque las cumplimos en todos.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {GUARANTEES.map((g, idx) => {
                        const Icon = g.icon;
                        return (
                            <motion.article
                                key={g.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.06,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                            >
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                    {g.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {g.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
