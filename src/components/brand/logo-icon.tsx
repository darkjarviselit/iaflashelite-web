interface LogoIconProps {
    size?: number;
    className?: string;
    withGlow?: boolean;
}

export function LogoIcon({ size = 24, className, withGlow = true }: LogoIconProps) {
    const height = (size * 30) / 24;
    return (
        <svg
            width={size}
            height={height}
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={withGlow ? { filter: "drop-shadow(0 0 6px rgba(0,229,255,0.55))" } : undefined}
            aria-hidden
        >
            <defs>
                <linearGradient id="flash-grad" x1="0" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00E5FF" />
                    <stop offset="1" stopColor="#00B8D4" />
                </linearGradient>
            </defs>
            <path
                d="M14 0L0 16.5H8.5L7 30L24 12H14.5L14 0Z"
                fill="url(#flash-grad)"
                stroke="#00E5FF"
                strokeWidth="0.4"
                strokeLinejoin="round"
            />
        </svg>
    );
}
