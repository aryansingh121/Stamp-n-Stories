import { motion } from "framer-motion";

export function PassportSection() {
  const pillars = [
    { title: "Identity", desc: "Member code and verified profile." },
    { title: "Memory", desc: "Polaroids, notes, physical stories." },
    { title: "Access", desc: "Experiences unlock by earned stamps." },
    { title: "Trust", desc: "Behaviour builds platform credibility." },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#234A3C] text-[#F6F0E6] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
              The STAMP & STORIES PASSPORT
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-6 text-[#FFFDF9]">
              Not a ticket. Not a souvenir. A member identity that grows.
            </h3>
            <p className="text-[#F6F0E6]/80 text-lg leading-relaxed mb-10 max-w-lg">
              Members create their passport profile online, but cannot buy the physical passport
              directly. The physical passport is issued only when they show up at a verified offline
              StampNStories experience. Every stamp records a mission completed, a story earned and
              a respectful moment witnessed by the community.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 p-5 rounded-xl backdrop-blur-sm"
                >
                  <h4 className="font-serif font-bold text-lg mb-2 text-[#FFFDF9]">
                    {pillar.title}
                  </h4>
                  <p className="text-[#F6F0E6]/60 text-sm">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CSS Passport Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto" style={{ perspective: "1000px" }}>
              <motion.div
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative aspect-[3/4] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-[#FFFDF9]/15 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2820] via-[#1e3228] to-[#141e19]" />
                {/* Left accent bar */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F26A2E] via-[#F26A2E]/60 to-[#F26A2E]/20" />
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F26A2E]" />

                <div className="relative z-10 h-full flex flex-col justify-between p-8 pl-10">
                  {/* Header */}
                  <div>
                    <p className="font-bold tracking-[0.25em] text-xs text-[#F26A2E] uppercase mb-0.5">
                      STAMPNSTORIES
                    </p>
                    <p className="text-[#F6F0E6]/40 text-xs font-mono tracking-widest uppercase">
                      Community Passport
                    </p>
                  </div>

                  {/* Center */}
                  <div className="flex flex-col items-center py-6">
                    {/* Stamp circle */}
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F26A2E]/50" />
                      <div className="absolute inset-3 rounded-full border border-[#F6F0E6]/10" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl font-bold text-[#F6F0E6]">S&S</span>
                        <div className="w-8 h-px bg-[#F26A2E] my-1" />
                        <span className="text-[#F26A2E] text-[8px] font-bold tracking-[0.2em] uppercase">
                          Earned
                        </span>
                      </div>
                    </div>

                    {/* Pillars inline */}
                    <div className="grid grid-cols-2 gap-2 w-full mb-4">
                      {["Identity", "Memory", "Access", "Trust"].map((p) => (
                        <div
                          key={p}
                          className="bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 rounded px-3 py-2 text-center"
                        >
                          <span className="text-[#F6F0E6]/70 text-xs font-medium">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div>
                    <div className="w-full h-px bg-[#FFFDF9]/10 mb-4" />
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[#F6F0E6]/40 font-mono text-[8px] tracking-widest uppercase mb-0.5">
                          Passport ID
                        </p>
                        <p className="text-[#F6F0E6] font-mono text-xs tracking-widest">S&S-0001</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#F6F0E6]/40 font-mono text-[8px] tracking-widest uppercase mb-0.5">
                          Status
                        </p>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F26A2E]" />
                          <span className="text-[#F26A2E] font-bold text-[10px] tracking-widest uppercase">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 15 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute -right-4 -top-4 w-24 h-24 bg-[#F6F0E6] rounded-full border-2 border-dashed border-[#F26A2E] flex items-center justify-center shadow-lg"
              >
                <div className="flex flex-col items-center text-[#202124]">
                  <span className="text-[7px] font-bold tracking-widest uppercase">S&S</span>
                  <span className="font-serif font-bold text-base italic">Lifetime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
