"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function AiLockIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Padlock with AI intelligence badge"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Padlock Shackle */}
      <motion.path
        d="M12 15V10.5C12 7.46 14.69 5 18 5s6 2.46 6 5.5V15"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { y: 0 }
            : {
                y: [0, 0, -3.5, -3.5, 0.4, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.7, 0.75, 0.9, 0.92, 0.96],
          ease: "easeInOut",
        }}
      />

      {/* Padlock Body */}
      <motion.rect
        x="9"
        y="15"
        width="18"
        height="15"
        rx="2.5"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.06)"
        animate={
          shouldReduceMotion || !isInView
            ? { x: 0 }
            : {
                x: [0, 0, 0, 0, -0.6, 0.6, -0.3, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.7, 0.75, 0.9, 0.92, 0.94, 0.96, 1],
        }}
      />

      {/* AI Text inside Padlock */}
      <motion.text
        x="18"
        y="25.5"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        fill="#3AA8FF"
        letterSpacing="0.08em"
        animate={
          shouldReduceMotion || !isInView
            ? {
                fill: isHovered ? "#FFFFFF" : "#3AA8FF",
                filter: isHovered ? "drop-shadow(0 0 6px #1E9BFF)" : "none",
              }
            : {
                fill: [
                  "#3AA8FF",
                  "#3AA8FF",
                  "#75C7FF",
                  "#FFFFFF",
                  "#75C7FF",
                  "#3AA8FF",
                ],
                filter: [
                  "drop-shadow(0 0 0px #1E9BFF)",
                  "drop-shadow(0 0 0px #1E9BFF)",
                  "drop-shadow(0 0 8px #1E9BFF)",
                  "drop-shadow(0 0 12px #1E9BFF)",
                  "drop-shadow(0 0 6px #1E9BFF)",
                  "drop-shadow(0 0 0px #1E9BFF)",
                ],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.7, 0.9, 0.92, 0.96, 1],
          ease: "easeOut",
        }}
      >
        AI
      </motion.text>
    </svg>
  );
}
