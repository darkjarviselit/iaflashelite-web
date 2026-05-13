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
    title: "IA Flash Elite — Automatización con IA en 48h",
    description:
        "Bots, chatbots y scripts con IA, entregados en 48h. Eliminamos el trabajo manual que te roba tiempo.",
    keywords: [
        "automatización IA",
        "bot de Telegram",
        "chatbot",
        "automatización de tareas",
        "scripts IA",
        "agencia IA",
        "iaflashelite",
    ],
    openGraph: {
        title: "IA Flash Elite — Automatización con IA en 48h",
        description: "Bots, chatbots y scripts con IA, entregados en 48h.",
        url: "https://iaflashelite.com",
        siteName: "IA Flash Elite",
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "IA Flash Elite — Automatización con IA en 48h",
        description: "Bots, chatbots y scripts con IA, entregados en 48h.",
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
