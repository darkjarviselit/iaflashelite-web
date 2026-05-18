import { Building2, Code2, User } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { AUDIENCES, type Audience } from "@/lib/constants";

interface AudienceBadgeProps {
    audience: Audience;
    size?: "sm" | "md";
    className?: string;
}

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "building-2": Building2,
    user: User,
    "code-2": Code2,
};

const COLOR_STYLES: Record<
    "blue" | "green" | "purple",
    { bg: string; border: string; text: string }
> = {
    blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
    },
    green: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
    },
    purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700",
    },
};

export function AudienceBadge({
    audience,
    size = "sm",
    className = "",
}: AudienceBadgeProps) {
    const meta = AUDIENCES.find((a) => a.id === audience);
    if (!meta) return null;
    const Icon = ICONS[meta.icon] ?? User;
    const palette = COLOR_STYLES[meta.color];
    const sizing =
        size === "md"
            ? "px-2.5 py-1 text-xs gap-1.5"
            : "px-2 py-0.5 text-[10px] gap-1";
    return (
        <span
            className={`inline-flex items-center rounded-full border font-medium tracking-wide ${sizing} ${palette.bg} ${palette.border} ${palette.text} ${className}`}
            title={meta.label}
        >
            <Icon className={size === "md" ? "w-3.5 h-3.5" : "w-3 h-3"} />
            {meta.short}
        </span>
    );
}
