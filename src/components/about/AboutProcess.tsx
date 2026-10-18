"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";

export function AboutProcess() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const shouldReduceMotion = useReducedMotion();
  const processData = ABOUT_CONTENT.process;

  const decodedHeading = useScramble(processData.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  // Scroll-driven timeline tracking
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#020617] select-none"
      aria-label="Engagement Methodology and Process"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
            [ {processData.tag} ]
          </div>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase">
            {decodedHeading || processData.h2}
          </h2>
        </div>

        {/* Scroll-Driven Timeline Container */}
        <div ref={timelineRef} className="relative w-full">
          {/* Central Vertical Line (Desktop: center, Mobile: left-4) */}
          <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-[rgba(30,155,255,0.15)] overflow-hidden">
            <motion.div
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
                originY: 0,
              }}
              className="w-full h-full bg-gradient-to-b from-[#1E9BFF] via-[#3AA8FF] to-[#1E9BFF] shadow-[0_0_12px_#1E9BFF]"
            />
          </div>

          {/* Timeline Steps [01] to [06] */}
          <div className="space-y-12 sm:space-y-16">
            {processData.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Timeline Central Node Marker */}
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-[#020617] border-2 border-[#1E9BFF] z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF] shadow-[0_0_8px_#1E9BFF]" />
                  </div>

                  {/* Card: Placed on left or right of center on desktop, indent on mobile */}
                  <div
                    className={`pl-12 lg:pl-0 w-full lg:w-[46%] ${
                      isEven ? "lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    <div className="relative p-6 sm:p-7 rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.22)] hover:border-[#1E9BFF]/60 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                      {/* Corner Brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#1E9BFF]" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#1E9BFF]" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#1E9BFF]" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#1E9BFF]" />

                      {/* Step Number + Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[#1E9BFF] font-mono text-sm sm:text-base font-bold">
                          {step.number}
                        </span>
                        <h3 className="text-white font-mono text-[16px] sm:text-[18px] font-bold uppercase tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* 2-line Description */}
                      <p className="text-[#8FA3C7] font-mono text-[14px] sm:text-[15px] leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Deliverable Chip in Accent */}
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[rgba(30,155,255,0.1)] border border-[rgba(30,155,255,0.3)] text-[11px] font-mono">
                        <span className="text-[#6B7FA8] uppercase">Deliverable:</span>
                        <span className="text-[#1E9BFF] font-bold">{step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
