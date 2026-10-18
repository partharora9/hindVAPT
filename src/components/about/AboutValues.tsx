"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

export function AboutValues() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const shouldReduceMotion = useReducedMotion();
  const values = ABOUT_CONTENT.values;

  const decodedHeading = useScramble(values.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  return (
    <section
      ref={containerRef}
      id="values"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#03081A] select-none"
      aria-label="Principles and Values"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
            [ {values.tag} ]
          </div>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase">
            {decodedHeading || values.h2}
          </h2>
        </div>

        {/* 4-Cell Grid in Services-grid style (bracketed cells, "+" marks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: EASINGS.cyber }}
              className="relative p-8 rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] hover:border-[#1E9BFF]/60 hover:bg-[#07112B] transition-all group"
            >
              {/* Corner "+" tick marks */}
              <div className="absolute -top-1.5 -left-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>
              <div className="absolute -top-1.5 -right-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>
              <div className="absolute -bottom-1.5 -left-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>

              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-[6px] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.3)] flex items-center justify-center text-[#1E9BFF] mb-6 group-hover:scale-105 group-hover:border-[#1E9BFF] transition-all">
                {item.iconType === "auth" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                )}
                {item.iconType === "evidence" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                )}
                {item.iconType === "responsible" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
                {item.iconType === "transfer" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-white font-mono text-[18px] sm:text-[20px] font-bold uppercase tracking-wide mb-3">
                {item.title}
              </h3>
              <p className="text-[#8FA3C7] font-mono text-[14px] sm:text-[15px] leading-[26px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
