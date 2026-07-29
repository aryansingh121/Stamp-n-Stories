import { Link } from "@tanstack/react-router";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Passport", href: "/passport" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Experiences", href: "/experiences" },
    { label: "For Brands", href: "/for-brands" },
    { label: "Rules", href: "/rules" },
    { label: "Apply", href: "/apply" },
  ];

  return (
    <footer className="bg-[#202124] text-[#F6F0E6] py-20 px-6 md:px-12 border-t border-[#F6F0E6]/10">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <Link to="/">
            <span className="font-serif font-bold text-2xl tracking-widest uppercase block mb-4 cursor-pointer hover:text-[#F26A2E] transition-colors">
              Stamp<span className="text-[#F26A2E]">N</span>Stories
            </span>
          </Link>
          <p className="font-serif text-xl text-[#F6F0E6]/80 italic mb-6">
            Every stamp has a story.
          </p>
          <p className="text-[#F6F0E6]/60 text-sm max-w-xs leading-relaxed mb-8">
            Not a trip. Not a random plan. A passport to safer stories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
          <div>
            <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#F6F0E6]/40 mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[#F6F0E6]/80 hover:text-[#F26A2E] transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#F6F0E6]/40 mb-6 opacity-0 hidden sm:block">
              Navigation 2
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[#F6F0E6]/80 hover:text-[#F26A2E] transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-20 pt-8 border-t border-[#F6F0E6]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F6F0E6]/40">
        <p>© {new Date().getFullYear()} StampNStories. Building safer social hangout spaces for women.</p>
        <div className="flex gap-6">
          <span className="hover:text-[#F6F0E6] transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#F6F0E6] transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
