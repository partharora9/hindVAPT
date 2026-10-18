"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SectionTag } from "./threat-landscape/SectionTag";
import { HudHeadlineLine } from "./threat-landscape/HudHeadlineLine";
import { BentoGrid } from "./insights/BentoGrid";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

import { HOME_CONTENT } from "@/content/home";

interface InsightsProps {
  id?: string;
  showFloatingBadge?: boolean;
}

export function Insights({
  id = "insights",
}: InsightsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance trigger when section is ~25% in view (once)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  // Scroll parallax mapping
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerParallaxY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // Scramble decode on headline
  const headlineLine1 = useScramble(HOME_CONTENT.insights.headlineLine1, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  const headlineLine2 = useScramble(HOME_CONTENT.insights.headlineLine2, {
    durationMs: 600,
    delayMs: 350,
    autoStart: isInView,
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      className="content-auto relative w-full bg-gradient-to-b from-[#020617] via-[#020617] to-[#030818] overflow-hidden select-none pt-20 sm:pt-28 pb-16 lg:pb-24 border-b border-[rgba(30,155,255,0.15)]"
      aria-label="Reporting: Findings You Can Act On"
    >
      {/* 1. SEAMLESS BACKGROUND GRID & VIGNETTE CONTINUITY */}
      <div className="absolute inset-0 cyber-grid pointer-events-none -z-20" aria-hidden="true" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none -z-10" aria-hidden="true" />

      {/* Continuity: 1px outer frame lines along left and right boundary */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-30 max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />

        {/* Outer Corner Ticks */}
        <div className="absolute top-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-t border-r border-[#1E9BFF]/60" />
        <div className="absolute top-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-t border-l border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-b border-r border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-b border-l border-[#1E9BFF]/60" />
      </div>

      {/* 2. MAIN SECTION CONTENT WRAPPER */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[52px]">
        {/* ================= 1. REUSED HEADER SECTION ================= */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: headerParallaxY }}
          className="flex flex-col gap-6 mb-12 sm:mb-16"
        >
          {/* Top-Left Tag Badge */}
          <div>
            <SectionTag isInView={isInView} label={HOME_CONTENT.insights.tag} />
          </div>

          {/* Grid Layout: Left Headline + Right Explanatory Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
            {/* Left Column: 2-Line Headline + HUD Circuit Line directly after SHORT */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-[#C3D4FF] font-mono">
                {/* Line 1 */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.cyber }}
                    className="drop-shadow-[0_2px_12px_rgba(30,155,255,0.2)]"
                  >
                    {headlineLine1}
                  </motion.div>
                </div>

                {/* Line 2 with attached HUD Circuit Line */}
                <div className="overflow-visible mt-1 sm:mt-1.5 flex flex-wrap items-center gap-x-3 sm:gap-x-4">
                  <motion.span
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EASINGS.cyber }}
                    className="drop-shadow-[0_2px_12px_rgba(30,155,255,0.2)]"
                  >
                    {headlineLine2}
                  </motion.span>

                  {/* Attached HUD Circuit Line Component */}
                  <HudHeadlineLine isInView={isInView} />
                </div>
              </h2>
            </div>

            {/* Right Column: 3-Line Monospace Paragraph */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 0.85, filter: "blur(0px)", y: 0 }
                    : { opacity: 0, filter: "blur(8px)", y: 16 }
                }
                animate={
                  isInView
                    ? { opacity: 0.85, filter: "blur(0px)", y: 0 }
                    : { opacity: 0, filter: "blur(8px)", y: 16 }
                }
                transition={{ duration: 0.8, delay: 0.5, ease: EASINGS.cyber }}
                className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.68] text-[#C3D4FF] max-w-[560px] font-mono font-normal select-none"
              >
                {HOME_CONTENT.insights.paragraph}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. BENTO GRID (Row 1: 2 cards; Row 2: 3 cards) ================= */}
        <BentoGrid isInView={isInView} />
      </div>

      {/* 3. BOTTOM DIAGONAL HATCH BAND DIVIDER */}
      <div className="relative z-10 w-full overflow-hidden mt-16 sm:mt-24">
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: EASINGS.cyber,
          }}
          style={{ originX: 0 }}
          className="w-full h-10 sm:h-11 cyber-hatch border-t border-b border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

// Named alias matching deliverable specification
export { Insights as InsightsSection };
