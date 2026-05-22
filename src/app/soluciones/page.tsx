import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import {
    ArrowRight,
    Building,
    Check,
    FileText,
    Heart,
    MapPin,
    TrendingUp,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { solutions, type Solution } from "@/lib/solutions";

export const metadata: Metadata = {
    title: "Soluciones IA por sector — iaflashelite.com",
    description:
        "Agentes IA verticales para gestorías, clínicas dentales, inmobiliarias, agencias de marketing y negocios locales.",
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const SOLUTION_ICONS: Record<Solution["icon"], IconComponent> = {
    FileText,
    Heart,
    Building,
    TrendingUp,
    MapPin,
};

export default function SolucionesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <section className="relative overflow-hidden px-6 pb-20 pt-32 text-center lg:pb-24 lg:pt-40">
                    <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
                    <div
                        className="absolute inset-x-0 top-0 h-[65%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.12),transparent_64%)]"
                        aria-hidden
                    />
                    <div className="relative mx-auto max-w-4xl">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                            Soluciones
                        </span>
                        <h1 className="mt-6 text-5xl font-black leading-[0.98] text-paper sm:text-6xl lg:text-7xl">
                            Soluciones IA por sector
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                            Elige tu sector y descubre qué puede automatizar un
                            agente IA entrenado específicamente para tu negocio.
                        </p>
                    </div>
                </section>

                <section className="px-6 py-20 lg:py-24">
                    <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {solutions.map((solution) => (
                            <SolutionCard key={solution.slug} solution={solution} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function SolutionCard({ solution }: { solution: Solution }) {
    const Icon = SOLUTION_ICONS[solution.icon] ?? FileText;

    return (
        <article className="flex min-h-[440px] flex-col rounded-2xl border border-white/10 bg-[#111111] p-7">
            <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                    <Icon className="h-5 w-5" />
                </span>
                <span className="text-right text-sm font-semibold text-flash">
                    desde {solution.priceFrom}
                </span>
            </div>

            <div className="mt-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    {solution.tagline}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-paper">{solution.name}</h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {solution.pain}
                </p>
            </div>

            <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                {solution.features.slice(0, 3).map((feature) => (
                    <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                    >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-flash" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                href={`/soluciones/${solution.slug}`}
                variant="gradient"
                className="mt-auto w-full"
            >
                Ver solución <ArrowRight size={16} />
            </Button>
        </article>
    );
}
