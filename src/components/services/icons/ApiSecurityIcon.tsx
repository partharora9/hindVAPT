"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function ApiSecurityIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="API code brackets with transmission arrows"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Left Curly Bracket */}
      <path
        d="M 11 9 C 9 9 8 11 8 13 V 16 C 8 17.5 6 18 6 18 C 6 18 8 18.5 8 20 V 23 C 8 25 9 27 11 27"
        stroke="#3AA8FF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Right Curly Bracket */}
      <path
        d="M 25 9 C 27 9 28 11 28 13 V 16 C 28 17.5 30 18 30 18 C 30 18 28 18.5 28 20 V 23 C 28 25 27 27 25 27"
        stroke="#3AA8FF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Outbound Arrow (Right) */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { x: 0 }
            : {
                x: isHovered ? [0, 2, 0] : [0, 1.5, 0],
              }
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="13" y1="15" x2="21" y2="15" stroke="#1E9BFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 19 13 L 22 15 L 19 17" stroke="#1E9BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Inbound Arrow (Left) */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { x: 0 }
            : {
                x: isHovered ? [0, -2, 0] : [0, -1.5, 0],
              }
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <line x1="23" y1="21" x2="15" y2="21" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 17 19 L 14 21 L 17 23" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}
