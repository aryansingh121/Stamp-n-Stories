import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Calendar, MapPin, Clock, Users, IndianRupee } from "lucide-react";
import mechanisms, { findMechanismsForText } from "@/landing/lib/safety";

export function UpcomingEventsSection() {
  const safetyText = "Passport-reviewed participants, trip captain and shared emergency details";
  const safetyMechanisms = findMechanismsForText(safetyText);

  return (
    <section id="events" className="py-20 md:py-28 bg-[#202124]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
            What's coming up
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9] leading-tight">
              Upcoming events.
              <br />
              <span className="italic text-[#F6F0E6]/75">Passport required.</span>
            </h2>
            <p className="text-base text-[#FFFDF9]/75 max-w-xs font-sans leading-relaxed">
              Many events require a verified passport — check each event page for registration criteria and stamp rules.
            </p>
          </div>
        </motion.div>

        {/* Single Featured Goa Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl bg-[#1a1b1e] border border-[#FFFDF9]/10 shadow-2xl"
          style={{ minHeight: 420 }}
        >
          {/* Background Image with Overlay */}
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"
            alt="Goa Uncovered"
            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#202124] via-[#202124]/85 to-transparent" />

          {/* Main Content Area */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row lg:items-end justify-between h-full gap-8">
            {/* Left: Event Details & Narrative */}
            <div className="flex-1 max-w-2xl">
              {/* Category Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] border border-[#F26A2E]/40 bg-[#F26A2E]/10 rounded-full px-3 py-1">
                  TRAVEL
                </span>
                <span className="text-xs font-sans text-[#FFFDF9]/80 tracking-widest uppercase font-semibold">
                  GOA EXPERIENCE
                </span>
              </div>

              {/* Date & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-5">
                {/* Date Stamp Block */}
                <div className="flex items-center gap-2.5 bg-[#FFFDF9]/10 backdrop-blur-md border border-[#FFFDF9]/15 rounded-2xl px-4 py-2.5 w-fit">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-serif text-[#F26A2E] leading-none font-bold">
                      15
                    </p>
                    <p className="text-[10px] font-bold tracking-widest text-[#FFFDF9]/80 uppercase mt-0.5">
                      SEP
                    </p>
                  </div>
                  <span className="text-[#FFFDF9]/30 text-lg font-light">·</span>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-serif text-[#F26A2E] leading-none font-bold">
                      25
                    </p>
                    <p className="text-[10px] font-bold tracking-widest text-[#FFFDF9]/80 uppercase mt-0.5">
                      SEP
                    </p>
                  </div>
                  <span className="text-[11px] font-sans text-[#FFFDF9]/60 uppercase tracking-widest ml-1 font-medium">
                    2026
                  </span>
                </div>

                <div>
                  <Link
                    to="/events/goa-susegad"
                    className="group-hover:text-[#F26A2E] transition-colors"
                  >
                    <h3 className="text-2xl md:text-4xl font-serif text-[#FFFDF9] mb-1">
                      Goa Uncovered
                    </h3>
                  </Link>
                  <p className="text-xs md:text-sm text-[#FFFDF9]/75 font-sans flex items-center gap-2">
                    <span>📍 South Goa</span>
                    <span className="text-[#FFFDF9]/30">·</span>
                    <span>Day 0 + 3 Days</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-[#FFFDF9]/80 font-sans leading-relaxed mb-3">
                Three days of local stories, slow mornings, curated experiences, nature, shared meals and a Goa worth remembering.
              </p>

              {/* Short Summary */}
              <p className="text-xs md:text-sm text-[#FFFDF9]/65 font-sans leading-relaxed mb-6 italic">
                A curated South Goa experience built around local stories, nature, shared meals, meaningful challenges and slow moments. Four days including the road journey. Four stamps. One uncommon Goa.
              </p>

              {/* Event Details Row */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans text-[#FFFDF9]/80 mb-6">
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/6 border border-[#FFFDF9]/10 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-[#F26A2E]" />
                  <span>15 SEP · 25 SEP 2026</span>
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/6 border border-[#FFFDF9]/10 px-3 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-[#F26A2E]" />
                  <span>South Goa</span>
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/6 border border-[#FFFDF9]/10 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#F26A2E]" />
                  <span>Day 0 + 3 Days</span>
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/6 border border-[#FFFDF9]/10 px-3 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-[#F26A2E]" />
                  <span className="font-semibold text-[#FFFDF9]">14 People Only</span>
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/6 border border-[#FFFDF9]/10 px-3 py-1 rounded-full">
                  <IndianRupee className="w-3.5 h-3.5 text-[#F26A2E]" />
                  <span className="font-semibold text-[#FFFDF9]">₹22,999 / person</span>
                </span>
              </div>

              {/* Safety Badges */}
              <div className="space-y-2 pt-2 border-t border-[#FFFDF9]/10">
                <p className="flex items-start gap-2 text-xs font-sans leading-relaxed text-[#FFFDF9]/75">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F26A2E]" />
                  <span>{safetyText}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {safetyMechanisms.map((key) => {
                    const mech = mechanisms.find((m) => m.key === key);
                    if (!mech) return null;
                    const Icon = mech.icon as any;
                    return (
                      <div
                        key={mech.key}
                        title={`${mech.label}: ${mech.status}`}
                        aria-label={`${mech.label}: ${mech.status}`}
                        className="rounded-full bg-[#FFFDF9]/6 px-3 py-1 text-[11px] font-sans flex items-center gap-2 text-[#FFFDF9]/75 border border-[#FFFDF9]/10"
                      >
                        <Icon className="h-3 w-3 text-[#F26A2E]" />
                        <span className="font-medium">{mech.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Availability Card & CTA */}
            <div className="w-full lg:w-[280px] shrink-0 bg-[#202124]/90 backdrop-blur-md border border-[#FFFDF9]/15 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FFFDF9]/50 font-sans mb-1">
                  Availability
                </p>
                <p className="text-xl md:text-2xl font-serif text-[#FFFDF9] font-bold mb-1.5">
                  14 PEOPLE ONLY
                </p>
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#F26A2E] bg-[#F26A2E]/15 border border-[#F26A2E]/30 px-3 py-1 rounded-full mb-4">
                  Applications Open
                </span>

                <div className="space-y-2.5 py-3 border-t border-[#FFFDF9]/10 text-xs font-sans">
                  <div className="flex justify-between items-center text-[#FFFDF9]/70">
                    <span>Dates</span>
                    <span className="font-medium text-[#FFFDF9]">15 & 25 Sep 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-[#FFFDF9]/70">
                    <span>Location</span>
                    <span className="font-medium text-[#FFFDF9]">South Goa</span>
                  </div>
                  <div className="flex justify-between items-center text-[#FFFDF9]/70">
                    <span>Trip Price</span>
                    <span className="font-serif font-bold text-sm text-[#F26A2E]">
                      ₹22,999 <span className="text-[10px] font-sans text-[#FFFDF9]/60 font-normal">/ person</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                <Link to="/events/goa-susegad/request-invite" className="block">
                  <button className="w-full bg-[#F26A2E] text-[#FFFDF9] text-xs font-bold tracking-widest uppercase py-3.5 px-4 rounded-xl hover:bg-[#e0571c] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                    <span>SEAT LEFT</span>
                    <span>→</span>
                  </button>
                </Link>

                <Link to="/events/goa-susegad" className="block">
                  <button className="w-full border border-[#FFFDF9]/20 text-[#FFFDF9]/80 hover:text-white hover:border-[#FFFDF9]/40 text-[11px] font-bold tracking-widest uppercase py-2.5 px-4 rounded-xl transition-colors text-center">
                    View Experience Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
