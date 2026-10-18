"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface HudTopLineProps {
  isInView?: boolean;
}

export function HudTopLine({ isInView = true }: HudTopLineProps) {
  const shouldReduceMotion = useReducedMotion();

  // Coordinates:
  // Center: (357.5, 10)
  // Left path: (357.5, 10) -> (227, 10) -> (185, 52) -> (12, 52)
  // Right path: (357.5, 10) -> (488, 10) -> (530, 52) -> (703, 52)
  const leftPath = "M 357.5 10 L 227 10 L 185 52 L 12 52";
  const rightPath = "M 357.5 10 L 488 10 L 530 52 L 703 52";
  const fullPath = "M 12 52 L 185 52 L 227 10 L 488 10 L 530 52 L 703 52";

  return (
    <div className="relative w-full max-w-[715px] h-[65px] mx-auto pointer-events-none select-none">
      <svg
        viewBox="0 0 715 65"
        fill="none"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Cyan Glow Filter */}
          <filter id="hud-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Traveling Pulse Gradient */}
          <linearGradient id="traveling-dash" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Soft Glow Path */}
        <path
          d={fullPath}
          stroke="#1E9BFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          filter="url(#hud-glow)"
        />

        {/* 2. Left Branch: Draws from Center Outward */}
        <motion.path
          d={leftPath}
          stroke="#1E9BFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 0.8,
            ease: EASINGS.cyber,
            delay: 0,
          }}
        />

        {/* 3. Right Branch: Draws from Center Outward */}
        <motion.path
          d={rightPath}
          stroke="#1E9BFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 0.8,
            ease: EASINGS.cyber,
            delay: 0,
          }}
        />

        {/* 4. Left Dot + Ripple Ring */}
        <g>
          {/* Ripple Ring */}
          {!shouldReduceMotion && isInView && (
            <motion.circle
              cx="12"
              cy="52"
              r="4.5"
              stroke="#1E9BFF"
              strokeWidth="1.5"
              fill="none"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.5, 3],
                opacity: [0.9, 0.4, 0],
              }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: "easeOut",
              }}
              style={{ originX: "12px", originY: "52px" }}
            />
          )}

          {/* Glowing Center Dot */}
          <motion.circle
            cx="12"
            cy="52"
            r="4.5"
            fill="#1E9BFF"
            filter="drop-shadow(0 0 8px #1E9BFF)"
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
              delay: 0.75,
            }}
            style={{ originX: "12px", originY: "52px" }}
          />
          {/* Bright Core */}
          <circle cx="12" cy="52" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 5. Right Dot + Ripple Ring */}
        <g>
          {/* Ripple Ring */}
          {!shouldReduceMotion && isInView && (
            <motion.circle
              cx="703"
              cy="52"
              r="4.5"
              stroke="#1E9BFF"
              strokeWidth="1.5"
              fill="none"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.5, 3],
                opacity: [0.9, 0.4, 0],
              }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: "easeOut",
              }}
              style={{ originX: "703px", originY: "52px" }}
            />
          )}

          {/* Glowing Center Dot */}
          <motion.circle
            cx="703"
            cy="52"
            r="4.5"
            fill="#1E9BFF"
            filter="drop-shadow(0 0 8px #1E9BFF)"
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
              delay: 0.75,
            }}
            style={{ originX: "703px", originY: "52px" }}
          />
          {/* Bright Core */}
          <circle cx="703" cy="52" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 6. Ambient Light Pulse Traveling Across HUD Line Every 5s */}
        {!shouldReduceMotion && isInView && (
          <motion.path
            d={fullPath}
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="40 680"
            animate={{
              strokeDashoffset: [720, -720],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 6px #FFFFFF)" }}
          />
        )}
      </svg>
    </div>
  );
}
