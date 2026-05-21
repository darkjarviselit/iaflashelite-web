"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	Link2,
	MailWarning,
	ScanSearch,
	Shield,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { PRODUCTS, type Product } from "@/lib/constants";

// Slugs mostrados en la home como entrada al catálogo. Si un slug no existe en
// PRODUCTS, simplemente se omite (no rompemos build por catálogo cambiado).
const FEATURED_SLUGS = [
	"auditor-web",
	"anti-phishing",
	"verificador-urls",
] as const;

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
	"scan-search": ScanSearch,
	"mail-warning": MailWarning,
	"link-2": Link2,
};

function getFeatured(): Product[] {
	const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));
	return FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
		(p): p is Product => Boolean(p),
	);
}

export function FeaturedProductsSection() {
	const featured = getFeatured();
	if (featured.length === 0) return null;

	return (
		<section
			id="productos-destacados"
			className="relative py-24 lg:py-32 bg-white text-gray-900"
		>
			<div className="max-w-[1200px] mx-auto px-6">
				<div className="flex flex-col gap-4 mb-12 max-w-2xl">
					<span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
						Productos destacados
					</span>
					<h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900">
						Lo que puedes comprar hoy.
					</h2>
					<p className="text-base text-gray-600 leading-relaxed">
						Tres herramientas descargables listas para usar en local. Pago
						único, garantía 7 días.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-5">
					{featured.map((product, idx) => {
						const Icon = ICONS[product.icon] ?? Shield;
						return (
							<motion.article
								key={product.slug}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{
									duration: 0.5,
									delay: idx * 0.08,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="group flex flex-col gap-5 p-7 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
							>
								<div className="flex items-start justify-between">
									<span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
										<Icon className="w-5 h-5" />
									</span>
									<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-cyan-50 border border-cyan-200 text-cyan-700">
										Pago único
									</span>
								</div>

								<div>
									<h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-1.5">
										{product.name}
									</h3>
									<p className="text-sm text-gray-600 leading-relaxed">
										{product.tagline}
									</p>
								</div>

								<div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-200">
									<div className="flex flex-col">
										<span className="text-[10px] tracking-[0.18em] uppercase text-gray-500">
											Precio
										</span>
										<span className="text-2xl font-bold text-cyan-600 tracking-tight">
											{product.price}€
										</span>
									</div>
									<Link
										href={`/productos/${product.slug}`}
										className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 group-hover:text-cyan-700 group-hover:gap-2 transition-all"
									>
										Ver detalle <ArrowRight size={14} />
									</Link>
								</div>
							</motion.article>
						);
					})}
				</div>

				<div className="mt-10 flex">
					<Link
						href="/productos"
						className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
					>
						Ver catálogo completo <ArrowRight size={14} />
					</Link>
				</div>
			</div>
		</section>
	);
}
