"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";

interface SectionTagProps {
  isInView?: boolean;
}

export function SectionTag({ isInView = true }: SectionTagProps) {
  const shouldReduceMotion = useReducedMotion();
  const decodedText = useScramble("CORE CAPABILITIES", {
    durationMs: 650,
    delayMs: 100,
    autoStart: isInView,
  });

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-flex items-center justify-center w-[236px] h-[42px] bg-[#0B1528]/80 border border-[rgba(30,155,255,0.22)] backdrop-blur-md shadow-[0_0_20px_rgba(30,155,255,0.12)] select-none"
    >
      {/* 4 L-shaped Corner Brackets */}
      {/* Top Left */}
      <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px] border-[#4CB8FF]" />
      {/* Top Right */}
      <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-[1.5px] border-r-[1.5px] border-[#4CB8FF]" />
      {/* Bottom Left */}
      <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-[1.5px] border-l-[1.5px] border-[#4CB8FF]" />
      {/* Bottom Right */}
      <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-[#4CB8FF]" />

      {/* Text */}
      <span className="text-[13px] font-mono font-bold tracking-[0.3em] text-[#C3D4FF] uppercase">
        {decodedText || "CORE CAPABILITIES"}
      </span>
    </motion.div>
  );
}
