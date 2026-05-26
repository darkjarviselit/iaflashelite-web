"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle, Send } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";

const WHATSAPP_CONTACTO = `https://wa.me/${BRAND.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
    "Hola, vengo desde iaflashelite.com/contacto y quiero hablar con el equipo",
)}`;
const MAILTO = `mailto:${BRAND.email}?subject=Vengo%20desde%20iaflashelite.com`;

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};
const ease = [0.22, 1, 0.36, 1] as const;

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20";

const EXPECT: ReadonlyArray<string> = [
    "Respuesta en menos de 24h",
    "Plan por fases, no presupuesto inflado",
    "Honestidad sobre si podemos ayudarte",
    "Sin script, sin presión",
];

const CHANNELS: ReadonlyArray<{
    eyebrow: string;
    label: string;
    value: string;
    href: string;
    icon: typeof MessageCircle;
    external: boolean;
}> = [
    {
        eyebrow: "Respuesta en minutos",
        label: "WhatsApp",
        value: BRAND.phoneDisplay,
        href: WHATSAPP_CONTACTO,
        icon: MessageCircle,
        external: true,
    },
    {
        eyebrow: "Para propuestas",
        label: "Email",
        value: BRAND.email,
        href: MAILTO,
        icon: Mail,
        external: false,
    },
    {
        eyebrow: "Chat directo",
        label: "Telegram",
        value: `@${BRAND.telegramUsername}`,
        href: BRAND.telegramUrl,
        icon: Send,
        external: true,
    },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            {children}
        </span>
    );
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactoContent() {
    const [status, setStatus] = useState<Status>("idle");
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [message, setMessage] = useState("");

    // Prefill desde CTAs tipo /contacto?asunto=... (p. ej. botones de /servicios).
    // Vía window en lugar de useSearchParams para no forzar Suspense ni romper el
    // prerender estático de /contacto.
    useEffect(() => {
        if (typeof window === "undefined") return;
        const asunto = new URLSearchParams(window.location.search).get("asunto");
        if (asunto) setMessage(asunto);
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        // Shape exacto que espera /api/contact. service/urgency/budget se
        // mantienen como "" (opcionales en el endpoint) tras simplificar el form.
        const payload = {
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            company: String(fd.get("company") ?? ""),
            service: "",
            urgency: "",
            budget: "",
            message: String(fd.get("message") ?? ""),
            website: String(fd.get("website") ?? ""),
            acceptedPrivacy,
        };
        setStatus("submitting");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok: boolean };
            setStatus(res.ok && data.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    }

    return (
        <main className="relative overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none fixed right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px]"
            />
            <div
                aria-hidden
                className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[120px]"
            />

            <section className="px-4 py-24 text-center md:px-6 md:py-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease }}
                    className="mx-auto flex max-w-3xl flex-col items-center gap-6"
                >
                    <Eyebrow>Contacto</Eyebrow>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                        ¿Hablamos?
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
                        Cuéntanos qué quieres automatizar. Te respondemos en menos de 24h
                        con un plan concreto.
                    </p>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6 md:pb-32 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-5">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                        transition={{ duration: 0.45, ease }}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10 lg:col-span-3"
                    >
                        {status === "success" ? (
                            <div className="flex min-h-[400px] flex-col items-center justify-center gap-5 text-center">
                                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                                    <Check className="h-8 w-8" />
                                </span>
                                <h2 className="text-2xl font-semibold text-white">
                                    ¡Recibido!
                                </h2>
                                <p className="max-w-sm text-white/60">
                                    Te respondemos en menos de 24h. Si tienes prisa,
                                    escríbenos por WhatsApp.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-[9999px] opacity-0"
                                >
                                    <label htmlFor="website">
                                        No rellenar
                                        <input
                                            id="website"
                                            name="website"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            defaultValue=""
                                        />
                                    </label>
                                </div>

                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                        Nombre
                                    </span>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Tu nombre"
                                        className={inputClass}
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                        Email
                                    </span>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="nombre@empresa.com"
                                        className={inputClass}
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                        Empresa (opcional)
                                    </span>
                                    <input
                                        name="company"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Nombre de tu empresa"
                                        className={inputClass}
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                        Cuéntanos tu proyecto
                                    </span>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="¿Qué quieres automatizar? ¿Qué herramientas usas? Cualquier detalle ayuda."
                                        className={`${inputClass} resize-none`}
                                    />
                                </label>

                                <label className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="acceptedPrivacy"
                                        checked={acceptedPrivacy}
                                        onChange={(e) =>
                                            setAcceptedPrivacy(e.target.checked)
                                        }
                                        required
                                        className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.03] accent-cyan-500"
                                    />
                                    <span className="text-sm leading-relaxed text-white/60">
                                        Acepto la{" "}
                                        <a
                                            href="/legal/privacidad"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 underline hover:no-underline"
                                        >
                                            política de privacidad
                                        </a>{" "}
                                        para responder a esta consulta.
                                    </span>
                                </label>

                                {status === "error" && (
                                    <p className="text-sm text-red-400">
                                        Algo falló. Prueba por WhatsApp directamente.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={!acceptedPrivacy || status === "submitting"}
                                    className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-cyan-500 px-8 py-4 font-medium text-black transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {status === "submitting" ? (
                                        "Enviando…"
                                    ) : (
                                        <>
                                            Enviar <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    <motion.aside
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                        transition={{ duration: 0.45, delay: 0.08, ease }}
                        className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 lg:col-span-2"
                    >
                        <div className="flex flex-col gap-4">
                            {CHANNELS.map((channel) => {
                                const ChannelIcon = channel.icon;
                                return (
                                    <a
                                        key={channel.label}
                                        href={channel.href}
                                        target={channel.external ? "_blank" : undefined}
                                        rel={
                                            channel.external
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40"
                                    >
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-400">
                                            <ChannelIcon className="h-5 w-5" />
                                        </span>
                                        <span className="flex flex-col">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400/70">
                                                {channel.eyebrow}
                                            </span>
                                            <span className="text-sm font-semibold text-white">
                                                {channel.label}
                                            </span>
                                            <span className="text-sm text-white/60">
                                                {channel.value}
                                            </span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <Eyebrow>Trust</Eyebrow>
                            <h3 className="mt-3 text-base font-semibold text-white">
                                Cómo respondemos
                            </h3>
                            <ul className="mt-4 flex flex-col gap-3">
                                {EXPECT.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                                        <span className="text-sm leading-relaxed text-white/70">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.aside>
                </div>
            </section>
        </main>
    );
}
