"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS: ReadonlyArray<string> = [
	"Datos en tu ordenador",
	"Sin suscripción",
	"IA local",
	"Cero telemetría",
	"Privacidad real",
	"Para PYMES",
	"Código verificable",
	"Sin servidor",
];

function Track({ ariaHidden }: { ariaHidden: boolean }) {
	return (
		<div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
			{ITEMS.map((item) => (
				<span
					key={item}
					className="flex items-center gap-6 pr-6 text-sm font-medium text-white/60"
				>
					{item}
					<span className="text-cyan-400">·</span>
				</span>
			))}
		</div>
	);
}

export function MarqueeStrip() {
	const reduce = useReducedMotion();

	return (
		<div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 backdrop-blur-sm">
			<motion.div
				className="flex w-max items-center"
				animate={reduce ? undefined : { x: ["0%", "-50%"] }}
				transition={
					reduce
						? undefined
						: {
								duration: 40,
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							}
				}
			>
				<Track ariaHidden={false} />
				<Track ariaHidden={true} />
			</motion.div>
		</div>
	);
}
