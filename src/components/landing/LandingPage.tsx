import { Header } from "./Header";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { PricingSection } from "./sections/PricingSection";
import { SiteFooter } from "./sections/SiteFooter";
import { ComingSoonProvider } from "./ComingSoonContext";
import { ComingSoonModal } from "./ComingSoonModal";
import { ScrollProgress } from "./ScrollProgress";

export function LandingPage() {
  return (
    <ComingSoonProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-[#f5f2ed] selection:bg-[#C9824A]/20">
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <PricingSection />
        </main>
        <SiteFooter />
        <ComingSoonModal />
      </div>
    </ComingSoonProvider>
  );
}
