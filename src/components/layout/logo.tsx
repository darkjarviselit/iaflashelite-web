import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
    return (
        <Link
            href="/"
            className={`inline-flex items-center gap-2.5 group ${className}`}
            aria-label="IA Flash Elite — Inicio"
        >
            <span className="relative inline-flex items-center justify-center">
                <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-transform duration-300 group-hover:scale-110"
                >
                    <path d="M12 0L0 14H8L6 24L20 10H12L12 0Z" fill="#00E5FF" />
                </svg>
            </span>
            <span className="font-bold text-[15px] tracking-tight">
                IA <span className="text-flash">Flash</span> Elite
            </span>
        </Link>
    );
}
