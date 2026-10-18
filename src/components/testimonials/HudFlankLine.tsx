"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface HudFlankLineProps {
  side: "left" | "right";
  isInView?: boolean;
}

export function HudFlankLine({ side, isInView = true }: HudFlankLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-[180px] sm:w-[280px] lg:w-[360px] h-[36px] select-none pointer-events-none overflow-visible ${
        side === "right" ? "scale-x-[-1]" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 36"
        fill="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={`flankGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#1E9BFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4CB8FF" stopOpacity="1" />
          </linearGradient>

          <filter id={`flankGlow-${side}`} x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#1E9BFF" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Leftmost Thin Accent Bar */}
        <motion.line
          x1="0"
          y1="18"
          x2="35"
          y2="18"
          stroke="#1E9BFF"
          strokeWidth="2"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASINGS.cyber }}
        />

        {/* 2. Thick Angled Band (~120px long, chamfered both ends, filled #1E9BFF) */}
        <motion.polygon
          points="38,22 46,14 150,14 142,22"
          fill="#1E9BFF"
          filter={`url(#flankGlow-${side})`}
          initial={shouldReduceMotion ? { opacity: 0.9, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.9, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASINGS.cyber }}
          style={{ originX: 0 }}
        />

        {/* 3. Hatched Segment (4 diagonal slashes ///) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0.6, 1] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          stroke="#1E9BFF"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="162" y1="22" x2="170" y2="14" />
          <line x1="172" y1="22" x2="180" y2="14" />
          <line x1="182" y1="22" x2="190" y2="14" />
          <line x1="192" y1="22" x2="200" y2="14" />
        </motion.g>

        {/* 4. Thin Line with 45-degree Step up to Baseline */}
        {/* Runs horizontally, steps from Y=22 to Y=18, runs to ticks */}
        <motion.path
          d="M 204 18 H 250 L 256 18 H 338"
          stroke="#1E9BFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter={`url(#flankGlow-${side})`}
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASINGS.cyber }}
        />

        {/* 5. Cluster of 3 Vertical Tick Marks (|||) next to the headline */}
        <g stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round">
          {[346, 352, 358].map((tickX, idx) => (
            <motion.line
              key={`tick-${idx}`}
              x1={tickX}
              y1="12"
              x2={tickX}
              y2="24"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ delay: 0.85 + idx * 0.08, duration: 0.3 }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
