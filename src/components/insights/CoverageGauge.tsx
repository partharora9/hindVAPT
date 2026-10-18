"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface CoverageGaugeProps {
  isInView?: boolean;
}

export function CoverageGauge({ isInView = true }: CoverageGaugeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [passingCount, setPassingCount] = useState(0);
  const [phishingCount, setPhishingCount] = useState(0);
  const [isGaugeHovered, setIsGaugeHovered] = useState(false);
  const [hoveredLegendRow, setHoveredLegendRow] = useState<"passing" | "phishing" | null>(null);

  // Entrance count-up
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setPercent(84);
      setPassingCount(1248);
      setPhishingCount(212);
      return;
    }

    const duration = 1800;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setPercent(Math.round(ease * 84));
      setPassingCount(Math.round(ease * 1248));
      setPhishingCount(Math.round(ease * 212));

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, shouldReduceMotion]);

  // Radius = 120, Circumference ≈ 753.98
  // 84% arc length = 753.98 * 0.84 ≈ 633.34
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const targetArc = circumference * 0.84;

  const isHighlighted = isGaugeHovered || hoveredLegendRow === "passing";

  return (
    <div className="relative w-full max-w-[340px] mx-auto flex flex-col items-center justify-center select-none pt-2">
      {/* 1. DONUT GAUGE SVG (~310px) */}
      <div
        className="relative w-[290px] sm:w-[310px] h-[290px] sm:h-[310px] flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsGaugeHovered(true)}
        onMouseLeave={() => setIsGaugeHovered(false)}
        role="img"
        aria-label="Overall mapped control coverage gauge at 84 percent"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full -rotate-90 overflow-visible"
        >
          <defs>
            {/* Bright Accent Gradient */}
            <linearGradient id="gaugeAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E9BFF" />
              <stop offset="60%" stopColor="#1FA3FF" />
              <stop offset="100%" stopColor="#5EC1FF" />
            </linearGradient>

            {/* Accent Ring Glow Filter */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#1FA3FF" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Thick Dark-Blue Track Ring (#1A4A7A, ~20px thick) */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            stroke="#1A4A7A"
            strokeWidth="20"
            fill="none"
            opacity="0.85"
          />

          {/* 2. Bright Accent Ring (#1FA3FF, 16px thick, 84% arc) */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            stroke="url(#gaugeAccentGrad)"
            strokeWidth={isHighlighted ? 18 : 16}
            strokeLinecap="round"
            strokeDasharray={`${targetArc} ${circumference}`}
            fill="none"
            filter="url(#gaugeGlow)"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.8,
              ease: EASINGS.cyber,
            }}
          />

          {/* Traveling Pulse Highlight around ring every 5s */}
          {!shouldReduceMotion && isInView && (
            <motion.circle
              cx="160"
              cy="160"
              r={radius}
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`30 ${circumference}`}
              fill="none"
              animate={{
                strokeDashoffset: [0, -circumference],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 6px #FFFFFF)" }}
            />
          )}

          {/* 3. Dark Center Disc (#0B1224) */}
          <circle
            cx="160"
            cy="160"
            r="94"
            fill="#0B1224"
            stroke="rgba(30,155,255,0.15)"
            strokeWidth="1"
          />
        </svg>

        {/* Center Numbers & Label Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
          {/* "84%" */}
          <motion.span
            animate={
              shouldReduceMotion
                ? {}
                : {
                    textShadow: isHighlighted
                      ? "0 0 20px rgba(255,255,255,0.9)"
                      : "0 0 10px rgba(255,255,255,0.4)",
                  }
            }
            className="font-mono text-[50px] sm:text-[56px] font-bold text-white tracking-tight tabular-nums leading-none"
          >
            {percent}%
          </motion.span>

          {/* "OVERALL MAPPED" */}
          <span className="font-mono text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#8FA3C7] mt-2">
            OVERALL MAPPED
          </span>
        </div>
      </div>

      {/* 2. LEGEND BELOW GAUGE */}
      <div className="w-full mt-6 flex flex-col gap-2.5 px-3">
        {/* Row 1: Mapped & Passing */}
        <div
          onMouseEnter={() => setHoveredLegendRow("passing")}
          onMouseLeave={() => setHoveredLegendRow(null)}
          className={`flex items-center justify-between py-1 px-2 rounded-[6px] transition-colors cursor-pointer ${
            hoveredLegendRow === "passing" ? "bg-[rgba(30,155,255,0.1)]" : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shrink-0" />
            <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#C3D4FF] font-medium tracking-wide">
              Mapped & Passing
            </span>
          </div>
          <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white tabular-nums">
            {passingCount.toLocaleString()}
          </span>
        </div>

        {/* Row 2: Phishing */}
        <div
          onMouseEnter={() => setHoveredLegendRow("phishing")}
          onMouseLeave={() => setHoveredLegendRow(null)}
          className={`flex items-center justify-between py-1 px-2 rounded-[6px] transition-colors cursor-pointer ${
            hoveredLegendRow === "phishing" ? "bg-[rgba(30,155,255,0.1)]" : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
            <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#C3D4FF] font-medium tracking-wide">
              PHISHING
            </span>
          </div>
          <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white tabular-nums">
            {phishingCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
