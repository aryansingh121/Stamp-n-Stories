import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { BrandsSection } from "@/landing/components/sections/BrandsSection";
import { useEffect } from "react";

export function BrandsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 bg-[#202124]">
        <BrandsSection />
      </main>
      <Footer />
    </div>
  );
}
