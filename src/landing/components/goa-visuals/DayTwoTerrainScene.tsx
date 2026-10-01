import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export function DayTwoTerrainScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Map progress to terrain path drawing (0 to 1)
  const drawProgress = useTransform(smoothProgress, [0.1, 0.9], [0, 1]);
  const fadeProgress = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // Background parallax layers
  const bgLayer1Y = useTransform(smoothProgress, [0, 1], [0, 50]);
  const bgLayer2Y = useTransform(smoothProgress, [0, 1], [0, 20]);

  const activePointX = useTransform(drawProgress, [0, 1], [0, 1200]);
  // Approximation of y-coordinate based on x (roughly following the path)
  // Path: M0 500 C200 500, 350 200, 600 200 C800 200, 950 490, 1200 500
  const activePointY = useTransform(
    drawProgress,
    [0, 0.16, 0.29, 0.5, 0.66, 0.79, 1],
    [500, 500, 350, 200, 200, 420, 500] // rough mapping
  );

  const markers = [
    { name: "KOKOLEM BEACH", x: 80, y: 500, threshold: 0.1 },
    { name: "SILENT BEACH WALK", x: 180, y: 500, threshold: 0.15, mobileHide: true },
    { name: "BEACH BREAKFAST", x: 300, y: 410, threshold: 0.25, mobileHide: true },
    { name: "NETRAVALI VALLEY", x: 450, y: 250, threshold: 0.4 },
    { name: "WATERFALL TREK", x: 600, y: 200, threshold: 0.5 },
    { name: "LOCAL LUNCH", x: 750, y: 200, threshold: 0.62, mobileHide: true },
    { name: "COLA BEACH", x: 920, y: 400, threshold: 0.76 },
    { name: "KAYAKING", x: 1050, y: 495, threshold: 0.87, mobileHide: true },
    { name: "SUNSET", x: 1150, y: 500, threshold: 0.95 },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-[#202124] py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background gradient (sky) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#202124] to-[#234A3C]/30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between pointer-events-none">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs uppercase tracking-widest text-[#F26A2E] font-sans">
            Day 2 · Silence, Waterfall & Fire
          </h3>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#FFFDF9]">
            Terrain of the Day
          </h2>
        </div>

        {/* Footer */}
        <div className="mt-auto pb-4">
          <p className="text-[10px] uppercase tracking-widest text-[#FFFDF9]/40 font-sans">
            elevation profile · illustrative · not to scale
          </p>
        </div>
      </div>

      {/* Terrain SVG Container */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] min-h-[400px] pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="terrain-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B5E3A" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#234A3C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#234A3C" />
            </linearGradient>
            <linearGradient id="bg-terrain-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#234A3C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#202124" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bg-terrain-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B5E3A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#202124" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.g
            style={{
              opacity: prefersReduced ? 1 : fadeProgress,
            }}
          >
            {/* Background Layer 2 (Furthest) */}
            <motion.path
              d="M0 450 Q 200 350, 400 300 T 800 250 T 1200 450 L1200 600 L0 600 Z"
              fill="url(#bg-terrain-2)"
              style={{ y: prefersReduced ? 0 : bgLayer2Y }}
              className="hidden md:block"
            />
            {/* Background Layer 1 */}
            <motion.path
              d="M0 480 Q 300 250, 600 280 T 1200 480 L1200 600 L0 600 Z"
              fill="url(#bg-terrain-1)"
              style={{ y: prefersReduced ? 0 : bgLayer1Y }}
              className="hidden md:block"
            />

            {/* Main Terrain Fill */}
            <path
              d="M0 500 C200 500, 350 200, 600 200 C800 200, 950 490, 1200 500 L1200 600 L0 600 Z"
              fill="url(#terrain-gradient)"
            />

            {/* Route Line (Base) */}
            <path
              d="M0 500 C200 500, 350 200, 600 200 C800 200, 950 490, 1200 500"
              fill="none"
              stroke="#F6F0E6"
              strokeWidth="1"
              strokeOpacity="0.1"
            />

            {/* Route Line (Animated) */}
            <motion.path
              d="M0 500 C200 500, 350 200, 600 200 C800 200, 950 490, 1200 500"
              fill="none"
              stroke="#F26A2E"
              strokeWidth="3"
              style={{
                pathLength: prefersReduced ? 1 : drawProgress,
              }}
            />

            {/* Waterfall Detail */}
            <g transform="translate(600, 200)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#FFFDF9" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="-5" y1="5" x2="-5" y2="35" stroke="#FFFDF9" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="5" y1="8" x2="5" y2="45" stroke="#FFFDF9" strokeWidth="1" strokeOpacity="0.3" />
            </g>

            {/* Markers */}
            {markers.map((marker, i) => (
              <Marker
                key={i}
                marker={marker}
                progress={drawProgress}
                prefersReduced={prefersReduced}
              />
            ))}

            {/* Active Moving Point */}
            <motion.circle
              r="6"
              fill="#F26A2E"
              style={{
                cx: activePointX,
                cy: activePointY,
                opacity: prefersReduced ? 0 : drawProgress,
              }}
              className="drop-shadow-[0_0_8px_rgba(242,106,46,0.8)] hidden md:block"
            />
          </motion.g>
        </svg>
      </div>
    </section>
  );
}

function Marker({
  marker,
  progress,
  prefersReduced,
}: {
  marker: any;
  progress: any;
  prefersReduced: boolean | null;
}) {
  const isActive = useTransform(progress, (v: number) => v >= marker.threshold);
  const color = useTransform(isActive, (active) =>
    active ? "#F26A2E" : "rgba(246, 240, 230, 0.3)"
  );
  const labelColor = useTransform(isActive, (active) =>
    active ? "#FFFDF9" : "rgba(255, 253, 249, 0.5)"
  );
  
  // Stem length logic to avoid overlapping label with terrain
  const stemLength = marker.y > 450 ? -80 : -50;

  return (
    <g
      className={`transition-opacity duration-500 ${
        marker.mobileHide ? "hidden md:inline" : "inline"
      }`}
    >
      <motion.line
        x1={marker.x}
        y1={marker.y}
        x2={marker.x}
        y2={marker.y + stemLength}
        stroke={prefersReduced ? "#F26A2E" : color}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <motion.circle
        cx={marker.x}
        cy={marker.y}
        r="4"
        fill={prefersReduced ? "#F26A2E" : color}
      />
      <motion.text
        x={marker.x}
        y={marker.y + stemLength - 10}
        fill={prefersReduced ? "#FFFDF9" : labelColor}
        fontSize="10"
        textAnchor="middle"
        className="font-sans tracking-widest uppercase"
      >
        {marker.name}
      </motion.text>
    </g>
  );
}
