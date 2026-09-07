import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function WhatWeBuildingSection() {
  const cards = [
    {
      title: "Curated Trips",
      desc: "Uncommon travel experiences where members earn destination and story stamps.",
      number: "01",
    },
    {
      title: "City Meetups",
      desc: "Low-pressure offline plans for passport-reviewed participants in Mumbai, Delhi, Bengaluru and more.",
      number: "02",
    },
    {
      title: "House Parties",
      desc: "Invite-only social spaces with crowd filters, consent rules and host-led moderation.",
      number: "03",
    },
    {
      title: "Movie Nights",
      desc: "Easy-entry hangouts where women can meet people without forced networking.",
      number: "04",
    },
    {
      title: "Brand Pop-ups",
      desc: "Women-first product experiences where useful brands add comfort, not noise.",
      number: "05",
    },
    {
      title: "Community Passport",
      desc: "A lifetime identity that records stories, access and earned stamps to help build trust over time.",
      number: "06",
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
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <p className="text-[#F26A2E] font-bold tracking-widest text-sm uppercase mb-4">
            Not a trip company. Not a dating app.
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124] leading-tight">
            An offline community focused on safety and comfort.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#F6F0E6] p-8 rounded-2xl border border-[#202124]/5 group hover:border-[#F26A2E]/30 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full border border-[#202124]/20 flex items-center justify-center font-serif text-lg text-[#202124] mb-6 group-hover:bg-[#F26A2E] group-hover:text-white group-hover:border-[#F26A2E] transition-colors">
                {card.number}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#202124] mb-4">{card.title}</h3>
              <p className="text-[#202124]/70 leading-relaxed font-sans text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-serif italic text-[#202124]/80 mb-8 max-w-3xl mx-auto">
            Not a trip company. Not a dating app. An offline community where experiences are
            curated and every experience becomes a stamp in your story.
          </p>
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 text-[#F26A2E] font-bold tracking-wide hover:gap-3 transition-all"
          >
            Explore Experiences <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
