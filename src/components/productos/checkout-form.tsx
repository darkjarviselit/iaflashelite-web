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
    "w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors";

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
                className="p-10 rounded-3xl border border-emerald-200 bg-emerald-50 flex flex-col items-center text-center gap-5"
            >
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={28} />
                </span>
                <h2 className="text-2xl font-semibold text-emerald-900">
                    Gracias{customerName ? `, ${customerName}` : ""}.
                </h2>
                <p className="text-emerald-800 max-w-md leading-relaxed">
                    Hemos recibido tu pedido para <span className="font-semibold">{name}</span>.
                    Te enviaremos un email con instrucciones de pago en menos de 12h
                    (revisa también tu spam).
                </p>
                <p className="text-sm text-emerald-700">
                    ¿Dudas? Escribe a{" "}
                    <a
                        href="mailto:iaflashelite@gmail.com"
                        className="text-cyan-700 underline hover:no-underline"
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
            className="grid sm:grid-cols-2 gap-5 p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm"
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

            <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl border border-cyan-200 bg-cyan-50">
                <div className="flex flex-col">
                    <Badge variant="cyan">Producto</Badge>
                    <span className="mt-2 text-base font-semibold text-gray-900">{name}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 block">
                        Precio
                    </span>
                    <span className="text-3xl font-bold text-cyan-600 tracking-tight leading-none">
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
                    className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <label
                    htmlFor="order-accepted-privacy"
                    className="text-sm text-gray-600 leading-relaxed"
                >
                    He leído y acepto la{" "}
                    <a
                        href="/legal/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 underline hover:no-underline"
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
                        variant="gradient"
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
            <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                {label}
            </span>
            {children}
        </label>
    );
}
