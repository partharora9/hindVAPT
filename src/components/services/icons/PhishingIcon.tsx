"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function PhishingIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Phishing hook targeting email envelope"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Email Envelope */}
      <rect
        x="6"
        y="13"
        width="24"
        height="16"
        rx="2"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.06)"
      />
      <path
        d="M 6 15 L 18 23 L 30 15"
        stroke="#3AA8FF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Fishing Hook */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { y: 0 }
            : {
                y: isHovered ? [0, -3, 0] : [0, -1.5, 0],
              }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="18" y1="3" x2="18" y2="10" stroke="#FF4C68" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
        <path
          d="M 18 10 C 18 13.5 14 14.5 14 12 C 14 10.5 16 9.5 16.5 10.5"
          stroke="#FF4C68"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}
