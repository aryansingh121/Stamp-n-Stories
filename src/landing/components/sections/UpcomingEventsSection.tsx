import { motion } from "framer-motion";
import { Link } from "wouter";

const events = [
  {
    date: { day: "02", month: "AUG" },
    title: "Susegad Stamp — Goa",
    type: "TRAVEL",
    stamp: "Susegad Stamp",
    location: "South Goa",
    spots: 14,
    spotsLeft: 4,
    description:
      "Three days of slow mornings, curated brunches, and women-only beach walks. Phones optional.",
    color: "#234A3C",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
  },
  {
    date: { day: "10", month: "AUG" },
    title: "Mumbai Monsoon Meetup",
    type: "CITY",
    stamp: "City Stamp",
    location: "Bandra, Mumbai",
    spots: 20,
    spotsLeft: 11,
    description:
      "A cozy indoor evening with chai, board games, and no awkward networking. Just good company.",
    color: "#F26A2E",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    date: { day: "17", month: "AUG" },
    title: "Delhi House Soirée",
    type: "HOUSE PARTY",
    stamp: "Circle Stamp",
    location: "Hauz Khas, Delhi",
    spots: 16,
    spotsLeft: 7,
    description:
      "Invite-only gathering at a verified member's home. Host-led, moderated, and deeply warm.",
    color: "#202124",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
  },
  {
    date: { day: "24", month: "AUG" },
    title: "Bangalore Film Night",
    type: "MOVIE NIGHT",
    stamp: "Screen Stamp",
    location: "Indiranagar, Bengaluru",
    spots: 25,
    spotsLeft: 18,
    description:
      "A handpicked indie film, popcorn, and a post-watch circle with zero pressure to perform.",
    color: "#234A3C",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
  },
  {
    date: { day: "31", month: "AUG" },
    title: "Western Ghats Trek",
    type: "NATURE",
    stamp: "Wild Stamp",
    location: "Coorg, Karnataka",
    spots: 10,
    spotsLeft: 3,
    description:
      "Guided overnight trail through mist and forest. Phones down. Courage up. Stories earned.",
    color: "#F26A2E",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
  },
];

function SpotBar({ total, left }: { total: number; left: number }) {
  const filled = total - left;
  const pct = Math.round((filled / total) * 100);
  const urgent = left <= 4;
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-sans tracking-wide text-[#202124]/50 uppercase">
          Spots
        </span>
        <span
          className={`text-xs font-bold font-sans tracking-wide uppercase ${
            urgent ? "text-[#F26A2E]" : "text-[#234A3C]"
          }`}
        >
          {left} left of {total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#202124]/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: urgent ? "#F26A2E" : "#234A3C",
          }}
        />
      </div>
    </div>
  );
}

export function UpcomingEventsSection() {
  return (
    <section id="events" className="py-24 md:py-32 bg-[#202124]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
            What's coming up
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9] leading-tight">
              Upcoming events.
              <br />
              <span className="italic text-[#F6F0E6]/50">
                Passport required.
              </span>
            </h2>
            <p className="text-base text-[#FFFDF9]/50 max-w-xs font-sans leading-relaxed">
              All events are exclusive to verified passport holders. Each one
              earns you a stamp.
            </p>
          </div>
        </motion.div>

        {/* Featured (first) event */}
        <Link href="/events/goa-susegad">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl mb-6 cursor-pointer"
          style={{ minHeight: 360 }}
        >
          <img
            src={events[0].image}
            alt={events[0].title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#202124] via-[#202124]/70 to-transparent" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between h-full gap-8">
            {/* Left: date + info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] border border-[#F26A2E]/30 rounded-full px-3 py-1">
                  {events[0].type}
                </span>
                <span className="text-xs font-sans text-[#FFFDF9]/40 tracking-widest uppercase">
                  {events[0].stamp}
                </span>
              </div>

              <div className="flex items-start gap-6 mb-4">
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-serif text-[#F26A2E] leading-none">
                    {events[0].date.day}
                  </p>
                  <p className="text-sm font-bold tracking-widest text-[#FFFDF9]/60 uppercase mt-1">
                    {events[0].date.month}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-serif text-[#FFFDF9] mb-2">
                    {events[0].title}
                  </h3>
                  <p className="text-sm text-[#FFFDF9]/50 font-sans">
                    📍 {events[0].location}
                  </p>
                </div>
              </div>
              <p className="text-base text-[#FFFDF9]/70 font-sans leading-relaxed max-w-md">
                {events[0].description}
              </p>
            </div>

            {/* Right: spots */}
            <div className="md:min-w-[220px] bg-[#FFFDF9]/5 backdrop-blur-sm border border-[#FFFDF9]/10 rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-[#FFFDF9]/40 mb-1">
                Availability
              </p>
              <p className="text-3xl font-serif text-[#F26A2E] mb-1">
                {events[0].spotsLeft}
                <span className="text-base text-[#FFFDF9]/40 font-sans ml-1">
                  / {events[0].spots} spots
                </span>
              </p>
              <SpotBar total={events[0].spots} left={events[0].spotsLeft} />
              <button className="mt-5 w-full bg-[#F26A2E] text-[#FFFDF9] text-sm font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-[#e0571c] transition-colors">
                Request Invite
              </button>
            </div>
          </div>
        </motion.div>
        </Link>

        {/* Grid of remaining events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.slice(1).map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 p-6 flex flex-col justify-between cursor-pointer hover:border-[#F26A2E]/40 transition-colors duration-300"
            >
              {/* Date badge */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-3xl font-serif text-[#F26A2E] leading-none">
                    {ev.date.day}
                  </p>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#FFFDF9]/40 mt-0.5">
                    {ev.date.month}
                  </p>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#F26A2E] border border-[#F26A2E]/30 rounded-full px-2.5 py-1">
                  {ev.type}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#FFFDF9] mb-1 leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-[#FFFDF9]/40 font-sans mb-3">
                  📍 {ev.location}
                </p>
                <p className="text-xs text-[#FFFDF9]/60 font-sans leading-relaxed line-clamp-2">
                  {ev.description}
                </p>
                <SpotBar total={ev.spots} left={ev.spotsLeft} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[#FFFDF9]/30 font-sans mt-10"
        >
          More events announced every month — only for passport holders.
        </motion.p>
      </div>
    </section>
  );
}
