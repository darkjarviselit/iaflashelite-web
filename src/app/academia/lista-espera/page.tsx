import type { Metadata } from "next";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Headphones,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { LogoFull } from "@/components/brand/logo-full";
import { EmailInterestForm } from "@/components/email-interest-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Builder Pass — Lista de espera | IAFlashElite",
    description:
        "Lista de espera para Builder Pass by IAFlashElite: Sábados Builder por voz para construir con IA en serio.",
    robots: {
        index: false,
        follow: true,
    },
};

const BUILDER_POINTS = [
    "Dos horas el sábado por la mañana.",
    "Solo voz, sin curso pasivo ni vídeos eternos.",
    "Cada persona trabaja con su propio agente IA.",
    "Oscar guía la sesión y desbloquea decisiones técnicas.",
    "Terminamos con algo funcionando: una skill, un agente, una plantilla o un proyecto.",
] as const;

const PROOF_POINTS = [
    "GestorIA Local.",
    "Productos descargables.",
    "Checkout funcionando.",
    "Código y productos verificables.",
] as const;

export default function BuilderPassWaitlistPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-onyx text-paper">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[680px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0) 72%)",
                }}
                aria-hidden
            />

            <div className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6 py-8 lg:px-8">
                <div className="flex items-center justify-between">
                    <LogoFull href="/" size="md" />
                    <a
                        href="mailto:iaflashelite@gmail.com"
                        className="hidden text-sm font-medium text-text-secondary transition-colors hover:text-flash sm:inline-flex"
                    >
                        iaflashelite@gmail.com
                    </a>
                </div>

                <section className="grid flex-1 gap-12 py-16 lg:grid-cols-[1.02fr_0.78fr] lg:items-center lg:py-20">
                    <div className="flex max-w-3xl flex-col gap-8">
                        <span className="inline-flex w-fit items-center rounded-full border border-flash/20 bg-flash/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                            APERTURA PRÓXIMA
                        </span>

                        <div className="flex flex-col gap-5">
                            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">
                                Builder Pass abre plazas pronto.
                                <span className="block text-flash">
                                    20 fundadores. 49 €/mes bloqueados.
                                </span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                                Sábados Builder es una sesión semanal por voz
                                donde construimos con IA en serio. Si te interesa,
                                déjame tu email y serás de los primeros en saber
                                cuándo abren las plazas. Sin spam, sin secuencias
                                agresivas.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <SignalCard
                                icon={Headphones}
                                title="Solo voz"
                                text="Grupo pequeño, foco real."
                            />
                            <SignalCard
                                icon={Clock3}
                                title="Sábado mañana"
                                text="2 horas de construcción."
                            />
                            <SignalCard
                                icon={ShieldCheck}
                                title="Sin humo"
                                text="Algo funcional al final."
                            />
                        </div>

                        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur">
                            <h2 className="text-xl font-semibold tracking-tight text-paper">
                                Cómo será Sábados Builder
                            </h2>
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {BUILDER_POINTS.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside className="flex flex-col gap-5">
                        <EmailInterestForm
                            topic="builder-pass"
                            headline="Apúntate a la lista de espera"
                            subtext="Solo te escribo cuando abran las plazas. Puedes darte de baja en cualquier momento."
                            submitLabel="Avisarme cuando abra"
                            successMessage="Perfecto. Te avisaré cuando Builder Pass abra plazas."
                        />
                        <p className="mx-auto max-w-md text-center text-xs leading-6 text-text-muted">
                            Al apuntarte aceptas que usemos tu email para avisarte
                            sobre la apertura de Builder Pass. Puedes solicitar baja
                            respondiendo al email o escribiendo a{" "}
                            <a
                                href="mailto:iaflashelite@gmail.com"
                                className="text-flash underline decoration-flash/40 underline-offset-4 hover:decoration-flash"
                            >
                                iaflashelite@gmail.com
                            </a>
                            .
                        </p>
                    </aside>
                </section>

                <section className="pb-20">
                    <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-[0.85fr_1fr] lg:p-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                                Verificación
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                                Antes de apuntarte, mira lo que ya existe en
                                IAFlashElite.
                            </h2>
                            <p className="text-sm leading-7 text-text-secondary">
                                Builder Pass todavía no cobra ni promete resultados
                                económicos. Primero enseñamos producto real, luego
                                abrimos la lista con calma.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {PROOF_POINTS.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-onyx/40 p-4 text-sm text-text-secondary"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flash" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    href="/gestoria-local"
                                    size="lg"
                                    variant="gradient"
                                    className="w-full sm:w-auto"
                                >
                                    Ver GestorIA Local{" "}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    href="/productos"
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    Ver productos
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function SignalCard({
    icon: Icon,
    title,
    text,
}: {
    icon: LucideIcon;
    title: string;
    text: string;
}) {
    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <Icon className="h-5 w-5 text-flash" />
            <h2 className="mt-3 text-sm font-semibold text-paper">{title}</h2>
            <p className="mt-1 text-xs leading-5 text-text-secondary">{text}</p>
        </article>
    );
}
