import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Code,
    DatabaseBackup,
    Fingerprint,
    Link2,
    Lock,
    MailWarning,
    ScanSearch,
    Server,
    ShieldCheck,
    TriangleAlert,
    XCircle,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Seguridad por diseño — iaflashelite.com",
    description:
        "Código auditable, datos bajo tu control y herramientas de ciberseguridad construidas desde cero para empresas.",
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type TrustCard = {
    description: string;
    icon: IconComponent;
    title: string;
};

type ComparisonTone = "positive" | "negative" | "warning" | "neutral";

type ComparisonValue = {
    tone: ComparisonTone;
    value: string;
};

type ComparisonRow = {
    flash: ComparisonValue;
    metric: string;
    noCode: ComparisonValue;
};

type SecurityProduct = {
    description: string;
    icon: IconComponent;
    price: string;
    title: string;
};

const TRUST_CARDS: ReadonlyArray<TrustCard> = [
    {
        icon: Code,
        title: "Código auditable",
        description:
            "Todo el código que entregamos es tuyo. Puedes revisarlo tú mismo, con tu equipo técnico, o pedirle a Claude o ChatGPT que lo audite. Sin caja negra, sin dependencias ocultas.",
    },
    {
        icon: Fingerprint,
        title: "Sin plantillas reutilizadas",
        description:
            "Cada proyecto parte de cero. No reutilizamos código entre clientes. Tu solución es exclusivamente tuya, sin riesgo de que otro cliente tenga acceso a tu lógica.",
    },
    {
        icon: ShieldCheck,
        title: "Garantía Flash",
        description:
            "Compra protegida: entrega digital segura, soporte si algo falla y revisión si el producto no funciona según lo descrito.",
    },
    {
        icon: BookOpen,
        title: "Documentación incluida",
        description:
            "Cada entrega incluye guía técnica, guía no-técnicos y prompts pre-hechos para que puedas usar Claude o ChatGPT para configurar y mantener el producto sin depender de nosotros.",
    },
    {
        icon: Lock,
        title: "Enfoque ciberseguridad",
        description:
            "Nuestros productos nacen del mundo de la ciberseguridad. Auditor web, anti-phishing, verificador de URLs: no son extras, son el núcleo de cómo pensamos cada solución.",
    },
    {
        icon: Server,
        title: "Tus datos, tu servidor",
        description:
            "Los agentes IA privados se despliegan en tu infraestructura. Tus datos no pasan por servidores compartidos ni terceros desconocidos.",
    },
];

const COMPARISON_ROWS: ReadonlyArray<ComparisonRow> = [
    {
        metric: "Código propio",
        flash: { value: "Sí", tone: "positive" },
        noCode: { value: "No-code", tone: "negative" },
    },
    {
        metric: "Código auditable",
        flash: { value: "Sí", tone: "positive" },
        noCode: { value: "No", tone: "negative" },
    },
    {
        metric: "Sin plantillas",
        flash: { value: "Sí", tone: "positive" },
        noCode: { value: "No", tone: "negative" },
    },
    {
        metric: "Tus datos en tu servidor",
        flash: { value: "Sí", tone: "positive" },
        noCode: { value: "Depende", tone: "warning" },
    },
    {
        metric: "Compra protegida",
        flash: { value: "Flash", tone: "positive" },
        noCode: { value: "No", tone: "negative" },
    },
    {
        metric: "Documentación incluida",
        flash: { value: "Sí", tone: "positive" },
        noCode: { value: "Básica", tone: "warning" },
    },
    {
        metric: "Precio desde",
        flash: { value: "9€", tone: "neutral" },
        noCode: { value: "+500€ setup", tone: "neutral" },
    },
    {
        metric: "Dependencia de plataforma",
        flash: { value: "Ninguna", tone: "positive" },
        noCode: { value: "n8n/Make/Zapier", tone: "negative" },
    },
];

const SECURITY_PRODUCTS: ReadonlyArray<SecurityProduct> = [
    {
        icon: ScanSearch,
        title: "Auditor Web Rápido",
        price: "desde 19€",
        description:
            "Analiza tu web en busca de vulnerabilidades comunes. Sin instalar nada, sin datos en la nube.",
    },
    {
        icon: MailWarning,
        title: "Anti-Phishing Emails",
        price: "desde 19€",
        description:
            "Detecta emails de phishing antes de que afecten a tu equipo. Código auditable incluido.",
    },
    {
        icon: Link2,
        title: "Verificador de URLs",
        price: "desde 9€",
        description:
            "Comprueba si una URL es segura antes de compartirla o hacer clic.",
    },
    {
        icon: DatabaseBackup,
        title: "Backup Cifrado Mac",
        price: "desde 49€",
        description:
            "Sistema de backup cifrado para Mac. Tus datos protegidos sin depender de iCloud.",
    },
];

