import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { ApplySection } from "@/landing/components/sections/ApplySection";
import { useEffect } from "react";

export function ApplyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ApplySection standalone={true} />
      </main>
      <Footer />
    </div>
  );
}
