"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyPromptButton({ prompt }: { prompt: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2400);
        } catch {
            // Fallback: select & exec deprecated; just notify silently.
            setCopied(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                copied
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-flash/10 text-flash border border-flash/20 hover:bg-flash/15"
            }`}
            aria-live="polite"
        >
            {copied ? (
                <>
                    <Check size={14} /> Copiado
                </>
            ) : (
                <>
                    <Copy size={14} /> Copiar prompt
                </>
            )}
        </button>
    );
}