export default function SeguridadPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx text-paper">
                <HeroBlock />
                <TrustBlock />
                <ComparisonBlock />
                <SecurityProductsBlock />
                <FinalCtaBlock />
            </main>
            <Footer />
        </>
    );
}

function HeroBlock() {
    return (
        <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
            <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.14),transparent_64%)]"
                aria-hidden
            />
            <div className="relative mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Seguridad
                </span>
                <h1 className="mt-6 text-5xl font-black leading-[0.98] text-paper sm:text-6xl lg:text-7xl">
                    Seguridad por diseño, no como parche
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Cada herramienta y agente que entregamos está construido con
                    ciberseguridad en el núcleo. No es un extra. Es nuestra forma
                    de trabajar.
                </p>
            </div>
        </section>
    );
}

function TrustBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1180px]">
                <div className="mb-10 max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Confianza
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Por qué confiar en IAFlashElite
                    </h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {TRUST_CARDS.map((card) => (
                        <TrustCard key={card.title} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TrustCard({ card }: { card: TrustCard }) {
    const Icon = card.icon;

    return (
        <article className="flex min-h-[310px] flex-col rounded-2xl border border-white/10 bg-[#111111] p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-paper">{card.title}</h3>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
                {card.description}
            </p>
        </article>
    );
}

function ComparisonBlock() {
    return (
        <section className="bg-[#111111] px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-10 max-w-3xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Comparativa
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        IAFlashElite vs agencias no-code
                    </h2>
                    <p className="mt-5 text-base leading-8 text-text-secondary">
                        La mayoría de agencias usan n8n, Make o Zapier. Nosotros
                        construimos desde cero.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[760px] border-collapse bg-onyx text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-sm text-text-muted">
                                <th className="px-5 py-4 font-semibold"> </th>
                                <th className="px-5 py-4 font-semibold text-flash">
                                    IAFlashElite
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Agencias n8n/Make
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr
                                    key={row.metric}
                                    className="border-b border-white/10 last:border-0"
                                >
                                    <th className="px-5 py-4 text-sm font-semibold text-paper">
                                        {row.metric}
                                    </th>
                                    <td className="px-5 py-4 text-sm text-paper">
                                        <ComparisonValue value={row.flash} />
                                    </td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        <ComparisonValue value={row.noCode} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function ComparisonValue({ value }: { value: ComparisonValue }) {
    if (value.tone === "positive") {
        return (
            <span className="inline-flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                {value.value}
            </span>
        );
    }

    if (value.tone === "negative") {
        return (
            <span className="inline-flex items-center gap-2 text-red-400">
                <XCircle className="h-4 w-4" />
                {value.value}
            </span>
        );
    }

    if (value.tone === "warning") {
        return (
            <span className="inline-flex items-center gap-2 text-amber-300">
                <TriangleAlert className="h-4 w-4" />
                {value.value}
            </span>
        );
    }

    return <span className="text-paper">{value.value}</span>;
}

function SecurityProductsBlock() {
    return (
        <section className="px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
                <div className="mb-10 max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flash">
                        Productos
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">
                        Herramientas de seguridad disponibles ahora
                    </h2>
                    <p className="mt-5 text-base leading-8 text-text-secondary">
                        Descargables, auditables, listos para usar.
                    </p>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                    {SECURITY_PRODUCTS.map((product) => (
                        <SecurityProductCard key={product.title} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SecurityProductCard({ product }: { product: SecurityProduct }) {
    const Icon = product.icon;

    return (
        <article className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-start">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-flash/20 bg-flash/10 text-flash">
                <Icon className="h-5 w-5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-bold text-paper">{product.title}</h3>
                    <span className="shrink-0 text-sm font-semibold text-flash">
                        {product.price}
                    </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                    {product.description}
                </p>
                <Button href="/productos" variant="secondary" className="mt-5 w-full sm:w-fit">
                    Ver producto <ArrowRight size={16} />
                </Button>
            </div>
        </article>
    );
}

function FinalCtaBlock() {
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
                    ¿Quieres una solución segura para tu empresa?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
                    Cuéntanos tu caso. Te respondemos en menos de 24h con una
                    propuesta adaptada a tu negocio.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contacto" size="lg" variant="gradient">
                        Solicitar propuesta <ArrowRight size={16} />
                    </Button>
                    <Button href="/productos" size="lg" variant="secondary">
                        Ver herramientas
                    </Button>
                </div>
            </div>
        </section>
    );
}
