import type { Metadata } from "next";
import {
    ArrowRight,
    Building2,
    Code2,
    User,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionLabel } from "@/components/ui/section-label";
import { AUDIENCES } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Soluciones por perfil — iaflashelite.com",
    description:
        "Herramientas de seguridad y automatización agrupadas por audiencia: PYMES, particulares y desarrolladores. Encuentra rápido la que encaja contigo.",
};

const AUDIENCE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "building-2": Building2,
    user: User,
    "code-2": Code2,
};

export default function SolucionesPage() {
    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <section className="relative pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <SectionLabel>Soluciones</SectionLabel>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Soluciones por perfil.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Selecciona tu caso y verás solo las herramientas pensadas
                            para ti. Mismo catálogo, lectura más rápida.
                        </p>
                    </div>
                </section>

                <section className="relative pb-24">
                    <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-5">
                        {AUDIENCES.map((a) => {
                            const Icon = AUDIENCE_ICONS[a.icon] ?? User;
                            return (
                                <Link
                                    key={a.id}
                                    href={`/soluciones/${a.id}`}
                                    className="group flex flex-col gap-5 p-7 rounded-2xl bg-surface border border-border-dark hover:border-flash/40 transition-all duration-300"
                                >
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-flash/10 border border-flash/20 text-flash">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-semibold text-paper tracking-tight mb-1.5">
                                            {a.label}
                                        </h2>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {a.description}
                                        </p>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-flash group-hover:gap-2 transition-all">
                                        Ver soluciones <ArrowRight size={14} />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
