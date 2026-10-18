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
  const [fixedCount, setFixedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [isGaugeHovered, setIsGaugeHovered] = useState(false);
  const [hoveredLegendRow, setHoveredLegendRow] = useState<"fixed" | "open" | null>(null);

  // Entrance count-up
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setPercent(84);
      setFixedCount(41);
      setOpenCount(8);
      return;
    }

    const duration = 1800;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setPercent(Math.round(ease * 84));
      setFixedCount(Math.round(ease * 41));
      setOpenCount(Math.round(ease * 8));

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, shouldReduceMotion]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const targetArc = circumference * 0.84;

  const isHighlighted = isGaugeHovered || hoveredLegendRow === "fixed";

  return (
    <div className="relative w-full max-w-[340px] mx-auto flex flex-col items-center justify-center select-none pt-2">
      {/* 1. DONUT GAUGE SVG (~310px) */}
      <div
        className="relative w-[290px] sm:w-[310px] h-[290px] sm:h-[310px] flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsGaugeHovered(true)}
        onMouseLeave={() => setIsGaugeHovered(false)}
        role="img"
        aria-label="Remediation resolution gauge at 84 percent"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full -rotate-90 overflow-visible"
        >
          <defs>
            <linearGradient id="gaugeAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E9BFF" />
              <stop offset="60%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>

            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22C55E" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Dark-Blue Track Ring */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            stroke="#1A4A7A"
            strokeWidth="20"
            fill="none"
            opacity="0.85"
          />

          {/* 2. Resolved Accent Ring */}
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

          {/* Pulse Highlight */}
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

          {/* 3. Dark Center Disc */}
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

          <span className="font-mono text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#8FA3C7] mt-2">
            RESOLVED
          </span>
        </div>
      </div>

      {/* 2. LEGEND BELOW GAUGE */}
      <div className="w-full mt-6 flex flex-col gap-2.5 px-3">
        {/* Row 1: Fixed and verified */}
        <div
          onMouseEnter={() => setHoveredLegendRow("fixed")}
          onMouseLeave={() => setHoveredLegendRow(null)}
          className={`flex items-center justify-between py-1 px-2 rounded-[6px] transition-colors cursor-pointer ${
            hoveredLegendRow === "fixed" ? "bg-[rgba(30,155,255,0.1)]" : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shrink-0" />
            <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#C3D4FF] font-medium tracking-wide">
              Fixed and verified
            </span>
          </div>
          <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white tabular-nums">
            {fixedCount}
          </span>
        </div>

        {/* Row 2: Open */}
        <div
          onMouseEnter={() => setHoveredLegendRow("open")}
          onMouseLeave={() => setHoveredLegendRow(null)}
          className={`flex items-center justify-between py-1 px-2 rounded-[6px] transition-colors cursor-pointer ${
            hoveredLegendRow === "open" ? "bg-[rgba(30,155,255,0.1)]" : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0" />
            <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#C3D4FF] font-medium tracking-wide">
              Open
            </span>
          </div>
          <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white tabular-nums">
            {openCount}
          </span>
        </div>
      </div>
    </div>
  );
}
