"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface HudFlankLineProps {
  direction?: "left" | "right";
  isInView?: boolean;
}

export function HudFlankLine({ direction = "left", isInView = true }: HudFlankLineProps) {
  const shouldReduceMotion = useReducedMotion();
  const isRight = direction === "right";

  return (
    <div
      className={`relative h-[32px] sm:h-[54px] w-[70px] xs:w-[90px] sm:w-[260px] md:w-[340px] lg:w-[420px] xl:w-[500px] overflow-visible pointer-events-none select-none ${
        isRight ? "scale-x-[-1]" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`flankGrad-${direction}`} x1="0" y1="30" x2="500" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#1E9BFF" stopOpacity="0.7" />
            <stop offset="90%" stopColor="#4CB8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#4CB8FF" stopOpacity="0.9" />
          </linearGradient>

          <filter id={`flankGlow-${direction}`} x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#1E9BFF" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* 1. Main outer baseline running from edge towards headline */}
        <motion.path
          d="M 0 30 H 280 L 310 18 H 420 L 435 30 H 488"
          stroke={`url(#flankGrad-${direction})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#flankGlow-${direction})`}
          initial={false}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: EASINGS.cyber,
          }}
        />

        {/* 2. Thick angled bar block with chamfered end */}
        <motion.polygon
          points="180,24 270,24 290,14 200,14"
          fill="#1E9BFF"
          filter={`url(#flankGlow-${direction})`}
          initial={false}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* 3. Stacked parallel secondary trace line */}
        <motion.path
          d="M 120 40 H 260 L 285 30 H 380"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter={`url(#flankGlow-${direction})`}
          initial={false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASINGS.cyber }}
        />

        {/* 4. Hatched segment (////) - 5 diagonal hatch slashes */}
        <motion.g
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <line x1="330" y1="26" x2="338" y2="16" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="340" y1="26" x2="348" y2="16" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="350" y1="26" x2="358" y2="16" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="360" y1="26" x2="368" y2="16" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="370" y1="26" x2="378" y2="16" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* 5. Terminal notch block & glowing dot near headline */}
        <motion.rect
          x="480"
          y="27"
          width="12"
          height="6"
          fill="#4CB8FF"
          filter={`url(#flankGlow-${direction})`}
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        <motion.circle
          cx="496"
          cy="30"
          r="3"
          fill="#FFFFFF"
          filter={`url(#flankGlow-${direction})`}
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
