"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface HudHeadlineLineProps {
  isInView?: boolean;
}

export function HudHeadlineLine({ isInView = true }: HudHeadlineLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="inline-block relative w-[180px] sm:w-[220px] h-[64px] sm:h-[76px] select-none pointer-events-none align-middle"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 220 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="hudLineGrad" x1="0" y1="20" x2="210" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#4CB8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.8" />
          </linearGradient>

          <filter id="hudLineGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#1E9BFF" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. PRIMARY CIRCUIT TRACE PATH */}
        {/* Horizontal -> Chamfer drop -> Horizontal -> 45deg down -> Horizontal -> Vertical Drop */}
        <motion.path
          d="M 2 20 H 42 L 54 28 H 140 L 158 46 H 182 V 72"
          stroke="url(#hudLineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hudLineGlow)"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.5,
            ease: EASINGS.cyber,
          }}
        />

        {/* 2. STACKED PARALLEL BARS & CHAMFERED NOTCH BLOCKS */}
        {/* Top diagonal hatch slashes (4 ticks) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <line x1="42" y1="14" x2="48" y2="8" stroke="#1E9BFF" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="48" y1="14" x2="54" y2="8" stroke="#1E9BFF" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="54" y1="14" x2="60" y2="8" stroke="#1E9BFF" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="60" y1="14" x2="66" y2="8" stroke="#1E9BFF" strokeWidth="2.2" strokeLinecap="round" />
        </motion.g>

        {/* Lower parallel horizontal bar */}
        <motion.path
          d="M 42 36 H 108 L 118 28"
          stroke="#1E9BFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#hudLineGlow)"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: EASINGS.cyber }}
        />

        {/* Filled stepped notch bar */}
        <motion.polygon
          points="66,7 122,7 114,14 74,14"
          fill="#1E9BFF"
          filter="url(#hudLineGlow)"
          initial={shouldReduceMotion ? { opacity: 0.9 } : { opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0.7, 0.95] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />

        {/* 3. DOTTED ROWS (5 dots above, 5 dots below) */}
        {/* Upper dotted row */}
        <g fill="#4CB8FF">
          {[132, 140, 148, 156, 164].map((dotX, idx) => (
            <motion.circle
              key={`dot-top-${idx}`}
              cx={dotX}
              cy={14}
              r="1.8"
              filter="url(#hudLineGlow)"
              initial={shouldReduceMotion ? { opacity: 0.85 } : { opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.85 + idx * 0.05, duration: 0.2 }}
            />
          ))}
        </g>

        {/* Lower dotted row */}
        <g fill="#4CB8FF">
          {[68, 76, 84, 92, 100].map((dotX, idx) => (
            <motion.circle
              key={`dot-bottom-${idx}`}
              cx={dotX}
              cy={28}
              r="1.8"
              filter="url(#hudLineGlow)"
              initial={shouldReduceMotion ? { opacity: 0.85 } : { opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.9 + idx * 0.05, duration: 0.2 }}
            />
          ))}
        </g>

        {/* 4. GLOWING TERMINAL END DOT (Pulses on arrival) */}
        <motion.circle
          cx="182"
          cy="72"
          r="3"
          fill="#FFFFFF"
          filter="url(#hudLineGlow)"
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: [0, 1.8, 1],
                  opacity: 1,
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 1.1, ease: EASINGS.cyber }}
        />

        {/* Outer terminal pulse ring */}
        {!shouldReduceMotion && (
          <motion.circle
            cx="182"
            cy="72"
            r="7"
            stroke="#1E9BFF"
            strokeWidth="1.2"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        )}
      </svg>
    </div>
  );
}
