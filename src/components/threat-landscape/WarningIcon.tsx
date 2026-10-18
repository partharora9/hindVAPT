"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface WarningIconProps {
  isInView?: boolean;
  isHovered?: boolean;
}

export function WarningIcon({ isInView = true, isHovered = false }: WarningIconProps) {
  const shouldReduceMotion = useReducedMotion();

  // Outer chamfered warning triangle path (viewBox 0 0 240 240, center 120, 120)
  // Apex top at (120, 36), chamfered corners, mechanical notches along bottom edge
  const outerTrianglePath =
    "M 114 36 L 126 36 L 210 182 L 204 192 L 180 192 L 174 196 L 150 196 L 144 192 L 96 192 L 90 196 L 66 196 L 60 192 L 36 192 L 30 182 Z";

  const innerTrianglePath =
    "M 116 52 L 124 52 L 194 178 L 190 184 L 50 184 L 46 178 Z";

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 210, height: 210 }}
      role="img"
      aria-label="Alert fatigue warning indicator"
    >
      {/* Expanding warning pulse wave (every 3s) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            scale: [1, 1.25],
            opacity: [0.55, 0],
          }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-1 border border-[#1E9BFF]/35 rounded-3xl pointer-events-none"
        />
      )}

      <svg
        viewBox="0 0 240 240"
        width="210"
        height="210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_28px_rgba(30,155,255,0.45)]"
      >
        <defs>
          <filter id="warningNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#1E9BFF" floodOpacity="0.95" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#1E9BFF" floodOpacity="0.6" />
          </filter>

          <filter id="exclamationGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFFFFF" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#1E9BFF" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* 1. APEX TOP CARET TICK (^) */}
        <path
          d="M 112 24 L 120 16 L 128 24"
          stroke="#4CB8FF"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#warningNeonGlow)"
        />

        {/* 2. OUTER CHAMFERED TRIANGLE SHELL (Thick Outline) */}
        <motion.path
          d={outerTrianglePath}
          fill="rgba(11, 35, 78, 0.35)"
          stroke="#1E9BFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#warningNeonGlow)"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 3. INNER THINNER OUTLINE */}
        <path
          d={innerTrianglePath}
          stroke="rgba(76, 184, 255, 0.6)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 4. MECHANICAL NOTCHES & SIDE TICKS */}
        {/* Left slanted edge tech notch */}
        <line x1="66" y1="116" x2="60" y2="120" stroke="#4CB8FF" strokeWidth="2" />
        <rect x="74" y="90" width="8" height="2" transform="rotate(-30 74 90)" fill="#1E9BFF" />

        {/* Right slanted edge tech notch */}
        <line x1="174" y1="116" x2="180" y2="120" stroke="#4CB8FF" strokeWidth="2" />
        <rect x="158" y="90" width="8" height="2" transform="rotate(30 158 90)" fill="#1E9BFF" />

        {/* Bottom base notches with small center dot */}
        <line x1="106" y1="202" x2="134" y2="202" stroke="#4CB8FF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="120" cy="202" r="2.2" fill="#FFFFFF" filter="url(#warningNeonGlow)" />
        <line x1="22" y1="198" x2="32" y2="198" stroke="#1E9BFF" strokeWidth="1.5" />
        <line x1="208" y1="198" x2="218" y2="198" stroke="#1E9BFF" strokeWidth="1.5" />

        {/* 5. BRIGHT CAPSULE-SHAPED EXCLAMATION BAR & ROUND DOT */}
        <motion.g
          filter="url(#exclamationGlow)"
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 140,
            delay: shouldReduceMotion ? 0 : 0.5,
          }}
        >
          {/* Upper Capsule-shaped Bar */}
          <rect
            x="115"
            y="76"
            width="10"
            height="50"
            rx="5"
            fill="#4CB8FF"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* Lower Round Dot */}
          <circle
            cx="120"
            cy="148"
            r="5.5"
            fill="#FFFFFF"
            stroke="#4CB8FF"
            strokeWidth="1.5"
          />
        </motion.g>
      </svg>
    </div>
  );
}
