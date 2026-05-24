import { Landmark, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";
import { LogoFull } from "@/components/brand/logo-full";
import { BRAND } from "@/lib/constants";

const PAYMENT_METHODS = [
    { label: "Bizum", icon: Smartphone },
    { label: "PayPal", icon: Wallet },
    { label: "Transferencia", icon: Landmark },
] as const;

const FOOTER_NAV = {
    soluciones: [
        { label: "Gestorías", href: "/soluciones/gestorias" },
        { label: "Dentistas", href: "/soluciones/dentistas" },
        { label: "Inmobiliarias", href: "/soluciones/inmobiliarias" },
        { label: "Marketing", href: "/soluciones/marketing" },
        { label: "Negocios locales", href: "/soluciones/negocios-locales" },
    ],
    catalogo: [
        { label: "Productos", href: "/productos" },
        { label: "Servicios", href: "/servicios" },
        { label: "Servicios extra", href: "/servicios-extra" },
        { label: "Casos", href: "/casos" },
    ],
    empresa: [
        { label: "Sobre nosotros", href: "/sobre" },
        { label: "Cómo trabajamos", href: "/como-trabajamos" },
        { label: "Soluciones", href: "/soluciones" },
        { label: "Mundo GiruIA", href: "/mundo-giruia" },
        { label: "Contacto", href: "/contacto" },
    ],
    seguridad: [
        { label: "Manifiesto", href: "/seguridad" },
        { label: "Cómo verificar", href: "/como-verificar" },
        { label: "Academia", href: "/academia" },
        { label: "FAQ", href: "/#faq" },
    ],
    legal: [
        { label: "Aviso legal", href: "/legal/aviso-legal" },
        { label: "Privacidad", href: "/legal/privacidad" },
        { label: "Garantía Flash y devoluciones", href: "/legal/garantias" },
        { label: "Cookies", href: "/legal/cookies" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-onyx border-t border-border-dark mt-32">
            <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-10">
                    <div className="space-y-5">
                        <LogoFull size="md" />
                        <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
                            {BRAND.description}
                        </p>
                        <a
                            href={`mailto:${BRAND.email}`}
                            className="inline-block text-sm text-flash hover:underline transition-colors"
                        >
                            {BRAND.email} →
                        </a>
                    </div>
                    <FooterColumn title="Soluciones" items={FOOTER_NAV.soluciones} />
                    <FooterColumn title="Catálogo" items={FOOTER_NAV.catalogo} />
                    <FooterColumn title="Seguridad" items={FOOTER_NAV.seguridad} />
                    <FooterColumn title="Empresa" items={FOOTER_NAV.empresa} />
                    <FooterColumn title="Legal" items={FOOTER_NAV.legal} />
                </div>

                <div className="mt-16 pt-8 border-t border-border-dark flex flex-col gap-5">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                        Métodos de pago aceptados
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                        {PAYMENT_METHODS.map((m) => {
                            const Icon = m.icon;
                            return (
                                <span
                                    key={m.label}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border-dark"
                                >
                                    <Icon className="w-4 h-4 text-flash" />
                                    <span className="text-xs font-medium text-paper">
                                        {m.label}
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">
                        Pago manual con confirmación por email. Tu compra queda
                        protegida por Garantía Flash de entrega y funcionamiento.
                    </p>
                </div>

                <div className="mt-10 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                        © {new Date().getFullYear()} {BRAND.name}. Hecho con IA propia.
                    </p>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                        {BRAND.tagline}
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    items,
}: {
    title: string;
    items: ReadonlyArray<{ label: string; href: string }>;
}) {
    return (
        <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                {title}
            </h4>
            <ul className="space-y-2.5">
                {items.map((item) => (
                    <li key={item.label}>
                        {item.href.startsWith("http") || item.href.startsWith("mailto:") ? (
                            <a
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="text-sm text-text-secondary hover:text-paper transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-sm text-text-secondary hover:text-paper transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
