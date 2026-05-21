"use client";

import { motion } from "framer-motion";
import { COMPETITORS } from "@/lib/constants";

export function WhyCheapSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-gray-50 text-gray-900 border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                        Comparativa
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
                        ¿Por qué tan barato?
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        No es magia. Es matemática honesta.
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed">
                        Sin oficina. Sin equipo de marketing. Sin inversores que exijan
                        márgenes del 80%. Solo yo + un ecosistema de IA propio que
                        trabaja conmigo. Lo que ahorro en estructura, te lo descuento
                        en el precio.
                    </p>
                </div>

                <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-5 py-4 text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                                    Categoría
                                </th>
                                <th className="text-left px-5 py-4 text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                    Nosotros
                                </th>
                                <th className="text-left px-5 py-4 text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                                    Competencia
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {COMPETITORS.map((row) => (
                                <tr key={row.category} className="align-top">
                                    <td className="px-5 py-5 text-gray-900 font-medium">
                                        {row.category}
                                    </td>
                                    <td className="px-5 py-5">
                                        <span className="text-base font-semibold text-cyan-700">
                                            {row.ours.price}
                                        </span>
                                        <span className="block text-xs text-gray-500 mt-1">
                                            {row.ours.product}
                                        </span>
                                    </td>
                                    <td className="px-5 py-5">
                                        <ul className="flex flex-col gap-2">
                                            {row.competitors.map((c) => (
                                                <li key={c.name} className="text-gray-700">
                                                    <span className="font-medium text-gray-900">
                                                        {c.name}:
                                                    </span>{" "}
                                                    {c.price}
                                                    <span className="block text-xs text-gray-500">
                                                        {c.note}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden flex flex-col gap-4">
                    {COMPETITORS.map((row, idx) => (
                        <motion.article
                            key={row.category}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.45,
                                delay: idx * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 bg-white"
                        >
                            <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                                {row.category}
                            </h3>
                            <div className="flex flex-col gap-1 p-4 rounded-xl bg-cyan-50 border border-cyan-100">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-cyan-700 font-semibold">
                                    Nosotros
                                </span>
                                <span className="text-base font-semibold text-cyan-800">
                                    {row.ours.price}
                                </span>
                                <span className="text-xs text-gray-600">{row.ours.product}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                                    Competencia
                                </span>
                                {row.competitors.map((c) => (
                                    <div
                                        key={c.name}
                                        className="p-3 rounded-xl bg-gray-50 border border-gray-200"
                                    >
                                        <span className="text-sm font-medium text-gray-900">
                                            {c.name}: {c.price}
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            {c.note}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
                    Comparativas basadas en precios públicos de competidores en mayo
                    2026. Sin afán de menospreciar a nadie — cada uno cobra lo que
                    necesita. Estos son nuestros costes reales reflejados en precios.
                </p>
            </div>
        </section>
    );
}
