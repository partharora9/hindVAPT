"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./core-capabilities/SectionHeader";
import { CardStack } from "./core-capabilities/CardStack";
import { EASINGS } from "@/config/animation";

interface CoreCapabilitiesProps {
  id?: string;
  showFloatingBadge?: boolean;
}

export function CoreCapabilities({
  id = "capabilities",
}: CoreCapabilitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-gradient-to-b from-[#020617] via-[#030818] to-[#020617] text-[#C3D4FF] border-b border-[rgba(30,155,255,0.15)]"
      aria-label="Core Capabilities: One Platform. Total Visibility."
    >
      {/* 1. SEAMLESS BACKGROUND GRID & RADIAL GLOWS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E9BFF 1px, transparent 1px), linear-gradient(to bottom, #1E9BFF 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient Top & Center Radial Glows */}
        <div
          className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(30, 155, 255, 0.45) 0%, rgba(10, 58, 122, 0.15) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(76, 184, 255, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Subtle Outer Frame Lines continuing through Section */}
        <div className="absolute inset-y-0 left-4 sm:left-8 lg:left-12 w-[1px] bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.12)] to-transparent" />
        <div className="absolute inset-y-0 right-4 sm:right-8 lg:right-12 w-[1px] bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.12)] to-transparent" />
      </div>

      {/* 2. SECTION CONTENT */}
      <div className="relative z-10 w-full pt-12 sm:pt-16 lg:pt-20">
        {/* Centered Section Header */}
        <SectionHeader isInView={isInView} />

        {/* Scroll-Driven Card Stack (300vh runway on desktop, vertical flow on mobile) */}
        <CardStack isInView={isInView} />
      </div>

      {/* 3. BOTTOM DIAGONAL HATCH BAND DIVIDER (Continuity to Section 5) */}
      <div className="relative z-10 w-full overflow-hidden mt-12 sm:mt-16">
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
    </section>
  );
}

// Named alias matching deliverable specification
export { CoreCapabilities as CoreCapabilitiesSection };
