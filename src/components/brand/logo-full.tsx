import Link from "next/link";
import { LogoIcon } from "./logo-icon";

type Size = "sm" | "md" | "lg";

interface LogoFullProps {
    size?: Size;
    href?: string | null;
    className?: string;
}

const SIZES: Record<Size, { icon: number; text: string; gap: string }> = {
    sm: { icon: 18, text: "text-[14px]", gap: "gap-2" },
    md: { icon: 22, text: "text-[16px]", gap: "gap-2.5" },
    lg: { icon: 30, text: "text-[20px]", gap: "gap-3" },
};

export function LogoFull({ size = "md", href = "/", className = "" }: LogoFullProps) {
    const s = SIZES[size];
    const content = (
        <span
            className={`inline-flex items-center ${s.gap} ${className}`}
            style={{ letterSpacing: "-0.4px" }}
        >
            <LogoIcon size={s.icon} />
            <span className={`font-bold ${s.text} leading-none`}>
                <span className="text-paper font-bold">IA </span>
                <span className="text-flash font-extrabold">Flash</span>
                <span className="text-paper font-bold"> Elite</span>
            </span>
        </span>
    );
    if (!href) return content;
    return (
        <Link href={href} aria-label="IA Flash Elite — Inicio" className="inline-flex group">
            {content}
        </Link>
    );
}
