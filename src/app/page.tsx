// FASE 1A: secciones ocultas temporalmente para enfocar la home comercial.
// Componentes conservados en disco bajo src/components/sections/ — reactivar
// reimportando y añadiendo de nuevo al <main> cuando proceda.

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyCheapSection } from "@/components/sections/why-cheap-section";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <FeaturedProductsSection />
                <WhyCheapSection />
                <GuaranteesSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
