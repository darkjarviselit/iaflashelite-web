"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalAnimatedProps {
    command?: string;
    className?: string;
    large?: boolean;
}

export function TerminalAnimated({
    command = "npx mundogiru-agent",
    className,
    large = false,
}: TerminalAnimatedProps) {
    const prompt = `$ ${command}`;
    const [visibleText, setVisibleText] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setVisibleText("");
        let index = 0;
        const timer = window.setInterval(() => {
            index += 1;
            setVisibleText(prompt.slice(0, index));
            if (index >= prompt.length) window.clearInterval(timer);
        }, 42);

        return () => window.clearInterval(timer);
    }, [prompt]);

    const copyCommand = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div
            className={cn(
                "overflow-hidden rounded-2xl border border-cyan-400/25 bg-black/80 font-mono text-sm text-paper shadow-[0_0_50px_rgba(0,229,255,0.12)] backdrop-blur-xl",
                large ? "text-base md:text-lg" : "",
                className,
            )}
        >
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <button
                    type="button"
                    onClick={copyCommand}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-cyan-400/40 hover:text-flash"
                    aria-label="Copiar comando"
                >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copiado" : "Copy"}
                </button>
            </div>
            <div className={cn("px-4 py-5", large ? "md:px-6 md:py-7" : "")}>
                <span className="text-flash">{visibleText}</span>
                <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-flash" />
            </div>
        </div>
    );
}
