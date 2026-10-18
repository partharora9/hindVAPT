"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RowSpotlightProps {
  isHovered: boolean;
  mouseX: number;
}

export function RowSpotlight({ isHovered, mouseX }: RowSpotlightProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 1. Soft Horizontal Spotlight Following Cursor within Row */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          x: mouseX,
        }}
        transition={{
          opacity: { duration: 0.2 },
          x: { duration: 0.05, ease: "linear" },
        }}
        className="absolute top-0 bottom-0 w-[420px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30, 155, 255, 0.07) 0%, rgba(30, 155, 255, 0.01) 50%, transparent 70%)",
        }}
      />

      {/* 2. Bottom 1px Hairline Drawing from Left to Right on Hover */}
      <motion.div
        initial={false}
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[rgba(30,155,255,0.4)] via-[rgba(30,155,255,0.25)] to-transparent"
      />
    </div>
  );
}
