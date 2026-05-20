"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassAccent = "cyan" | "gold" | "purple";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
    accent?: GlassAccent;
}

const accentStyles: Record<GlassAccent, string> = {
    cyan: "border-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_0_36px_rgba(0,229,255,0.16)]",
    gold: "border-[#FFD700]/25 hover:border-[#FFD700]/70 hover:shadow-[0_0_42px_rgba(255,215,0,0.18)]",
    purple: "border-[#A855F7]/20 hover:border-[#A855F7]/60 hover:shadow-[0_0_38px_rgba(168,85,247,0.18)]",
};

const glowStyles: Record<GlassAccent, string> = {
    cyan: "bg-cyan-400/20",
    gold: "bg-[#FFD700]/20",
    purple: "bg-[#A855F7]/20",
};

export function GlassCard({
    children,
    className,
    glow = false,
    accent = "cyan",
}: GlassCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5, scale: 1.01 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-white/[0.02] p-6 backdrop-blur-xl transition-colors duration-300",
                "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%,rgba(255,255,255,0.03))] before:opacity-60",
                accentStyles[accent],
                className,
            )}
            style={{ transformStyle: "preserve-3d" }}
        >
            {glow ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl",
                        glowStyles[accent],
                    )}
                />
            ) : null}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
