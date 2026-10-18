"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

const BINARY_PATTERNS = ["1011", "0110", "1101", "1001", "0101", "1110"];

export function EncryptionIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();
  const [binaryIndex, setBinaryIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const interval = setInterval(() => {
      setBinaryIndex((prev) => (prev + 1) % BINARY_PATTERNS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isInView]);

  const currentBinary = BINARY_PATTERNS[binaryIndex];

  return (
    <svg
      role="img"
      aria-label="Binary data 1011 over encryption key"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Binary Digits 1011 */}
      <motion.text
        x="18"
        y="13"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        fill="#3AA8FF"
        letterSpacing="0.12em"
        animate={
          shouldReduceMotion || !isInView
            ? { fill: isHovered ? "#FFFFFF" : "#3AA8FF" }
            : {
                fill: isHovered ? "#FFFFFF" : ["#3AA8FF", "#75C7FF", "#3AA8FF"],
                filter: isHovered
                  ? "drop-shadow(0 0 6px #1E9BFF)"
                  : "drop-shadow(0 0 2px rgba(30,155,255,0.4))",
              }
        }
        transition={{ duration: 1 }}
      >
        {currentBinary}
      </motion.text>

      {/* Encryption Key */}
      <g>
        {/* Key Head (Circle with inner hole) */}
        <circle
          cx="11"
          cy="24"
          r="4.5"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          fill="rgba(30,155,255,0.06)"
        />
        <circle
          cx="11"
          cy="24"
          r="1.8"
          stroke="#3AA8FF"
          strokeWidth="1"
          fill="none"
        />

        {/* Key Shaft */}
        <line
          x1="15.5"
          y1="24"
          x2="28"
          y2="24"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Key Teeth */}
        <line
          x1="24"
          y1="24"
          x2="24"
          y2="28"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="27"
          y1="24"
          x2="27"
          y2="27"
          stroke="#3AA8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* Traveling Glint across Key */}
      {!shouldReduceMotion && isInView && (
        <motion.circle
          cx="15.5"
          cy="24"
          r="2"
          fill="#FFFFFF"
          animate={{
            cx: [15.5, 28, 28],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            times: [0, 0.25, 0.3],
            ease: "easeInOut",
          }}
          style={{ filter: "drop-shadow(0 0 4px #FFFFFF)" }}
        />
      )}
    </svg>
  );
}
