"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconProps {
  isHovered?: boolean;
  isInView?: boolean;
}

export function FirewallIcon({ isHovered = false, isInView = true }: IconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label="Firewall with brick wall and cyber flame"
      viewBox="0 0 36 36"
      fill="none"
      className="w-[32px] h-[32px] overflow-visible"
    >
      {/* Flame rising from the wall */}
      <motion.path
        d="M18 5c-1 3.2-3.5 5.5-3.5 8.2 0 3.2 2.5 5.8 5.5 5.8s5-2.2 4.5-5.5c-0.6 0.9-1.5 1.5-2.5 1.5-1.5 0-2.5-1.2-2.5-2.8 0-2.2 2-3.8 2-6.5C19.5 7 18.8 6 18 5z"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(30,155,255,0.12)"
        animate={
          shouldReduceMotion || !isInView
            ? { scaleY: 1 }
            : {
                scaleY: [1, 1.14, 0.94, 1.08, 1],
                scaleX: [1, 0.94, 1.06, 0.96, 1],
                filter: isHovered
                  ? ["drop-shadow(0 0 6px #1E9BFF)", "drop-shadow(0 0 10px #1E9BFF)", "drop-shadow(0 0 6px #1E9BFF)"]
                  : ["drop-shadow(0 0 2px rgba(30,155,255,0.4))", "drop-shadow(0 0 5px rgba(30,155,255,0.7))", "drop-shadow(0 0 2px rgba(30,155,255,0.4))"],
              }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "19px" }}
      />

      {/* Brick Wall Base Frame */}
      {/* Outer Wall Boundary */}
      <rect
        x="6"
        y="19"
        width="24"
        height="12"
        rx="1"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        fill="rgba(30,155,255,0.05)"
      />

      {/* Horizontal Divider */}
      <line
        x1="6"
        y1="25"
        x2="30"
        y2="25"
        stroke="#3AA8FF"
        strokeWidth="1.5"
      />

      {/* Row 1 Bricks (vertical dividers) */}
      <motion.line
        x1="14"
        y1="19"
        x2="14"
        y2="25"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 1 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, delay: 0 }}
      />
      <motion.line
        x1="22"
        y1="19"
        x2="22"
        y2="25"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 1 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
      />

      {/* Row 2 Bricks (staggered vertical dividers) */}
      <motion.line
        x1="10"
        y1="25"
        x2="10"
        y2="31"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 1 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
      />
      <motion.line
        x1="18"
        y1="25"
        x2="18"
        y2="31"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 1 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
      />
      <motion.line
        x1="26"
        y1="25"
        x2="26"
        y2="31"
        stroke="#3AA8FF"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion || !isInView
            ? { opacity: 1 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
      />
    </svg>
  );
}
