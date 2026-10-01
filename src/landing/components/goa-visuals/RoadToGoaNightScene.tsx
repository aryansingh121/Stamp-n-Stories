import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export function RoadToGoaNightScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax transforms
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const midY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  
  const finalBgY = prefersReduced ? "0%" : bgY;
  const finalMidY = prefersReduced ? "0%" : midY;

  // Vehicle perspective animation
  // Starts at bottom (y=100%), ends near vanishing point (y=40%)
  const vehicleY = useTransform(smoothProgress, [0.2, 0.8], ["90%", "42%"]);
  const vehicleScale = useTransform(smoothProgress, [0.2, 0.8], [1, 0.35]);
  const vehicleOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.85, 0.95], [0.8, 1, 1, 0.7]);

  const finalVehicleY = prefersReduced ? "60%" : vehicleY;
  const finalVehicleScale = prefersReduced ? 0.6 : vehicleScale;
  const finalVehicleOpacity = prefersReduced ? 1 : vehicleOpacity;

  // Scene fade in - ensure scene is visible when entering viewport
  const sceneOpacity = useTransform(smoothProgress, [0, 0.1], [0.8, 1]);
  const finalSceneOpacity = prefersReduced ? 1 : sceneOpacity;

  // Markers
  const allMarkers = [
    { id: 1, label: "PICKUP", progress: 0.25 },
    { id: 2, label: "PASSPORT BRIEFING", progress: 0.35 },
    { id: 3, label: "BLACK ENVELOPE", progress: 0.45 },
    { id: 4, label: "COURTROOM DEBATE", progress: 0.55 },
    { id: 5, label: "DINNER HALT", progress: 0.65 },
    { id: 6, label: "LIGHTS-OFF REST", progress: 0.75 },
    { id: 7, label: "GOA ARRIVAL", progress: 0.85 },
  ];

  const mobileMarkers = [
    { id: 1, label: "PICKUP", progress: 0.25 },
    { id: 4, label: "COURTROOM DEBATE", progress: 0.55 },
    { id: 5, label: "DINNER HALT", progress: 0.65 },
    { id: 7, label: "GOA ARRIVAL", progress: 0.85 },
  ];

  const activeMarkers = isMobile ? mobileMarkers : allMarkers;

  // Pre-compute star positions to avoid re-render jitter
  const starPositions = (isMobile ? 10 : 30);
  const stars = Array.from({ length: starPositions }, (_, i) => ({
    cx: ((i * 137.508) % 1000),
    cy: ((i * 73.137) % 400),
    r: (i % 3) * 0.5 + 0.8,
    opacity: ((i * 47) % 50 + 20) / 100,
  }));

  return (
    <section ref={containerRef} className="relative w-full min-h-[580px] md:min-h-[680px] h-[75vh] md:h-[80vh] bg-[#202124] overflow-hidden py-10 md:py-14 flex flex-col items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#234A3C]/20 to-[#202124] pointer-events-none" />

      {/* Main Scene Body */}
      <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Title */}
        <motion.div 
          className="absolute top-6 sm:top-10 md:top-12 z-30 flex flex-col items-center text-center px-4"
          style={{ opacity: finalSceneOpacity }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#F26A2E] mb-1 font-semibold">
            The Overnight Overture
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFDF9]">
            Road to Goa
          </h2>
        </motion.div>

        {/* Scene Container */}
        <motion.div 
          className="relative w-full max-w-5xl h-[70vh] flex-shrink-0"
          style={{ opacity: finalSceneOpacity }}
        >
          {/* Background Layer: Sky, Moon, Stars, Distant Mountains */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ y: finalBgY }}
          >
            <svg viewBox="0 0 1000 800" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
              {/* Moon */}
              <circle cx="800" cy="200" r="60" fill="#F6F0E6" opacity="0.9" filter="blur(2px)" />
              <circle cx="800" cy="200" r="60" fill="#F6F0E6" opacity="0.4" filter="blur(15px)" />
              
              {/* Stars */}
              {stars.map((star, i) => (
                <circle 
                  key={`star-${i}`}
                  cx={star.cx} 
                  cy={star.cy} 
                  r={star.r} 
                  fill="#FFFDF9" 
                  opacity={star.opacity} 
                />
              ))}

              {/* Farthest Mountains */}
              <path 
                d="M0,500 Q100,400 250,450 T500,400 T800,480 T1000,420 L1000,800 L0,800 Z" 
                fill="#234A3C" 
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Midground Layer: Hills, Palm Trees */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ y: finalMidY }}
          >
            <svg viewBox="0 0 1000 800" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
              {/* Hills */}
              <path 
                d="M0,550 Q150,480 300,520 T600,490 T900,540 L1000,520 L1000,800 L0,800 Z" 
                fill="#234A3C" 
                opacity="0.5"
              />
              {/* Palm Trees */}
              <g stroke="#234A3C" fill="none" strokeWidth="2" opacity="0.6">
                <path d="M150,550 Q145,510 140,480" />
                <path d="M140,480 Q130,470 120,475" />
                <path d="M140,480 Q150,465 160,470" />
                
                <path d="M850,580 Q855,530 860,490" />
                <path d="M860,490 Q845,480 835,485" />
                <path d="M860,490 Q875,475 885,480" />
              </g>
            </svg>
          </motion.div>

          {/* Foreground Layer: Road, Markers, Vehicle */}
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1000 800" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
              {/* Perspective Road */}
              <path 
                d="M500,420 L800,800 L200,800 Z" 
                fill="#7B5E3A" 
                opacity="0.9"
              />
              {/* Road Edges */}
              <line x1="500" y1="420" x2="200" y2="800" stroke="#F6F0E6" strokeWidth="3" opacity="0.2" />
              <line x1="500" y1="420" x2="800" y2="800" stroke="#F6F0E6" strokeWidth="3" opacity="0.2" />
              {/* Lane Markings */}
              <line x1="500" y1="420" x2="500" y2="800" stroke="#FFFDF9" strokeWidth="2" strokeDasharray="10 15" opacity="0.3" />

              {/* Fence Posts (Desktop only) */}
              {!isMobile && Array.from({ length: 8 }).map((_, i) => {
                const ratio = (i + 1) / 9; // 0.1 to 0.9
                const y = 420 + (800 - 420) * ratio;
                const leftX = 500 - (500 - 200) * ratio;
                const rightX = 500 + (800 - 500) * ratio;
                const height = 10 * ratio + 5;
                return (
                  <g key={`fence-${i}`} stroke="#234A3C" strokeWidth="2" opacity="0.5">
                    <line x1={leftX - 5} y1={y} x2={leftX - 5} y2={y - height} />
                    <line x1={rightX + 5} y1={y} x2={rightX + 5} y2={y - height} />
                  </g>
                );
              })}
            </svg>

            {/* Render Markers dynamically */}
            {activeMarkers.map((marker, i) => {
              // Calculate position on the road based on progress
              // Vehicle moves from bottom (100%) to top (40%) roughly
              // We'll map marker.progress (e.g. 0.35 to 0.85) to y position
              const yRatio = (marker.progress - 0.3) / 0.55; // 0 to 1
              const yPercent = 90 - (90 - 42) * yRatio;
              // X needs to follow perspective (optional, but keep it centered for now or offset)
              const xPercent = 50;
              const isFinal = marker.id === 7;
              
              return (
                <Marker 
                  key={marker.id}
                  marker={marker}
                  yPercent={yPercent}
                  xPercent={xPercent}
                  smoothProgress={smoothProgress}
                  isFinal={isFinal}
                  prefersReduced={prefersReduced}
                />
              );
            })}

            {/* Vehicle */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2"
              style={{ 
                top: finalVehicleY, 
                scale: finalVehicleScale, 
                opacity: finalVehicleOpacity 
              }}
            >
              <svg width="80" height="80" viewBox="0 0 100 100" className="overflow-visible">
                {/* Headlight glow */}
                <circle cx="20" cy="80" r="30" fill="url(#headlight)" opacity="0.6" />
                <circle cx="80" cy="80" r="30" fill="url(#headlight)" opacity="0.6" />
                <defs>
                  <radialGradient id="headlight">
                    <stop offset="0%" stopColor="#F6F0E6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F6F0E6" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                {/* Vehicle Outline */}
                <rect x="25" y="40" width="50" height="40" rx="8" fill="none" stroke="#F26A2E" strokeWidth="4" />
                {/* Windows */}
                <rect x="30" y="45" width="40" height="15" rx="3" fill="none" stroke="#F26A2E" strokeWidth="2" />
                <line x1="50" y1="45" x2="50" y2="60" stroke="#F26A2E" strokeWidth="2" />
                {/* Wheels */}
                <circle cx="35" cy="85" r="8" fill="none" stroke="#F26A2E" strokeWidth="3" />
                <circle cx="65" cy="85" r="8" fill="none" stroke="#F26A2E" strokeWidth="3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Label */}
        <div className="absolute bottom-8 w-full text-center z-30">
          <span className="text-[10px] uppercase tracking-widest text-[#FFFDF9]/40">
            illustrative journey · not to scale
          </span>
        </div>

      </div>
    </section>
  );
}

function Marker({ 
  marker, 
  yPercent, 
  xPercent, 
  smoothProgress, 
  isFinal,
  prefersReduced 
}: { 
  marker: any; 
  yPercent: number; 
  xPercent: number; 
  smoothProgress: any; 
  isFinal: boolean;
  prefersReduced: boolean;
}) {
  // Marker becomes active when scroll progress passes its trigger point
  const opacityTransform = useTransform(smoothProgress, [marker.progress - 0.05, marker.progress], [0.3, 1]);
  const finalOpacity = prefersReduced ? 1 : opacityTransform;

  return (
    <motion.div 
      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ 
        top: `${yPercent}%`, 
        left: `${xPercent}%`,
        opacity: finalOpacity
      }}
    >
      <div className={`rounded-full ${isFinal ? 'w-4 h-4' : 'w-2 h-2'} bg-[#F26A2E] shadow-[0_0_10px_#F26A2E]`} />
      <span className={`mt-2 uppercase tracking-widest font-semibold whitespace-nowrap ${isFinal ? 'text-xs text-[#F26A2E]' : 'text-[8px] text-[#F6F0E6]'}`}>
        {marker.label}
      </span>
    </motion.div>
  );
}
