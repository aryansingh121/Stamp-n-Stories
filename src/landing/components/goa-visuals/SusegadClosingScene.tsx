import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

const TIMELINE_NODES = [
  "SLOW MORNING",
  "BREAKFAST",
  "CHECKOUT",
  "POTTERY",
  "MEMORY EXCHANGE",
  "STAMP CEREMONY",
  "GROUP PHOTO",
  "RETURN"
];

export function SusegadClosingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 0.0 -> 0.15: Sunrise
  const sunriseOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const landscapeOpacity = useTransform(smoothProgress, [0, 0.15], [0, 0.15]);
  
  // 0.15 -> 0.3: Pottery Wheel
  const potteryOpacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);
  const potteryY = useTransform(smoothProgress, [0.15, 0.3], [50, 0]);
  
  // 0.3 -> 0.5: Hands & Wheel Rotation
  const handsOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const wheelRotate = useTransform(smoothProgress, [0.3, 0.7], [0, 180]);
  
  // 0.5 -> 0.65: Memory Cards
  const cardsOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const cardScale = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  
  // 0.65 -> 0.8: Passport & Stamp
  const passportOpacity = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);
  const passportScale = useTransform(smoothProgress, [0.65, 0.8], [0.8, 1]);
  const stampScale = useTransform(smoothProgress, [0.75, 0.8, 0.85], [2, 0.9, 1]);
  const stampOpacity = useTransform(smoothProgress, [0.7, 0.75], [0, 1]);

  // 0.8 -> 0.95: Group Silhouettes
  const groupOpacity = useTransform(smoothProgress, [0.8, 0.95], [0, 0.6]);
  
  // 0.95 -> 1.0: Warm Glow Intensifies
  const glowOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

  // Timeline progress (0 to 8)
  const timelineActiveIndex = useTransform(smoothProgress, [0, 1], [0, 8]);

  // Parallax (disabled if prefersReduced)
  const bgParallax = useTransform(smoothProgress, [0, 1], prefersReduced ? [0, 0] : [0, 100]);
  const midParallax = useTransform(smoothProgress, [0, 1], prefersReduced ? [0, 0] : [0, 60]);
  const fgParallax = useTransform(smoothProgress, [0, 1], prefersReduced ? [0, 0] : [0, -40]);

  // Apply reduced motion overrides
  const safeSunriseOpacity = prefersReduced ? 1 : sunriseOpacity;
  const safeLandscapeOpacity = prefersReduced ? 0.15 : landscapeOpacity;
  const safePotteryOpacity = prefersReduced ? 1 : potteryOpacity;
  const safePotteryY = prefersReduced ? 0 : potteryY;
  const safeHandsOpacity = prefersReduced ? 1 : handsOpacity;
  const safeWheelRotate = prefersReduced ? 0 : wheelRotate;
  const safeCardsOpacity = prefersReduced ? 1 : cardsOpacity;
  const safeCardScale = prefersReduced ? 1 : cardScale;
  const safePassportOpacity = prefersReduced ? 1 : passportOpacity;
  const safePassportScale = prefersReduced ? 1 : passportScale;
  const safeStampScale = prefersReduced ? 1 : stampScale;
  const safeStampOpacity = prefersReduced ? 1 : stampOpacity;
  const safeGroupOpacity = prefersReduced ? 0.6 : groupOpacity;
  const safeGlowOpacity = prefersReduced ? 1 : glowOpacity;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[150vh] overflow-hidden py-16 md:py-24"
      style={{
        background: "linear-gradient(to bottom, #F6F0E6 0%, rgba(123, 94, 58, 0.2) 100%)"
      }}
    >
      {/* BACKGROUND LAYER */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: safeSunriseOpacity }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, rgba(246, 240, 230, 0.8) 0%, transparent 60%)" }} />
        {/* Sun rays */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {[...Array(12)].map((_, i) => (
            <polygon key={i} points="500,400 480,0 520,0" fill="#F26A2E" transform={`rotate(${i * 30} 500 400)`} />
          ))}
        </svg>
      </motion.div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ opacity: safeLandscapeOpacity, y: bgParallax }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-[#234A3C]" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        {/* Palm Silhouettes */}
        <div className="absolute bottom-0 left-4 md:left-24 opacity-30">
          <svg width="60" height="120" viewBox="0 0 60 120" fill="currentColor">
            <path d="M30,120 Q35,60 25,20 Q10,10 5,30 Q15,25 25,20 Q40,5 55,20 Q45,25 35,25" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-4 md:right-24 opacity-30">
          <svg width="50" height="100" viewBox="0 0 50 100" fill="currentColor">
             <path d="M25,100 Q30,50 20,15 Q5,5 0,25 Q10,20 20,15 Q35,0 50,15 Q40,20 30,20" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>
      </motion.div>

      {/* LABELS */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-8 pointer-events-none">
        <p className="text-xs uppercase tracking-widest text-[#F26A2E]">DAY 3 · PRESENCE & CLOSING RITUAL</p>
      </div>

      {/* PROGRESSION TIMELINE */}
      <div className="sticky top-[20vh] left-6 md:left-12 z-30 h-[60vh] flex flex-col justify-between py-4 pointer-events-none">
        <div className="absolute left-[5px] top-4 bottom-4 w-[1px] bg-[#202124]/10" />
        {TIMELINE_NODES.map((node, i) => (
          <div key={node} className="relative flex items-center group">
            <motion.div 
              className="w-3 h-3 rounded-full mr-4 z-10 bg-white border border-[#202124]/20"
              style={{
                backgroundColor: useTransform(timelineActiveIndex, (val) => val >= i ? "#F26A2E" : "#FFFDF9"),
                borderColor: useTransform(timelineActiveIndex, (val) => val >= i ? "#F26A2E" : "rgba(32,33,36,0.2)"),
              }}
            />
            <motion.span 
              className="text-[10px] md:text-xs font-semibold tracking-widest uppercase hidden sm:block"
              style={{
                color: useTransform(timelineActiveIndex, (val) => val >= i ? "#F26A2E" : "rgba(32,33,36,0.3)")
              }}
            >
              {node}
            </motion.span>
          </div>
        ))}
      </div>

      {/* MIDGROUND LAYER */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div 
          className="relative flex flex-col items-center"
          style={{ opacity: safePotteryOpacity, y: safePotteryY }}
        >
          {/* Pottery Wheel & Hands */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-16">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-[#7B5E3A] border-dashed opacity-50"
              style={{ rotate: safeWheelRotate }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#7B5E3A]" fill="currentColor">
                 <path d="M30,80 Q50,90 70,80 L75,60 Q65,40 50,20 Q35,40 25,60 Z" />
               </svg>
            </div>
            {/* Hands */}
            <motion.div 
              className="absolute inset-0"
              style={{ opacity: safeHandsOpacity }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#202124] opacity-40">
                 <path d="M-10,50 Q15,40 35,55" stroke="currentColor" strokeWidth="4" fill="none" />
                 <path d="M110,50 Q85,40 65,55" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col items-center"
            style={{ opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]) }}
          >
            <h2 className="text-4xl sm:text-6xl font-serif text-[#202124] italic mb-2">Susegad</h2>
            <p className="text-sm tracking-widest uppercase text-[#7B5E3A]">the art of contentment</p>
          </motion.div>
        </motion.div>
      </div>

      {/* FOREGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
         {/* Memory Cards */}
         <motion.div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px]" style={{ opacity: safeCardsOpacity, y: fgParallax }}>
            {[
              { rotate: -15, x: "-30%", y: "-20%" },
              { rotate: 10, x: "20%", y: "-30%" },
              { rotate: 25, x: "35%", y: "15%" },
              { rotate: -5, x: "-40%", y: "25%", mobileHidden: true },
              { rotate: -25, x: "-15%", y: "40%", mobileHidden: true },
              { rotate: 15, x: "25%", y: "45%", mobileHidden: true }
            ].map((card, i) => (
              <motion.div 
                key={i}
                className={`absolute left-1/2 top-1/2 w-20 h-24 md:w-24 md:h-32 bg-[#F6F0E6] border border-[#7B5E3A]/40 rounded-sm shadow-sm flex flex-col p-2 gap-1 ${card.mobileHidden ? 'hidden md:flex' : ''}`}
                style={{
                  x: `calc(-50% + ${card.x})`,
                  y: `calc(-50% + ${card.y})`,
                  rotate: card.rotate,
                  scale: safeCardScale
                }}
              >
                <div className="w-full h-[2px] bg-[#7B5E3A]/20 mb-2 mt-1" />
                <div className="w-3/4 h-[2px] bg-[#7B5E3A]/20" />
                <div className="w-5/6 h-[2px] bg-[#7B5E3A]/20" />
              </motion.div>
            ))}
         </motion.div>

         {/* Passport */}
         <motion.div 
           className="absolute bottom-[10%] right-[10%] w-32 h-44 md:w-48 md:h-64 bg-[#F6F0E6] border-2 border-[#7B5E3A] rounded-md shadow-lg flex items-center justify-center overflow-hidden"
           style={{ opacity: safePassportOpacity, scale: safePassportScale, y: fgParallax }}
         >
           <div className="absolute top-4 w-1/2 h-[2px] bg-[#7B5E3A]/20" />
           <div className="absolute top-8 w-2/3 h-[2px] bg-[#7B5E3A]/20" />
           
           <motion.div 
             className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-[#F26A2E] flex items-center justify-center rotate-[-15deg] opacity-80"
             style={{ scale: safeStampScale, opacity: safeStampOpacity }}
           >
             <div className="absolute inset-2 border border-[#F26A2E] rounded-full" />
             <span className="text-[#F26A2E] font-bold text-xs md:text-sm tracking-widest rotate-[-10deg]">SUSEGAD</span>
           </motion.div>
         </motion.div>

         {/* Group Silhouettes */}
         <motion.div 
           className="absolute bottom-[5%] flex items-end justify-center gap-2 md:gap-4 w-full h-[150px]"
           style={{ opacity: safeGroupOpacity }}
         >
           {[...Array(8)].map((_, i) => (
             <div 
               key={i} 
               className={`w-8 h-16 md:w-12 md:h-24 bg-[#202124] rounded-t-full ${i > 3 ? 'hidden md:block' : ''}`}
               style={{ 
                 height: `${50 + Math.random() * 50}%`,
                 opacity: 0.6 + Math.random() * 0.4
               }} 
             />
           ))}
         </motion.div>
      </div>

      {/* ATMOSPHERIC WARM GLOW */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay z-40"
        style={{ 
          opacity: safeGlowOpacity,
          background: "radial-gradient(circle at 50% 50%, rgba(242, 106, 46, 0.1) 0%, transparent 70%)" 
        }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(35,74,60,0.1)] z-40" />

      {/* BOTTOM LABEL */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-50 pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest text-[#202124]/40">closing ceremony · illustrative</p>
      </div>
    </section>
  );
}
