import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Passport", href: "/passport" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Vision", href: "/vision" },
    { label: "Experiences", href: "/experiences" },
    { label: "For Brands", href: "/partner" },
    { label: "Rules", href: "/rules" },
    { label: "Safety", href: "/safety" },
    { label: "Refund Policy", href: "/refund-policy" },
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
          <p className="text-[#F6F0E6]/75 text-sm max-w-xs leading-relaxed">
            Not a trip. Not a random plan. A passport to safer stories.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
            <div>
              <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#F6F0E6]/70 mb-6">
                Navigation
              </h4>
              <ul className="flex flex-col gap-4">
                {navLinks.slice(0, 5).map((link) => (
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
                {navLinks.slice(5).map((link) => (
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

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/stampnstories?stkn=b2h6dmZrcW8zYzh1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stamp N Stories on Instagram"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F6F0E6]/15 bg-[#FFFDF9]/5 text-xs font-medium text-[#F6F0E6]/90 hover:text-white hover:border-[#F26A2E] hover:bg-[#F26A2E]/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A2E] transition-all duration-200"
            >
              <Instagram className="h-4 w-4 text-[#F26A2E]" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/company/stamp-n-stories/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stamp N Stories on LinkedIn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F6F0E6]/15 bg-[#FFFDF9]/5 text-xs font-medium text-[#F6F0E6]/90 hover:text-white hover:border-[#F26A2E] hover:bg-[#F26A2E]/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A2E] transition-all duration-200"
            >
              <Linkedin className="h-4 w-4 text-[#F26A2E]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-20 pt-8 border-t border-[#F6F0E6]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F6F0E6]/60">
        <p>
          © {new Date().getFullYear()} StampNStories. Building safer social hangout spaces for
          women.
        </p>
        <div className="flex gap-6">
          <Link to="/refund-policy" className="hover:text-[#F26A2E] transition-colors">
            Refund Policy
          </Link>
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
