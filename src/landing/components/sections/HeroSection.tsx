import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/landing/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-[#202124] overflow-hidden pt-20">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#F26A2E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#234A3C]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-block border border-[#F26A2E]/30 bg-[#F26A2E]/10 text-[#F26A2E] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
            Women-First Community
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#FFFDF9] leading-[1.1] mb-6">
            Building safer social hangout spaces for women.
          </h1>
          <p className="text-lg md:text-xl text-[#FFFDF9]/80 font-sans leading-relaxed mb-10 max-w-xl">
            A verified social community where members earn stamps through trips,
            meetups, house parties, movie nights and real-world stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/passport">
              <Button size="lg" className="w-full sm:w-auto bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white rounded-full px-8 h-14 text-base font-medium transition-all shadow-[0_0_20px_rgba(242,106,46,0.3)]">
                Apply for your passport
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#FFFDF9]/30 text-[#FFFDF9] hover:bg-[#FFFDF9]/10 rounded-full px-8 h-14 text-base font-medium backdrop-blur-sm transition-all"
              >
                How it works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Passport Card — CSS designed */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="relative w-full max-w-sm mx-auto" style={{ perspective: "1000px" }}>
            <motion.div
              initial={{ rotateY: -10, rotateX: 5 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-[#FFFDF9]/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Passport background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c1f] via-[#202124] to-[#141618]" />
              {/* Paper grain */}
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
              {/* Top header band */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#F26A2E]" />
              {/* Inner content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Header */}
                <div>
                  <p className="text-[#F26A2E] font-bold tracking-[0.3em] text-xs uppercase mb-1">STAMPNSTORIES</p>
                  <p className="text-[#FFFDF9]/40 text-xs tracking-widest font-mono uppercase">Community Passport</p>
                </div>
                {/* Center monogram */}
                <div className="flex flex-col items-center justify-center flex-1 py-8">
                  <div className="relative w-36 h-36 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F26A2E]/40 animate-spin" style={{ animationDuration: "20s" }} />
                    <div className="absolute inset-3 rounded-full border border-[#F6F0E6]/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-serif text-4xl font-bold text-[#FFFDF9]">S&S</span>
                      <div className="w-8 h-px bg-[#F26A2E] my-1" />
                      <span className="text-[#F26A2E] text-[9px] font-bold tracking-[0.2em] uppercase">Lifetime</span>
                    </div>
                  </div>
                  <p className="font-serif text-2xl text-[#FFFDF9] text-center leading-snug">
                    One passport.<br />Many stories.
                  </p>
                </div>
                {/* Footer */}
                <div>
                  <div className="w-full h-px bg-[#FFFDF9]/10 mb-4" />
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#FFFDF9]/40 font-mono text-[9px] tracking-widest uppercase mb-0.5">Passport ID</p>
                      <p className="text-[#F6F0E6] font-mono text-sm tracking-widest">S&S-0001</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FFFDF9]/40 font-mono text-[9px] tracking-widest uppercase mb-0.5">Status</p>
                      <p className="text-[#F26A2E] font-bold text-xs tracking-widest uppercase">Verified</p>
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
              className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#F6F0E6] rounded-full border-2 border-dashed border-[#F26A2E] flex items-center justify-center shadow-lg"
            >
              <div className="w-24 h-24 rounded-full border border-[#202124]/20 flex flex-col items-center justify-center text-[#202124]">
                <span className="text-[8px] font-bold tracking-widest uppercase">Verified</span>
                <span className="font-serif font-bold text-lg italic">Earned</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
