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
    title: "iaflashelite — IA + Seguridad + Material formativo incluido",
    description:
        "Herramientas IA con código auditable. Mini guías y cursos de seguridad INCLUIDOS con cada compra. Privacy-first. Sin suscripciones. Sin precios inflados.",
    keywords: [
        "automatización IA",
        "seguridad digital",
        "auditable",
        "código auditable",
        "academia seguridad",
        "bot de Telegram",
        "chatbot",
        "scripts IA",
        "privacy first",
        "iaflashelite",
    ],
    openGraph: {
        title: "iaflashelite — IA + Seguridad + Material formativo incluido",
        description:
            "Herramientas IA con código auditable. Mini guías y cursos de seguridad INCLUIDOS con cada compra. Privacy-first.",
        url: "https://iaflashelite.com",
        siteName: "IA Flash Elite",
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "iaflashelite — IA + Seguridad + Material formativo incluido",
        description:
            "Herramientas IA con código auditable. Material de seguridad incluido con cada compra.",
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
