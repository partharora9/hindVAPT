"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionTag } from "./SectionTag";
import { HudFlankLine } from "./HudFlankLine";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface SectionHeaderProps {
  isInView?: boolean;
}

export function SectionHeader({ isInView = true }: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const line1Scramble = useScramble("ONE PLATFORM.", {
    durationMs: 750,
    delayMs: 250,
    autoStart: isInView,
  });

  const line2Scramble = useScramble("TOTAL VISIBILITY.", {
    durationMs: 750,
    delayMs: 380,
    autoStart: isInView,
  });

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center select-none pt-4 pb-12 sm:pb-16 overflow-visible">
      {/* 1. Tag [ CORE CAPABILITIES ] */}
      <div className="mb-6 sm:mb-8">
        <SectionTag isInView={isInView} />
      </div>

      {/* 2. Headline with flanking HUD circuit lines aligned with line 1 */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Flanking HUD Line (runs towards left screen edge) */}
        <div className="hidden sm:block absolute right-[calc(50%+160px)] md:right-[calc(50%+210px)] lg:right-[calc(50%+260px)] xl:right-[calc(50%+300px)] top-[6px] sm:top-[8px] pointer-events-none">
          <HudFlankLine direction="left" isInView={isInView} />
        </div>

        {/* 2-line Centered Headline */}
        <div className="relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-mono font-extrabold uppercase tracking-tight text-[#C3D4FF] leading-[1.25]">
            <motion.span
              className="block overflow-hidden"
              initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASINGS.cyber }}
            >
              {line1Scramble || "ONE PLATFORM."}
            </motion.span>
            <motion.span
              className="block overflow-hidden"
              initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASINGS.cyber }}
            >
              {line2Scramble || "TOTAL VISIBILITY."}
            </motion.span>
          </h2>
        </div>

        {/* Right Flanking HUD Line (runs towards right screen edge) */}
        <div className="hidden sm:block absolute left-[calc(50%+160px)] md:left-[calc(50%+210px)] lg:left-[calc(50%+260px)] xl:left-[calc(50%+300px)] top-[6px] sm:top-[8px] pointer-events-none">
          <HudFlankLine direction="right" isInView={isInView} />
        </div>
      </div>
    </div>
  );
}
