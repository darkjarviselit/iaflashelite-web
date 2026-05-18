"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
    slug: string;
    name: string;
    price: number;
}

const PAYMENT_METHODS = [
    { value: "bizum", label: "Bizum" },
    { value: "transferencia", label: "Transferencia bancaria" },
    { value: "otro", label: "Otra (te lo aclaramos por email)" },
];

const inputClass =
    "w-full h-12 px-4 rounded-xl bg-onyx border border-border-dark text-paper placeholder:text-text-muted text-sm focus:outline-none focus:border-flash/50 focus:ring-2 focus:ring-flash/20 transition-colors";

export function CheckoutForm({ slug, name, price }: CheckoutFormProps) {
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [customerName, setCustomerName] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        const fd = new FormData(event.currentTarget);
        const payload = {
            productSlug: slug,
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            paymentMethod: String(fd.get("paymentMethod") ?? ""),
            comments: String(fd.get("comments") ?? ""),
            website: String(fd.get("website") ?? ""),
            acceptedPrivacy,
        };
        setSending(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok: boolean; error?: string };
            if (!res.ok || !data.ok) {
                setError(data.error ?? "send_failed");
            } else {
                setSuccess(true);
            }
        } catch {
            setError("network_error");
        } finally {
            setSending(false);
        }
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-10 rounded-3xl border border-flash/30 bg-surface flex flex-col items-center text-center gap-5"
            >
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-flash/10 text-flash">
                    <CheckCircle2 size={28} />
                </span>
                <h2 className="text-2xl font-semibold text-paper">
                    Gracias{customerName ? `, ${customerName}` : ""}.
                </h2>
                <p className="text-text-secondary max-w-md leading-relaxed">
                    Hemos recibido tu pedido para <span className="text-paper">{name}</span>.
                    Te enviaremos un email con instrucciones de pago en menos de 12h
                    (revisa también tu spam).
                </p>
                <p className="text-sm text-text-muted">
                    ¿Dudas? Escribe a{" "}
                    <a
                        href="mailto:iaflashelite@gmail.com"
                        className="text-flash underline hover:no-underline"
                    >
                        iaflashelite@gmail.com
                    </a>
                </p>
                <Button href="/productos" variant="secondary">
                    Volver al catálogo
                </Button>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-2 gap-5 p-8 sm:p-10 rounded-3xl border border-border-dark bg-surface"
        >
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                }}
            >
                <label htmlFor="website">
                    No rellenar
                    <input
                        id="website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        defaultValue=""
                    />
                </label>
            </div>

            <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl border border-flash/20 bg-flash/5">
                <div className="flex flex-col">
                    <Badge variant="cyan">Producto</Badge>
                    <span className="mt-2 text-base font-semibold text-paper">{name}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted block">
                        Precio
                    </span>
                    <span className="text-3xl font-bold text-flash tracking-tight leading-none">
                        {price}€
                    </span>
                </div>
            </div>

            <Field label="Nombre completo *">
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Oscar Jarvis"
                    autoComplete="name"
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputClass}
                />
            </Field>
            <Field label="Email *">
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    autoComplete="email"
                    className={inputClass}
                />
            </Field>
            <Field label="Método de pago *" className="sm:col-span-2">
                <select name="paymentMethod" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                        — Selecciona —
                    </option>
                    {PAYMENT_METHODS.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </Field>
            <Field label="Comentarios (opcional)" className="sm:col-span-2">
                <textarea
                    name="comments"
                    rows={4}
                    placeholder="¿Algo que debamos saber antes de procesar tu pedido?"
                    className={`${inputClass} resize-none h-auto py-3`}
                />
            </Field>

            <div className="sm:col-span-2 flex items-start gap-3 pt-2">
                <input
                    type="checkbox"
                    id="order-accepted-privacy"
                    name="acceptedPrivacy"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded border-border-dark bg-onyx accent-flash focus:outline-none focus:ring-2 focus:ring-flash/40"
                />
                <label
                    htmlFor="order-accepted-privacy"
                    className="text-sm text-text-secondary leading-relaxed"
                >
                    He leído y acepto la{" "}
                    <a
                        href="/legal/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-flash underline hover:no-underline"
                    >
                        política de privacidad
                    </a>{" "}
                    y consiento el tratamiento de mis datos para procesar este pedido.
                </label>
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                {error && <Badge variant="muted">⚠️ {error}</Badge>}
                <div className="ml-auto">
                    <Button
                        size="lg"
                        type="submit"
                        disabled={sending || !acceptedPrivacy}
                    >
                        {sending ? "Enviando…" : "Confirmar pedido"} <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </form>
    );
}

function Field({
    label,
    className = "",
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={`flex flex-col gap-2 ${className}`}>
            <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                {label}
            </span>
            {children}
        </label>
    );
}
