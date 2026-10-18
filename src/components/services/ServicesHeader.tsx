"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HudTopLine } from "./HudTopLine";
import { SectionTag } from "./SectionTag";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface ServicesHeaderProps {
  isInView?: boolean;
}

export function ServicesHeader({ isInView = true }: ServicesHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  // Scramble decode on headline
  const headlineLine1 = useScramble("END-TO-END PROTECTION", {
    durationMs: 750,
    delayMs: 350,
    autoStart: isInView,
  });

  const headlineLine2 = useScramble("AGAINST CYBER THREATS", {
    durationMs: 750,
    delayMs: 450,
    autoStart: isInView,
  });

  return (
    <header className="relative w-full max-w-[1200px] mx-auto text-center flex flex-col items-center select-none pt-4 pb-14 sm:pb-20">
      {/* 1. Top HUD Line & Tag Overlay */}
      <div className="relative w-full max-w-[715px] mx-auto flex items-center justify-center">
        {/* The SVG HUD Line */}
        <HudTopLine isInView={isInView} />

        {/* The Tag positioned directly under the plateau */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 z-10">
          <SectionTag isInView={isInView} />
        </div>
      </div>

      {/* 2. Main Headline (2 centered lines) */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center">
        {/* Line 1 Masked Reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: EASINGS.cyber,
            }}
            className="text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.2] lg:leading-[1.25] font-bold tracking-[0.02em] text-[#C3D4FF] uppercase"
          >
            {headlineLine1}
          </motion.h2>
        </div>

        {/* Line 2 Masked Reveal */}
        <div className="overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { y: "100%", opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: EASINGS.cyber,
            }}
            className="text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.2] lg:leading-[1.25] font-bold tracking-[0.02em] text-[#C3D4FF] uppercase"
          >
            {headlineLine2}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
