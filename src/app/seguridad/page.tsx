import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SeguridadContent } from "@/components/seguridad/seguridad-content";

export const metadata: Metadata = {
    title: "Seguridad — IAFlashElite",
    description:
        "Productos auditables, locales y sin humo. La seguridad no se promete: se enseña.",
    openGraph: {
        title: "Seguridad — IAFlashElite",
        description:
            "Productos auditables, locales y sin humo. La seguridad no se promete: se enseña.",
        type: "website",
    },
};

export default function SeguridadPage() {
    return (
        <>
            <Header />
            <SeguridadContent />
            <Footer />
        </>
    );
}
