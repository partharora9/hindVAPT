"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SectionHeader } from "./core-capabilities/SectionHeader";
import { FaqAccordion } from "./faq/FaqAccordion";
import { FloatingBadgeCard } from "./FloatingBadgeCard";
import { EASINGS } from "@/config/animation";

interface FaqProps {
  id?: string;
  showFloatingBadge?: boolean;
  allowMultiple?: boolean;
}

export function Faq({
  id = "faq",
  showFloatingBadge = false,
  allowMultiple = false,
}: FaqProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [badgeVisible, setBadgeVisible] = useState(showFloatingBadge);

  // Entrance trigger when section is ~25% in view (once)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  // Scroll parallax mapping
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerParallaxY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const listParallaxY = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-gradient-to-b from-[#020617] via-[#020617] to-[#030818] overflow-hidden select-none pt-20 sm:pt-28 pb-16 lg:pb-24 border-b border-[rgba(30,155,255,0.15)]"
      aria-label="Frequently Asked Questions"
    >
      {/* 1. SEAMLESS BACKGROUND GRID & VIGNETTE CONTINUITY */}
      <div className="absolute inset-0 cyber-grid pointer-events-none -z-20" aria-hidden="true" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none -z-10" aria-hidden="true" />

      {/* Continuity: 1px outer frame boundary lines along left and right */}
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
        {/* Reused Section 4 Header (Identical copy & flanking circuit lines) */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerParallaxY }}
          className="w-full flex justify-center"
        >
          <SectionHeader isInView={isInView} />
        </motion.div>

        {/* Centered FAQ List (~1150px wide, ~120px below headline) */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : listParallaxY }}
          className="w-full flex justify-center mt-12 sm:mt-16 lg:mt-24"
        >
          <FaqAccordion allowMultiple={allowMultiple} isInView={isInView} />
        </motion.div>
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

      {/* Optional Floating Badge Card (Default OFF) */}
      <FloatingBadgeCard
        isVisible={badgeVisible}
        onClose={() => setBadgeVisible(false)}
      />
    </section>
  );
}

// Named alias matching deliverable specification
export { Faq as FaqSection };
