import { Header } from "./Header";
import { HeroSection } from "./sections/HeroSection";
import { FeatureShowcase } from "./sections/FeatureShowcase";
import { AppPreviewSection } from "./sections/AppPreviewSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { TrustSection } from "./sections/TrustSection";
import { PricingSection } from "./sections/PricingSection";
import { FAQSection } from "./sections/FAQSection";
import { SiteFooter } from "./sections/SiteFooter";
import { ComingSoonProvider } from "./ComingSoonContext";
import { ComingSoonModal } from "./ComingSoonModal";
import { ScrollProgress } from "./ScrollProgress";

export function LandingPage() {
  return (
    <ComingSoonProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-[#f5f2ed]">
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <FeatureShowcase />
          <AppPreviewSection />
          <HowItWorksSection />
          <TrustSection />
          <PricingSection />
          <FAQSection />
        </main>
        <SiteFooter />
        <ComingSoonModal />
      </div>
    </ComingSoonProvider>
  );
}
