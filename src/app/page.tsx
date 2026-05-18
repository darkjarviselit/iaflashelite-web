import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { WhyTrustSection } from "@/components/sections/why-trust-section";
import { WhyUsSection } from "@/components/sections/why-us-section";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhyTrustSection />
            <HowItWorksSection />
            <ServicesSection />
            <WhyUsSection />
            <StatsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
