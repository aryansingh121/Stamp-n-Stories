import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { Button } from "@/landing/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Compass, Users, Sparkles, Shield, HeartHandshake } from "lucide-react";

export function VisionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Vision | Stamp N Stories";
  }, []);

  const beliefs = [
    {
      num: "01",
      title: "PEOPLE OVER NUMBERS",
      icon: Users,
      body: "A meaningful community is not built by filling seats. We care about who is in the room, how they show up and how they make others feel.",
    },
    {
      num: "02",
      title: "EXPERIENCE OVER CHECKLISTS",
      icon: Compass,
      body: "We don't want people rushing from one tourist spot to another. We want experiences that slow people down enough to notice, participate and remember.",
    },
    {
      num: "03",
      title: "PARTICIPATION OVER SPECTATING",
      icon: Sparkles,
      body: "You shouldn't have to be the loudest person in the room to belong. There should be space to participate in your own way.",
    },
    {
      num: "04",
      title: "COMFORT IS PART OF THE EXPERIENCE",
      icon: Shield,
      body: "Adventure and comfort don't have to compete. We want people to feel safe, respected and comfortable enough to genuinely enjoy the experience.",
    },
    {
      num: "05",
      title: "STORIES OVER CONTENT",
      icon: HeartHandshake,
      body: "Not everything needs to become a post. Some moments are valuable because they are experienced, remembered and shared between the people who were there.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-[#202124]">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 bg-[#FFFDF9] border-b border-[#202124]/6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#F26A2E] mb-4"
            >
              OUR VISION
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#202124] leading-[1.1] tracking-tight mb-8"
            >
              We’re Building a Better Way to Belong.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#202124]/80 font-sans max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Stamp N Stories exists to create experiences where people don't just visit places —
              they connect with them, with each other, and with themselves.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-[#202124]/60 font-sans max-w-xl mx-auto italic leading-relaxed"
            >
              Travel should leave you with more than photographs. It should leave you with stories,
              perspective, people and something worth remembering.
            </motion.p>
          </div>
        </section>

        {/* 2. THE PROBLEM WE SEE */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#234A3C] text-[#FFFDF9]">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                  The Shift
                </p>
                <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                  Travel Has Become Too Predictable.
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#FFFDF9]/85 font-sans leading-relaxed"
              >
                <p>
                  Too often, travel is reduced to checklists, crowded itineraries and temporary
                  connections.
                </p>
                <p className="text-[#FFFDF9] font-medium font-serif italic text-xl md:text-2xl">
                  We believe there is another way.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A2E] mt-2.5 shrink-0" />
                    <span>A way where the destination matters, but the people matter too.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A2E] mt-2.5 shrink-0" />
                    <span>Where participation matters more than attendance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A2E] mt-2.5 shrink-0" />
                    <span>Where comfort matters as much as adventure.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A2E] mt-2.5 shrink-0" />
                    <span>
                      Where memories are created through experiences rather than consumed through
                      screens.
                    </span>
                  </li>
                </ul>
                <p className="pt-2 text-[#FFFDF9]/90 border-t border-[#FFFDF9]/15">
                  We want to move away from &ldquo;just another trip&rdquo; and create experiences
                  that people genuinely become part of.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. OUR VISION */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F6F0E6] text-[#202124]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                Core Purpose
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-8">Our Vision</h2>

              <p className="text-xl md:text-2xl font-serif italic text-[#202124] max-w-2xl mx-auto leading-snug mb-10">
                To build a community where travel becomes a way to connect, participate and belong.
              </p>

              <div className="p-8 md:p-12 rounded-2xl bg-[#FFFDF9] border border-[#202124]/10 shadow-sm max-w-3xl mx-auto text-left space-y-5">
                <p className="text-xs font-bold tracking-widest uppercase text-[#202124]/50 font-sans">
                  The Foundation
                </p>
                <p className="text-lg md:text-xl font-serif text-[#202124]">
                  Stamp N Stories is being built around a simple idea:
                </p>
                <p className="text-2xl md:text-3xl font-serif text-[#F26A2E] font-medium italic">
                  Every experience should leave a stamp.
                </p>
                <p className="text-base text-[#202124]/75 font-sans leading-relaxed">
                  Not just a physical stamp in a passport, but a mark created through the people you
                  meet, the places you understand, the challenges you take on and the stories you
                  carry home.
                </p>
                <p className="text-base text-[#202124]/75 font-sans leading-relaxed pt-3 border-t border-[#202124]/10">
                  We envision a world where people travel with curiosity, communities are built with
                  intention, and every experience has meaning beyond the itinerary.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. WHAT WE BELIEVE */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FFFDF9]">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                Our Values
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-4">
                What We Believe.
              </h2>
              <p className="text-base text-[#202124]/65 font-sans">
                Five non-negotiable principles that shape how we design every moment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {beliefs.map((b, i) => (
                <motion.div
                  key={b.num}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-8 rounded-2xl bg-[#F6F0E6]/60 border border-[#202124]/8 flex flex-col justify-between hover:border-[#F26A2E]/40 hover:bg-[#F6F0E6] transition-all duration-300 ${
                    i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-sm font-bold tracking-wider text-[#F26A2E]">
                        {b.num}
                      </span>
                      <b.icon className="w-5 h-5 text-[#202124]/40" />
                    </div>
                    <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-[#202124] mb-4 leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#202124]/75 font-sans leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. THE STAMP PHILOSOPHY */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#202124] text-[#FFFDF9] relative overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                  The Stamp Philosophy
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9] leading-tight mb-8">
                  A Stamp Is More Than a Mark.
                </h2>

                <div className="space-y-6 text-base md:text-lg text-[#FFFDF9]/85 font-sans leading-relaxed">
                  <p>
                    At Stamp N Stories, a stamp represents something you experienced, contributed
                    to or became part of.
                  </p>
                  <p className="font-serif italic text-xl md:text-2xl text-[#FFFDF9] border-l-2 border-[#F26A2E] pl-4 my-4">
                    You don't earn it by simply showing up.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-[#F26A2E] flex items-center justify-center text-[10px] text-[#F26A2E]">
                        ✓
                      </span>
                      <span>You earn it through participation.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-[#F26A2E] flex items-center justify-center text-[10px] text-[#F26A2E]">
                        ✓
                      </span>
                      <span>Through curiosity.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-[#F26A2E] flex items-center justify-center text-[10px] text-[#F26A2E]">
                        ✓
                      </span>
                      <span>Through connection.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-[#F26A2E] flex items-center justify-center text-[10px] text-[#F26A2E]">
                        ✓
                      </span>
                      <span>Through moments that become part of your story.</span>
                    </div>
                  </div>

                  <p className="pt-4 text-[#FFFDF9] font-medium">
                    Every stamp should have a story behind it.
                  </p>
                  <p className="text-[#FFFDF9]/70 italic">
                    And every story should belong to the person who lived it.
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Reusable Passport Card Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative w-full max-w-sm mx-auto" style={{ perspective: "1000px" }}>
                  <div className="relative aspect-[3/4] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-[#FFFDF9]/15 overflow-hidden bg-gradient-to-br from-[#1a2820] via-[#1e3228] to-[#141e19]">
                    {/* Left & top accent borders */}
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F26A2E] via-[#F26A2E]/60 to-[#F26A2E]/20" />
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F26A2E]" />

                    <div className="relative z-10 h-full flex flex-col justify-between p-8 pl-10 text-[#F6F0E6]">
                      {/* Card Header */}
                      <div>
                        <p className="font-bold tracking-[0.25em] text-xs text-[#F26A2E] uppercase mb-0.5">
                          STAMPNSTORIES
                        </p>
                        <p className="text-[#F6F0E6]/65 text-xs font-mono tracking-widest uppercase">
                          Community Passport
                        </p>
                      </div>

                      {/* Card Center Stamp */}
                      <div className="flex flex-col items-center py-4">
                        <div className="relative w-32 h-32 mb-6">
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F26A2E]/60 animate-[spin_60s_linear_infinite]" />
                          <div className="absolute inset-3 rounded-full border border-[#F6F0E6]/15" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-serif text-3xl font-bold text-[#F6F0E6]">SnS</span>
                            <div className="w-8 h-px bg-[#F26A2E] my-1" />
                            <span className="text-[#F26A2E] text-[8px] font-bold tracking-[0.2em] uppercase">
                              Earned
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full">
                          {["Participation", "Curiosity", "Connection", "Stories"].map((val) => (
                            <div
                              key={val}
                              className="bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 rounded px-2.5 py-1.5 text-center"
                            >
                              <span className="text-[#F6F0E6]/80 text-[11px] font-medium">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div>
                        <div className="w-full h-px bg-[#FFFDF9]/10 mb-4" />
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[#F6F0E6]/40 font-mono text-[8px] tracking-widest uppercase mb-0.5">
                              Passport ID
                            </p>
                            <p className="text-[#F6F0E6] font-mono text-xs tracking-widest">SnS-0001</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#F6F0E6]/40 font-mono text-[8px] tracking-widest uppercase mb-0.5">
                              Status
                            </p>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#F26A2E]" />
                              <span className="text-[#F26A2E] font-bold text-[10px] tracking-widest uppercase">
                                Verified
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. WHERE WE ARE GOING */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F6F0E6] text-[#202124]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                The Roadmap
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-8">
                Where We're Going.
              </h2>

              <div className="space-y-6 text-base md:text-lg text-[#202124]/80 font-sans max-w-2xl mx-auto leading-relaxed">
                <p className="text-xl md:text-2xl font-serif text-[#202124] leading-snug">
                  We are starting with experiences.
                  <br />
                  <span className="italic text-[#F26A2E]">But the vision is bigger than trips.</span>
                </p>

                <p>
                  We want to build a community that brings together people, places, creators, brands
                  and experiences that share the same values.
                </p>

                <p>
                  From intimate journeys and city experiences to collaborations, community gatherings
                  and new formats we haven't imagined yet — Stamp N Stories will continue to explore
                  new ways for people to connect.
                </p>

                <div className="pt-6 border-t border-[#202124]/10 space-y-2">
                  <p className="text-sm font-sans tracking-wide text-[#202124]/60 uppercase">
                    The destination may change.
                  </p>
                  <p className="text-sm font-sans tracking-wide text-[#202124]/60 uppercase">
                    The format may change.
                  </p>
                  <p className="text-sm font-sans tracking-wide text-[#202124]/60 uppercase">
                    The idea stays the same:
                  </p>
                  <p className="text-2xl md:text-3xl font-serif text-[#202124] font-medium pt-2">
                    Create experiences worth remembering.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. CLOSING STATEMENT */}
        <section className="py-24 md:py-36 px-6 md:px-12 bg-[#234A3C] text-[#FFFDF9] text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="space-y-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-[#FFFDF9]/90">
                <p>Travel somewhere.</p>
                <p>Meet someone.</p>
                <p>Do something different.</p>
                <p className="italic text-[#FFFDF9]">Leave with a story.</p>
              </div>

              <div className="pt-8">
                <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] uppercase text-[#F26A2E]">
                  <span>STAMP IT.</span>
                  <span className="text-[#FFFDF9]/30">·</span>
                  <span>LIVE IT.</span>
                  <span className="text-[#FFFDF9]/30">·</span>
                  <span>REMEMBER IT.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#FFFDF9] border-t border-[#202124]/8 text-center">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-4">
                Ready to create your next story?
              </h2>
              <p className="text-base md:text-lg text-[#202124]/70 font-sans max-w-xl mx-auto mb-10">
                Explore the experiences we're building and find your next stamp.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/events">
                  <Button className="w-full sm:w-auto rounded-full px-8 py-6 text-xs font-bold tracking-widest uppercase bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white border-transparent shadow-sm">
                    EXPLORE EXPERIENCES →
                  </Button>
                </Link>
                <Link to="/passport">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-full px-8 py-6 text-xs font-bold tracking-widest uppercase border-[#202124]/20 text-[#202124] hover:bg-[#202124]/5"
                  >
                    APPLY FOR PASSPORT →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
