import { cn } from "@/lib/utils";

interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
    return (
        <div className={cn("inline-flex items-center gap-3", className)}>
            <span className="block h-px w-8 bg-flash" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-text-secondary">
                {children}
            </span>
        </div>
    );
}
