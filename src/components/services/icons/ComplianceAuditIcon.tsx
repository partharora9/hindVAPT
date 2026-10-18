"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function ComplianceAuditIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Compliance audit checklist with official verified seal"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Clipboard / Document Body */}
      <rect
        x="7"
        y="6"
        width="18"
        height="24"
        rx="2"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.06)"
      />
      {/* Top Clip */}
      <rect x="12" y="4" width="8" height="4" rx="1" fill="#3AA8FF" />

      {/* Checklist Lines with Check Marks */}
      <line x1="10" y1="13" x2="18" y2="13" stroke="#3AA8FF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="18" x2="17" y2="18" stroke="#3AA8FF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="23" x2="16" y2="23" stroke="#3AA8FF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Official Verified Seal */}
      <motion.g
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1 }
            : {
                scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
              }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 22px" }}
      >
        <circle cx="24" cy="22" r="6" stroke="#3AA8FF" strokeWidth="1.4" fill="#0B1426" />
        <path d="M 21.5 22 L 23.5 24 L 27 20" stroke="#1E9BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Ribbon tails */}
        <path d="M 22 27 L 21 31 L 23.5 30 L 25 31 L 24.5 27" fill="#3AA8FF" fillOpacity="0.4" />
      </motion.g>
    </svg>
  );
}
