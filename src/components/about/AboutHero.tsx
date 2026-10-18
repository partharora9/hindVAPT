"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";
import { HudLine } from "@/components/HudLine";
import { CircuitTraces } from "@/components/CircuitTraces";
import { ParticleField } from "@/components/ParticleField";

export function AboutHero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const shouldReduceMotion = useReducedMotion();
  const hero = ABOUT_CONTENT.hero;

  const decodedLine1 = useScramble(hero.headlineLine1, {
    durationMs: 700,
    delayMs: 250,
    autoStart: isInView,
  });

  const decodedLine2 = useScramble(hero.headlineLine2, {
    durationMs: 700,
    delayMs: 450,
    autoStart: isInView,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[72svh] w-full pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden border-b border-[rgba(30,155,255,0.15)] bg-gradient-to-b from-[#020617] via-[#03081A] to-[#020617] select-none"
      aria-label="About VAULTIX Hero"
    >
      {/* 1. Ambient Background: Grid, Vignette, Faint Circuit Traces & Particles */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40 -z-20" aria-hidden="true" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none -z-10" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
        <CircuitTraces />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-25 -z-10">
        <ParticleField />
      </div>

      {/* Radar sweep radial glow */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(30,155,255,0.08) 0deg, transparent 60deg, transparent 360deg)",
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Top Flanking HUD Lines */}
      <div className="absolute top-28 left-0 right-0 flex items-center justify-between px-6 sm:px-12 pointer-events-none opacity-40">
        <div className="hidden lg:block w-[320px]">
          <HudLine />
        </div>
        <div className="hidden lg:block w-[320px] scale-x-[-1]">
          <HudLine />
        </div>
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* Breadcrumb */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EASINGS.cyber }}
          className="flex items-center gap-2 text-[13px] font-mono tracking-[0.2em] text-[#6B7FA8] uppercase mb-5"
        >
          <Link href="/" className="hover:text-[#1E9BFF] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-[#C3D4FF]">ABOUT</span>
        </motion.div>

        {/* Tag "[ About VAULTIX ]" */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASINGS.cyber }}
          className="inline-flex items-center gap-2 px-3.5 py-1 text-[12px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-6 shadow-[0_0_15px_rgba(30,155,255,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF]" />
          [ {hero.tag} ]
        </motion.div>

        {/* Headline: 2 Centered Lines */}
        <h1 className="font-mono text-[30px] sm:text-[42px] lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.15] uppercase max-w-[920px]">
          <span className="block">{decodedLine1 || hero.headlineLine1}</span>
          <span className="block text-[#C3D4FF] mt-1">{decodedLine2 || hero.headlineLine2}</span>
        </h1>

        {/* Paragraph (max 640px) */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASINGS.cyber }}
          className="mt-6 text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] text-[#8FA3C7] max-w-[640px] font-mono font-normal"
        >
          {hero.paragraph}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASINGS.cyber }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href={hero.ctaPrimary.href}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#1E9BFF] hover:bg-[#3AA8FF] text-[#020617] font-mono text-[13px] font-bold tracking-[0.1em] uppercase transition-all shadow-[0_0_24px_rgba(30,155,255,0.45)] text-center cursor-pointer"
          >
            {hero.ctaPrimary.label}
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#0C1830] hover:bg-[#122547] border border-[rgba(30,155,255,0.35)] hover:border-[#1E9BFF] text-white font-mono text-[13px] font-semibold tracking-[0.1em] uppercase transition-all text-center cursor-pointer"
          >
            {hero.ctaSecondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
