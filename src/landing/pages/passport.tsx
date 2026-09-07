import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { PassportSection } from "@/landing/components/sections/PassportSection";
import { TrustSystemSection } from "@/landing/components/sections/TrustSystemSection";
import { StampsSection } from "@/landing/components/sections/StampsSection";
import { useEffect } from "react";

export function PassportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <PassportSection />
        <TrustSystemSection />
        <StampsSection />
      </main>
      <Footer />
    </div>
  );
}
