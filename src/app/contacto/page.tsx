"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";

const SERVICES = [
    "Bot de Telegram / WhatsApp",
    "Automatización de tareas",
    "Chatbot IA para web",
    "Scripts personalizados",
    "No estoy seguro",
];
const URGENCY = ["Esta semana", "Este mes", "Sin prisa"];
const BUDGET = ["<200€", "200-500€", "500-1000€", "+1000€", "Sin definir"];

export default function ContactPage() {
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        const fd = new FormData(event.currentTarget);
        const payload = {
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            company: String(fd.get("company") ?? ""),
            service: String(fd.get("service") ?? ""),
            urgency: String(fd.get("urgency") ?? ""),
            budget: String(fd.get("budget") ?? ""),
            message: String(fd.get("message") ?? ""),
            website: String(fd.get("website") ?? ""),
        };
        setSending(true);
        try {
            const res = await fetch("/api/contact", {
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

    return (
        <>
            <Header />
            <main className="pt-32 pb-24 bg-onyx min-h-screen">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6 mb-12"
                    >
                        <SectionLabel>Contacto</SectionLabel>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Cuéntanos tu proyecto.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                            Responderemos en menos de 24h con una propuesta concreta y plazo cerrado.
                        </p>
                    </motion.div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="p-10 rounded-3xl border border-flash/30 bg-surface flex flex-col items-center text-center gap-5"
                        >
                            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-flash/10 text-flash">
                                <CheckCircle2 size={28} />
                            </span>
                            <h2 className="text-2xl font-semibold text-paper">¡Recibido!</h2>
                            <p className="text-text-secondary max-w-md">
                                Giris te contactará en menos de 24h con una propuesta concreta. ⚡
                            </p>
                            <Button href="/" variant="secondary">
                                Volver al inicio
                            </Button>
                        </motion.div>
                    ) : (
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
                                    No rellenar este campo
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
                            <Field label="Nombre *" required>
                                <input
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="Oscar Jarvis"
                                    autoComplete="name"
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Email *" required>
                                <input
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="oscar@empresa.com"
                                    autoComplete="email"
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Empresa (opcional)" className="sm:col-span-2">
                                <input
                                    name="company"
                                    type="text"
                                    placeholder="iaflashelite.com"
                                    autoComplete="organization"
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Servicio">
                                <select name="service" defaultValue="" className={inputClass}>
                                    <option value="">— Selecciona —</option>
                                    {SERVICES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Urgencia">
                                <select name="urgency" defaultValue="" className={inputClass}>
                                    <option value="">— Selecciona —</option>
                                    {URGENCY.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Presupuesto" className="sm:col-span-2">
                                <select name="budget" defaultValue="" className={inputClass}>
                                    <option value="">— Selecciona —</option>
                                    {BUDGET.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Tu proyecto *" required className="sm:col-span-2">
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Describe brevemente qué quieres automatizar, qué herramientas usas y cualquier detalle relevante."
                                    className={`${inputClass} resize-none`}
                                />
                            </Field>

                            <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                                {error && (
                                    <Badge variant="muted">⚠️ {error}</Badge>
                                )}
                                <div className="ml-auto">
                                    <Button size="lg" type="submit" disabled={sending}>
                                        {sending ? "Enviando…" : "Enviar proyecto"} <ArrowRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

const inputClass =
    "w-full h-12 px-4 rounded-xl bg-onyx border border-border-dark text-paper placeholder:text-text-muted text-sm focus:outline-none focus:border-flash/50 focus:ring-2 focus:ring-flash/20 transition-colors";

function Field({
    label,
    className = "",
    children,
}: {
    label: string;
    required?: boolean;
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
