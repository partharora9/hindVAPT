"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function SecureCodeReviewIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Source code brackets with auditing magnifying glass"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Left Code Bracket < */}
      <path
        d="M 12 11 L 6 17 L 12 23"
        stroke="#3AA8FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Code Bracket > */}
      <path
        d="M 24 11 L 30 17 L 24 23"
        stroke="#3AA8FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Magnifier Lens */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { x: 0, y: 0 }
            : {
                x: isHovered ? [0, 2, -1, 0] : [0, 1, 0],
                y: isHovered ? [0, -1, 1, 0] : 0,
              }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle
          cx="17"
          cy="16"
          r="5.5"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          fill="rgba(30,155,255,0.2)"
        />
        <line
          x1="21"
          y1="20"
          x2="26"
          y2="25"
          stroke="#3AA8FF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Reflection Highlight */}
        <path d="M 14 14 A 3 3 0 0 1 17 12" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
