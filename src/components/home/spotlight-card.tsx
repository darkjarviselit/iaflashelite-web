"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SpotlightCard({
	href,
	delay = 0,
	children,
}: {
	href: string;
	delay?: number;
	children: ReactNode;
}) {
	const reduce = useReducedMotion();
	const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

	const entrance = reduce
		? {}
		: {
				initial: { opacity: 0, y: 18 },
				whileInView: { opacity: 1, y: 0 },
				viewport: { once: true, margin: "-80px" },
				transition: { duration: 0.5, delay, ease },
			};

	return (
		<motion.a
			href={href}
			{...entrance}
			onMouseMove={
				reduce
					? undefined
					: (event) => {
							const rect = event.currentTarget.getBoundingClientRect();
							setPos({
								x: event.clientX - rect.left,
								y: event.clientY - rect.top,
							});
						}
			}
			onMouseLeave={reduce ? undefined : () => setPos(null)}
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
		>
			{!reduce && (
				<span
					aria-hidden
					className="pointer-events-none absolute inset-0 transition-opacity duration-300"
					style={{
						opacity: pos ? 1 : 0,
						background: pos
							? `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(0,229,255,0.12), transparent 70%)`
							: undefined,
					}}
				/>
			)}
			<div className="relative z-10 flex flex-col">{children}</div>
		</motion.a>
	);
}
