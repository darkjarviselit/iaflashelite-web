"use client";

import { Apple, ArrowRight, Check, Monitor } from "lucide-react";
import { type ComponentType, type SVGProps, useState } from "react";
import { CheckoutForm } from "@/components/productos/checkout-form";
import { Button } from "@/components/ui/button";
import {
	KENVO_MAC_ARM_PRODUCT_SLUG,
	KENVO_MAC_INTEL_PRODUCT_SLUG,
	PRODUCTS,
} from "@/lib/constants";

const KENVO_PRICE = 150;
const KENVO_ORIGINAL_PRICE = 290;

interface Platform {
	slug: string | null;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	description: string;
	badge?: string;
	available: boolean;
}

const PLATFORMS: Platform[] = [
	{
		slug: KENVO_MAC_ARM_PRODUCT_SLUG,
		icon: Apple,
		title: "Mac Apple Silicon",
		description: "Para Macs con chip M1, M2, M3 o M4.",
		badge: "Recomendado para Macs nuevos",
		available: true,
	},
	{
		slug: KENVO_MAC_INTEL_PRODUCT_SLUG,
		icon: Apple,
		title: "Mac Intel",
		description: "Para Macs anteriores a 2020.",
		available: true,
	},
	{
		slug: null,
		icon: Monitor,
		title: "Windows",
		description: "Windows 10 64-bit o superior.",
		badge: "Próximamente",
		available: false,
	},
];

function productName(slug: string): string {
	return PRODUCTS.find((product) => product.slug === slug)?.name ?? "Kenvo";
}

export function PlatformCheckout() {
	const [selected, setSelected] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-8">
			<div className="grid gap-4 sm:grid-cols-3">
				{PLATFORMS.map((platform) => {
					const Icon = platform.icon;
					const isSelected = platform.available && selected === platform.slug;
					return (
						<button
							key={platform.title}
							type="button"
							disabled={!platform.available}
							aria-pressed={isSelected}
							onClick={() => platform.slug && setSelected(platform.slug)}
							className={`relative flex flex-col gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 ease-out ${
								!platform.available
									? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-60"
									: isSelected
										? "border-flash bg-flash/10 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
										: "cursor-pointer border-white/10 bg-white/[0.04] hover:border-flash/40 hover:bg-white/[0.06]"
							}`}
						>
							{isSelected && (
								<span
									className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-flash text-onyx"
									aria-hidden
								>
									<Check size={12} strokeWidth={3} />
								</span>
							)}
							<span
								className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
									isSelected
										? "border-flash/40 bg-flash/15 text-flash"
										: "border-white/10 bg-white/[0.05] text-paper"
								}`}
							>
								<Icon className="h-5 w-5" />
							</span>
							<span className="text-sm font-semibold text-paper">
								{platform.title}
							</span>
							<span className="text-xs leading-5 text-text-secondary">
								{platform.description}
							</span>
							{platform.badge && (
								<span
									className={`mt-1 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
										platform.available
											? "bg-flash/15 text-flash"
											: "bg-white/[0.06] text-text-muted"
									}`}
								>
									{platform.badge}
								</span>
							)}
						</button>
					);
				})}
			</div>

			<div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
				<div className="flex flex-wrap items-end gap-3">
					<span className="text-4xl font-bold leading-none text-flash">
						{KENVO_PRICE} €
					</span>
					<span className="pb-1 text-base text-text-muted line-through">
						{KENVO_ORIGINAL_PRICE} €
					</span>
				</div>
				<p className="text-sm text-text-secondary">
					Pago único · Descarga inmediata · Garantía 14 días
				</p>
			</div>

			{selected ? (
				<CheckoutForm
					key={selected}
					slug={selected}
					name={productName(selected)}
					price={KENVO_PRICE}
					type="download"
				/>
			) : (
				<div className="flex flex-col gap-2">
					<Button variant="gradient" size="lg" disabled className="w-full">
						Comprar y descargar — {KENVO_PRICE} € <ArrowRight size={16} />
					</Button>
					<p className="text-center text-xs text-text-muted">
						Elige tu plataforma para continuar.
					</p>
				</div>
			)}
		</div>
	);
}
