"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

export function AboutStandards() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [activeCellId, setActiveCellId] = useState<string | null>(null);
  const standards = ABOUT_CONTENT.standards;

  const decodedHeading = useScramble(standards.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  return (
    <section
      ref={containerRef}
      id="standards"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#03081A] select-none"
      aria-label="Industry Standards and Frameworks"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
            [ {standards.tag} ]
          </div>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase">
            {decodedHeading || standards.h2}
          </h2>
        </div>

        {/* 4×3 Bracketed Grid of 12 Cells */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {standards.items.map((item, idx) => {
            const isActive = activeCellId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: EASINGS.cyber }}
                onMouseEnter={() => setActiveCellId(item.id)}
                onMouseLeave={() => setActiveCellId(null)}
                onClick={() => setActiveCellId(isActive ? null : item.id)}
                className="relative p-6 min-h-[140px] rounded-[6px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] hover:border-[#1E9BFF]/60 hover:bg-[#081229] transition-all cursor-pointer flex flex-col justify-between group"
              >
                {/* Corner "+" marks */}
                <div className="absolute -top-1 -left-1 text-[#1E9BFF] font-mono text-[10px] font-bold leading-none select-none">
                  +
                </div>
                <div className="absolute -bottom-1 -right-1 text-[#1E9BFF] font-mono text-[10px] font-bold leading-none select-none">
                  +
                </div>

                {/* Stylized Wordmark */}
                <div className="font-mono text-[16px] sm:text-[18px] font-bold text-white tracking-wide uppercase transition-colors group-hover:text-[#1E9BFF]">
                  {item.name}
                </div>

                {/* Reveal on hover/tap: "How we use it" */}
                <div className="mt-3 pt-3 border-t border-[rgba(30,155,255,0.12)]">
                  <span className="block text-[10px] font-mono uppercase text-[#6B7FA8] mb-1">
                    How we use it:
                  </span>
                  <p className="text-[12px] font-mono text-[#8FA3C7] group-hover:text-[#C3D4FF] transition-colors leading-relaxed">
                    {item.usage}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs font-mono text-[#6B7FA8]">
          {standards.footnote}
        </div>
      </div>
    </section>
  );
}
