"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HudLine } from "./HudLine";
import { StatsRow } from "./StatsRow";
import { useScramble } from "@/hooks/useScramble";
import { useMotionGovernance } from "@/context/MotionContext";
import {
  DELAYS,
  EASINGS,
  paragraphVariants,
  buttonContainerVariants,
} from "@/config/animation";

import Link from "next/link";
import { HOME_CONTENT } from "@/content/home";

interface HeroContentProps {
  onStartTrial?: () => void;
  onSeeHowItWorks?: () => void;
}

export function HeroContent({
  onStartTrial,
  onSeeHowItWorks,
}: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const { reduced, isTouch } = useMotionGovernance();
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [_isOutlineHovered, setIsOutlineHovered] = useState(false);

  // Scramble decode effect for line 1 and line 2
  const line1Text = useScramble(HOME_CONTENT.hero.headlineLine1, {
    durationMs: reduced ? 0 : 700,
    delayMs: 500,
  });

  const line2Text = useScramble(HOME_CONTENT.hero.headlineLine2, {
    durationMs: reduced ? 0 : 750,
    delayMs: 650,
  });

  return (
    <div className="flex flex-col justify-center h-full max-w-[680px] w-full z-10 py-6 sm:py-8 lg:py-12">
      {/* H1 Heading: Masked slide-up + character decode/scramble */}
      <h1 className="text-[clamp(2.1rem,6vw,4rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-[#C3D4FF] select-none">
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
        {HOME_CONTENT.hero.paragraph}
      </motion.p>

      {/* HUD Circuit Divider (SVG) */}
      <div className="w-full overflow-hidden">
        <HudLine />
      </div>

      {/* CTA Button Row: Solid Primary + Outlined Secondary */}
      <motion.div
        variants={buttonContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full"
      >
        {/* 1. Primary Solid Accent Button */}
        <Link
          href={HOME_CONTENT.hero.ctaPrimary.href}
          onClick={() => {
            if (onStartTrial) onStartTrial();
          }}
          onMouseEnter={() => !isTouch && setIsPrimaryHovered(true)}
          onMouseLeave={() => !isTouch && setIsPrimaryHovered(false)}
          className="relative inline-flex items-center justify-center min-h-[48px] px-8 py-4 bg-[#1E9BFF] text-[#020617] text-[13px] font-bold tracking-[0.2em] uppercase rounded-none overflow-hidden transition-all duration-200 shadow-[0_0_20px_rgba(30,155,255,0.35)] hover:shadow-[0_0_35px_rgba(30,155,255,0.7)] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] cursor-pointer text-center"
        >
          {/* Shimmer sweep effect */}
          <span
            className={`absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-700 ease-in-out pointer-events-none ${
              isPrimaryHovered ? "translate-x-[300%]" : ""
            }`}
          />
          <span className="relative z-10">{HOME_CONTENT.hero.ctaPrimary.label}</span>
        </Link>

        {/* 2. Secondary Outlined Button with Corner Brackets */}
        <Link
          href={HOME_CONTENT.hero.ctaSecondary.href}
          onClick={() => {
            if (onSeeHowItWorks) onSeeHowItWorks();
          }}
          onMouseEnter={() => !isTouch && setIsOutlineHovered(true)}
          onMouseLeave={() => !isTouch && setIsOutlineHovered(false)}
          className="relative inline-flex items-center justify-center min-h-[48px] px-8 py-4 bg-[#0B1528]/80 text-white text-[13px] font-bold tracking-[0.2em] uppercase rounded-none border border-[rgba(30,155,255,0.3)] hover:border-[#1E9BFF] transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] cursor-pointer text-center"
        >
          {/* 4 Corner L-Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-[#1E9BFF]" />
          <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-[#1E9BFF]" />
          <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-[#1E9BFF]" />
          <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-[#1E9BFF]" />
          <span className="relative z-10 transition-colors duration-200">
            {HOME_CONTENT.hero.ctaSecondary.label}
          </span>
        </Link>
      </motion.div>

      {/* Numerical Stats Row */}
      <StatsRow />
    </div>
  );
}
