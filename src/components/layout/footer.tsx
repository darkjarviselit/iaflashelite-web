import Link from "next/link";
import { LogoFull } from "@/components/brand/logo-full";
import { BRAND } from "@/lib/constants";

const FOOTER_NAV = {
    services: [
        { label: "Bots Telegram/WhatsApp", href: "/#servicios" },
        { label: "Automatización", href: "/#servicios" },
        { label: "Chatbots IA", href: "/#servicios" },
        { label: "Scripts personalizados", href: "/#servicios" },
    ],
    company: [
        { label: "Proceso", href: "/#proceso" },
        { label: "Casos", href: "/casos" },
        { label: "Mundo GiruIA", href: "/mundo-giruia" },
        { label: "Contacto", href: "/contacto" },
    ],
    social: [
        { label: "Twitter / X", href: "https://x.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: `Email · ${BRAND.email}`, href: `mailto:${BRAND.email}` },
    ],
};

export function Footer() {
    return (
        <footer className="bg-onyx border-t border-border-dark mt-32">
            <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
                <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-16">
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
                    <FooterColumn title="Servicios" items={FOOTER_NAV.services} />
                    <FooterColumn title="Compañía" items={FOOTER_NAV.company} />
                    <FooterColumn title="Conecta" items={FOOTER_NAV.social} />
                </div>

                <div className="mt-20 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
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
