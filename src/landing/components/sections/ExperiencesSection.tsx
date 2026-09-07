import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import mechanisms, { findMechanismsForText } from "@/landing/lib/safety";

export function ExperiencesSection() {
  const experiences = [
    {
      title: "GOA EXPERIENCE",
      stamp: "The Susegad Stamp",
      desc: "Earn your chill. No tourists allowed. Three days. Four stamps. One uncommon Goa.",
      safety: "Trip captain, passport-reviewed participants, shared safety brief",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "MUMBAI / DELHI / BENGALURU",
      stamp: "City Stamp",
      desc: "Short, curated meetups for passport-reviewed participants who want low-pressure offline plans.",
      safety: "Passport-led entry and low-pressure format",
      image:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "HOUSE PARTIES",
      stamp: "Circle Stamp",
      desc: "Invite-only gatherings with host-led moderation and clear community rules.",
      safety: "Invite-only format with host-led boundaries",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "MOVIE NIGHTS",
      stamp: "Screen Stamp",
      desc: "Easy hangout format for women who want to meet people without awkward networking.",
      safety: "Simple setting, clear expectations, no forced socialising",
      image:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "NATURE MISSIONS",
      stamp: "Wild Stamp",
      desc: "Phones down, guided routes, courage without unsafe pressure.",
      safety: "Guided route and opt-out friendly participation",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "BRAND EXPERIENCES",
      stamp: "Partner Stamp",
      desc: "Women-focused brands add comfort, safety and utility to real-life moments.",
      safety: "Partner format reviewed around women-first comfort",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FFFDF9]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-4">
            A year-round community.
          </h2>
          <p className="text-xl md:text-2xl text-[#202124]/70 font-serif italic">A passport that grows.</p>
          <p className="mt-5 text-sm text-[#202124]/70 font-sans max-w-2xl mx-auto leading-relaxed">
            Many experiences require passport review and defined participation criteria; check each event for details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#202124] flex items-end p-6 cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/50 to-transparent"></div>

              <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full border border-[#F26A2E] flex items-center justify-center bg-[#F26A2E]/20 backdrop-blur-sm text-[#FFFDF9] text-xs">
                    <span className="w-2 h-2 bg-[#F26A2E] rounded-full"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E]">{exp.stamp}</span>
                </div>
                <p className="mb-3 flex items-start gap-2 text-[11px] font-sans leading-relaxed text-[#FFFDF9]/65">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F26A2E]" />
                  {exp.safety}
                </p>
                {/* Concise micro safety cues — label only, full status available via accessible label/title */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {findMechanismsForText(exp.safety).map((key) => {
                    const mech = mechanisms.find((m) => m.key === key);
                    if (!mech) return null;
                    const Icon = mech.icon as any;
                    return (
                      <div
                        key={mech.key}
                        title={`${mech.label}: ${mech.status}`}
                        aria-label={`${mech.label}: ${mech.status}`}
                        className="rounded-full bg-[#FFFDF9]/6 px-3 py-1 text-[11px] font-sans flex items-center gap-2 text-[#FFFDF9]/75"
                      >
                        <Icon className="h-3 w-3 text-[#F26A2E]" />
                        <span className="font-medium">{mech.label}</span>
                      </div>
                    );
                  })}
                </div>
                <h3 className="font-serif text-2xl text-[#FFFDF9] mb-3">{exp.title}</h3>
                <p className="text-sm text-[#FFFDF9]/80 leading-relaxed font-sans opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
