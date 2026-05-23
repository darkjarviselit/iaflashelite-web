import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TechProofSection } from "@/components/sections/tech-proof-section";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <WhatWeDoSection />
                <ServicesSection />
                <TechProofSection />
                <GuaranteesSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
