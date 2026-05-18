import type { Metadata } from "next";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Code2,
    User,
} from "lucide-react";
import { notFound } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsGrid } from "@/components/productos/products-grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { AUDIENCES, PRODUCTS, type Audience } from "@/lib/constants";

const AUDIENCE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    "building-2": Building2,
    user: User,
    "code-2": Code2,
};

const WHY_CONTENT: Record<Audience, { title: string; bullets: string[] }> = {
    pymes: {
        title: "¿Por qué iaflashelite para PYMES?",
        bullets: [
            "Precios fijos. No consultorías de 5.000€ por algo que puedes resolver en una tarde.",
            "Sin suscripciones eternas: pagas una vez, descargas el ZIP, queda tuyo.",
            "Soporte humano en 24h L-V. Sin tickets infinitos.",
            "Cumplimiento RGPD por defecto: los productos funcionan en local.",
        ],
    },
    particulares: {
        title: "¿Por qué iaflashelite para Particulares?",
        bullets: [
            "Privacidad total: tus datos nunca salen de tu equipo.",
            "Sin cuentas, sin newsletters, sin trackers.",
            "Garantía de 7 días sin preguntas. Si no encaja, devolución.",
            "Manuales y prompts Claude/Codex para usarlo sin saber programar.",
        ],
    },
    desarrolladores: {
        title: "¿Por qué iaflashelite para Desarrolladores?",
        bullets: [
            "Código abierto bajo licencia MIT + cláusula uso comercial.",
            "Modificable: cada producto incluye prompts para personalizar con tu LLM favorito.",
            "Sin dependencias raras: stdlib + librerías Python/Web bien conocidas.",
            "Útil para MSPs/consultores que auditan o automatizan para clientes finales.",
        ],
    },
};

export function generateStaticParams() {
    return AUDIENCES.map((a) => ({ audiencia: a.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ audiencia: string }>;
}): Promise<Metadata> {
    const { audiencia } = await params;
    const meta = AUDIENCES.find((a) => a.id === audiencia);
    if (!meta) {
        return { title: "Audiencia no encontrada — iaflashelite.com" };
    }
    return {
        title: `${meta.label} — iaflashelite.com`,
        description: meta.description,
    };
}

export default async function SolucionesAudienciaPage({
    params,
}: {
    params: Promise<{ audiencia: string }>;
}) {
    const { audiencia } = await params;
    const meta = AUDIENCES.find((a) => a.id === audiencia);
    if (!meta) notFound();

    const audience = meta.id;
    const Icon = AUDIENCE_ICONS[meta.icon] ?? User;
    const matchingProducts = PRODUCTS.filter((p) =>
        p.audience.includes(audience),
    );
    const why = WHY_CONTENT[audience];

    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <SectionLabel>Soluciones · {meta.short}</SectionLabel>
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-flash/10 border border-flash/20 text-flash">
                                <Icon className="w-6 h-6" />
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                                {meta.label}.
                            </h1>
                        </div>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            {meta.description}
                        </p>
                    </div>
                </section>

                <section className="relative py-20 bg-white">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex flex-col gap-3 mb-8 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Productos recomendados
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                                Lo que encaja contigo ({matchingProducts.length})
                            </h2>
                        </div>
                        <ProductsGrid
                            products={matchingProducts}
                            initialAudience={audience}
                        />
                    </div>
                </section>

                <section className="relative py-20 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-8">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Por qué iaflashelite
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                {why.title}
                            </h2>
                        </div>
                        <ul className="flex flex-col gap-3">
                            {why.bullets.map((b) => (
                                <li
                                    key={b}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="text-cyan-600 mt-0.5 shrink-0"
                                    />
                                    <span className="text-sm text-gray-800 leading-relaxed">
                                        {b}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-paper">
                            ¿No es exactamente lo que necesitas?
                        </h2>
                        <p className="text-text-secondary leading-relaxed max-w-xl">
                            Mira el catálogo completo o cuéntanos tu caso y lo
                            construimos a medida.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button href="/productos" size="lg" variant="secondary">
                                Ver todos los productos
                            </Button>
                            <Button href="/contacto" size="lg" variant="gradient">
                                Necesito algo custom <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
