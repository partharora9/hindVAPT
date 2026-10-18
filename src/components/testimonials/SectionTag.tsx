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

  const scrambledText = useScramble("Testimonials", {
    durationMs: 650,
    delayMs: 150,
    autoStart: isInView,
  });

  return (
    <div className="relative inline-flex items-center justify-center w-[178px] h-[42px] select-none">
      {/* 4 L-shaped corner brackets */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 178 42"
        fill="none"
        aria-hidden="true"
      >
        {/* Top-Left Bracket */}
        <motion.path
          d="M 1 9 L 1 1 L 9 1"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASINGS.cyber }}
        />

        {/* Top-Right Bracket */}
        <motion.path
          d="M 169 1 L 177 1 L 177 9"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASINGS.cyber }}
        />

        {/* Bottom-Left Bracket */}
        <motion.path
          d="M 1 33 L 1 41 L 9 41"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASINGS.cyber }}
        />

        {/* Bottom-Right Bracket */}
        <motion.path
          d="M 169 41 L 177 41 L 177 33"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASINGS.cyber }}
        />
      </svg>

      {/* Dark Translucent Tag Box */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-[170px] h-[36px] bg-[#0E1424]/90 backdrop-blur-md border border-[rgba(150,170,230,0.18)] flex items-center justify-center shadow-[inset_0_0_12px_rgba(2,6,23,0.8)]"
      >
        <span className="font-mono text-[13px] tracking-[0.25em] text-[#A9BEEA] font-medium pl-1">
          {scrambledText}
        </span>
      </motion.div>
    </div>
  );
}
