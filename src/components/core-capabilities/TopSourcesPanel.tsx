"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MagnifierLens } from "./MagnifierLens";

interface SourceRowItem {
  id: string;
  type: "bug" | "globe" | "cloud";
  title: string;
  subtitle: string;
  baseEvH: number;
  barPercent: number;
}

const INITIAL_ROWS: SourceRowItem[] = [
  {
    id: "source-1",
    type: "bug",
    title: "Phishing Wave",
    subtitle: "Compromised Bucket",
    baseEvH: 112,
    barPercent: 42,
  },
  {
    id: "source-2",
    type: "globe",
    title: "APT29 (COZY BEAR)",
    subtitle: "Origin: Russia",
    baseEvH: 243,
    barPercent: 82,
  },
  {
    id: "source-3",
    type: "cloud",
    title: "AWS US-EAST-1",
    subtitle: "Compromised Bucket",
    baseEvH: 112,
    barPercent: 42,
  },
];

interface TopSourcesPanelProps {
  isInView?: boolean;
  isActive?: boolean;
  parallaxOffset?: { x: number; y: number };
}

export function TopSourcesPanel({
  isInView = true,
  isActive = true,
  parallaxOffset = { x: 0, y: 0 },
}: TopSourcesPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<number[]>([112, 243, 112]);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);
  const [flashingIndex, setFlashingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Live metric tick variations every 3.5s (paused on covered cards)
  useEffect(() => {
    if (shouldReduceMotion || !isActive) return;

    const interval = setInterval(() => {
      const targetRow = Math.floor(Math.random() * 3);
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 12) + 3);

      setMetrics((prev) => {
        const next = [...prev];
        const base = INITIAL_ROWS[targetRow].baseEvH;
        next[targetRow] = Math.max(80, Math.min(380, base + delta));
        return next;
      });

      setFlashingIndex(targetRow);
      setTimeout(() => setFlashingIndex(null), 500);
    }, 3800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Feed highlight sweep down rows every 4s
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % 3);
    }, 4200);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.6,
        y: parallaxOffset.y * 0.6,
      }}
      className="relative w-full max-w-[445px] h-[305px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle top inner gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,155,255,0.04)] to-transparent pointer-events-none" />

      {/* Panel Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(120,150,255,0.08)]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-[#C3D4FF] uppercase font-mono">
            TOP SOURCES
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF] animate-pulse" />
          <span className="text-[11px] text-[#6B7FA8] font-mono tracking-wider">LIVE</span>
        </div>
      </div>

      {/* 3 Source Rows */}
      <div className="relative z-10 flex flex-col gap-2.5 my-auto">
        {INITIAL_ROWS.map((row, idx) => {
          const isHighlighted = activeHighlightIndex === idx;
          const isFlashing = flashingIndex === idx;
          const isHovered = hoveredIndex === idx;
          const currentEvH = metrics[idx];
          const dynamicPercent = Math.min(
            100,
            Math.max(20, Math.round((currentEvH / 300) * 100))
          );

          return (
            <motion.div
              key={row.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                backgroundColor: isHovered
                  ? "rgba(30, 155, 255, 0.12)"
                  : isHighlighted
                  ? "rgba(30, 155, 255, 0.05)"
                  : "rgba(11, 20, 38, 0.4)",
                scale: isHovered ? 1.015 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-between p-2 sm:p-2.5 rounded-[8px] border border-[rgba(120,150,255,0.08)] transition-colors cursor-pointer group"
            >
              {/* Left: Icon Tile + Title/Subtitle */}
              <div className="flex items-center gap-3">
                {/* 40px Icon Tile */}
                <div
                  className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? "bg-[#1E9BFF]/25 shadow-[0_0_12px_rgba(30,155,255,0.4)] border border-[#4CB8FF]/40"
                      : "bg-[#0E1A30] border border-[rgba(30,155,255,0.18)]"
                  }`}
                >
                  {row.type === "bug" && (
                    <motion.svg
                      animate={
                        !shouldReduceMotion && (idx === 0 || isHovered)
                          ? { rotate: [0, -4, 4, 0] }
                          : { rotate: 0 }
                      }
                      transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 3 }}
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-[#4CB8FF]"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      {/* Cyber Bug / Beetle */}
                      <rect x="7" y="7" width="10" height="12" rx="4" />
                      <line x1="12" y1="7" x2="12" y2="19" />
                      {/* Antennae */}
                      <path d="M9 7 L6 3" strokeLinecap="round" />
                      <path d="M15 7 L18 3" strokeLinecap="round" />
                      {/* Legs */}
                      <path d="M7 10 H3" strokeLinecap="round" />
                      <path d="M17 10 H21" strokeLinecap="round" />
                      <path d="M7 15 H3" strokeLinecap="round" />
                      <path d="M17 15 H21" strokeLinecap="round" />
                    </motion.svg>
                  )}

                  {row.type === "globe" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-[#4CB8FF]"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      {/* Globe */}
                      <circle cx="12" cy="12" r="8" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <ellipse cx="12" cy="12" rx="4" ry="8" />
                    </svg>
                  )}

                  {row.type === "cloud" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-[#4CB8FF]"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      {/* Cloud */}
                      <path
                        d="M6 18H17A4 4 0 0 0 17 10A5 5 0 0 0 7 12A3.5 3.5 0 0 0 6 18Z"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Name line and gray mono sub-line */}
                <div className="flex flex-col">
                  <span className="text-[13px] sm:text-[14px] font-bold text-white group-hover:text-[#C3D4FF] transition-colors leading-tight">
                    {row.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#8FA3C7] font-mono tracking-wider mt-0.5">
                    {row.subtitle}
                  </span>
                </div>
              </div>

              {/* Right: Metric in accent blue + short progress bar */}
              <div className="flex flex-col items-end gap-1.5 pl-2">
                <motion.span
                  animate={
                    isFlashing
                      ? { color: ["#FFFFFF", "#4CB8FF"], scale: [1.1, 1] }
                      : { color: "#4CB8FF", scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  className="text-[13px] sm:text-[14px] font-mono font-bold tracking-wide"
                >
                  {currentEvH} ev/h
                </motion.span>

                {/* Progress bar underneath */}
                <div className="w-[84px] sm:w-[100px] h-1.5 bg-[#0B1426] rounded-full overflow-hidden border border-[rgba(76,184,255,0.2)]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1E9BFF] to-[#4CB8FF] rounded-full"
                    animate={{
                      width: `${isHovered ? Math.min(100, dynamicPercent + 8) : dynamicPercent}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 15,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Magnifying Glass Lens overlapping lower-right over row 3 */}
      <MagnifierLens
        className="bottom-2 right-4 sm:right-6"
        parallaxX={parallaxOffset.x * 1.3}
        parallaxY={parallaxOffset.y * 1.3}
      />
    </motion.div>
  );
}
