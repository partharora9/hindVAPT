"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DELAYS, DURATIONS, EASINGS } from "@/config/animation";

export function HudLine() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[36px] my-6 select-none">
      <svg
        viewBox="0 0 380 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hudGlowGrad" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#1E9BFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.4" />
          </linearGradient>

          <filter id="hudNeonGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#1E9BFF" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Left origin terminal dot */}
        <motion.circle
          cx="6"
          cy="12"
          r="2.5"
          fill="#1E9BFF"
          filter="url(#hudNeonGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : DELAYS.hudLine,
            duration: 0.3,
          }}
        />

        {/* Primary circuit trace path with 45-degree chamfers */}
        <motion.path
          d="M 12 12 H 42 L 52 20 H 108 L 118 12 H 145 L 155 20 H 198 L 208 12 H 320"
          stroke="url(#hudGlowGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hudNeonGlow)"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : DELAYS.hudLine,
            duration: shouldReduceMotion ? 0 : DURATIONS.hudDraw,
            ease: EASINGS.cyber,
          }}
        />

        {/* First chamfered notch accent block (glowing cyan fill) */}
        <motion.polygon
          points="56,19 104,19 100,16 60,16"
          fill="#1E9BFF"
          filter="url(#hudNeonGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{
            delay: shouldReduceMotion ? 0 : DELAYS.hudLine + 0.45,
            duration: 0.5,
          }}
        />

        {/* Second chamfered notch accent bar */}
        <motion.line
          x1="160"
          y1="19"
          x2="194"
          y2="19"
          stroke="#1E9BFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#hudNeonGlow)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.9, scaleX: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : DELAYS.hudLine + 0.65,
            duration: 0.4,
          }}
        />

        {/* Right terminal tick marks */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 1] }}
          transition={{
            delay: shouldReduceMotion ? 0 : DELAYS.hudLine + 0.8,
            duration: 0.6,
          }}
        >
          <line x1="330" y1="9" x2="330" y2="15" stroke="#1E9BFF" strokeWidth="1" opacity="0.6" />
          <line x1="334" y1="8" x2="334" y2="16" stroke="#1E9BFF" strokeWidth="1" opacity="0.8" />
          <line x1="338" y1="10" x2="338" y2="14" stroke="#1E9BFF" strokeWidth="1" opacity="0.4" />
          <circle cx="348" cy="12" r="1.5" fill="#1E9BFF" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
}
