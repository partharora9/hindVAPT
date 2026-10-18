"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Navbar } from "./Navbar";
import { HeroContent } from "./HeroContent";
import { ShieldVisual } from "./ShieldVisual";
import { CircuitTraces } from "./CircuitTraces";
import { ParticleField } from "./ParticleField";
import { FloatingBadgeCard } from "./FloatingBadgeCard";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { DELAYS, DURATIONS, EASINGS, dividerVariants } from "@/config/animation";
import type { HeroProps } from "@/types";

export function Hero({
  showFloatingBadge = false,
  onCtaClick,
  onLearnMoreClick,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [badgeVisible, setBadgeVisible] = useState(showFloatingBadge);

  // Mouse Parallax & 3D Tilt hook
  const {
    tracesX,
    tracesY,
    ringX,
    ringY,
    shieldX,
    shieldY,
    orbsX,
    orbsY,
    tiltRotateX,
    tiltRotateY,
    reflectionX,
    reflectionY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax();

  // Scroll Effects (useScroll + useTransform)
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 400], [0, -60]);
  const shieldScrollScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const shieldScrollOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <div
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[907px] w-full bg-[#020617] overflow-hidden flex flex-col justify-between selection:bg-[#1E9BFF]/30 selection:text-white"
    >
      {/* 1. BACKGROUND CYBER GRID & VIGNETTE (0.0s fade in) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATIONS.fadeGrid, ease: "easeOut" }}
        className="absolute inset-0 cyber-grid pointer-events-none -z-20"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATIONS.fadeGrid, ease: "easeOut" }}
        className="absolute inset-0 cyber-vignette pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2. TOP HAIRLINE HERO FRAME & L-SHAPED CORNER BRACKETS (0.0s) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-30 px-4 sm:px-8 max-w-[1600px] mx-auto">
        {/* Continuous 1px outer frame lines */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />

        {/* Top-Left L-bracket */}
        <div className="absolute top-3 left-4 sm:left-8 w-5 h-5">
          <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
            <motion.path
              d="M 1 18 V 1 H 18"
              stroke="#1E9BFF"
              strokeWidth="1.5"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: DELAYS.frame,
                duration: DURATIONS.bracketDraw,
                ease: EASINGS.cyber,
              }}
            />
          </svg>
        </div>

        {/* Top-Right L-bracket */}
        <div className="absolute top-3 right-4 sm:right-8 w-5 h-5">
          <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
            <motion.path
              d="M 2 1 H 19 V 18"
              stroke="#1E9BFF"
              strokeWidth="1.5"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: DELAYS.frame,
                duration: DURATIONS.bracketDraw,
                ease: EASINGS.cyber,
              }}
            />
          </svg>
        </div>
      </div>

      {/* 3. NAVBAR (~104px height) */}
      <Navbar onStartTrial={onCtaClick} />

      {/* 4. MAIN HERO 50/50 SPLIT CONTAINER */}
      <main className="relative flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:pl-[52px] lg:pr-6 flex flex-col justify-center">
        {/* Hairline 1px Vertical Divider at 50% (desktop only: draws at 0.4s top to bottom, fades out at bottom edge before hatch band) */}
        <motion.div
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
          style={{ originY: 0 }}
          className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[rgba(30,155,255,0.15)] via-[rgba(30,155,255,0.15)] from-70% to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Grid Split */}
        <div className="relative w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-8 lg:gap-12 min-h-[760px]">
          {/* Left Column: Typography, HUD line, CTAs, Stats */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: heroContentY }}
            className="w-full flex justify-start z-20"
          >
            <HeroContent
              onStartTrial={onCtaClick}
              onSeeHowItWorks={onLearnMoreClick}
            />
          </motion.div>

          {/* Right Column: Visual layers (traces, rings, shield, particles) */}
          <div className="relative w-full h-[520px] sm:h-[620px] xl:h-[760px] flex items-center justify-center overflow-visible">
            {/* Visual background on medium screens if single column */}
            <div className="absolute inset-0 block xl:block">
              {/* Circuit traces descending from top & rising from bottom */}
              <CircuitTraces xOffset={tracesX} yOffset={tracesY} />

              {/* Glowing orbs & star-dust canvas field */}
              <ParticleField xOffset={orbsX} yOffset={orbsY} />

              {/* Central Shield with Double Outline, Binary Rain & Orbit Rings */}
              <ShieldVisual
                ringX={ringX}
                ringY={ringY}
                shieldX={shieldX}
                shieldY={shieldY}
                tiltRotateX={tiltRotateX}
                tiltRotateY={tiltRotateY}
                reflectionX={reflectionX}
                reflectionY={reflectionY}
                scrollScale={shieldScrollScale}
                scrollOpacity={shieldScrollOpacity}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 5. FLOATING HUD TOGGLE (allows user to preview with/without reference badge card) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setBadgeVisible(!badgeVisible)}
          className="px-3 py-1.5 bg-[#030919]/90 border border-[#1E9BFF]/30 text-[10px] uppercase tracking-wider text-[#8FA3C7] hover:text-[#1E9BFF] hover:border-[#1E9BFF] rounded-none transition-colors backdrop-blur-md cursor-pointer flex items-center gap-2"
          aria-label="Toggle reference badge card"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              badgeVisible ? "bg-[#1E9BFF] shadow-[0_0_6px_#1E9BFF]" : "bg-gray-600"
            }`}
          />
          Reference Badge: {badgeVisible ? "ON" : "OFF"}
        </button>
      </div>

      {/* 6. OPTIONAL FLOATING BADGE CARD (Bottom-Right, Default OFF) */}
      <FloatingBadgeCard
        isVisible={badgeVisible}
        onClose={() => setBadgeVisible(false)}
      />
    </div>
  );
}
