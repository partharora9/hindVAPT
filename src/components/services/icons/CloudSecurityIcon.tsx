"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function CloudSecurityIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Cloud infrastructure with secure lock"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Cloud Outline */}
      <path
        d="M 8 23 C 5.5 23 4 21 4 18.5 C 4 16 6 14.5 8.5 14.5 C 9 11 11.5 8 16 8 C 20.5 8 23 10.5 23.5 14 C 25.5 14 28 15.5 28 18 C 28 20.5 26 23 23.5 23"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="rgba(30,155,255,0.06)"
      />

      {/* Lock Shackle */}
      <motion.path
        d="M 15 20 V 17 C 15 15.5 16.5 14.5 18 14.5 C 19.5 14.5 21 15.5 21 17 V 20"
        stroke="#3AA8FF"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={
          shouldReduceMotion || !isInView
            ? { y: 0 }
            : {
                y: isHovered ? [0, -2, 0] : 0,
              }
        }
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Lock Body */}
      <rect
        x="13"
        y="20"
        width="10"
        height="8"
        rx="2"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.25)"
      />
      <circle cx="18" cy="24" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}
