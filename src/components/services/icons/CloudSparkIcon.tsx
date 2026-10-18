"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function CloudSparkIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Cloud with 4-point security sparkle"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Cloud Outline */}
      <motion.path
        d="M10 24h15a5.5 5.5 0 0 0 1.2-10.86A7 7 0 0 0 13 11a6 6 0 0 0-4.9 9.5A4.5 4.5 0 0 0 10 24z"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(30,155,255,0.06)"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.9 }
            : {
                opacity: isHovered ? 1 : [0.8, 1, 0.8],
                filter: isHovered
                  ? "drop-shadow(0 0 6px #1E9BFF)"
                  : "drop-shadow(0 0 2px rgba(30,155,255,0.3))",
              }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 4-Point Sparkle Star on Lower-Right */}
      <motion.path
        d="M26 19c0 1.8 1.4 3.2 3.2 3.2-1.8 0-3.2 1.4-3.2 3.2 0-1.8-1.4-3.2-3.2-3.2 1.8 0 3.2-1.4 3.2-3.2z"
        fill="#3AA8FF"
        stroke="#3AA8FF"
        strokeWidth="0.5"
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1, rotate: 0 }
            : {
                scale: [0.8, 1.3, 0.9, 1.25, 0.8],
                rotate: [0, 45, 90, 135, 180],
                opacity: [0.7, 1, 0.8, 1, 0.7],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "26px", originY: "22.2px" }}
      />

      {/* Floating Ambient Particle */}
      {!shouldReduceMotion && isInView && (
        <motion.circle
          cx="17"
          cy="18"
          r="1"
          fill="#75C7FF"
          animate={{
            y: [0, -10, -18],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.8,
          }}
        />
      )}
    </svg>
  );
}
