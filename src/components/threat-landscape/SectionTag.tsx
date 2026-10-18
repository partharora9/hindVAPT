"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface SectionTagProps {
  isInView?: boolean;
}

export function SectionTag({ isInView = true }: SectionTagProps) {
  const shouldReduceMotion = useReducedMotion();

  const scrambledText = useScramble("THE THREAT LANDSCAPE", {
    durationMs: 650,
    delayMs: 100,
    autoStart: isInView,
  });

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.6, ease: EASINGS.cyber }}
      className="relative inline-flex items-center justify-center w-[250px] sm:w-[270px] h-[40px] sm:h-[44px] bg-[#071126]/75 border border-[rgba(30,155,255,0.18)] select-none backdrop-blur-sm"
      role="note"
    >
      {/* 4 L-shaped corner brackets in blue-gray */}
      {/* Top-Left */}
      <motion.svg
        viewBox="0 0 10 10"
        fill="none"
        className="absolute -top-1 -left-1 w-2.5 h-2.5 pointer-events-none"
      >
        <motion.path
          d="M 1 9 V 1 H 9"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: EASINGS.cyber }}
        />
      </motion.svg>

      {/* Top-Right */}
      <motion.svg
        viewBox="0 0 10 10"
        fill="none"
        className="absolute -top-1 -right-1 w-2.5 h-2.5 pointer-events-none"
      >
        <motion.path
          d="M 1 1 H 9 V 9"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: EASINGS.cyber }}
        />
      </motion.svg>

      {/* Bottom-Left */}
      <motion.svg
        viewBox="0 0 10 10"
        fill="none"
        className="absolute -bottom-1 -left-1 w-2.5 h-2.5 pointer-events-none"
      >
        <motion.path
          d="M 1 1 V 9 H 9"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: EASINGS.cyber }}
        />
      </motion.svg>

      {/* Bottom-Right */}
      <motion.svg
        viewBox="0 0 10 10"
        fill="none"
        className="absolute -bottom-1 -right-1 w-2.5 h-2.5 pointer-events-none"
      >
        <motion.path
          d="M 9 1 V 9 H 1"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: EASINGS.cyber }}
        />
      </motion.svg>

      {/* Tag Text */}
      <span className="text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.28em] text-[#A9BEEA] uppercase">
        {scrambledText}
      </span>
    </motion.div>
  );
}
