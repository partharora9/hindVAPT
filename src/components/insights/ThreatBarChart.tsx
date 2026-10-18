"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface ThreatBarChartProps {
  isInView?: boolean;
}

const STAR_DOTS = [
  { cx: 70, cy: 90, r: 1.8, delay: 0 },
  { cx: 120, cy: 180, r: 1.4, delay: 0.8 },
  { cx: 80, cy: 230, r: 2.0, delay: 1.5 },
  { cx: 180, cy: 80, r: 1.6, delay: 0.4 },
  { cx: 280, cy: 180, r: 1.5, delay: 1.2 },
  { cx: 270, cy: 250, r: 1.8, delay: 2.0 },
  { cx: 330, cy: 140, r: 2.2, delay: 0.6 },
  { cx: 310, cy: 90, r: 1.5, delay: 1.8 },
];

export function ThreatBarChart({ isInView = true }: ThreatBarChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const [activeBars, setActiveBars] = useState({
    critical: true,
    high: true,
    medium: true,
    low: true,
  });

  const bars = [
    {
      id: "critical",
      label: "CRITICAL",
      count: 4,
      height: 140,
      x: 70,
      color: "#EF4444",
      active: activeBars.critical,
    },
    {
      id: "high",
      label: "HIGH",
      count: 8,
      height: 200,
      x: 145,
      color: "#F97316",
      active: activeBars.high,
    },
    {
      id: "medium",
      label: "MEDIUM",
      count: 14,
      height: 240,
      x: 220,
      color: "#F59E0B",
      active: activeBars.medium,
    },
    {
      id: "low",
      label: "LOW",
      count: 6,
      height: 160,
      x: 295,
      color: "#3AA8FF",
      active: activeBars.low,
    },
  ];

  const toggleBar = (id: keyof typeof activeBars) => {
    setActiveBars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full max-w-[420px] h-[380px] mx-auto flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 420 380"
        fill="none"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Severity breakdown bar chart showing Critical, High, Medium, Low findings"
      >
        <defs>
          <pattern
            id="diagonalStripe"
            width="12"
            height="12"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="#204068" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="#4FA3F5" strokeWidth="2.5" opacity="0.8" />
          </pattern>

          <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#1E9BFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0B1224" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Perspective Grid Lines */}
        <g stroke="rgba(150,180,255,0.12)" strokeWidth="1">
          <line x1="30" y1="100" x2="390" y2="100" strokeDasharray="3 3" />
          <line x1="30" y1="150" x2="390" y2="150" strokeDasharray="3 3" />
          <line x1="30" y1="200" x2="390" y2="200" strokeDasharray="3 3" />
          <line x1="30" y1="250" x2="390" y2="250" strokeDasharray="3 3" />
        </g>

        {/* 2. Star dots */}
        {STAR_DOTS.map((star, idx) => (
          <motion.circle
            key={`star-${idx}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#FFFFFF"
            initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: shouldReduceMotion ? 0.6 : [0.2, 0.9, 0.2],
                    scale: shouldReduceMotion ? 1 : [0.8, 1.25, 0.8],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 3. Base Floor Glow */}
        <ellipse cx="210" cy="280" rx="160" ry="24" fill="url(#baseGlow)" opacity="0.65" />

        {/* 4. Four Bars: Critical, High, Medium, Low */}
        {bars.map((bar, idx) => {
          const isHovered = hoveredBar === bar.id;
          const yPos = 280 - (bar.active ? bar.height : 6);

          return (
            <g
              key={bar.id}
              onMouseEnter={() => setHoveredBar(bar.id)}
              onMouseLeave={() => setHoveredBar(null)}
              className="cursor-pointer"
            >
              {/* Floor glow under bar */}
              <ellipse
                cx={bar.x + 22}
                cy="280"
                rx="28"
                ry="8"
                fill={bar.color}
                opacity={bar.active ? 0.35 : 0.05}
              />

              <motion.rect
                x={bar.x}
                y={yPos}
                width="44"
                height={bar.active ? bar.height : 6}
                rx="6"
                fill="url(#diagonalStripe)"
                stroke={bar.color}
                strokeWidth={isHovered ? 2 : 1}
                initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={
                  isInView
                    ? {
                        scaleY: bar.active ? 1 : 0.04,
                        y: isHovered ? -5 : shouldReduceMotion ? 0 : [0, -3, 0],
                      }
                    : { scaleY: 0 }
                }
                transition={{
                  scaleY: { duration: 0.7, delay: idx * 0.1, ease: EASINGS.cyber },
                  y: isHovered
                    ? { duration: 0.2 }
                    : { duration: 4.2, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" },
                }}
                style={{ originY: "280px" }}
              />

              {/* Bar Top Cap */}
              {bar.active && (
                <rect
                  x={bar.x + 2}
                  y={yPos}
                  width="40"
                  height="4"
                  rx="2"
                  fill={bar.color}
                  opacity="0.9"
                />
              )}

              {/* Value Tooltip */}
              {isHovered && bar.active && (
                <g>
                  <rect
                    x={bar.x - 6}
                    y={Math.max(10, yPos - 28)}
                    width="56"
                    height="22"
                    rx="4"
                    fill="#14233D"
                    stroke={bar.color}
                    strokeWidth="1"
                  />
                  <text
                    x={bar.x + 22}
                    y={Math.max(25, yPos - 13)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="var(--font-mono), monospace"
                    fill="#FFFFFF"
                  >
                    {bar.count} issues
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 5. Baseline */}
        <line x1="20" y1="280" x2="400" y2="280" stroke="rgba(150,170,230,0.35)" strokeWidth="1.5" />
      </svg>

      {/* 6. Legend 2×2 Below Baseline */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 -mt-2">
        {bars.map((bar) => (
          <button
            key={bar.id}
            type="button"
            onClick={() => toggleBar(bar.id as keyof typeof activeBars)}
            className={`flex items-center gap-2 font-mono text-[12px] sm:text-[13px] font-bold tracking-[0.04em] uppercase transition-all cursor-pointer ${
              bar.active ? "text-[#C3D4FF]" : "text-[#55698C] line-through opacity-60"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: bar.color }}
            />
            {bar.label} ({bar.count})
          </button>
        ))}
      </div>
    </div>
  );
}
