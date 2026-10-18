"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

export function AboutEthics() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const shouldReduceMotion = useReducedMotion();
  const ethics = ABOUT_CONTENT.ethics;

  const decodedHeading = useScramble(ethics.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  return (
    <section
      ref={containerRef}
      id="ethics"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#03081A] select-none"
      aria-label="Trust and Rules of Engagement"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Wide Bracketed Panel */}
        <div className="relative p-8 sm:p-12 rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.25)] shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#1E9BFF]" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#1E9BFF]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#1E9BFF]" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#1E9BFF]" />

          {/* Header Block inside Panel */}
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
              [ {ethics.tag} ]
            </div>
            <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase">
              {decodedHeading || ethics.h2}
            </h2>
          </div>

          {/* 2-Column Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 max-w-[960px] mx-auto">
            {ethics.commitments.map((item, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: EASINGS.cyber }}
                className="flex items-start gap-4 p-4 rounded-[6px] bg-[#030818]/60 border border-[rgba(30,155,255,0.14)] hover:border-[#1E9BFF]/40 transition-colors"
              >
                {/* Checkbox Icon */}
                <div className="w-6 h-6 rounded-[4px] bg-[rgba(30,155,255,0.12)] border border-[rgba(30,155,255,0.4)] flex items-center justify-center shrink-0 mt-0.5 text-[#1E9BFF]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <span className="font-mono text-[14px] sm:text-[15px] text-[#C3D4FF] font-medium leading-relaxed">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
