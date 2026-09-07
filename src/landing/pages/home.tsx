import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { HeroSection } from "@/landing/components/sections/HeroSection";
import { NotRandomCrowdSection } from "@/landing/components/sections/NotRandomCrowdSection";
import { WomenFirstVsOnlySection } from "@/landing/components/sections/WomenFirstVsOnlySection";
import { PassportSection } from "@/landing/components/sections/PassportSection";
import { TrustSystemSection } from "@/landing/components/sections/TrustSystemSection";
import { StampsSection } from "@/landing/components/sections/StampsSection";
import { ExperiencesSection } from "@/landing/components/sections/ExperiencesSection";
import { UpcomingEventsSection } from "@/landing/components/sections/UpcomingEventsSection";
import { RulesSection } from "@/landing/components/sections/RulesSection";
import { BrandsSection } from "@/landing/components/sections/BrandsSection";
import { FAQSection } from "@/landing/components/sections/FAQSection";
import { useEffect } from "react";

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <NotRandomCrowdSection />
        <WomenFirstVsOnlySection />
        <PassportSection />
        <TrustSystemSection />
        <StampsSection />
        <ExperiencesSection />
        <UpcomingEventsSection />
        <RulesSection />
        <BrandsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
