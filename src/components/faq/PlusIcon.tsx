"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface PlusIconProps {
  isOpen: boolean;
  isHovered: boolean;
  index: number;
  isInView?: boolean;
}

export function PlusIcon({
  isOpen,
  isHovered,
  index,
  isInView = true,
}: PlusIconProps) {
  const shouldReduceMotion = useReducedMotion();

  // Rotation:
  // When Open: 45° (into a '×')
  // When Hovered (and closed): 90°
  // At rest: 0°
  const rotation = isOpen ? 45 : isHovered ? 90 : 0;
  const strokeColor = isOpen ? "#1E9BFF" : isHovered ? "#FFFFFF" : "rgba(213,226,255,0.85)";

  return (
    <div className="relative w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex items-center justify-center select-none pointer-events-none">
      <motion.svg
        viewBox="0 0 20 20"
        fill="none"
        animate={{
          rotate: shouldReduceMotion ? (isOpen ? 45 : 0) : rotation,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {/* Horizontal Line */}
        <motion.line
          x1="2"
          y1="10"
          x2="18"
          y2="10"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={
            isInView
              ? {
                  pathLength: 1,
                  opacity: shouldReduceMotion
                    ? 1
                    : [0.65, 1, 0.65],
                }
              : { pathLength: 0 }
          }
          transition={{
            pathLength: { duration: 0.5, delay: 0.8 + index * 0.1, ease: EASINGS.cyber },
            opacity: {
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut",
            },
          }}
        />

        {/* Vertical Line */}
        <motion.line
          x1="10"
          y1="2"
          x2="10"
          y2="18"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={
            isInView
              ? {
                  pathLength: 1,
                  opacity: shouldReduceMotion
                    ? 1
                    : [0.65, 1, 0.65],
                }
              : { pathLength: 0 }
          }
          transition={{
            pathLength: { duration: 0.5, delay: 0.8 + index * 0.1, ease: EASINGS.cyber },
            opacity: {
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut",
            },
          }}
        />
      </motion.svg>
    </div>
  );
}
