import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "IA Flash Elite — Herramientas locales de seguridad. Pago único.",
    description:
        "Herramientas descargables de seguridad para PYMES y particulares. Código auditable, sin nube, sin suscripciones. Garantía 7 días.",
    keywords: [
        "seguridad digital",
        "auditable",
        "código auditable",
        "herramientas locales",
        "pago único",
        "sin suscripción",
        "privacy first",
        "iaflashelite",
    ],
    openGraph: {
        title: "IA Flash Elite — Herramientas locales de seguridad. Pago único.",
        description:
            "Herramientas descargables de seguridad para PYMES y particulares. Código auditable, sin nube, sin suscripciones. Garantía 7 días.",
        url: "https://iaflashelite.com",
        siteName: "IA Flash Elite",
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "IA Flash Elite — Herramientas locales de seguridad. Pago único.",
        description:
            "Herramientas descargables de seguridad para PYMES y particulares. Código auditable, sin nube, sin suscripciones. Garantía 7 días.",
    },
    metadataBase: new URL("https://iaflashelite.com"),
};

export const viewport: Viewport = {
    themeColor: "#0a0a0a",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={inter.variable}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
