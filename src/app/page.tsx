import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AudienceSection } from "@/components/sections/audience-section";
import { AuditableSection } from "@/components/sections/auditable-section";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { SecurityFirstSection } from "@/components/sections/security-first-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { WhyCheapSection } from "@/components/sections/why-cheap-section";
import { WhyTrustSection } from "@/components/sections/why-trust-section";
import { WhyUsSection } from "@/components/sections/why-us-section";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <SecurityFirstSection />
                <AudienceSection />
                <GuaranteesSection />
                <WhyTrustSection />
                <HowItWorksSection />
                <ServicesSection />
                <WhyCheapSection />
                <AuditableSection />
                <WhyUsSection />
                <StatsSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
