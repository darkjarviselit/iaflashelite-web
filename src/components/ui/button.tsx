import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gradient";
type Size = "sm" | "md" | "lg";

interface BaseProps {
    variant?: Variant;
    size?: Size;
    className?: string;
    children: React.ReactNode;
}

interface ButtonAsButton
    extends BaseProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
    href?: undefined;
}
interface ButtonAsLink extends BaseProps {
    href: string;
    target?: string;
    rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<Size, string> = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-7 text-base",
};

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-paper text-onyx hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:bg-paper/95",
    secondary:
        "bg-transparent text-paper border border-border-dark hover:bg-surface hover:border-flash/40",
    ghost: "bg-transparent text-text-secondary hover:text-paper",
    gradient:
        "text-onyx font-semibold bg-[linear-gradient(135deg,#00e5ff_0%,#00b8d4_100%)] hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(0,229,255,0.4)]",
};

const base =
    "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-full transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flash/60 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const { variant = "primary", size = "md", className, children } = props;
    const classes = cn(base, sizeClasses[size], variantClasses[variant], className);
    if ("href" in props && props.href) {
        const isExternal = /^https?:\/\//.test(props.href);
        if (isExternal) {
            return (
                <a
                    href={props.href}
                    target={props.target ?? "_blank"}
                    rel={props.rel ?? "noopener noreferrer"}
                    className={classes}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link href={props.href} className={classes}>
                {children}
            </Link>
        );
    }
    const rest = props as ButtonAsButton;
    return (
        <button
            ref={ref}
            type={rest.type ?? "button"}
            disabled={rest.disabled}
            onClick={rest.onClick}
            className={classes}
        >
            {children}
        </button>
    );
});
