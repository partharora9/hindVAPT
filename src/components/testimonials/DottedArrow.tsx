"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DottedArrowProps {
  direction: "left" | "right";
  isHovered?: boolean;
}

export function DottedArrow({ direction, isHovered = false }: DottedArrowProps) {
  const shouldReduceMotion = useReducedMotion();

  // Dots for left arrow (Tip at X=10, Y=20)
  // Arrowhead dots: (18, 12), (14, 16), (10, 20), (14, 24), (18, 28)
  // Shaft dots: (14, 20), (18, 20), (22, 20), (26, 20), (30, 20), (34, 20), (38, 20)
  const leftDots = [
    // Shaft (from right to left)
    { id: "s-6", cx: 38, cy: 20, seq: 0 },
    { id: "s-5", cx: 34, cy: 20, seq: 1 },
    { id: "s-4", cx: 30, cy: 20, seq: 2 },
    { id: "s-3", cx: 26, cy: 20, seq: 3 },
    { id: "s-2", cx: 22, cy: 20, seq: 4 },
    { id: "s-1", cx: 18, cy: 20, seq: 5 },
    { id: "s-0", cx: 14, cy: 20, seq: 6 },
    // Arrowhead
    { id: "h-top-2", cx: 22, cy: 12, seq: 4 },
    { id: "h-top-1", cx: 18, cy: 16, seq: 5 },
    { id: "h-tip",   cx: 14, cy: 20, seq: 6 },
    { id: "h-bot-1", cx: 18, cy: 24, seq: 5 },
    { id: "h-bot-2", cx: 22, cy: 28, seq: 4 },
    // Far tip
    { id: "tip-lead", cx: 10, cy: 20, seq: 7 },
  ];

  return (
    <motion.div
      animate={{
        scale: isHovered ? 1.15 : 1,
        x: isHovered ? (direction === "left" ? -6 : 6) : 0,
      }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative w-[48px] h-[40px] flex items-center justify-center select-none ${
        direction === "right" ? "scale-x-[-1]" : ""
      }`}
    >
      <svg
        viewBox="0 0 48 40"
        fill="none"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {leftDots.map((dot) => (
          <motion.rect
            key={dot.id}
            x={dot.cx - 1.2}
            y={dot.cy - 1.2}
            width="2.4"
            height="2.4"
            fill="#FFFFFF"
            initial={{ opacity: 0.85 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.85 }
                : {
                    opacity: [0.6, 1, 0.6],
                    scale: [0.9, 1.2, 0.9],
                  }
            }
            transition={{
              duration: 2.0,
              repeat: Infinity,
              delay: dot.seq * 0.12,
              ease: "easeInOut",
            }}
            style={{ originX: `${dot.cx}px`, originY: `${dot.cy}px` }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
