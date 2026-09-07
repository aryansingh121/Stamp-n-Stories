import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Passport", href: "/passport" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Experiences", href: "/experiences" },
    { label: "For Brands", href: "/partner" },
    { label: "Rules", href: "/rules" },
    { label: "Safety", href: "/safety" },
  ];

  return (
    <footer className="bg-[#202124] text-[#F6F0E6] py-20 px-6 md:px-12 border-t border-[#F6F0E6]/10">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <Link to="/">
            <div className="bg-white rounded-xl p-2 inline-block mb-4 hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Stamp & Stories" className="h-12 w-auto object-contain" />
            </div>
          </Link>
          <p className="font-serif text-xl text-[#F6F0E6]/80 italic mb-6">
            Every stamp has a story.
          </p>
          <p className="text-[#F6F0E6]/75 text-sm max-w-xs leading-relaxed mb-8">
            Not a trip. Not a random plan. A passport to safer stories.
          </p>
          <div className="flex items-start gap-3 rounded-2xl border border-[#F6F0E6]/10 bg-[#FFFDF9]/5 p-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#F26A2E] mt-0.5" />
            <p className="text-xs leading-relaxed text-[#F6F0E6]/70">
              Passport-reviewed participants (where required) → per-event checks → clear boundaries → respectful community → transparent protocols.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
          <div>
            <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#F6F0E6]/70 mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-[#F26A2E] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#F6F0E6]/70 mb-6 opacity-0 hidden sm:block">
              Navigation 2
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-[#F26A2E] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-20 pt-8 border-t border-[#F6F0E6]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F6F0E6]/60">
        <p>
          © {new Date().getFullYear()} StampNStories. Building safer social hangout spaces for
          women.
        </p>
        <div className="flex gap-6">
          <span className="hover:text-[#F6F0E6] transition-colors cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-[#F6F0E6] transition-colors cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
