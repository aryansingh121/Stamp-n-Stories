import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export function SouthGoaJourneyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Map progress to route drawing
  const routeDraw = useTransform(smoothProgress, [0.1, 0.8], [0, 1]);

  // Marker opacities based on scroll
  const marker1Opacity = useTransform(smoothProgress, [0.1, 0.15], [0.3, 1]);
  const marker2Opacity = useTransform(smoothProgress, [0.15, 0.2], [0.3, 1]);
  const marker3Opacity = useTransform(smoothProgress, [0.2, 0.3], [0.3, 1]);
  const marker4Opacity = useTransform(smoothProgress, [0.3, 0.4], [0.3, 1]);
  const marker5Opacity = useTransform(smoothProgress, [0.4, 0.5], [0.3, 1]);
  const marker6Opacity = useTransform(smoothProgress, [0.5, 0.6], [0.3, 1]);
  const marker7Opacity = useTransform(smoothProgress, [0.6, 0.8], [0.3, 1]);

  // Terrain parallax
  const contour1Y = useTransform(smoothProgress, [0, 1], [0, -20]);
  const contour2Y = useTransform(smoothProgress, [0, 1], [0, -40]);
  const contour3Y = useTransform(smoothProgress, [0, 1], [0, -60]);
  const contour4Y = useTransform(smoothProgress, [0, 1], [0, -80]);

  const contourOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  const isReduced = prefersReduced;
  
  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] overflow-hidden py-16 md:py-24 bg-[#FFFDF9] flex flex-col items-center">
      {/* Header */}
      <div className="z-10 relative text-center mb-8 px-4">
        <p className="text-xs uppercase tracking-widest text-[#F26A2E] mb-2 font-semibold">
          JOURNEY MAP
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#202124]">
          South Goa, Uncovered
        </h2>
      </div>

      {/* 3D Map Container */}
      <div className="relative w-full max-w-5xl aspect-[4/3] mx-auto md:perspective-[1200px] flex-1">
        {/* Main 3D Wrapper */}
        <div 
          className="absolute inset-0 w-full h-full md:origin-center md:transform-style-preserve-3d"
          style={{
            transform: !isReduced ? "rotateX(45deg)" : "none"
          }}
        >
          {/* Terrain SVG */}
          <svg viewBox="0 0 1000 800" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#234A3C" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#234A3C" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Water */}
            <rect x="0" y="0" width="200" height="800" fill="url(#seaGrad)" />
            {/* Coastline */}
            <path d="M 150 0 Q 180 200 130 400 T 160 800" fill="none" stroke="#234A3C" strokeWidth="2" strokeOpacity="0.4" />

            {/* Contours */}
            <motion.g style={{ y: isReduced ? 0 : contour1Y, opacity: isReduced ? 1 : contourOpacity }}>
              <path d="M 250 100 Q 350 50 450 150 T 650 100 T 850 200 T 950 150" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.1" />
              <path d="M 220 300 Q 320 250 420 350 T 620 300 T 820 400 T 920 350" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.1" />
            </motion.g>

            <motion.g style={{ y: isReduced ? 0 : contour2Y, opacity: isReduced ? 1 : contourOpacity }}>
              <path d="M 350 150 Q 450 100 550 200 T 750 150 T 850 250" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.2" />
              <path d="M 320 350 Q 420 300 520 400 T 720 350 T 820 450" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.2" />
            </motion.g>

            <motion.g style={{ y: isReduced ? 0 : contour3Y, opacity: isReduced ? 1 : contourOpacity }}>
              <path d="M 450 200 Q 550 150 650 250 T 800 200" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M 420 400 Q 520 350 620 450 T 770 400" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.3" />
            </motion.g>

            <motion.g style={{ y: isReduced ? 0 : contour4Y, opacity: isReduced ? 1 : contourOpacity }}>
              <path d="M 550 250 Q 600 200 700 280" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M 520 450 Q 570 400 670 480" fill="none" stroke="#234A3C" strokeWidth="1.5" strokeOpacity="0.4" />
            </motion.g>

            {/* Route Line Inactive */}
            <path d="M 300 200 C 400 150 500 250 550 350 S 400 450 450 550 S 600 600 700 550 S 800 450 850 350" fill="none" stroke="#F6F0E6" strokeWidth="4" strokeOpacity="0.5" strokeDasharray="10 10" />
            
            {/* Route Line Active */}
            <motion.path 
              d="M 300 200 C 400 150 500 250 550 350 S 400 450 450 550 S 600 600 700 550 S 800 450 850 350" 
              fill="none" 
              stroke="#F26A2E" 
              strokeWidth="4" 
              strokeLinecap="round"
              style={{ 
                pathLength: isReduced ? 1 : routeDraw 
              }} 
            />

            {/* Markers */}
            {/* Marker 1: South Goa Villa */}
            <motion.g style={{ opacity: isReduced ? 1 : marker1Opacity }} transform="translate(300, 200)">
              <circle cx="0" cy="0" r="15" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <path d="M -5 2 L -5 -3 L 0 -7 L 5 -3 L 5 2 Z" fill="none" stroke="#202124" strokeWidth="1.5" strokeLinejoin="round" />
              <text x="0" y="30" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">SOUTH GOA VILLA</text>
              <text x="0" y="-25" textAnchor="middle" fill="#7B5E3A" className="text-[8px] uppercase tracking-widest font-bold">DAY 1</text>
            </motion.g>

            {/* Marker 2: Gaon */}
            <motion.g style={{ opacity: isReduced ? 1 : marker2Opacity }} transform="translate(430, 210)">
              <circle cx="0" cy="0" r="12" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <rect x="-4" y="-3" width="8" height="6" fill="none" stroke="#202124" strokeWidth="1.5" />
              <path d="M -6 -3 L 0 -7 L 6 -3" fill="none" stroke="#202124" strokeWidth="1.5" />
              <text x="0" y="25" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">90-YEAR HOME</text>
            </motion.g>

            {/* Marker 3: Portuguese Lanes */}
            <motion.g style={{ opacity: isReduced ? 1 : marker3Opacity }} transform="translate(550, 350)">
              <circle cx="0" cy="0" r="12" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <circle cx="-4" cy="2" r="3" fill="none" stroke="#202124" strokeWidth="1" />
              <circle cx="4" cy="2" r="3" fill="none" stroke="#202124" strokeWidth="1" />
              <path d="M -4 2 L 0 -2 L 4 2 M 0 -2 L -2 -4" fill="none" stroke="#202124" strokeWidth="1" />
              <text x="0" y="25" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">PORTUGUESE LANES</text>
            </motion.g>

            {/* Marker 4: Cabo de Rama */}
            <motion.g style={{ opacity: isReduced ? 1 : marker4Opacity }} transform="translate(450, 550)">
              <circle cx="0" cy="0" r="12" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <path d="M -5 4 L -5 -2 L -3 -2 L -3 0 L -1 0 L -1 -2 L 1 -2 L 1 0 L 3 0 L 3 -2 L 5 -2 L 5 4 Z" fill="none" stroke="#202124" strokeWidth="1" />
              <text x="0" y="25" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">CABO DE RAMA</text>
              <text x="0" y="-22" textAnchor="middle" fill="#7B5E3A" className="text-[8px] uppercase tracking-widest font-bold">DAY 2</text>
            </motion.g>

            {/* Marker 5: Kokolem Beach */}
            <motion.g style={{ opacity: isReduced ? 1 : marker5Opacity }} transform="translate(560, 580)">
              <circle cx="0" cy="0" r="12" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <path d="M -4 0 Q -2 -3 0 0 T 4 0" fill="none" stroke="#202124" strokeWidth="1" />
              <path d="M -4 3 Q -2 0 0 3 T 4 3" fill="none" stroke="#202124" strokeWidth="1" />
              <text x="0" y="25" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">KOKOLEM BEACH</text>
            </motion.g>

            {/* Marker 6: Netravali Valley */}
            <motion.g style={{ opacity: isReduced ? 1 : marker6Opacity }} transform="translate(700, 550)">
              <circle cx="0" cy="0" r="12" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <path d="M -5 4 L 0 -4 L 5 4" fill="none" stroke="#202124" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="4" stroke="#202124" strokeWidth="1" />
              <text x="0" y="25" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">NETRAVALI VALLEY</text>
            </motion.g>

            {/* Marker 7: Cola Beach */}
            <motion.g style={{ opacity: isReduced ? 1 : marker7Opacity }} transform="translate(850, 350)">
              <circle cx="0" cy="0" r="15" fill="#FFFDF9" stroke="#F26A2E" strokeWidth="2" />
              <path d="M -2 4 C -2 0 -1 -2 0 -4 C 1 -2 2 0 2 4" fill="none" stroke="#202124" strokeWidth="1" />
              <path d="M 0 -4 C -2 -3 -4 -1 -4 -1" fill="none" stroke="#202124" strokeWidth="1" />
              <path d="M 0 -4 C 2 -3 4 -1 4 -1" fill="none" stroke="#202124" strokeWidth="1" />
              <path d="M -4 5 Q 0 8 4 5" fill="none" stroke="#202124" strokeWidth="1" />
              <text x="0" y="30" textAnchor="middle" fill="#202124" className="text-[10px] uppercase tracking-widest font-semibold font-sans">COLA BEACH</text>
              <text x="0" y="-25" textAnchor="middle" fill="#7B5E3A" className="text-[8px] uppercase tracking-widest font-bold">DAY 3</text>
            </motion.g>

          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="z-10 relative mt-8">
        <p className="text-[10px] uppercase tracking-widest text-[#202124]/40">
          illustrative journey map · artistic interpretation
        </p>
      </div>
    </section>
  );
}
