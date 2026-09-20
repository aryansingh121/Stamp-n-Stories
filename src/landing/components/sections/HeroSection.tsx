import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/landing/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative z-10 flex items-center justify-center bg-[#202124] overflow-x-clip pt-[88px] pb-6 lg:pb-8 min-h-[100svh] lg:h-[100svh]">
      {/* Background glow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#F26A2E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#234A3C]/30 rounded-full blur-3xl" />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Soft natural cream dissolve transition */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-[1px] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[230px] xl:h-[260px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(246, 240, 230, 0) 0%, rgba(246, 240, 230, 0.02) 20%, rgba(246, 240, 230, 0.06) 35%, rgba(246, 240, 230, 0.14) 50%, rgba(246, 240, 230, 0.28) 65%, rgba(246, 240, 230, 0.50) 78%, rgba(246, 240, 230, 0.75) 88%, rgba(246, 240, 230, 0.92) 95%, #F6F0E6 100%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 z-10 relative h-full flex items-center">
        <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,410px)] xl:grid-cols-[minmax(0,1.2fr)_minmax(370px,430px)] gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[640px] xl:max-w-[680px]"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#F26A2E]/30 bg-[#F26A2E]/10 text-[#F26A2E] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3.5 lg:mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              INDIA’S WOMEN-FIRST SOCIAL COMMUNITY
            </div>

            {/* Heading with Go Out / More. line break */}
            <h1 className="text-5xl sm:text-6xl lg:text-[clamp(3.25rem,4.5vw,5rem)] xl:text-[clamp(3.75rem,5.2vw,5.75rem)] font-serif font-bold text-[#FFFDF9] leading-[0.96] tracking-tight mb-2 lg:mb-2.5">
              Go Out<br />More.
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl sm:text-3xl lg:text-[clamp(1.5rem,2vw,2.25rem)] xl:text-3xl font-serif italic text-[#FFFDF9]/75 leading-[1.15] mb-3.5 lg:mb-4.5">
              Overthink the <span className="text-[#F26A2E]">Crowd</span> Less.
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[clamp(0.95rem,1.1vw,1.05rem)] text-[#FFFDF9]/85 font-sans leading-relaxed mb-3 lg:mb-3.5 max-w-xl lg:max-w-2xl">
              Curated trips, city hangouts and uncommon experiences where participants are
              passport-reviewed, boundaries are respected, and every experience becomes a stamp in your
              passport.
            </p>

            {/* Supporting text */}
            <p className="text-xs sm:text-sm lg:text-base text-[#FFFDF9]/70 font-sans leading-relaxed mb-5 lg:mb-6 max-w-xl lg:max-w-2xl">
              Building safer social hangout spaces for women.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 lg:gap-4">
              <Link to="/passport">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white rounded-full px-7 sm:px-8 h-12 sm:h-13 lg:h-13 text-sm sm:text-base font-medium transition-all shadow-[0_0_25px_rgba(242,106,46,0.35)]"
                >
                  Apply to Join
                </Button>
              </Link>
              <Link to="/safety">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-[#FFFDF9]/30 text-[#FFFDF9] hover:bg-[#FFFDF9]/10 rounded-full px-7 sm:px-8 h-12 sm:h-13 lg:h-13 text-sm sm:text-base font-medium backdrop-blur-sm transition-all"
                >
                  How we keep it safe
                </Button>
              </Link>
            </div>

            {/* Feature badges */}
            <div className="mt-5 lg:mt-6 flex flex-wrap gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#FFFDF9]/60">
              {["Passport review", "Experience criteria", "Confidence · Freedom · Safety"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#FFFDF9]/10 bg-[#FFFDF9]/5 px-3 py-1.5"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right column: Passport Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative perspective-1000 flex justify-center lg:justify-end xl:justify-center mt-10 lg:mt-0"
          >
            <div
              className="relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[370px] xl:max-w-[410px] mx-auto lg:mr-0 xl:mx-auto"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                initial={{ rotateY: -10, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_35px_70px_rgba(0,0,0,0.6)] border border-[#FFFDF9]/10"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Passport background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c1f] via-[#202124] to-[#141618]" />
                {/* Paper grain */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                  }}
                />
                {/* Top header band */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#F26A2E]" />
                {/* Inner content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7 xl:p-8">
                  {/* Header */}
                  <div>
                    <p className="text-[#F26A2E] font-bold tracking-[0.3em] text-xs uppercase mb-1">
                      STAMPNSTORIES
                    </p>
                    <p className="text-[#FFFDF9]/40 text-xs tracking-widest font-mono uppercase">
                      Community Passport
                    </p>
                  </div>
                  {/* Center monogram */}
                  <div className="flex flex-col items-center justify-center flex-1 py-3 sm:py-4 xl:py-5">
                    <div className="relative w-26 h-26 sm:w-28 sm:h-28 xl:w-34 xl:h-34 mb-3 sm:mb-4 xl:mb-5">
                      <div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-[#F26A2E]/40 animate-spin"
                        style={{ animationDuration: "20s" }}
                      />
                      <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-[#F6F0E6]/10" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF9]">SnS</span>
                        <div className="w-8 h-px bg-[#F26A2E] my-1" />
                        <span className="text-[#F26A2E] text-[9px] font-bold tracking-[0.2em] uppercase">
                          Lifetime
                        </span>
                      </div>
                    </div>
                    <p className="font-serif text-lg sm:text-xl xl:text-2xl text-[#FFFDF9] text-center leading-snug">
                      One passport.
                      <br />
                      Many stories.
                    </p>
                  </div>
                  {/* Footer */}
                  <div>
                    <div className="w-full h-px bg-[#FFFDF9]/10 mb-3 sm:mb-4" />
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[#FFFDF9]/40 font-mono text-[9px] tracking-widest uppercase mb-0.5">
                          Passport ID
                        </p>
                        <p className="text-[#F6F0E6] font-mono text-xs sm:text-sm tracking-widest">SnS-0001</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#FFFDF9]/40 font-mono text-[9px] tracking-widest uppercase mb-0.5">
                          Status
                        </p>
                        <p className="text-[#F26A2E] font-bold text-xs tracking-widest uppercase">
                          Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stamp badge */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 xl:-right-5 xl:-bottom-5 w-22 h-22 sm:w-24 sm:h-24 xl:w-26 xl:h-26 bg-[#F6F0E6] rounded-full border-2 border-dashed border-[#F26A2E] flex items-center justify-center shadow-lg pointer-events-none"
              >
                <div className="w-[82%] h-[82%] rounded-full border border-[#202124]/20 flex flex-col items-center justify-center text-[#202124]">
                  <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase">Verified</span>
                  <span className="font-serif font-bold text-sm sm:text-base italic">Earned</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
