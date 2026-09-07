import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { ExperiencesSection } from "@/landing/components/sections/ExperiencesSection";
import { useEffect } from "react";

export function ExperiencesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <ExperiencesSection />
      </main>
      <Footer />
    </div>
  );
}
