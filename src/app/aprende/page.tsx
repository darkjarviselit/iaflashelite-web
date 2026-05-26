import type { Metadata } from "next";
import { AprendeContent } from "@/components/aprende/aprende-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
    title: "Aprende conmigo · IA Flash Elite",
    description:
        "Cursos grabados con manual, audio y plantillas listas, y sesiones en directo donde sales con tu propio sistema IA montado. Sin humo, sin gurús, sin perder el control de tus datos.",
    openGraph: {
        title: "Aprende conmigo · IA Flash Elite",
        description:
            "De chats sueltos a un sistema IA que puedes vender. Cursos grabados y sesiones en directo para montar tu sistema, paso a paso.",
        type: "website",
    },
};

export default function AprendePage() {
    return (
        <>
            <Header />
            <AprendeContent />
            <Footer />
        </>
    );
}
