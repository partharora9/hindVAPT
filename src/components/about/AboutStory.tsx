"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export function AboutStory() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const shouldReduceMotion = useReducedMotion();
  const story = ABOUT_CONTENT.story;

  const decodedHeading = useScramble(story.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  // Terminal Checklist typing simulation
  const [typingProgress, setTypingProgress] = useState(65);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const interval = setInterval(() => {
      setTypingProgress((prev) => {
        if (prev >= 100) {
          return 10;
        }
        return prev + 15;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#020617] select-none"
      aria-label="Our Mission and Story"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
              [ {story.tag} ]
            </div>

            <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase mb-6">
              {decodedHeading || story.h2}
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#8FA3C7] font-mono leading-[28px]">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Bracketed Terminal-Style Panel */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#050C1F] border border-[rgba(30,155,255,0.25)] rounded-[8px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#1E9BFF]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#1E9BFF]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#1E9BFF]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#1E9BFF]" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(30,155,255,0.15)] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-[#6B7FA8] tracking-wider uppercase">
                    ENGAGEMENT_LIFECYCLE.LOG
                  </span>
                </div>
                <SampleDataBadge />
              </div>

              {/* Terminal Checklist Content */}
              <div className="space-y-3.5 font-mono text-[13px] sm:text-[14px]">
                <div className="flex items-center gap-2.5 text-[#22C55E]">
                  <span className="font-bold">[✓]</span>
                  <span className="text-[#C3D4FF]">Scope agreed in writing</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#22C55E]">
                  <span className="font-bold">[✓]</span>
                  <span className="text-[#C3D4FF]">Rules of engagement signed</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#22C55E]">
                  <span className="font-bold">[✓]</span>
                  <span className="text-[#C3D4FF]">Reconnaissance complete</span>
                </div>

                {/* In Progress Line with Filling Bar */}
                <div className="p-2.5 rounded bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.2)]">
                  <div className="flex items-center justify-between text-[#1E9BFF] mb-1.5">
                    <span className="font-bold">[~] Testing in progress</span>
                    <span className="text-xs">{typingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0C1830] rounded-full overflow-hidden">
                    <motion.div
                      style={{ width: `${typingProgress}%` }}
                      className="h-full bg-gradient-to-r from-[#1E9BFF] to-[#3AA8FF]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-[#6B7FA8]">
                  <span className="font-bold">[ ]</span>
                  <span>Report and walkthrough</span>
                  <span className="inline-block w-2 h-4 bg-[#1E9BFF] ml-1 animate-pulse" />
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[rgba(30,155,255,0.1)] text-[10px] text-[#6B7FA8] font-mono">
                Illustrative workflow telemetry · Non-destructive assessment methodology
              </div>
            </div>
          </div>
        </div>

        {/* 4-Cell Stat Strip in Services-grid style (bracketed cells, "+" marks) */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {story.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-[6px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] hover:border-[#1E9BFF]/50 transition-colors"
            >
              {/* Corner "+" tick */}
              <div className="absolute -top-1.5 -left-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 text-[#1E9BFF] font-mono text-xs font-bold leading-none select-none">
                +
              </div>

              <div className="text-[26px] sm:text-[32px] font-bold text-white font-mono tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[12px] sm:text-[13px] text-[#8FA3C7] font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
