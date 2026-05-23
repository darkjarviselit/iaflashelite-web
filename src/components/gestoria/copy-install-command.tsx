"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyInstallCommandProps = {
    readonly command: string;
};

export function CopyInstallCommand({ command }: CopyInstallCommandProps) {
    const [copied, setCopied] = useState(false);

    const copyCommand = async (): Promise<void> => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    return (
        <button
            type="button"
            onClick={() => {
                void copyCommand();
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-flash/30 bg-flash/10 px-5 text-sm font-semibold text-flash transition-colors hover:border-flash hover:bg-flash/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flash/70 sm:w-auto"
        >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copiado" : "Copiar comando"}
        </button>
    );
}
