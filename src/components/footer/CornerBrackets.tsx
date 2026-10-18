"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface CornerBracketsProps {
  size?: number; // Arm length in px (default 8)
  strokeWidth?: number; // Stroke width in px (default 1)
  color?: string; // Default bracket color
  activeColor?: string; // Hover/active bracket color
  isHovered?: boolean;
  expandOffset?: number; // Expansion distance in px on hover (default 4)
  drawIn?: boolean; // Entrance draw-in trigger
  delay?: number;
  pulseInterval?: number; // Ambient pulse interval in ms (0 to disable)
  className?: string;
}

export function CornerBrackets({
  size = 8,
  strokeWidth = 1,
  color = "rgba(195, 212, 255, 0.45)",
  activeColor = "#1E9BFF",
  isHovered = false,
  expandOffset = 4,
  drawIn = true,
  delay = 0,
  pulseInterval = 0,
  className = "",
}: CornerBracketsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [ambientPulse, setAmbientPulse] = useState(false);

  // Subtle ambient pulse at random/staggered intervals
  useEffect(() => {
    if (pulseInterval <= 0 || shouldReduceMotion) return;

    // Randomize initial delay so elements don't pulse simultaneously
    const initialDelay = Math.random() * pulseInterval;
    let timer: NodeJS.Timeout;

    const pulseTimeout = setTimeout(() => {
      setAmbientPulse(true);
      timer = setInterval(() => {
        setAmbientPulse(true);
        setTimeout(() => setAmbientPulse(false), 800);
      }, pulseInterval);
    }, initialDelay);

    return () => {
      clearTimeout(pulseTimeout);
      clearInterval(timer);
    };
  }, [pulseInterval, shouldReduceMotion]);

  const currentColor = isHovered
    ? activeColor
    : ambientPulse
    ? "#1E9BFF"
    : color;

  const offset = isHovered && !shouldReduceMotion ? expandOffset : 0;

  const bracketVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.6, delay, ease: EASINGS.cyber },
        opacity: { duration: 0.3, delay },
      },
    },
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {/* Top-Left */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{
          x: -offset,
          y: -offset,
          color: currentColor,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-[1px] -left-[1px] overflow-visible"
      >
        <motion.path
          d={`M 0,${size} L 0,0 L ${size},0`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : "hidden"}
          animate={drawIn || shouldReduceMotion ? "visible" : "hidden"}
          variants={bracketVariants}
        />
      </motion.svg>

      {/* Top-Right */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{
          x: offset,
          y: -offset,
          color: currentColor,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-[1px] -right-[1px] overflow-visible"
      >
        <motion.path
          d={`M 0,0 L ${size},0 L ${size},${size}`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : "hidden"}
          animate={drawIn || shouldReduceMotion ? "visible" : "hidden"}
          variants={bracketVariants}
        />
      </motion.svg>

      {/* Bottom-Left */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{
          x: -offset,
          y: offset,
          color: currentColor,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-[1px] -left-[1px] overflow-visible"
      >
        <motion.path
          d={`M 0,0 L 0,${size} L ${size},${size}`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : "hidden"}
          animate={drawIn || shouldReduceMotion ? "visible" : "hidden"}
          variants={bracketVariants}
        />
      </motion.svg>

      {/* Bottom-Right */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{
          x: offset,
          y: offset,
          color: currentColor,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-[1px] -right-[1px] overflow-visible"
      >
        <motion.path
          d={`M 0,${size} L ${size},${size} L ${size},0`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : "hidden"}
          animate={drawIn || shouldReduceMotion ? "visible" : "hidden"}
          variants={bracketVariants}
        />
      </motion.svg>
    </div>
  );
}
