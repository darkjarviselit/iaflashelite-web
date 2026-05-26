import type { Metadata } from "next";
import HomeContent from "@/components/home/home-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
    title: "IAFlashElite — Automatiza lo que te quita tiempo",
    description:
        "Productos, servicios a medida y formación para empresas que quieren centrarse en lo único que no se delega.",
    openGraph: {
        title: "IAFlashElite — Automatiza lo que te quita tiempo",
        description:
            "Productos, servicios a medida y formación para empresas que quieren centrarse en lo único que no se delega.",
        type: "website",
    },
};

export default function Home() {
    return (
        <>
            <Header />
            <HomeContent />
            <Footer />
        </>
    );
}
