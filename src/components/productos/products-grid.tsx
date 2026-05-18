"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/constants";

interface ProductsGridProps {
    products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
    const [waitlistFor, setWaitlistFor] = useState<Product | null>(null);

    return (
        <>
            <div className="grid md:grid-cols-2 gap-5">
                {products.map((product, idx) => {
                    const available = product.status === "available";
                    return (
                        <motion.article
                            key={product.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.5,
                                delay: idx * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group relative h-full flex flex-col gap-5 p-8 rounded-2xl bg-surface border border-border-dark hover:border-flash/40 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <Badge variant={available ? "cyan" : "muted"}>
                                    {available ? "Disponible" : "Próximamente"}
                                </Badge>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
                                        Precio
                                    </span>
                                    <span className="text-2xl font-bold text-flash tracking-tight leading-none">
                                        {product.price}€
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-paper tracking-tight mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {product.tagline}
                                </p>
                            </div>

                            <div className="mt-auto pt-5 border-t border-border-dark">
                                {available ? (
                                    <Link
                                        href={`/productos/${product.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-flash hover:gap-3 transition-all"
                                    >
                                        Ver detalles <ArrowRight size={14} />
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setWaitlistFor(product)}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-flash transition-colors"
                                    >
                                        <Bell size={14} /> Avísame cuando salga
                                    </button>
                                )}
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            <WaitlistModal
                open={waitlistFor !== null}
                productSlug={waitlistFor?.slug ?? ""}
                productName={waitlistFor?.name ?? ""}
                onClose={() => setWaitlistFor(null)}
            />
        </>
    );
}
