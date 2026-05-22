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
    X,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
    solutions,
    type Solution,
    type SolutionLevel,
} from "@/lib/solutions";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const SOLUTION_ICONS: Record<Solution["icon"], IconComponent> = {
    FileText,
    Heart,
    Building,
    TrendingUp,
    MapPin,
};

export function generateStaticParams() {
    return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolution(slug);

    if (!solution) {
        return { title: "Solución no encontrada — iaflashelite.com" };
    }

    return {
        title: `${solution.name} — iaflashelite.com`,
        description: solution.heroSubtitle,
    };
}

export default async function SolutionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const solution = getSolution(slug);

    if (!solution) notFound();

    const Icon = SOLUTION_ICONS[solution.icon] ?? FileText;
    const levels = [
        solution.levels.template,
        solution.levels.setup,
        solution.levels.managed,
    ] as const;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
                    <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
                    <div
                        className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.14),transparent_64%)]"
                        aria-hidden
                    />
                    <div className="relative mx-auto max-w-4xl">
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                            <Icon className="h-3.5 w-3.5" />
                            {solution.tagline}
                        </span>
                        <h1 className="mt-6 text-5xl font-black leading-[0.98] text-paper sm:text-6xl lg:text-7xl">
                            {solution.heroTitle}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                            {solution.heroSubtitle}
                        </p>
                    </div>
                </section>

                <ProblemsBlock solution={solution} />
                <FeaturesBlock solution={solution} />
                <PricingBlock levels={levels} />
                <FinalCtaBlock solution={solution} />
            </main>
            <Footer />
        </>
    );
}

function getSolution(slug: string): Solution | undefined {
    return solutions.find((solution) => solution.slug === slug);
}

function ProblemsBlock({ solution }: { solution: Solution }) {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
                <div className="mb-10 max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Problemas
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Lo que el agente elimina de tu día a día.
                    </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {solution.problems.map((problem) => (
                        <article
                            key={problem}
                            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111111] p-6"
                        >
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300">
                                <X className="h-4 w-4" />
                            </span>
                            <p className="text-sm leading-7 text-text-secondary">
                                {problem}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturesBlock({ solution }: { solution: Solution }) {
    return (
        <section className="bg-[#111111] px-6 py-20 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
                <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Agente incluido
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Qué automatiza {solution.name}.
                    </h2>
                    <p className="mt-5 text-base leading-8 text-text-secondary">
                        Un sistema vertical con prompts, flujos y documentación
                        pensados para {solution.ctaSector}.
                    </p>
                </div>
                <div className="grid gap-3">
                    {solution.features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-onyx p-4"
                        >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-flash" />
                            <span className="text-sm leading-6 text-text-secondary">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingBlock({
    levels,
}: {
    levels: readonly [SolutionLevel, SolutionLevel, SolutionLevel];
}) {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Pricing
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Tres formas de empezar.
                    </h2>
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                    {levels.map((level) => (
                        <PricingCard
                            key={level.name}
                            level={level}
                            featured={level.name === "Setup asistido"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingCard({
    featured,
    level,
}: {
    featured: boolean;
    level: SolutionLevel;
}) {
    return (
        <article
            className={
                featured
                    ? "flex min-h-[450px] flex-col rounded-2xl border border-flash bg-[#151515] p-7 shadow-[0_0_46px_rgba(0,229,255,0.14)]"
                    : "flex min-h-[450px] flex-col rounded-2xl border border-white/10 bg-[#111111] p-7"
            }
        >
            <div>
                {featured ? (
                    <span className="inline-flex rounded-full border border-flash/25 bg-flash/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-flash">
                        Recomendado
                    </span>
                ) : null}
                <h3 className="mt-5 text-2xl font-bold text-paper">{level.name}</h3>
                <p className="mt-4 text-4xl font-bold text-paper">{level.price}</p>
            </div>
            <ul className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6">
                {level.features.map((feature) => (
                    <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                    >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-flash" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Button href="/contacto" variant="gradient" className="mt-auto w-full">
                Solicitar propuesta <ArrowRight size={16} />
            </Button>
        </article>
    );
}

function FinalCtaBlock({ solution }: { solution: Solution }) {
    return (
        <section className="relative overflow-hidden bg-[#111111] px-6 py-20 lg:py-24">
            <div
                className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.14),transparent_64%)]"
                aria-hidden
            />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    Siguiente paso
                </span>
                <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                    ¿Listo para automatizar {solution.ctaSector}?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
                    Cuéntanos tu caso y te diremos qué nivel encaja mejor:
                    Template, Setup asistido o Managed.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contacto" size="lg" variant="gradient">
                        Solicitar propuesta <ArrowRight size={16} />
                    </Button>
                    <Button href="/servicios" size="lg" variant="secondary">
                        Ver todos los servicios <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </section>
    );
}
