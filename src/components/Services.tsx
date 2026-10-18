"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ServicesHeader } from "./services/ServicesHeader";
import { ServicesGrid } from "./services/ServicesGrid";
import { EASINGS } from "@/config/animation";

interface ServicesProps {
  id?: string;
  showFloatingBadge?: boolean;
}

export function Services({
  id = "services",
}: ServicesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance trigger when section is ~25% in view (once)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  // Scroll parallax mapping: header moves slightly slower than the grid (~12px)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerParallaxY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const gridParallaxY = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="content-auto relative w-full bg-gradient-to-b from-[#020617] via-[#020617] to-[#030818] text-[#C3D4FF] select-none pt-20 sm:pt-28 pb-16 lg:pb-24 border-b border-[rgba(30,155,255,0.15)]"
      aria-label="Services: End-To-End Protection Against Cyber Threats"
    >
      {/* 1. SEAMLESS BACKGROUND GRID & VIGNETTE CONTINUITY */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E9BFF 1px, transparent 1px), linear-gradient(to bottom, #1E9BFF 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Glow behind Header */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(30, 155, 255, 0.4) 0%, rgba(10, 58, 122, 0.1) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Center Glow behind Grid */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(58, 168, 255, 0.25) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Continuity: 1px outer frame boundary lines */}
        <div className="absolute inset-y-0 left-4 sm:left-8 lg:left-12 w-[1px] bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.12)] to-transparent" />
        <div className="absolute inset-y-0 right-4 sm:right-8 lg:right-12 w-[1px] bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.12)] to-transparent" />
      </div>

      {/* 2. SECTION CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        {/* Parallax Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerParallaxY }}
          className="w-full flex justify-center"
        >
          <ServicesHeader isInView={isInView} />
        </motion.div>

        {/* Services Grid (3x3, 9 cells) */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : gridParallaxY }}
          className="w-full flex justify-center mt-2"
        >
          <ServicesGrid isInView={isInView} />
        </motion.div>
      </div>

      {/* 3. BOTTOM DIAGONAL HATCH BAND DIVIDER (Continuity to footer) */}
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
export { Services as ServicesSection };
