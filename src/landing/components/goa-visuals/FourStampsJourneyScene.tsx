import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

const ZONES = [
  {
    id: "roots",
    title: "ROOTS",
    meaning: "Curiosity & Connection",
    accent: "#234A3C",
    bgClass: "bg-[#F6F0E6]",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Hills */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <path d="M0,800 Q250,700 500,800 T1000,750 L1000,1000 L0,1000 Z" fill="#234A3C" />
          <path d="M0,850 Q300,750 600,900 T1000,850 L1000,1000 L0,1000 Z" fill="#202124" />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          {/* SVG Illustration */}
          <svg className="w-64 h-64 md:w-80 md:h-80 mb-8" viewBox="0 0 200 200" overflow="visible">
            {/* House */}
            <path d="M 50 120 L 50 180 L 150 180 L 150 120 Z" fill="#7B5E3A" />
            <path d="M 40 120 L 100 70 L 160 120 Z" fill="#234A3C" />
            {/* Door */}
            <rect x="90" y="140" width="20" height="40" fill="#202124" opacity="0.8" />
            {/* Cooking Pot & Fire */}
            <circle cx="170" cy="170" r="10" fill="#202124" />
            <path d="M 165 180 L 170 160 L 175 180 Z" fill="#F26A2E" />
            <path d="M 160 180 L 165 165 L 170 180 Z" fill="#F26A2E" opacity="0.7" />
            {/* Bicycle (abstract) */}
            <circle cx="30" cy="170" r="12" stroke="#234A3C" strokeWidth="2" fill="none" />
            <circle cx="70" cy="170" r="12" stroke="#234A3C" strokeWidth="2" fill="none" />
            <path d="M 30 170 L 50 150 L 70 170 M 50 150 L 60 140" stroke="#234A3C" strokeWidth="2" fill="none" />
            {/* Palm Trees */}
            <path d="M 180 180 Q 190 120 185 80" stroke="#7B5E3A" strokeWidth="4" fill="none" />
            <path d="M 185 80 Q 160 70 150 90 M 185 80 Q 180 50 195 60 M 185 80 Q 210 70 215 90" stroke="#234A3C" strokeWidth="3" fill="none" />
          </svg>
          <h2 className="text-2xl font-serif text-[#234A3C] mb-2">ROOTS</h2>
          <p className="text-xs uppercase tracking-widest text-[#202124]">Curiosity & Connection</p>
        </div>
      </div>
    )
  },
  {
    id: "wild",
    title: "WILD",
    meaning: "Attention & Courage",
    accent: "#202124",
    bgClass: "bg-[#F6F0E6]",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Forest/Cliffs */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <path d="M0,600 L300,500 L500,700 L800,400 L1000,600 L1000,1000 L0,1000 Z" fill="#202124" />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <svg className="w-64 h-64 md:w-80 md:h-80 mb-8" viewBox="0 0 200 200" overflow="visible">
            {/* Coastline */}
            <path d="M 10 180 Q 50 170 100 180 T 190 180" stroke="#234A3C" strokeWidth="4" fill="none" />
            {/* Cliff */}
            <path d="M 10 180 L 10 50 L 60 70 L 80 120 L 100 180 Z" fill="#202124" opacity="0.9" />
            {/* Waterfall */}
            <path d="M 45 70 L 45 170 M 50 75 L 50 175 M 55 72 L 55 172" stroke="#FFFDF9" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M 40 170 Q 50 160 60 170" stroke="#FFFDF9" strokeWidth="2" fill="none" />
            {/* Trail */}
            <path d="M 100 180 Q 120 150 150 160 T 180 120" stroke="#7B5E3A" strokeWidth="3" strokeDasharray="6 4" fill="none" />
            {/* Tree silhouettes */}
            <path d="M 150 160 L 150 130 M 140 145 L 150 130 L 160 145" stroke="#234A3C" strokeWidth="3" fill="none" />
            <path d="M 180 120 L 180 90 M 170 105 L 180 90 L 190 105" stroke="#234A3C" strokeWidth="3" fill="none" />
          </svg>
          <h2 className="text-2xl font-serif text-[#202124] mb-2">WILD</h2>
          <p className="text-xs uppercase tracking-widest text-[#234A3C]">Attention & Courage</p>
        </div>
      </div>
    )
  },
  {
    id: "fire",
    title: "FIRE",
    meaning: "Honesty & Listening",
    accent: "#F26A2E",
    bgClass: "bg-[#F6F0E6]",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Sunset Gradient */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#F26A2E]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <svg className="w-64 h-64 md:w-80 md:h-80 mb-8" viewBox="0 0 200 200" overflow="visible">
            {/* Sun */}
            <circle cx="100" cy="100" r="40" fill="#F26A2E" opacity="0.8" />
            {/* Water */}
            <path d="M 20 140 Q 50 135 100 140 T 180 140" stroke="#7B5E3A" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 10 155 Q 60 150 100 155 T 190 155" stroke="#7B5E3A" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 0 170 Q 50 165 100 170 T 200 170" stroke="#7B5E3A" strokeWidth="3" fill="none" />
            {/* Kayak */}
            <path d="M 130 160 Q 150 170 170 160 Q 150 165 130 160 Z" fill="#202124" />
            <path d="M 140 155 L 160 165" stroke="#202124" strokeWidth="2" fill="none" />
            {/* Campfire */}
            <path d="M 40 170 L 50 160 L 60 170 Z" fill="#F26A2E" />
            <path d="M 45 170 L 50 150 L 55 170 Z" fill="#F26A2E" opacity="0.7" />
            <path d="M 35 172 L 65 172" stroke="#234A3C" strokeWidth="3" fill="none" />
            {/* Question cards */}
            <rect x="70" y="175" width="10" height="14" transform="rotate(-15 70 175)" fill="#FFFDF9" stroke="#7B5E3A" strokeWidth="1" />
            <rect x="85" y="172" width="10" height="14" transform="rotate(10 85 172)" fill="#FFFDF9" stroke="#7B5E3A" strokeWidth="1" />
          </svg>
          <h2 className="text-2xl font-serif text-[#F26A2E] mb-2">FIRE</h2>
          <p className="text-xs uppercase tracking-widest text-[#7B5E3A]">Honesty & Listening</p>
        </div>
      </div>
    )
  },
  {
    id: "susegad",
    title: "SUSEGAD",
    meaning: "Presence & Community",
    accent: "#7B5E3A",
    bgClass: "bg-[#F6F0E6]",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Morning Light */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F6F0E6] to-[#7B5E3A]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <svg className="w-64 h-64 md:w-80 md:h-80 mb-8" viewBox="0 0 200 200" overflow="visible">
            {/* Light Rays */}
            <path d="M 100 80 L 100 20 M 100 80 L 150 40 M 100 80 L 50 40 M 100 80 L 170 80 M 100 80 L 30 80" stroke="#F26A2E" strokeWidth="2" strokeDasharray="5 5" fill="none" opacity="0.5" />
            {/* Pottery Wheel */}
            <ellipse cx="100" cy="140" rx="30" ry="10" fill="#7B5E3A" opacity="0.8" />
            <path d="M 90 135 Q 100 110 110 135 Z" fill="#F26A2E" opacity="0.9" />
            {/* Group Silhouette */}
            <circle cx="150" cy="145" r="5" fill="#202124" />
            <path d="M 145 160 Q 150 150 155 160 Z" fill="#202124" />
            <circle cx="165" cy="150" r="5" fill="#202124" />
            <path d="M 160 165 Q 165 155 170 165 Z" fill="#202124" />
            <circle cx="135" cy="150" r="5" fill="#202124" />
            <path d="M 130 165 Q 135 155 140 165 Z" fill="#202124" />
            {/* Passport Book */}
            <rect x="40" y="140" width="20" height="28" fill="#234A3C" transform="rotate(-10 40 140)" />
            <circle cx="50" cy="154" r="4" fill="#F6F0E6" opacity="0.8" />
            {/* Memory Cards */}
            <rect x="30" y="165" width="12" height="8" fill="#FFFDF9" stroke="#7B5E3A" strokeWidth="1" transform="rotate(20 30 165)" />
            <rect x="50" y="170" width="12" height="8" fill="#FFFDF9" stroke="#7B5E3A" strokeWidth="1" transform="rotate(-15 50 170)" />
          </svg>
          <h2 className="text-2xl font-serif text-[#7B5E3A] mb-2">SUSEGAD</h2>
          <p className="text-xs uppercase tracking-widest text-[#202124]">Presence & Community</p>
        </div>
      </div>
    )
  }
];

