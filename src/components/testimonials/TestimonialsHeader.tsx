"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionTag } from "./SectionTag";
import { HudFlankLine } from "./HudFlankLine";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface TestimonialsHeaderProps {
  isInView?: boolean;
}

export function TestimonialsHeader({ isInView = true }: TestimonialsHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const headlineLine1 = useScramble("BUSINESSES THAT", {
    durationMs: 700,
    delayMs: 250,
    autoStart: isInView,
  });

  const headlineLine2 = useScramble("TRUST OUR DEFENCE", {
    durationMs: 700,
    delayMs: 400,
    autoStart: isInView,
  });

  return (
    <header className="relative w-full max-w-[1540px] mx-auto text-center flex flex-col items-center select-none pt-4 pb-12 sm:pb-16 overflow-visible">
      {/* 1. Tag "Testimonials" */}
      <div className="mb-6 sm:mb-8">
        <SectionTag isInView={isInView} />
      </div>

      {/* 2. Headline Line 1 */}
      <div className="overflow-hidden">
        <motion.h2
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASINGS.cyber }}
          className="text-[28px] sm:text-[42px] lg:text-[52px] leading-[1.25] font-bold tracking-[0.02em] text-[#C3D4FF] font-mono uppercase"
        >
          {headlineLine1}
        </motion.h2>
      </div>

      {/* 3. Headline Line 2 with Flanking HUD Lines */}
      <div className="relative w-full flex items-center justify-center gap-3 sm:gap-6 mt-1 overflow-visible">
        {/* Left Flanking HUD Line */}
        <div className="flex-1 hidden md:flex justify-end overflow-visible">
          <HudFlankLine side="left" isInView={isInView} />
        </div>

        {/* Line 2 Text */}
        <div className="overflow-hidden shrink-0">
          <motion.div
            initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASINGS.cyber }}
            className="text-[28px] sm:text-[42px] lg:text-[52px] leading-[1.25] font-bold tracking-[0.02em] text-[#C3D4FF] font-mono uppercase"
          >
            {headlineLine2}
          </motion.div>
        </div>

        {/* Right Flanking HUD Line */}
        <div className="flex-1 hidden md:flex justify-start overflow-visible">
          <HudFlankLine side="right" isInView={isInView} />
        </div>
      </div>
    </header>
  );
}
