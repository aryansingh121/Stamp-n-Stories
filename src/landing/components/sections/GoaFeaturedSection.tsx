import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/landing/components/ui/button";
import { Calendar, MapPin, Clock, Users, IndianRupee, Sparkles, Waves, Compass, Heart } from "lucide-react";

export function GoaFeaturedSection() {
  const eventDetails = [
    {
      label: "DATE",
      value: "15 SEP · 25 SEP 2026",
      icon: Calendar,
    },
    {
      label: "LOCATION",
      value: "South Goa",
      icon: MapPin,
    },
    {
      label: "DURATION",
      value: "Day 0 + 3 Days",
      icon: Clock,
    },
    {
      label: "GROUP SIZE",
      value: "14 People Only",
      icon: Users,
    },
    {
      label: "PRICE",
      value: "₹22,999 / person",
      icon: IndianRupee,
    },
  ];

  const highlights = [
    {
      tag: "LOCAL GOA",
      desc: "Experience local stories, food and places beyond the usual tourist checklist.",
      icon: Compass,
    },
    {
      tag: "SILENT BEACH WALK",
      desc: "A 30-minute phones-down beach experience focused on slowing down and noticing your surroundings.",
      icon: Waves,
    },
    {
      tag: "NATURE & WATER",
      desc: "Guided nature experience, waterfall trek and backwater kayaking with appropriate safety measures.",
      icon: Sparkles,
    },
    {
      tag: "SHARED EXPERIENCES",
      desc: "Group cookout, meaningful conversations, pottery, reflection and a closing memory ritual.",
      icon: Heart,
    },
  ];

  const itineraryDays = [
    {
      day: "DAY 0",
      title: "Road to Goa",
      desc: "Overnight road journey from the departure city, passport briefing, group introduction and the first community challenge.",
    },
    {
      day: "DAY 1",
      title: "Roots",
      desc: "Local Goa, authentic local meal, Portuguese lanes, sunset and a shared villa cookout.",
    },
    {
      day: "DAY 2",
      title: "Wild + Fire",
      desc: "Silent beach walk, nature trek, local lunch, backwater kayaking, sunset and evening challenges.",
    },
    {
      day: "DAY 3",
      title: "Susegad",
      desc: "Slow morning, pottery workshop, memory exchange, final ritual and departure.",
    },
  ];

  return (
    <section id="featured-event" className="py-24 md:py-32 bg-[#F6F0E6] text-[#202124] border-y border-[#202124]/10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* TOP SHOWCASE */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Main Info & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#F26A2E] mb-3">
                UPCOMING EXPERIENCE
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#202124] leading-[1.1] tracking-tight mb-4">
                Goa Uncovered
              </h2>
              <p className="text-lg md:text-xl font-serif italic text-[#202124]/85 leading-relaxed mb-6">
                Three days of slow mornings, curated experiences, local stories and a Goa worth remembering.
              </p>

              {/* Mobile Image: Only shown on small screens right after heading */}
              <div className="block lg:hidden my-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#202124] shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"
                    alt="Goa Uncovered"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFDF9] font-sans">
                    <span className="font-bold uppercase tracking-wider">14 People Only</span>
                    <span className="text-[#F26A2E] font-bold uppercase tracking-wider bg-[#FFFDF9]/95 px-2.5 py-0.5 rounded-full">
                      Applications Open
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="space-y-4 text-base md:text-lg text-[#202124]/80 font-sans leading-relaxed mb-8">
                <p className="font-serif italic text-[#202124] text-xl font-medium">
                  A slower side of Goa.
                </p>
                <p>
                  Goa Uncovered is a curated three-day experience built around local stories,
                  meaningful participation, nature, shared meals and unhurried moments.
                </p>
                <p>
                  From local Goa and Portuguese lanes to quiet beaches, backwaters, a guided nature
                  experience, pottery and shared rituals — the itinerary is designed to help you
                  experience Goa rather than simply visit it.
                </p>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 p-5 rounded-2xl bg-[#FFFDF9] border border-[#202124]/10 mb-8">
                {eventDetails.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#202124]/50 font-sans">
                      {item.label}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#202124] font-sans">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop CTA Buttons */}
              <div className="hidden sm:flex flex-wrap items-center gap-4">
                <Link to="/events/goa-susegad">
                  <Button className="rounded-full px-7 py-5 text-xs font-bold tracking-widest uppercase bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white border-transparent shadow-sm">
                    VIEW GOA EXPERIENCE →
                  </Button>
                </Link>
                <Link to="/events/goa-susegad/request-invite">
                  <Button
                    variant="outline"
                    className="rounded-full px-7 py-5 text-xs font-bold tracking-widest uppercase border-[#202124]/20 text-[#202124] hover:bg-[#202124]/5"
                  >
                    REQUEST INVITE →
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Desktop Visual & Prominent Availability Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex lg:col-span-5 flex-col gap-5 sticky top-28"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#202124] shadow-xl border border-[#202124]/10 group">
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"
                alt="Goa Uncovered"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-[#F26A2E] px-3 py-1 rounded-full shadow-sm">
                  GOA UNCOVERED
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 bg-[#202124]/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                  SOUTH GOA
                </span>
              </div>
            </div>

            {/* Availability Block */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#202124]/10 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-[#202124]/8">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#202124]/50 font-sans">
                    CAPACITY
                  </p>
                  <p className="text-base font-bold text-[#202124] font-sans">
                    14 PEOPLE ONLY
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#F26A2E] bg-[#F26A2E]/10 border border-[#F26A2E]/20 px-3 py-1 rounded-full font-sans">
                    Applications Open
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#202124]/50 font-sans">
                    DATES
                  </p>
                  <p className="text-xs font-bold text-[#202124] font-sans">
                    15 SEP · 25 SEP 2026
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#202124]/50 font-sans">
                    TRIP PRICE
                  </p>
                  <p className="text-base font-serif font-bold text-[#202124]">
                    ₹22,999 <span className="text-xs font-sans font-normal text-[#202124]/60">/ person</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HIGHLIGHTS: "What to expect" */}
        <div className="mt-20 pt-16 border-t border-[#202124]/10">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#F26A2E] mb-2 font-sans">
              WHAT TO EXPECT
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#202124]">
              Moments crafted for presence and connection.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((h, idx) => (
              <motion.div
                key={h.tag}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#202124]/8 hover:border-[#F26A2E]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#F6F0E6] flex items-center justify-center text-[#F26A2E]">
                    <h.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-[#202124]">
                    {h.tag}
                  </h4>
                </div>
                <p className="text-sm text-[#202124]/75 font-sans leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ITINERARY PREVIEW: "A GLIMPSE OF THE JOURNEY" */}
        <div className="mt-16 pt-16 border-t border-[#202124]/10">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#F26A2E] mb-2 font-sans">
              A GLIMPSE OF THE JOURNEY
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#202124]">
              Four days designed around stories, nature and pause.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {itineraryDays.map((d, idx) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#202124]/8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#F26A2E] tracking-wider">
                      {d.day}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#202124] mb-2">
                    {d.title}
                  </h4>
                  <p className="text-xs text-[#202124]/70 font-sans leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE AVAILABILITY & CTAS */}
        <div className="block sm:hidden mt-12 pt-8 border-t border-[#202124]/10 space-y-6">
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#202124]/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#202124] font-sans">14 PEOPLE ONLY</span>
              <span className="text-[11px] font-bold text-[#F26A2E] uppercase tracking-wider bg-[#F26A2E]/10 px-2 py-0.5 rounded-full">
                Applications Open
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-[#202124]/75 font-sans pt-2 border-t border-[#202124]/8">
              <span>15 SEP · 25 SEP 2026</span>
              <span className="font-bold text-[#202124]">₹22,999 / person</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/events/goa-susegad">
              <Button className="w-full rounded-full py-5 text-xs font-bold tracking-widest uppercase bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white">
                VIEW GOA EXPERIENCE →
              </Button>
            </Link>
            <Link to="/events/goa-susegad/request-invite">
              <Button
                variant="outline"
                className="w-full rounded-full py-5 text-xs font-bold tracking-widest uppercase border-[#202124]/20 text-[#202124]"
              >
                REQUEST INVITE →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
