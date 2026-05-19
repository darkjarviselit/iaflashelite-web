"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Bell,
    Clock,
    DatabaseBackup,
    KeyRound,
    Link2,
    MonitorSmartphone,
    ScanSearch,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import { AudienceBadge } from "@/components/productos/audience-badge";
import { ProductFilters } from "@/components/productos/product-filters";
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
    hideFilters?: boolean;
}

const PRODUCT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "key-round": KeyRound,
    "shield-check": ShieldCheck,
    "scan-search": ScanSearch,
    "database-backup": DatabaseBackup,
    "monitor-smartphone": MonitorSmartphone,
    "link-2": Link2,
    sparkles: Sparkles,
};

export function ProductsGrid({ products, initialAudience, hideFilters = false }: ProductsGridProps) {
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
            {!hideFilters && (
                <div className="flex items-center justify-between mb-5 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtros
                    </button>
                    <span className="text-xs text-gray-500">
                        {filtered.length} de {products.length}
                    </span>
                </div>
            )}

            <div className={hideFilters ? "" : "grid lg:grid-cols-[260px_1fr] gap-8"}>
                {!hideFilters && (
                    <div className="hidden lg:block">{filtersNode}</div>
                )}

                <div className="flex flex-col gap-5">
                    {!hideFilters && (
                        <p className="hidden lg:block text-sm text-gray-500">
                            Mostrando{" "}
                            <span className="text-gray-900 font-semibold">
                                {filtered.length}
                            </span>{" "}
                            de {products.length} productos
                        </p>
                    )}

                    {filtered.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                            <p className="text-gray-900 text-base mb-2">
                                No hay productos que coincidan con tus filtros.
                            </p>
                            <p className="text-sm text-gray-600 mb-5">
                                Limpia los filtros o cuéntanos qué necesitas: lo
                                construimos a medida.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 hover:border-cyan-500 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:opacity-95 transition-opacity"
                                >
                                    Servicio custom →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map((product, idx) => {
                                const available = product.status === "available";
                                const isService = product.type === "service";
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
                                        className="group relative h-full flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                                                {isService && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border bg-cyan-50 border-cyan-200 text-cyan-700">
                                                        Servicio
                                                    </span>
                                                )}
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${
                                                        available
                                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                                            : "bg-gray-100 border-gray-300 text-gray-700"
                                                    }`}
                                                >
                                                    {available ? "Disponible" : "Próximamente"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {product.audience.map((a) => (
                                                <AudienceBadge key={a} audience={a} />
                                            ))}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {product.tagline}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-cyan-600" />
                                                {isService
                                                    ? `Entrega ${product.delivery_time ?? "48h"}`
                                                    : `~${product.estimated_install_minutes} min instalación`}
                                            </span>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-200 flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500">
                                                    Precio
                                                </span>
                                                <span className="text-2xl font-bold text-cyan-600 tracking-tight leading-none">
                                                    {product.price}€
                                                </span>
                                                <span className="text-xs font-medium text-emerald-600 mt-1">
                                                    🎁 +{" "}
                                                    {product.price < 20
                                                        ? "Mini guía gratis"
                                                        : product.price < 49
                                                            ? "Curso básico gratis"
                                                            : "Curso intermedio gratis"}
                                                </span>
                                            </div>
                                            {available ? (
                                                <Link
                                                    href={`/productos/${product.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
                                                >
                                                    Ver detalles <ArrowRight size={14} />
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setWaitlistFor(product)}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
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
                    className="fixed inset-0 z-[55] lg:hidden bg-onyx/50 backdrop-blur-sm flex"
                    onClick={() => setDrawerOpen(false)}
                >
                    <div
                        className="ml-auto w-[85%] max-w-sm h-full bg-white border-l border-gray-200 p-5 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-900">Filtros</h3>
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Cerrar"
                                className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-cyan-500 transition-colors"
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
