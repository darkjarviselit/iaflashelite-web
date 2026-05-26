import type { Metadata } from "next";
import { ContactoContent } from "@/components/contacto/contacto-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
    title: "Contacto — IAFlashElite",
    description:
        "Cuéntanos qué quieres automatizar. Te respondemos en menos de 24h con un plan concreto.",
    openGraph: {
        title: "Contacto — IAFlashElite",
        description:
            "Cuéntanos qué quieres automatizar. Te respondemos en menos de 24h con un plan concreto.",
        type: "website",
    },
};

export default function ContactoPage() {
    return (
        <>
            <Header />
            <ContactoContent />
            <Footer />
        </>
    );
}
