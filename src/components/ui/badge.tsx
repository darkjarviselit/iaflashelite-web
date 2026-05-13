import { cn } from "@/lib/utils";

type Variant = "cyan" | "white" | "muted";

interface BadgeProps {
    variant?: Variant;
    children: React.ReactNode;
    className?: string;
}

const variants: Record<Variant, string> = {
    cyan: "bg-flash/10 text-flash border-flash/20",
    white: "bg-paper/5 text-paper border-paper/15",
    muted: "bg-surface text-text-secondary border-border-dark",
};

export function Badge({ variant = "cyan", children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.08em] uppercase border",
                variants[variant],
                className,
            )}
        >
            {variant === "cyan" && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-flash animate-pulse-cyan" />
            )}
            {children}
        </span>
    );
}
