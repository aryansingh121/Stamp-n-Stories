import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown, MapPin, Calendar, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/landing/components/ui/button";

const upcomingEvents = [
  {
    title: "Susegad Stamp — Goa",
    type: "TRAVEL",
    stamp: "Susegad Stamp",
    date: "02 – 04 Aug 2026",
    location: "South Goa",
    spotsLeft: 4,
    totalSpots: 14,
    href: "/events/goa-susegad",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Mumbai Monsoon Meetup",
    type: "CITY",
    stamp: "City Stamp",
    date: "10 Aug 2026",
    location: "Bandra, Mumbai",
    spotsLeft: 11,
    totalSpots: 20,
    href: "/#events",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Delhi House Soirée",
    type: "HOUSE PARTY",
    stamp: "Circle Stamp",
    date: "17 Aug 2026",
    location: "Hauz Khas, Delhi",
    spotsLeft: 7,
    totalSpots: 16,
    href: "/#events",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const location = useRouterState({ select: (s) => s.location.pathname });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEventsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Passport", href: "/passport" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Experiences", href: "/experiences" },
    { label: "For Brands", href: "/brands" },
    { label: "Rules", href: "/rules" },
    { label: "Safety", href: "/safety" },
  ];

  const isHome = location === "/";
  const isDarkBg = isHome && !isScrolled;
  const isDarkPage = ["/passport", "/brands", "/partner", "/rules"].includes(location) || location.startsWith("/events");
  const useDarkHeaderText = isScrolled || (!isDarkBg && !isDarkPage);
  const textColor = useDarkHeaderText ? "text-[#202124]/80" : "text-[#FFFDF9]/80";
  const activeColor = "text-[#F26A2E]";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="z-50 flex items-center gap-3">
          <div className="bg-white rounded-lg p-1">
            <img
              src="/logo.png"
              alt="Stamp & Stories"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
          <span className={`font-serif text-xl md:text-2xl font-bold tracking-widest uppercase ${useDarkHeaderText ? "text-[#202124]" : "text-[#FFFDF9]"}`}>
            STAMP<span className="text-[#F26A2E]">N</span>STORIES
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-medium tracking-wide transition-colors hover:text-[#F26A2E] ${textColor} ${
                  location === link.href ? activeColor : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Events dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setEventsOpen((v) => !v)}
                className={`flex items-center gap-1 text-xs font-medium tracking-wide transition-colors hover:text-[#F26A2E] ${textColor} ${
                  location.startsWith("/events") ? activeColor : ""
                }`}
              >
                Events
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${eventsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {eventsOpen && (
                <div className="absolute top-full right-0 mt-3 w-[520px] bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#202124]/8 overflow-hidden z-50">
                  {/* Header */}
                  <div className="px-5 pt-5 pb-3 border-b border-[#202124]/8 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E]">
                        Upcoming Events
                      </p>
                      <p className="text-xs text-[#202124]/40 font-sans mt-0.5">
                        Passport required to attend
                      </p>
                    </div>
                    <a
                      href="/#events"
                      onClick={() => setEventsOpen(false)}
                      className="text-xs font-bold tracking-widest uppercase text-[#202124]/40 hover:text-[#F26A2E] transition-colors"
                    >
                      View all →
                    </a>
                  </div>

                  {/* Event rows */}
                  <div className="divide-y divide-[#202124]/6">
                    {upcomingEvents.map((ev) => {
                      const filled = ev.totalSpots - ev.spotsLeft;
                      const pct = Math.round((filled / ev.totalSpots) * 100);
                      const urgent = ev.spotsLeft <= 4;
                      return (
                        <Link
                          key={ev.title}
                          to={ev.href}
                          onClick={() => setEventsOpen(false)}
                          className="flex gap-4 items-start p-4 hover:bg-[#F6F0E6] transition-colors group"
                        >
                          {/* Thumbnail */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#202124]">
                            <img
                              src={ev.image}
                              alt={ev.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F26A2E] border border-[#F26A2E]/30 rounded-full px-2 py-0.5">
                                {ev.type}
                              </span>
                              <span className="text-[10px] text-[#202124]/40 font-sans tracking-widest uppercase">
                                {ev.stamp}
                              </span>
                            </div>
                            <p className="font-serif text-[#202124] text-base leading-snug mb-2 group-hover:text-[#F26A2E] transition-colors">
                              {ev.title}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-[#202124]/50 font-sans">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {ev.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {ev.location}
                              </span>
                            </div>
                          </div>

                          {/* Spots */}
                          <div className="shrink-0 text-right min-w-[80px]">
                            <p
                              className={`text-sm font-bold font-sans ${urgent ? "text-[#F26A2E]" : "text-[#234A3C]"}`}
                            >
                              {ev.spotsLeft} left
                            </p>
                            <p className="text-[10px] text-[#202124]/30 font-sans mb-1.5">
                              of {ev.totalSpots}
                            </p>
                            <div className="h-1 w-full rounded-full bg-[#202124]/10 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${pct}%`,
                                  background: urgent ? "#F26A2E" : "#234A3C",
                                }}
                              />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer CTA */}
                  <div className="px-5 py-3 bg-[#202124] flex items-center justify-between">
                    <p className="text-xs text-[#FFFDF9]/40 font-sans">
                      More events announced every month
                    </p>
                    <Link to="/passport" onClick={() => setEventsOpen(false)}>
                      <button className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] hover:text-[#FFFDF9] transition-colors">
                        Get Passport →
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link to="/passport">
            <Button className="rounded-full px-6 tracking-wide bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white border-transparent">
              Apply for Passport
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[#202124]" />
          ) : (
            <Menu
              className={`w-6 h-6 ${useDarkHeaderText ? "text-[#202124]" : "text-[#FFFDF9]"}`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#FFFDF9] z-40 flex flex-col pt-24 px-6 overflow-y-auto transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-0 text-xl font-serif">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-4 border-b border-[#202124]/10 ${
                location === link.href ? "text-[#F26A2E]" : "text-[#202124]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Events accordion */}
          <div className="border-b border-[#202124]/10">
            <button
              className="w-full flex items-center justify-between py-4 text-[#202124] text-xl font-serif"
              onClick={() => setMobileEventsOpen((v) => !v)}
            >
              Events
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileEventsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileEventsOpen && (
              <div className="pb-4 space-y-3">
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                  Upcoming
                </p>
                {upcomingEvents.map((ev) => (
                  <Link
                    key={ev.title}
                    to={ev.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex gap-3 items-start p-3 rounded-xl bg-[#F6F0E6] active:bg-[#F26A2E]/10"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-[#202124] text-base leading-snug">{ev.title}</p>
                      <p className="text-xs text-[#202124]/50 font-sans mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {ev.date}
                      </p>
                      <p
                        className={`text-xs font-bold mt-1 font-sans ${ev.spotsLeft <= 4 ? "text-[#F26A2E]" : "text-[#234A3C]"}`}
                      >
                        {ev.spotsLeft} spots left
                      </p>
                    </div>
                  </Link>
                ))}
                <a
                  href="/#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-sm font-bold tracking-widest uppercase text-[#F26A2E] py-2"
                >
                  See all events →
                </a>
              </div>
            )}
          </div>

          <Link to="/passport" onClick={() => setMobileMenuOpen(false)}>
            <div className="mt-4 py-4 text-[#F26A2E] border-b border-[#202124]/10">Apply</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
