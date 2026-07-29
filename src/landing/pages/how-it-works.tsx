import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { TrustSystemSection } from "@/landing/components/sections/TrustSystemSection";
import { useEffect } from "react";

export function HowItWorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 bg-[#F6F0E6]">
        <div className="container mx-auto px-6 max-w-3xl text-center mb-[-4rem] pt-12">
          <h1 className="text-4xl md:text-6xl font-serif text-[#202124] mb-4">How it works</h1>
          <p className="text-[#202124]/60 font-sans text-lg">The infrastructure of a verified community.</p>
        </div>
        <TrustSystemSection />
      </main>
      <Footer />
    </div>
  );
}
