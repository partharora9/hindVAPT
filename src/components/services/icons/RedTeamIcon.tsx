"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function RedTeamIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Adversary red team target crosshair"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Outer Reticle Ring */}
      <circle
        cx="18"
        cy="18"
        r="12"
        stroke="#3AA8FF"
        strokeWidth="1.4"
        strokeDasharray="4 2"
      />

      {/* Middle Concentric Ring */}
      <circle
        cx="18"
        cy="18"
        r="7"
        stroke="#3AA8FF"
        strokeWidth="1.2"
        fill="rgba(30,155,255,0.08)"
      />

      {/* Crosshairs */}
      <line x1="18" y1="3" x2="18" y2="9" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="27" x2="18" y2="33" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="18" x2="9" y2="18" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="18" x2="33" y2="18" stroke="#3AA8FF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Center Target Core */}
      <motion.circle
        cx="18"
        cy="18"
        r="2.5"
        fill="#FF4C68"
        animate={
          shouldReduceMotion || !isInView
            ? { scale: 1 }
            : {
                scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
              }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
