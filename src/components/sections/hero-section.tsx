"use client";

import { motion } from "framer-motion";
import { FileText, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const CUSTOM_SERVICES = [
    "Bots de Telegram",
    "Scripts y herramientas internas",
    "Agentes IA por sector",
    "Automatización de documentos",
    "Dashboards y paneles",
    "Webs o landings con IA",
    "Flujos personalizados",
] as const;

const CONTACT_LINKS = {
    form: "/contacto?asunto=Proyecto%20a%20medida%20IAFlashElite",
    whatsapp:
        "https://wa.me/34603315247?text=Hola%2C%20quiero%20pedir%20un%20proyecto%20a%20medida%20para%20IAFlashElite.%20Necesito%20ayuda%20con%3A",
    telegram: "https://t.me/iaflashelite",
    email:
        "mailto:iaflashelite@gmail.com?subject=Proyecto%20a%20medida%20IAFlashElite&body=Hola%2C%20quiero%20pedir%20un%20proyecto%20a%20medida.%0A%0ANecesito%20ayuda%20con%3A%0AHerramientas%20que%20uso%20ahora%3A%0APresupuesto%20aproximado%20si%20lo%20tengo%20claro%3A%0AUrgencia%3A",
} as const;

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0) 70%)",
                }}
                aria-hidden
            />

            <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
                <motion.h1
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-black text-paper text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.0] tracking-[-0.04em]"
                >
                    Agentes IA y automatizaciones seguras para empresas
                </motion.h1>

                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl"
                >
                    Diseñamos agentes privados, flujos automatizados y herramientas
                    auditables para empresas que quieren usar IA sin perder control.
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                    <Button href="/contacto" size="lg" variant="gradient">
                        Solicitar propuesta →
                    </Button>
                    <Button href="#servicios" variant="secondary" size="lg">
                        Ver servicios ↓
                    </Button>
                </motion.div>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-2xl shadow-black/25 backdrop-blur sm:p-6"
                >
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                Proyecto a medida
                            </span>
                            <h2 className="mt-3 text-2xl font-bold leading-tight text-paper sm:text-3xl">
                                ¿Necesitas un bot, script, agente IA o automatización concreta?
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                                Cuéntame qué proceso quieres resolver y Oscar te responderá
                                personalmente para valorar si encaja, cuánto costaría y
                                cuánto tiempo llevaría. Trato humano, directo y sin
                                respuestas automáticas.
                            </p>
                            <p className="mt-3 text-xs leading-6 text-text-muted">
                                Oscar responde personalmente. Entre semana puede tardar más por
                                trabajo y estudios; para llamadas suelo tener más
                                disponibilidad en fin de semana.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                                {CUSTOM_SERVICES.map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-text-secondary"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <QuickContactLink
                                    href={CONTACT_LINKS.form}
                                    icon={<FileText className="h-4 w-4" />}
                                    label="Pedir por formulario"
                                    primary
                                />
                                <QuickContactLink
                                    href={CONTACT_LINKS.whatsapp}
                                    icon={<MessageCircle className="h-4 w-4" />}
                                    label="WhatsApp"
                                    external
                                />
                                <QuickContactLink
                                    href={CONTACT_LINKS.telegram}
                                    icon={<Send className="h-4 w-4" />}
                                    label="Telegram"
                                    external
                                />
                                <QuickContactLink
                                    href={CONTACT_LINKS.email}
                                    icon={<Mail className="h-4 w-4" />}
                                    label="Email"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

interface QuickContactLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    external?: boolean;
    primary?: boolean;
}

function QuickContactLink({
    href,
    icon,
    label,
    external = false,
    primary = false,
}: QuickContactLinkProps) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-center text-sm font-semibold transition-all ${
                primary
                    ? "col-span-2 bg-flash text-onyx hover:shadow-[0_0_30px_rgba(0,229,255,0.28)] sm:col-span-1"
                    : "border border-white/10 bg-white/[0.03] text-paper hover:border-flash/40 hover:bg-white/[0.06]"
            }`}
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}
