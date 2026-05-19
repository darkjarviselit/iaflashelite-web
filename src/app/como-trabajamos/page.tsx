"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    ClipboardEdit,
    CreditCard,
    Eye,
    Landmark,
    LifeBuoy,
    PackageCheck,
    Plus,
    Rocket,
    Smartphone,
    Wallet,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const STEPS: ReadonlyArray<{
    num: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}> = [
    {
        num: "01",
        icon: ClipboardEdit,
        title: "Solicitud",
        description:
            "Eliges producto o servicio en la web. Rellenas un formulario con tus datos (nombre, email, comentarios). NO pagas todavía.",
    },
    {
        num: "02",
        icon: Eye,
        title: "Revisión personal",
        description:
            "Revisamos tu pedido en menos de 12 horas. Confirmamos que podemos cumplir el plazo y la calidad. Si por algún motivo no podemos, te avisamos sin compromiso. Lunes–jueves: comunicación y revisión. Viernes–sábado: trabajamos entregas intensivamente. Pedidos L–J entran en cola del viernes siguiente. Por eso ofrecemos máximo 4 servicios normales + 1 express al mes.",
    },
    {
        num: "03",
        icon: CreditCard,
        title: "Pago tras confirmación",
        description:
            "Te respondemos por email con los datos de pago (Bizum, PayPal o transferencia). Pagas solo cuando aceptas el plazo confirmado.",
    },
    {
        num: "04",
        icon: Rocket,
        title: "Trabajo inicia",
        description:
            "Empezamos tu pedido. Para servicios, en este punto recibes el cuestionario detallado para personalizar tu landing.",
    },
    {
        num: "05",
        icon: PackageCheck,
        title: "Entrega",
        description:
            "Te enviamos todo por email: archivos, manuales, prompts pre-hechos, audio explicativo si aplica.",
    },
    {
        num: "06",
        icon: LifeBuoy,
        title: "Soporte 30 días",
        description:
            "Durante 30 días resolvemos dudas, ajustamos detalles y te ayudamos a configurar todo. Sin coste adicional.",
    },
];

const PAYMENT_METHODS: ReadonlyArray<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    description: string;
}> = [
    {
        icon: Smartphone,
        label: "Bizum",
        description: "Pago instantáneo desde tu móvil. El más rápido en España.",
    },
    {
        icon: Wallet,
        label: "PayPal",
        description:
            "Internacional. Pago con tu cuenta o tarjeta sin compartir datos bancarios.",
    },
    {
        icon: Landmark,
        label: "Transferencia",
        description:
            "Tradicional. Útil para empresas que necesitan justificante.",
    },
];

const CASES: ReadonlyArray<{ q: string; a: string }> = [
    {
        q: "¿Qué pasa si no me gusta el resultado?",
        a: "Garantía 7 días: devolución 100% sin preguntas.",
    },
    {
        q: "¿Qué pasa si tardáis más del plazo?",
        a: "Te avisamos ANTES si vemos que no llegamos. Si fallamos al plazo confirmado: devolución 100%.",
    },
    {
        q: "¿Qué pasa si soy no-técnico?",
        a: "Recibes manual PDF + prompts pre-hechos para Claude/Codex. Tu landing online en 30 min sin saber programar.",
    },
    {
        q: "¿Qué pasa si tenéis muchos pedidos a la vez?",
        a: "Limitamos 4 servicios al mes + 1 express. La web muestra disponibilidad real en /servicios.",
    },
    {
        q: "¿Y si el equipo desaparece?",
        a: "Equipo profesional registrado en España. Datos legales completos en /legal/aviso-legal. RGPD compliant. El equipo lleva activo desde 2024.",
    },
];

export default function ComoTrabajamosPage() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                            Proceso transparente
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Así trabajamos. Sin secretos.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Cada paso del proceso, explicado. Para que sepas exactamente
                            qué esperar.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                El proceso
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                El proceso paso a paso.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {STEPS.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <article
                                        key={step.num}
                                        className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <span className="text-[11px] font-mono tracking-[0.18em] text-gray-400">
                                                / {step.num}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Pago manual
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Por qué cobramos manual y no automático.
                        </h2>
                        <div className="flex flex-col gap-5 text-gray-700 leading-relaxed">
                            <p>
                                Muchas webs usan Stripe o pasarelas automatizadas que
                                cobran al instante. Nosotros NO.
                            </p>
                            <p className="font-semibold text-gray-900">
                                Cobramos manual por dos razones:
                            </p>
                            <ol className="list-decimal pl-5 space-y-3">
                                <li>
                                    Queremos revisar tu pedido antes de aceptarlo. Si
                                    vemos que necesitas algo que se sale de lo prometido,
                                    preferimos avisarte ANTES de cobrarte.
                                </li>
                                <li>
                                    Stripe y similares requieren alta de autónomo (que aún
                                    no tenemos) y comisiones del 2-3% que se trasladarían
                                    a tu precio.
                                </li>
                            </ol>
                            <p>
                                <span className="font-semibold text-gray-900">¿La desventaja?</span>{" "}
                                Tardas unas horas en recibir los datos de pago.
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900">¿La ventaja?</span>{" "}
                                Trato personal, precios honestos y cero sorpresas.
                            </p>
                            <p>
                                Cuando alcancemos el volumen suficiente, automatizaremos
                                con Stripe. Hasta entonces, preferimos la transparencia.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Verificación independiente
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Verificación independiente de nuestro código.
                        </h2>
                        <div className="flex flex-col gap-4 text-gray-700 leading-relaxed">
                            <p>
                                Nadie te obliga a confiar en nosotros. Por eso incluimos
                                en cada producto un archivo{" "}
                                <code className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-900 text-[13px] font-mono">
                                    VERIFICAR-ANTES-DE-INSTALAR.md
                                </code>{" "}
                                con un prompt listo para que una IA (Claude o ChatGPT)
                                audite nuestro código en 2 minutos.
                            </p>
                            <p>
                                Si la IA marca algo sospechoso:{" "}
                                <span className="font-semibold text-gray-900">
                                    NO instales y avísanos.
                                </span>{" "}
                                Devolución 100% garantizada.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/como-verificar"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
                            >
                                Ver el prompt verificador completo
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-white border-t border-gray-200">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-10">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Métodos de pago
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Métodos de pago aceptados.
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {PAYMENT_METHODS.map((m) => {
                                const Icon = m.icon;
                                return (
                                    <article
                                        key={m.label}
                                        className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200"
                                    >
                                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                            {m.label}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {m.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-10">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                                Casos comunes
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paper">
                                ¿Qué pasa si…?
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            {CASES.map((c, idx) => {
                                const isOpen = openIdx === idx;
                                return (
                                    <div
                                        key={c.q}
                                        className="border-b border-border-dark"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenIdx(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="text-base sm:text-lg font-semibold text-paper tracking-tight group-hover:text-flash transition-colors duration-200">
                                                {c.q}
                                            </span>
                                            <span
                                                className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-dark text-text-secondary transition-all duration-300 ${
                                                    isOpen
                                                        ? "rotate-45 border-flash text-flash bg-flash/10"
                                                        : "group-hover:border-flash/40"
                                                }`}
                                            >
                                                <Plus size={14} />
                                            </span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-5 pr-10 text-sm text-text-secondary leading-relaxed">
                                                        {c.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
