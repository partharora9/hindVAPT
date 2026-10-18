"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function AwarenessIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Security awareness training person inside targeting brackets"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* 4 Scan Corner Brackets */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1 }
            : {
                scale: [1, 1.08, 0.94, 1],
              }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "18px" }}
      >
        {/* Top-Left */}
        <path
          d="M7 13V9a2 2 0 0 1 2-2h4"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Top-Right */}
        <path
          d="M23 7h4a2 2 0 0 1 2 2v4"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bottom-Left */}
        <path
          d="M7 23v4a2 2 0 0 0 2 2h4"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bottom-Right */}
        <path
          d="M23 29h4a2 2 0 0 0 2-2v-4"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Person Icon */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.9, scale: 1 }
            : {
                opacity: [0.8, 1, 0.8],
                scale: [0.98, 1.02, 0.98],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "18px" }}
      >
        {/* Head */}
        <circle
          cx="18"
          cy="14"
          r="3.5"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          fill="rgba(30,155,255,0.08)"
        />

        {/* Shoulders */}
        <path
          d="M12 25c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  );
}
