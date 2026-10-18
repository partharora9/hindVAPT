"use client";

import React, { useRef } from "react";
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
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useMotionGovernance } from "@/context/MotionContext";
import { DURATIONS, dividerVariants } from "@/config/animation";
import type { HeroProps } from "@/types";

export function Hero({
  onCtaClick,
  onLearnMoreClick,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isTouch } = useMotionGovernance();

  // Mouse Parallax & 3D Tilt hook (only active on non-touch fine pointers)
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

  // Scroll Effects
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 400], [0, -40]);
  const shieldScrollScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const shieldScrollOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Hero Overview"
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
      className="relative min-h-[calc(100svh-104px)] [@media(max-height:500px)]:min-h-0 lg:min-h-[880px] w-full bg-[#020617] overflow-x-clip flex flex-col justify-between selection:bg-[#1E9BFF]/30 selection:text-white pt-[104px]"
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
      <div className="absolute top-[104px] left-0 right-0 pointer-events-none z-30 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />

        {/* Top-Left Bracket */}
        <div className="absolute top-0 left-4 sm:left-8 -translate-x-1/2 w-3.5 h-3.5 pointer-events-none">
          <span className="absolute top-0 left-0 w-full h-[1.5px] bg-[#1E9BFF]" />
          <span className="absolute top-0 left-0 w-[1.5px] h-full bg-[#1E9BFF]" />
        </div>

        {/* Top-Right Bracket */}
        <div className="absolute top-0 right-4 sm:right-8 translate-x-1/2 w-3.5 h-3.5 pointer-events-none">
          <span className="absolute top-0 right-0 w-full h-[1.5px] bg-[#1E9BFF]" />
          <span className="absolute top-0 right-0 w-[1.5px] h-full bg-[#1E9BFF]" />
        </div>
      </div>

      {/* 3. NAVBAR (~104px height fixed header) */}
      <Navbar onStartTrial={onCtaClick} />

      {/* 4. MAIN HERO CONTAINER */}
      <div className="relative flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:pl-[52px] lg:pr-6 flex flex-col justify-center my-auto py-8 lg:py-12">
        {/* Hairline 1px Vertical Divider at 50% (desktop only) */}
        <motion.div
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
          style={{ originY: 0 }}
          className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[rgba(30,155,255,0.15)] via-[rgba(30,155,255,0.15)] from-70% to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Responsive Grid Split (1 col on mobile, 2 cols on xl) */}
        <div className="relative w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-10 xl:gap-12 min-h-[580px] sm:min-h-[680px] xl:min-h-[760px]">
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
          <div className="relative w-full h-[420px] sm:h-[540px] xl:h-[760px] flex items-center justify-center overflow-visible max-w-[90vw] mx-auto">
            <div className="absolute inset-0">
              <CircuitTraces xOffset={tracesX} yOffset={tracesY} />
              <ParticleField xOffset={orbsX} yOffset={orbsY} />
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
      </div>
    </section>
  );
}
