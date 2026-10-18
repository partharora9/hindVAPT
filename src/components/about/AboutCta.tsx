"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

export function AboutCta() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const shouldReduceMotion = useReducedMotion();
  const cta = ABOUT_CONTENT.cta;

  const decodedHeading = useScramble(cta.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 bg-[#020617] overflow-hidden select-none"
      aria-label="Get Started Call to Action"
    >
      {/* 1. TOP DIAGONAL HATCH BAND */}
      <div className="absolute top-0 inset-x-0 overflow-hidden">
        <div
          className="w-full h-8 sm:h-9 cyber-hatch border-b border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>

      {/* 2. MAIN CTA BLOCK */}
      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center pt-8 pb-4">
        {/* Tag "[ Get started ]" */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASINGS.cyber }}
          className="inline-flex items-center gap-2 px-3.5 py-1 text-[12px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-6 shadow-[0_0_15px_rgba(30,155,255,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF]" />
          [ {cta.tag} ]
        </motion.div>

        {/* Heading */}
        <h2 className="font-mono text-[28px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase max-w-[800px]">
          {decodedHeading || cta.h2}
        </h2>

        {/* Paragraph */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASINGS.cyber }}
          className="mt-6 text-[16px] sm:text-[18px] text-[#8FA3C7] max-w-[620px] font-mono leading-relaxed"
        >
          {cta.paragraph}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASINGS.cyber }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href={cta.ctaPrimary.href}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#1E9BFF] hover:bg-[#3AA8FF] text-[#020617] font-mono text-[13px] font-bold tracking-[0.1em] uppercase transition-all shadow-[0_0_24px_rgba(30,155,255,0.45)] text-center cursor-pointer"
          >
            {cta.ctaPrimary.label}
          </Link>
          <Link
            href={cta.ctaSecondary.href}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#0C1830] hover:bg-[#122547] border border-[rgba(30,155,255,0.35)] hover:border-[#1E9BFF] text-white font-mono text-[13px] font-semibold tracking-[0.1em] uppercase transition-all text-center cursor-pointer"
          >
            {cta.ctaSecondary.label}
          </Link>
        </motion.div>
      </div>

      {/* 3. BOTTOM DIAGONAL HATCH BAND */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden">
        <div
          className="w-full h-8 sm:h-9 cyber-hatch border-t border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
