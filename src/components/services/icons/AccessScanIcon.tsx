"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function AccessScanIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Secure access management biometric scan frame"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* 4 Corner Scan Brackets */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1 }
            : {
                scale: [1, 1.06, 0.96, 1],
              }
        }
        transition={{
          duration: 3.5,
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

      {/* Retinal Eye / Biometric Center */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { scaleY: 1 }
            : {
                scaleY: [1, 1, 0.05, 1, 1],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.85, 0.9, 0.95, 1],
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "18px" }}
      >
        {/* Eye Contour */}
        <path
          d="M10 18s3.2-5.5 8-5.5 8 5.5 8 5.5-3.2 5.5-8 5.5-8-5.5-8-5.5z"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(30,155,255,0.06)"
        />

        {/* Iris Ring */}
        <circle
          cx="18"
          cy="18"
          r="3.2"
          stroke="#3AA8FF"
          strokeWidth="1.3"
          fill="none"
        />

        {/* Pupil */}
        <circle cx="18" cy="18" r="1.3" fill="#1E9BFF" />
      </motion.g>
    </svg>
  );
}
