import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { RulesSection } from "@/landing/components/sections/RulesSection";
import { useEffect } from "react";

export function RulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 bg-[#234A3C]">
        <div className="text-center pt-16 pb-8 text-[#FFFDF9]">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Community Rules</h1>
          <p className="text-[#FFFDF9]/60 font-sans text-lg max-w-2xl mx-auto">
            These rules are non-negotiable. Please read them carefully before applying for your passport.
          </p>
        </div>
        <RulesSection />
      </main>
      <Footer />
    </div>
  );
}
