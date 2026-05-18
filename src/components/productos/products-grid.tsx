"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Bell,
    Clock,
    DatabaseBackup,
    KeyRound,
    ScanSearch,
    ShieldCheck,
    SlidersHorizontal,
    X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import { AudienceBadge } from "@/components/productos/audience-badge";
import { ProductFilters } from "@/components/productos/product-filters";
import { Badge } from "@/components/ui/badge";
import { WaitlistModal } from "@/components/waitlist-modal";
import type {
    Audience,
    Product,
    ProductStatus,
    Subcategory,
} from "@/lib/constants";

interface ProductsGridProps {
    products: Product[];
    initialAudience?: Audience;
}

const PRODUCT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "key-round": KeyRound,
    "shield-check": ShieldCheck,
    "scan-search": ScanSearch,
    "database-backup": DatabaseBackup,
};

export function ProductsGrid({ products, initialAudience }: ProductsGridProps) {
    const [audiences, setAudiences] = useState<Audience[]>(
        initialAudience ? [initialAudience] : [],
    );
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [statuses, setStatuses] = useState<ProductStatus[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [waitlistFor, setWaitlistFor] = useState<Product | null>(null);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            if (
                audiences.length > 0 &&
                !p.audience.some((a) => audiences.includes(a))
            ) {
                return false;
            }
            if (
                subcategories.length > 0 &&
                !subcategories.includes(p.subcategory)
            ) {
                return false;
            }
            if (statuses.length > 0 && !statuses.includes(p.status)) {
                return false;
            }
            return true;
        });
    }, [products, audiences, subcategories, statuses]);

    const resetFilters = () => {
        setAudiences(initialAudience ? [initialAudience] : []);
        setSubcategories([]);
        setStatuses([]);
    };

    const filtersNode = (
        <ProductFilters
            selectedAudiences={audiences}
            selectedSubcategories={subcategories}
            selectedStatuses={statuses}
            onAudiencesChange={setAudiences}
            onSubcategoriesChange={setSubcategories}
            onStatusesChange={setStatuses}
            onReset={resetFilters}
        />
    );

    return (
        <>
            <div className="flex items-center justify-between mb-5 lg:hidden">
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-border-dark bg-surface px-4 py-2 text-sm text-paper"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                </button>
                <span className="text-xs text-text-muted">
                    {filtered.length} de {products.length}
                </span>
            </div>

            <div className="grid lg:grid-cols-[260px_1fr] gap-8">
                <div className="hidden lg:block">{filtersNode}</div>

                <div className="flex flex-col gap-5">
                    <p className="hidden lg:block text-sm text-text-muted">
                        Mostrando <span className="text-paper">{filtered.length}</span>{" "}
                        de {products.length} productos
                    </p>

                    {filtered.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border-dark p-10 text-center">
                            <p className="text-paper text-base mb-2">
                                No hay productos que coincidan con tus filtros.
                            </p>
                            <p className="text-sm text-text-secondary mb-5">
                                Limpia los filtros o cuéntanos qué necesitas: lo
                                construimos a medida.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-2 rounded-full border border-border-dark bg-surface px-4 py-2 text-sm text-paper hover:border-flash transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 rounded-full bg-paper text-onyx px-4 py-2 text-sm font-medium hover:bg-paper/95 transition-colors"
                                >
                                    Servicio custom →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map((product, idx) => {
                                const available = product.status === "available";
                                const Icon =
                                    PRODUCT_ICONS[product.icon] ?? KeyRound;
                                return (
                                    <motion.article
                                        key={product.slug}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{
                                            duration: 0.45,
                                            delay: idx * 0.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="group relative h-full flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-flash/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)] transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-flash/10 border border-flash/20 text-flash">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <Badge variant={available ? "cyan" : "muted"}>
                                                {available ? "Disponible" : "Próximamente"}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {product.audience.map((a) => (
                                                <AudienceBadge key={a} audience={a} />
                                            ))}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-paper tracking-tight mb-1.5">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                {product.tagline}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-text-muted">
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="w-3 h-3" />~
                                                {product.estimated_install_minutes} min instalación
                                            </span>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-border-dark flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
                                                    Precio
                                                </span>
                                                <span className="text-2xl font-bold text-flash tracking-tight leading-none">
                                                    {product.price}€
                                                </span>
                                            </div>
                                            {available ? (
                                                <Link
                                                    href={`/productos/${product.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-flash hover:gap-2 transition-all"
                                                >
                                                    Ver detalles <ArrowRight size={14} />
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setWaitlistFor(product)}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-flash transition-colors"
                                                >
                                                    <Bell size={14} /> Avísame
                                                </button>
                                            )}
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {drawerOpen && (
                <div
                    className="fixed inset-0 z-[55] lg:hidden bg-onyx/85 backdrop-blur-md flex"
                    onClick={() => setDrawerOpen(false)}
                >
                    <div
                        className="ml-auto w-[85%] max-w-sm h-full bg-onyx border-l border-border-dark p-5 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-paper">Filtros</h3>
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Cerrar"
                                className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-border-dark text-paper"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        {filtersNode}
                    </div>
                </div>
            )}

            <WaitlistModal
                open={waitlistFor !== null}
                productSlug={waitlistFor?.slug ?? ""}
                productName={waitlistFor?.name ?? ""}
                onClose={() => setWaitlistFor(null)}
            />
        </>
    );
}
