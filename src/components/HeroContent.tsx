"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HudLine } from "./HudLine";
import { StatsRow } from "./StatsRow";
import { useScramble } from "@/hooks/useScramble";
import {
  DELAYS,
  DURATIONS,
  EASINGS,
  paragraphVariants,
  buttonContainerVariants,
} from "@/config/animation";

interface HeroContentProps {
  onStartTrial?: () => void;
  onSeeHowItWorks?: () => void;
}

export function HeroContent({
  onStartTrial,
  onSeeHowItWorks,
}: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isOutlineHovered, setIsOutlineHovered] = useState(false);

  // Scramble decode effect for line 1 and line 2
  const line1Text = useScramble("DETECT THREATS", {
    durationMs: 700,
    delayMs: 500,
  });

  const line2Text = useScramble("BEFORE THEY STRIKE", {
    durationMs: 750,
    delayMs: 650,
  });

  return (
    <div className="flex flex-col justify-center h-full max-w-[680px] z-10 py-8 lg:py-12">
      {/* H1 Heading: Masked slide-up + character decode/scramble */}
      <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[64px] font-extrabold uppercase leading-[1.08] tracking-tight text-[#C3D4FF] select-none">
        {/* Line 1 */}
        <div className="overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: DELAYS.h1,
              duration: 0.8,
              ease: EASINGS.cyber,
            }}
            className="drop-shadow-[0_2px_12px_rgba(30,155,255,0.25)]"
          >
            {line1Text}
          </motion.div>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mt-1 sm:mt-2">
          <motion.div
            initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: DELAYS.h1 + 0.15,
              duration: 0.8,
              ease: EASINGS.cyber,
            }}
            className="drop-shadow-[0_2px_12px_rgba(30,155,255,0.25)]"
          >
            {line2Text}
          </motion.div>
        </div>
      </h1>

      {/* 3-line Paragraph: blur-to-sharp reveal at 1.0s */}
      <motion.p
        variants={paragraphVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 sm:mt-7 text-[15px] sm:text-[17px] leading-[1.65] text-[#8FA3C7] max-w-[540px] font-normal"
      >
        Enterprise-grade cybersecurity platform that
        <br className="hidden sm:inline" /> monitors your entire attack surface
        in real time.
        <br className="hidden sm:inline" /> Identify vulnerabilities, neutralize
        threats.
      </motion.p>

      {/* HUD Circuit Divider (SVG) */}
      <HudLine />

      {/* CTA Button Row: Solid Primary + Outlined Secondary */}
      <motion.div
        variants={buttonContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
      >
        {/* Primary Button */}
        <motion.button
          type="button"
          onClick={onStartTrial}
          onHoverStart={() => setIsPrimaryHovered(true)}
          onHoverEnd={() => setIsPrimaryHovered(false)}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -2,
                  boxShadow: "0 0 32px rgba(30, 155, 255, 0.65)",
                }
          }
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          className="relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-[#1E9BFF] text-[#020617] text-[13px] sm:text-[14px] font-bold tracking-[0.18em] uppercase rounded-none overflow-hidden transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none cursor-pointer"
        >
          {/* Scanline Sweep on Initial Load (1.4s) & Hover shine */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              delay: DELAYS.buttons,
              duration: 1.0,
              ease: EASINGS.cyber,
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
          />

          <span className="relative z-10">START FREE TRIAL</span>

          {/* Initial one-time glow pulse at 1.4s */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.9, 1.1, 1] }}
            transition={{ delay: DELAYS.buttons + 0.2, duration: 1.0 }}
            className="absolute inset-0 bg-[#1E9BFF] blur-md pointer-events-none -z-0"
          />
        </motion.button>

        {/* Outlined Secondary Button */}
        <motion.button
          type="button"
          onClick={onSeeHowItWorks}
          onHoverStart={() => setIsOutlineHovered(true)}
          onHoverEnd={() => setIsOutlineHovered(false)}
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          className="relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-[rgba(30,155,255,0.3)] hover:border-[#1E9BFF] hover:bg-[rgba(30,155,255,0.12)] text-[#C3D4FF] hover:text-white text-[13px] sm:text-[14px] font-bold tracking-[0.18em] uppercase rounded-none transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none cursor-pointer group"
        >
          {/* Corner tick accents appearing on hover */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#1E9BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#1E9BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#1E9BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#1E9BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <span className="relative z-10">SEE HOW IT WORKS</span>
        </motion.button>
      </motion.div>

      {/* Stats Row */}
      <StatsRow />
    </div>
  );
}
