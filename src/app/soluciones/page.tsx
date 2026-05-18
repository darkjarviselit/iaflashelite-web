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

const AUDIENCE_COLOR: Record<string, { iconBg: string; iconBorder: string; iconText: string }> = {
    pymes: { iconBg: "bg-blue-50", iconBorder: "border-blue-100", iconText: "text-blue-600" },
    particulares: { iconBg: "bg-emerald-50", iconBorder: "border-emerald-100", iconText: "text-emerald-600" },
    desarrolladores: { iconBg: "bg-purple-50", iconBorder: "border-purple-100", iconText: "text-purple-600" },
};

export default function SolucionesPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-16">
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

                <section className="relative py-20 bg-white">
                    <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-5">
                        {AUDIENCES.map((a) => {
                            const Icon = AUDIENCE_ICONS[a.icon] ?? User;
                            const c = AUDIENCE_COLOR[a.id] ?? AUDIENCE_COLOR.pymes;
                            return (
                                <Link
                                    key={a.id}
                                    href={`/soluciones/${a.id}`}
                                    className="group flex flex-col gap-5 p-7 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                >
                                    <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${c.iconBg} border ${c.iconBorder} ${c.iconText}`}>
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-1.5">
                                            {a.label}
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {a.description}
                                        </p>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 group-hover:text-cyan-700 group-hover:gap-2 transition-all">
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
