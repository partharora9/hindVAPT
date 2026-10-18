"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SectionTag } from "./threat-landscape/SectionTag";
import { HudHeadlineLine } from "./threat-landscape/HudHeadlineLine";
import { ThreatCard, type ThreatCardData } from "./threat-landscape/ThreatCard";
import { GaugeIcon } from "./threat-landscape/GaugeIcon";
import { RadarIcon } from "./threat-landscape/RadarIcon";
import { WarningIcon } from "./threat-landscape/WarningIcon";
import { FloatingBadgeCard } from "./FloatingBadgeCard";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

// Typed Threat Cards Data Array
const THREAT_CARDS_DATA: ThreatCardData[] = [
  {
    id: "breach-detection",
    title: "SLOW BREACH DETECTION",
    description:
      "Average time to identify and contain a data breach. Every hour of delay costs $37,000 in damages.",
    iconComponent: GaugeIcon,
  },
  {
    id: "scaling-blindspots",
    title: "SCALING BLIND SPOTS",
    description:
      "Average cost of a mid-market breach. Scattered tools across cloud, endpoint exploit.",
    iconComponent: RadarIcon,
  },
  {
    id: "alert-fatigue",
    title: "ALERT FATIGUE",
    description:
      "Of security alerts go uninvestigated. Analysts are overwhelmed by false positives that bury the real threats.",
    iconComponent: WarningIcon,
  },
];

interface ThreatLandscapeProps {
  id?: string;
  showFloatingBadge?: boolean;
}

export function ThreatLandscape({
  id = "threat-landscape",
  showFloatingBadge = false,
}: ThreatLandscapeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [badgeVisible, setBadgeVisible] = useState(showFloatingBadge);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Entrance trigger when section is ~25% in view (once)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  // Scroll parallax mapping
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: header text and cards move at slightly different rates (~10px difference)
  const headerParallaxY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const cardsParallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  // Scramble decode effect on main headline
  const headlineLine1 = useScramble("WHY TRADITIONAL SECURITY", {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  const headlineLine2 = useScramble("TOOLS FALL SHORT", {
    durationMs: 600,
    delayMs: 350,
    autoStart: isInView,
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-gradient-to-b from-[#020617] via-[#020617] to-[#030818] overflow-hidden select-none pt-20 sm:pt-24 lg:pt-28 pb-0"
      aria-label="The Threat Landscape"
    >
      {/* Continuity: Shared background cyber grid and vignette */}
      <div className="absolute inset-0 cyber-grid pointer-events-none -z-20" aria-hidden="true" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none -z-10" aria-hidden="true" />

      {/* Continuity: 1px outer frame lines along left and right boundary */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-30 max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />

        {/* Top & Bottom corner ticks */}
        <div className="absolute top-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-t border-r border-[#1E9BFF]/60" />
        <div className="absolute top-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-t border-l border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-b border-r border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-b border-l border-[#1E9BFF]/60" />
      </div>

      {/* Main Section Content Wrapper (~1600px max width with 52px left/right desktop gutter) */}
      <div className="relative max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-[52px]">
        {/* ================= 1. HEADER SECTION (Tag Badge, Headline + HUD Line, Right Paragraph) ================= */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: headerParallaxY }}
          className="flex flex-col gap-6"
        >
          {/* Top-Left Tag Badge */}
          <div>
            <SectionTag isInView={isInView} />
          </div>

          {/* Grid Layout: Left Headline + Right Explanatory Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
            {/* Left Column: 2-Line Headline (~50px) + HUD Circuit Line directly after SHORT */}
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

            {/* Right Column: 3-Line Monospace Paragraph (~18px, ~560px max width) */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <motion.p
                initial={shouldReduceMotion ? { opacity: 0.85, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={isInView ? { opacity: 0.85, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(8px)", y: 16 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASINGS.cyber }}
                className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.68] text-[#C3D4FF] max-w-[560px] font-mono font-normal select-none"
              >
                Cyber threats evolve faster than legacy tools can adapt. Attackers use AI, automation, and zero-days — your defenses need to keep up.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. THREE-COLUMN TOUCHING CARD GRID (~500px × ~530px) ================= */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-3 border-t border-l border-r border-[rgba(30,155,255,0.15)] mt-12 sm:mt-16 bg-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {THREAT_CARDS_DATA.map((card, index) => (
            <ThreatCard
              key={card.id}
              card={card}
              index={index}
              isInView={isInView}
              isAnyHovered={hoveredCardId !== null}
              onHoverStart={() => setHoveredCardId(card.id)}
              onHoverEnd={() => setHoveredCardId(null)}
              isLastCard={index === THREAT_CARDS_DATA.length - 1}
            />
          ))}
        </div>
      </div>

      {/* 3. BOTTOM DIAGONAL HATCH BAND DIVIDER */}
      <div className="w-full overflow-hidden mt-16 sm:mt-20">
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: EASINGS.cyber,
          }}
          style={{ originX: 0 }}
          className="w-full h-11 sm:h-12 cyber-hatch border-t border-b border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>

      {/* Optional Floating Badge Card (Default OFF) */}
      <FloatingBadgeCard
        isVisible={badgeVisible}
        onClose={() => setBadgeVisible(false)}
      />
    </section>
  );
}

// Export alias matching deliverable specification
export { ThreatLandscape as ThreatLandscapeSection };
