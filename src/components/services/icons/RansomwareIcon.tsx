"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function RansomwareIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Flame with padlock protection against ransomware"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Outer Flame */}
      <motion.path
        d="M18 5c-1 3.2-4.5 6-4.5 9.5 0 4.2 3.5 7.5 7.5 7.5s6.5-3 5.5-7.5c-0.8 1.2-2 2-3.2 2-2 0-3.3-1.6-3.3-3.6 0-2.8 2.5-4.8 2.5-8.2C20 7.5 19 6.2 18 5z"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(30,155,255,0.08)"
        animate={
          shouldReduceMotion || !isInView
            ? { scaleY: 1 }
            : {
                scaleY: [1, 1.1, 0.95, 1.05, 1],
                filter: isHovered
                  ? ["drop-shadow(0 0 4px #1E9BFF)", "drop-shadow(0 0 8px #1E9BFF)", "drop-shadow(0 0 4px #1E9BFF)"]
                  : "none",
              }
        }
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "22px" }}
      />

      {/* Small Padlock inside the flame */}
      <g>
        {/* Padlock Shackle */}
        <motion.path
          d="M15.5 22.5v-2.2c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v2.2"
          stroke="#3AA8FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={
            shouldReduceMotion || !isInView
              ? { y: 0 }
              : {
                  y: [0, 0, -2.5, -2.5, 0.5, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.75, 0.8, 0.92, 0.94, 0.98],
            ease: "easeInOut",
          }}
        />

        {/* Padlock Body */}
        <rect
          x="13.5"
          y="22.5"
          width="9"
          height="7.5"
          rx="1.5"
          stroke="#3AA8FF"
          strokeWidth="1.4"
          fill="#0E1424"
        />

        {/* Padlock Keyhole Dot */}
        <circle cx="18" cy="26" r="0.9" fill="#3AA8FF" />
      </g>
    </svg>
  );
}
