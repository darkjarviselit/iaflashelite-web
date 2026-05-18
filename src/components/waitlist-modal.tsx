"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface WaitlistModalProps {
    open: boolean;
    productSlug: string;
    productName: string;
    onClose: () => void;
}

export function WaitlistModal({
    open,
    productSlug,
    productName,
    onClose,
}: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setEmail("");
            setAcceptedPrivacy(false);
            setDone(false);
            setError(null);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSending(true);
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    productSlug,
                    acceptedPrivacy,
                }),
            });
            const data = (await res.json()) as { ok: boolean; error?: string };
            if (!res.ok || !data.ok) {
                setError(data.error ?? "send_failed");
            } else {
                setDone(true);
            }
        } catch {
            setError("network_error");
        } finally {
            setSending(false);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-onyx/85 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md rounded-3xl border border-border-dark bg-surface p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Cerrar"
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-dark text-text-secondary hover:text-paper hover:border-flash transition-colors"
                        >
                            <X size={16} />
                        </button>

                        {done ? (
                            <div className="flex flex-col items-center text-center gap-5 py-4">
                                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-flash/10 text-flash">
                                    <CheckCircle2 size={26} />
                                </span>
                                <h2 className="text-2xl font-semibold text-paper">Anotado.</h2>
                                <p className="text-text-secondary">
                                    Te avisaremos por email cuando{" "}
                                    <span className="text-paper">{productName}</span> esté disponible.
                                </p>
                                <Button onClick={onClose} variant="secondary">
                                    Cerrar
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <header className="flex flex-col gap-2">
                                    <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-medium">
                                        Lista de espera
                                    </span>
                                    <h2 className="text-2xl font-semibold text-paper tracking-tight">
                                        Avísame del lanzamiento
                                    </h2>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Te enviaremos un email cuando{" "}
                                        <span className="text-paper">{productName}</span> esté
                                        disponible. Sin spam, solo el lanzamiento.
                                    </p>
                                </header>

                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                                        Email *
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        className="w-full h-12 px-4 rounded-xl bg-onyx border border-border-dark text-paper placeholder:text-text-muted text-sm focus:outline-none focus:border-flash/50 focus:ring-2 focus:ring-flash/20 transition-colors"
                                    />
                                </label>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="wl-accepted-privacy"
                                        checked={acceptedPrivacy}
                                        onChange={(e) =>
                                            setAcceptedPrivacy(e.target.checked)
                                        }
                                        required
                                        className="mt-1 h-4 w-4 rounded border-border-dark bg-onyx accent-flash focus:outline-none focus:ring-2 focus:ring-flash/40"
                                    />
                                    <label
                                        htmlFor="wl-accepted-privacy"
                                        className="text-sm text-text-secondary leading-relaxed"
                                    >
                                        Acepto la{" "}
                                        <a
                                            href="/legal/privacidad"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-flash underline hover:no-underline"
                                        >
                                            política de privacidad
                                        </a>
                                        .
                                    </label>
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400">⚠ {error}</p>
                                )}

                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={sending || !acceptedPrivacy}
                                >
                                    {sending ? "Enviando…" : "Apuntarme"}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
