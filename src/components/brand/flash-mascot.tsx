type Pose = "waving" | "running" | "thinking";

interface FlashMascotProps {
    pose?: Pose;
    size?: number;
    className?: string;
}

const COLORS = {
    body: "#00E5FF",
    shade: "#00B8D4",
    deepShade: "#0091A7",
    eyeWhite: "#FFFFFF",
    pupil: "#0A0A0A",
    sparkle: "#7FFFFF",
    motion: "#333333",
};

export function FlashMascot({ pose = "waving", size = 220, className }: FlashMascotProps) {
    const height = (size * 160) / 120;
    return (
        <svg
            width={size}
            height={height}
            viewBox="0 0 120 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label={`Mascota Flash — ${pose}`}
        >
            <defs>
                <linearGradient id="mascot-body" x1="20" y1="0" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={COLORS.body} />
                    <stop offset="1" stopColor={COLORS.shade} />
                </linearGradient>
                <radialGradient id="mascot-glow" cx="60" cy="80" r="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={COLORS.body} stopOpacity="0.25" />
                    <stop offset="1" stopColor={COLORS.body} stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="60" cy="80" r="56" fill="url(#mascot-glow)" />
            {pose === "waving" && <WavingMascot />}
            {pose === "running" && <RunningMascot />}
            {pose === "thinking" && <ThinkingMascot />}
        </svg>
    );
}

function MascotBody({ rotation = 0 }: { rotation?: number }) {
    return (
        <g transform={`rotate(${rotation} 60 80)`}>
            <path
                d="M68 18 L36 78 L54 78 L48 130 L86 70 L66 70 L68 18 Z"
                fill="url(#mascot-body)"
                stroke={COLORS.shade}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <path
                d="M48 130 L86 70 L66 70 L68 18"
                fill="none"
                stroke={COLORS.deepShade}
                strokeWidth="0.8"
                strokeLinejoin="round"
                opacity="0.5"
            />
        </g>
    );
}

function Eye({ cx, cy, look = "front", size = 1 }: { cx: number; cy: number; look?: "front" | "up-right" | "forward"; size?: number }) {
    const px = look === "up-right" ? cx + 1 : look === "forward" ? cx + 0.5 : cx;
    const py = look === "up-right" ? cy - 1 : cy;
    return (
        <g>
            <ellipse cx={cx} cy={cy} rx={3.5 * size} ry={4 * size} fill={COLORS.eyeWhite} stroke={COLORS.deepShade} strokeWidth="0.5" />
            <circle cx={px} cy={py} r={1.6 * size} fill={COLORS.pupil} />
            <circle cx={px - 0.5} cy={py - 0.7} r={0.5 * size} fill={COLORS.eyeWhite} />
        </g>
    );
}

function Sparkle({ cx, cy, r = 2 }: { cx: number; cy: number; r?: number }) {
    return (
        <g fill={COLORS.sparkle}>
            <circle cx={cx} cy={cy} r={r * 0.5} opacity="0.8" />
            <path d={`M${cx} ${cy - r} L${cx + r * 0.3} ${cy} L${cx} ${cy + r} L${cx - r * 0.3} ${cy} Z`} opacity="0.7" />
            <path d={`M${cx - r} ${cy} L${cx} ${cy - r * 0.3} L${cx + r} ${cy} L${cx} ${cy + r * 0.3} Z`} opacity="0.7" />
        </g>
    );
}