export function FourStampsJourneyScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#F6F0E6] md:h-[400vh] h-auto"
    >
      {/* Desktop Sticky Container */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden flex-col items-center justify-center">
        
        {/* Header */}
        <div className="absolute top-12 left-0 w-full text-center z-50">
          <p className="text-xs uppercase tracking-widest text-[#F26A2E] font-semibold mb-4">THE PASSPORT JOURNEY</p>
          <div className="flex justify-center gap-4">
            {ZONES.map((zone, i) => (
              <ZoneDot key={`dot-${i}`} zone={zone} index={i} smoothProgress={smoothProgress} />
            ))}
          </div>
        </div>

        {/* Sliding Content */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-[400vw] flex"
          style={prefersReduced ? {} : { x: xTransform }}
        >
          {/* Continuous Connecting Path Line */}
          <div className="absolute top-1/2 left-0 w-full h-0 z-0 hidden md:block">
            <svg className="w-full h-24 -mt-12 overflow-visible" preserveAspectRatio="none">
              <motion.path 
                d="M 0 50 Q 50vw 100 100vw 50 T 200vw 50 T 300vw 50 T 400vw 50" 
                stroke="#202124" 
                strokeWidth="2" 
                strokeDasharray="8 8"
                fill="none" 
                opacity="0.1"
              />
              <motion.path 
                d="M 0 50 Q 50vw 100 100vw 50 T 200vw 50 T 300vw 50 T 400vw 50" 
                stroke="#F26A2E" 
                strokeWidth="3" 
                fill="none" 
                style={{
                  pathLength: smoothProgress
                }}
              />
            </svg>
          </div>

          {ZONES.map((zone, i) => (
            <ZoneSlide key={zone.id} zone={zone} index={i} smoothProgress={smoothProgress} />
          ))}
        </motion.div>
      </div>

      {/* Mobile Vertical Layout */}
      <div className="md:hidden flex flex-col w-full">
        <div className="w-full text-center py-8 z-50">
          <p className="text-xs uppercase tracking-widest text-[#F26A2E] font-semibold">THE PASSPORT JOURNEY</p>
        </div>
        
        {ZONES.map((zone, i) => (
          <motion.div 
            key={`mobile-${zone.id}`}
            className="relative w-full h-[60vh] flex flex-col items-center justify-center border-b border-[#202124]/10 last:border-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.6 }}
          >
            {/* Vertical Path Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] z-0 overflow-hidden">
              <div className="h-full w-full bg-[#202124]/10" />
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#F26A2E]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="w-full h-full bg-[#F6F0E6] relative z-10">
              {zone.content}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Helper components to properly use hooks outside of loops */

function ZoneDot({ zone, index, smoothProgress }: { zone: typeof ZONES[number]; index: number; smoothProgress: any }) {
  const dotOpacity = useTransform(
    smoothProgress,
    [Math.max(0, (index - 1) * 0.33), index * 0.33, Math.min(1, (index + 1) * 0.33)],
    [0, 1, 0]
  );

  return (
    <div className="w-2 h-2 rounded-full bg-[#202124] opacity-20 relative">
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: zone.accent,
          opacity: dotOpacity
        }}
      />
    </div>
  );
}

function ZoneSlide({ zone, index, smoothProgress }: { zone: typeof ZONES[number]; index: number; smoothProgress: any }) {
  const zoneOpacity = useTransform(
    smoothProgress,
    [Math.max(0, (index - 1) * 0.33), index * 0.33, Math.min(1, (index + 1) * 0.33)],
    [0.3, 1, 0.3]
  );
  const zoneScale = useTransform(
    smoothProgress,
    [Math.max(0, (index - 1) * 0.33), index * 0.33, Math.min(1, (index + 1) * 0.33)],
    [0.9, 1, 0.9]
  );
  const sealRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <div className="relative w-screen h-full flex-shrink-0 flex items-center justify-center">
      <motion.div
        className="w-full h-full"
        style={{ opacity: zoneOpacity, scale: zoneScale }}
      >
        {zone.content}
      </motion.div>

      {index < ZONES.length - 1 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
          <motion.div 
            className="w-16 h-16 rounded-full border border-[#202124]/20 bg-[#F6F0E6] flex items-center justify-center shadow-sm"
            style={{ rotate: sealRotate }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <path id={`curve-${index}`} d="M 20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50" fill="none" />
              <text fontSize="10" fill="#202124" letterSpacing="2">
                <textPath href={`#curve-${index}`} startOffset="50%" textAnchor="middle">
                  JOURNEY
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}
