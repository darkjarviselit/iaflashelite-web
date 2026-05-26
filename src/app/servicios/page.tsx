import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ServiciosV2Content } from "@/components/servicios/servicios-v2-content";

export const metadata: Metadata = {
    title: "Servicios de IA para empresas — iaflashelite.com",
    description:
        "Agentes inteligentes, automatizaciones y herramientas de ciberseguridad para empresas. Pricing visible y propuestas B2B sin humo.",
    openGraph: {
        title: "Servicios de IA para empresas",
        description:
            "Agentes inteligentes, automatizaciones y herramientas de ciberseguridad para empresas. Pricing visible y propuestas B2B sin humo.",
        type: "website",
    },
};

export default function ServiciosPage() {
    return (
        <>
            <Header />
            <ServiciosV2Content />
            <Footer />
        </>
    );
}