function WavingMascot() {
    return (
        <g>
            <MascotBody rotation={-8} />
            {/* Eyes */}
            <Eye cx={56} cy={58} look="front" />
            <Eye cx={66} cy={58} look="front" />
            {/* Smile */}
            <path
                d="M55 66 Q60 70 65 66"
                stroke={COLORS.pupil}
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
            />
            {/* Right arm raised (waving) */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="78" y1="68" x2="96" y2="42" />
                <circle cx="96" cy="42" r="5" />
            </g>
            {/* Left arm relaxed */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="42" y1="76" x2="32" y2="98" />
                <circle cx="32" cy="98" r="4.5" />
            </g>
            {/* Legs */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="55" y1="118" x2="48" y2="148" />
                <ellipse cx="46" cy="150" rx="6" ry="3" />
                <line x1="65" y1="118" x2="72" y2="148" />
                <ellipse cx="74" cy="150" rx="6" ry="3" />
            </g>
            {/* Sparkles */}
            <Sparkle cx={102} cy={32} r={4} />
            <Sparkle cx={20} cy={50} r={3} />
            <Sparkle cx={108} cy={66} r={2.5} />
        </g>
    );
}

function RunningMascot() {
    return (
        <g>
            {/* Motion lines */}
            <g stroke={COLORS.motion} strokeWidth="2" strokeLinecap="round" opacity="0.6">
                <line x1="4" y1="70" x2="22" y2="70" />
                <line x1="2" y1="84" x2="26" y2="84" opacity="0.7" />
                <line x1="6" y1="98" x2="20" y2="98" opacity="0.4" />
                <line x1="0" y1="112" x2="16" y2="112" opacity="0.3" />
            </g>
            <MascotBody rotation={-25} />
            {/* Eyes (determined, looking forward) */}
            <Eye cx={62} cy={56} look="forward" />
            <Eye cx={72} cy={56} look="forward" />
            {/* Mouth (open) */}
            <ellipse cx={66} cy={66} rx="2.5" ry="1.6" fill={COLORS.pupil} />
            {/* Arms (running) */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="80" y1="58" x2="98" y2="48" />
                <circle cx="98" cy="48" r="4.5" />
                <line x1="48" y1="74" x2="28" y2="86" />
                <circle cx="28" cy="86" r="4.5" />
            </g>
            {/* Legs (stride) */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="58" y1="120" x2="42" y2="146" />
                <ellipse cx="40" cy="148" rx="7" ry="3" transform="rotate(-15 40 148)" />
                <line x1="70" y1="116" x2="86" y2="138" />
                <ellipse cx="88" cy="140" rx="7" ry="3" transform="rotate(20 88 140)" />
            </g>
            {/* Energy particles */}
            <Sparkle cx={108} cy={38} r={3} />
            <Sparkle cx={100} cy={120} r={3.5} />
            <Sparkle cx={14} cy={40} r={2.5} />
            <Sparkle cx={20} cy={130} r={3} />
        </g>
    );
}

function ThinkingMascot() {
    return (
        <g>
            <MascotBody rotation={0} />
            {/* Eyes (looking up-right) */}
            <Eye cx={56} cy={58} look="up-right" />
            <Eye cx={66} cy={58} look="up-right" />
            {/* Concentrated mouth (small line) */}
            <path
                d="M56 68 L65 68"
                stroke={COLORS.pupil}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            {/* Right arm bent (hand to chin) */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="78" y1="68" x2="82" y2="78" />
                <line x1="82" y1="78" x2="72" y2="72" />
                <circle cx="72" cy="72" r="4" />
            </g>
            {/* Left arm relaxed */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="42" y1="78" x2="34" y2="100" />
                <circle cx="34" cy="100" r="4.5" />
            </g>
            {/* Legs */}
            <g stroke={COLORS.shade} strokeWidth="3" strokeLinecap="round" fill={COLORS.body}>
                <line x1="55" y1="118" x2="50" y2="148" />
                <ellipse cx="48" cy="150" rx="6" ry="3" />
                <line x1="65" y1="118" x2="70" y2="148" />
                <ellipse cx="72" cy="150" rx="6" ry="3" />
            </g>
            {/* Thought bubble */}
            <g>
                <circle cx="96" cy="22" r="14" fill={COLORS.body} fillOpacity="0.18" stroke={COLORS.body} strokeWidth="1.2" />
                <circle cx="84" cy="36" r="3.5" fill={COLORS.body} fillOpacity="0.18" stroke={COLORS.body} strokeWidth="1" />
                <circle cx="78" cy="44" r="2" fill={COLORS.body} fillOpacity="0.18" stroke={COLORS.body} strokeWidth="0.8" />
                <path d="M93 18 L96 14 L99 18 L102 22 L96 30 L92 24 Z" fill={COLORS.body} />
            </g>
        </g>
    );
}
