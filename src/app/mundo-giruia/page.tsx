import { ArrowRight, Bot, Brain, ShieldCheck, Sparkles } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";

interface AgentCard {
    name: string;
    role: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    color: string;
    bgColor: string;
    borderColor: string;
}

const AGENTS: AgentCard[] = [
    {
        name: "Giris",
        role: "Orquestadora",
        description:
            "La mente central. Coordina los agentes, lee contexto y decide qué automatizar. Primera en responder, última en equivocarse.",
        icon: Sparkles,
        color: "#00E5FF",
        bgColor: "rgba(0,229,255,0.10)",
        borderColor: "rgba(0,229,255,0.25)",
    },
    {
        name: "Giru",
        role: "Aprendiz Autónomo",
        description:
            "Aprende observando sesiones de código real. Construye memoria persistente y mejora con cada proyecto entregado.",
        icon: Brain,
        color: "#FFD700",
        bgColor: "rgba(255,215,0,0.10)",
        borderColor: "rgba(255,215,0,0.25)",
    },
    {
        name: "Venom",
        role: "Evaluador",
        description:
            "Analiza el ecosistema, detecta fallos y propone mejoras. El control de calidad que nunca duerme.",
        icon: ShieldCheck,
        color: "#A855F7",
        bgColor: "rgba(168,85,247,0.10)",
        borderColor: "rgba(168,85,247,0.25)",
    },
];

const STACK = [
    "Node.js 20",
    "TypeScript",
    "Python 3.11",
    "Fastify",
    "better-sqlite3",
    "Next.js 16",
    "React 19",
    "Tailwind v4",
    "Tauri",
    "Docker",
    "OpenCode Go",
    "MiniMax M2.7",
];

export default function MundoGiruIA() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-24 bg-onyx min-h-screen">
                <section className="relative">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-[1200px] mx-auto px-6 flex flex-col gap-8 pb-20">
                        <Badge>● El motor por dentro</Badge>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper max-w-3xl">
                            Mundo GiruIA. Cómo trabajamos por dentro.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            No usamos IA. Construimos IA. Cada proyecto pasa por un ecosistema de agentes que investiga, programa, supervisa y aprende de cada entrega.
                        </p>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark bg-surface">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
                            <SectionLabel>Los tres agentes</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Cada proyecto pasa por tres cerebros distintos.
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {AGENTS.map((agent) => {
                                const Icon = agent.icon;
                                return (
                                    <article
                                        key={agent.name}
                                        className="group p-8 rounded-2xl bg-onyx border transition-colors duration-300"
                                        style={{ borderColor: agent.borderColor }}
                                    >
                                        <span
                                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
                                            style={{
                                                background: agent.bgColor,
                                                color: agent.color,
                                                border: `1px solid ${agent.borderColor}`,
                                            }}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-2xl font-semibold text-paper mb-1 tracking-tight">
                                            {agent.name}
                                        </h3>
                                        <span
                                            className="text-[11px] tracking-[0.18em] uppercase mb-4 inline-block font-medium"
                                            style={{ color: agent.color }}
                                        >
                                            {agent.role}
                                        </span>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {agent.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
                            <SectionLabel>El flujo</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Tu mensaje activa una cadena en segundos.
                            </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-paper">
                            {["Tú", "Giris", "Giru", "Venom", "Entrega"].map((node, i, arr) => (
                                <span key={node} className="inline-flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center px-5 h-12 rounded-full bg-surface border border-border-dark text-paper text-sm font-medium tracking-tight">
                                        {node}
                                    </span>
                                    {i < arr.length - 1 && (
                                        <ArrowRight className="text-flash" size={16} />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative py-20 border-t border-border-dark bg-surface">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
                            <SectionLabel>Stack técnico</SectionLabel>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                                Tecnología real, no humo.
                            </h2>
                            <p className="text-text-secondary text-base leading-relaxed">
                                Cada herramienta está elegida por una razón concreta. Nada de plantillas, nada de no-code disfrazado.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-full border border-border-dark bg-onyx text-paper hover:border-flash/40 transition-colors"
                                >
                                    <Bot size={12} className="text-flash" />
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Button href="/contacto" size="lg">
                                Quiero un proyecto con este motor <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
