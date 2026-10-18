"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function MobileAppSecurityIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Mobile phone with security shield"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Smartphone Outline */}
      <rect
        x="9"
        y="5"
        width="18"
        height="26"
        rx="3"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.05)"
      />
      {/* Speaker Bar */}
      <line x1="16" y1="8" x2="20" y2="8" stroke="#3AA8FF" strokeWidth="1.2" strokeLinecap="round" />
      {/* Home Indicator */}
      <line x1="16" y1="28" x2="20" y2="28" stroke="#3AA8FF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Center Shield */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1 }
            : {
                scale: isHovered ? [1, 1.1, 1] : [1, 1.04, 1],
              }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "18px 18px" }}
      >
        <path
          d="M 18 12 L 23 14 V 18 C 23 21.5 18 24 18 24 C 18 24 13 21.5 13 18 V 14 Z"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          fill="rgba(30,155,255,0.22)"
        />
        <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />
      </motion.g>
    </svg>
  );
}
