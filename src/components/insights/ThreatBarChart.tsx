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
  const [hoveredBar, setHoveredBar] = useState<"malware" | "phishing" | null>(null);
  const [activeMalware, setActiveMalware] = useState(true);
  const [activePhishing, setActivePhishing] = useState(true);

  return (
    <div className="relative w-full max-w-[400px] h-[380px] mx-auto flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 400 380"
        fill="none"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Threat categories bar chart with malware and phishing metrics"
      >
        <defs>
          {/* Diagonal Stripe Pattern (Steel Blue #3A7CB8 with lighter highlights) */}
          <pattern
            id="diagonalStripe"
            width="14"
            height="14"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="14" height="14" fill="#2E69A3" />
            <line x1="0" y1="0" x2="0" y2="14" stroke="#6FB0ED" strokeWidth="3" opacity="0.8" />
          </pattern>

          {/* Base Glow Radial Gradient */}
          <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#1E9BFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0B1224" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Perspective Grid Lines (Behind the bars) */}
        <g stroke="rgba(150,180,255,0.12)" strokeWidth="1">
          {/* Horizontal lines */}
          <line x1="40" y1="120" x2="360" y2="120" strokeDasharray="3 3" />
          <line x1="40" y1="160" x2="360" y2="160" strokeDasharray="3 3" />
          <line x1="40" y1="200" x2="360" y2="200" strokeDasharray="3 3" />
          <line x1="40" y1="240" x2="360" y2="240" strokeDasharray="3 3" />

          {/* Perspective Vertical lines */}
          <line x1="100" y1="100" x2="80" y2="280" />
          <line x1="160" y1="100" x2="150" y2="280" />
          <line x1="240" y1="100" x2="250" y2="280" />
          <line x1="300" y1="100" x2="320" y2="280" />
        </g>

        {/* 2. Scattered Twinkling White Star Dots */}
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

        {/* 3. Soft Base Floor Glow */}
        <ellipse cx="200" cy="280" rx="140" ry="24" fill="url(#baseGlow)" opacity="0.65" />

        {/* 4. Left Bar: Malware (~245px tall, X=138, width=44px) */}
        <g
          onMouseEnter={() => setHoveredBar("malware")}
          onMouseLeave={() => setHoveredBar(null)}
          className="cursor-pointer"
        >
          {/* Base Glow under Left Bar */}
          <ellipse cx="160" cy="280" rx="36" ry="10" fill="#1E9BFF" opacity="0.3" />

          <motion.rect
            x="138"
            y={activeMalware ? 35 : 275}
            width="44"
            height={activeMalware ? 245 : 5}
            rx="8"
            fill="url(#diagonalStripe)"
            stroke="#1E9BFF"
            strokeWidth={hoveredBar === "malware" ? 2 : 1}
            initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            animate={
              isInView
                ? {
                    scaleY: activeMalware ? 1 : 0.02,
                    y: hoveredBar === "malware" ? -6 : shouldReduceMotion ? 0 : [0, -4, 0],
                  }
                : { scaleY: 0 }
            }
            transition={{
              scaleY: { duration: 0.8, ease: EASINGS.cyber },
              y: hoveredBar === "malware"
                ? { duration: 0.25 }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ originY: "280px" }}
          />

          {/* Bar Highlight Rim */}
          {activeMalware && (
            <motion.path
              d="M 138 50 C 138 41 145 35 154 35 L 166 35 C 175 35 182 41 182 50"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
              opacity={hoveredBar === "malware" ? 0.9 : 0.4}
            />
          )}
        </g>

        {/* 5. Right Bar: Phishing (~213px tall, X=218, width=44px) */}
        <g
          onMouseEnter={() => setHoveredBar("phishing")}
          onMouseLeave={() => setHoveredBar(null)}
          className="cursor-pointer"
        >
          {/* Base Glow under Right Bar */}
          <ellipse cx="240" cy="280" rx="36" ry="10" fill="#1E9BFF" opacity="0.3" />

          <motion.rect
            x="218"
            y={activePhishing ? 67 : 275}
            width="44"
            height={activePhishing ? 213 : 5}
            rx="8"
            fill="url(#diagonalStripe)"
            stroke="#1E9BFF"
            strokeWidth={hoveredBar === "phishing" ? 2 : 1}
            initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            animate={
              isInView
                ? {
                    scaleY: activePhishing ? 1 : 0.02,
                    y: hoveredBar === "phishing" ? -6 : shouldReduceMotion ? 0 : [-3, 3, -3],
                  }
                : { scaleY: 0 }
            }
            transition={{
              scaleY: { duration: 0.8, delay: 0.12, ease: EASINGS.cyber },
              y: hoveredBar === "phishing"
                ? { duration: 0.25 }
                : { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            }}
            style={{ originY: "280px" }}
          />

          {/* Bar Highlight Rim */}
          {activePhishing && (
            <motion.path
              d="M 218 82 C 218 73 225 67 234 67 L 246 67 C 255 67 262 73 262 82"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
              opacity={hoveredBar === "phishing" ? 0.9 : 0.4}
            />
          )}
        </g>

        {/* 6. Baseline 1px under them */}
        <line x1="36" y1="280" x2="364" y2="280" stroke="rgba(150,170,230,0.35)" strokeWidth="1.5" />

        {/* 7. Hover Value Tooltip */}
        {hoveredBar && (
          <g>
            <rect
              x={hoveredBar === "malware" ? 122 : 202}
              y={hoveredBar === "malware" ? 10 : 42}
              width="76"
              height="24"
              rx="4"
              fill="#14233D"
              stroke="#1E9BFF"
              strokeWidth="1"
            />
            <text
              x={hoveredBar === "malware" ? 160 : 240}
              y={hoveredBar === "malware" ? 26 : 58}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fontFamily="var(--font-mono), monospace"
              fill="#FFFFFF"
            >
              {hoveredBar === "malware" ? "68.4%" : "31.6%"}
            </text>
          </g>
        )}
      </svg>

      {/* 8. Legend Below Baseline ("● MALWARE" and "● PHISHING") */}
      <div className="flex items-center justify-center gap-8 -mt-2">
        {/* Malware Button / Bullet */}
        <button
          type="button"
          onClick={() => setActiveMalware((prev) => !prev)}
          className={`flex items-center gap-2 font-mono text-[16px] sm:text-[18px] font-bold tracking-[0.04em] uppercase transition-all cursor-pointer ${
            activeMalware ? "text-[#C3D4FF]" : "text-[#55698C] line-through opacity-60"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#A0B3D6]" />
          MALWARE
        </button>

        {/* Phishing Button / Bullet */}
        <button
          type="button"
          onClick={() => setActivePhishing((prev) => !prev)}
          className={`flex items-center gap-2 font-mono text-[16px] sm:text-[18px] font-bold tracking-[0.04em] uppercase transition-all cursor-pointer ${
            activePhishing ? "text-[#C3D4FF]" : "text-[#55698C] line-through opacity-60"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#A0B3D6]" />
          PHISHING
        </button>
      </div>
    </div>
  );
}
