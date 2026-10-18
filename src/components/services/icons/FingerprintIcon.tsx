"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function FingerprintIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Fingerprint biometric authentication"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Outer Ridge Arc 1 */}
      <motion.path
        d="M11 20c0-4.5 3-8 7-8s7 3.5 7 8"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.85 }
            : { opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />

      {/* Outer Left Downward Ridge */}
      <motion.path
        d="M8.5 22c0-6 4.2-11 9.5-11s9.5 5 9.5 11v3"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.8 }
            : { opacity: [0.6, 1, 0.6] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Inner Ridge Arc 2 */}
      <motion.path
        d="M13.5 20c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v5c0 1.5-1 2.5-2.2 2.5s-2.3-1-2.3-2.5v-3.5c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 0.9 }
            : { opacity: [0.75, 1, 0.75] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Bottom Ridge curves */}
      <motion.path
        d="M11 24.5c0 2 1.5 3.5 3.5 3.5"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <motion.path
        d="M25 24.5c0 2.5-2 4.5-4.5 4.5"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Up & Down Scanning Laser Line */}
      {!shouldReduceMotion && isInView && (
        <motion.g
          animate={{
            y: [8, 29, 8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <line
            x1="7"
            y1="0"
            x2="29"
            y2="0"
            stroke="#1E9BFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 6px #1E9BFF)"
                : "drop-shadow(0 0 3px rgba(30,155,255,0.7))",
            }}
          />
          <circle cx="18" cy="0" r="1.5" fill="#FFFFFF" />
        </motion.g>
      )}
    </svg>
  );
}
