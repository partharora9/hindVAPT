"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function DatabaseSyncIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Database with circular sync arrows"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Database Stack - 3 tiers */}
      {/* Tier 1 (Top) */}
      <motion.ellipse
        cx="16"
        cy="10"
        rx="9"
        ry="3.2"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="rgba(30,155,255,0.06)"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.9 }
            : {
                opacity: [0.75, 1, 0.75],
                filter: isHovered
                  ? ["drop-shadow(0 0 4px #3AA8FF)", "drop-shadow(0 0 7px #3AA8FF)", "drop-shadow(0 0 4px #3AA8FF)"]
                  : "none",
              }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />

      {/* Tier 2 (Middle) */}
      <motion.path
        d="M7 10v6c0 1.76 4.03 3.2 9 3.2s9-1.44 9-3.2v-6"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.85 }
            : {
                opacity: [0.65, 1, 0.65],
                filter: isHovered
                  ? ["drop-shadow(0 0 3px #3AA8FF)", "drop-shadow(0 0 6px #3AA8FF)", "drop-shadow(0 0 3px #3AA8FF)"]
                  : "none",
              }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Tier 3 (Bottom) */}
      <motion.path
        d="M7 16v6c0 1.76 4.03 3.2 9 3.2s9-1.44 9-3.2v-6"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.8 }
            : {
                opacity: [0.55, 1, 0.55],
                filter: isHovered
                  ? ["drop-shadow(0 0 3px #3AA8FF)", "drop-shadow(0 0 6px #3AA8FF)", "drop-shadow(0 0 3px #3AA8FF)"]
                  : "none",
              }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      {/* Circular Sync Arrows (Orbiting on bottom-right) */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { rotate: 0 }
            : { rotate: 360 }
        }
        transition={{
          duration: isHovered ? 3 : 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ originX: "24px", originY: "24px" }}
      >
        {/* Upper Arrow Arc */}
        <path
          d="M21 21a5 5 0 0 1 7.2 1.4"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M28.5 19.5v3.2h-3.2"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lower Arrow Arc */}
        <path
          d="M27 27a5 5 0 0 1-7.2-1.4"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M19.5 28.5v-3.2h3.2"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </svg>
  );
}
