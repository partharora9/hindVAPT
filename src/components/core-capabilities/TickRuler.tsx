"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TickRulerProps {
  className?: string;
  width?: number;
}

export function TickRuler({ className = "", width = 240 }: TickRulerProps) {
  const shouldReduceMotion = useReducedMotion();
  const tickCount = 28;

  return (
    <div
      className={`relative h-[28px] overflow-hidden select-none pointer-events-none flex items-center ${className}`}
      style={{ width }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Baseline track */}
        <line x1="0" y1="20" x2="240" y2="20" stroke="rgba(30, 155, 255, 0.35)" strokeWidth="1" />

        {/* Evenly spaced vertical ticks with a few taller peaks */}
        {Array.from({ length: tickCount }).map((_, i) => {
          const x = i * (240 / (tickCount - 1));
          const isTall = i % 7 === 0 || i === 12 || i === 19;
          const tickHeight = isTall ? 12 : 6;
          const y1 = 20 - tickHeight;

          return (
            <line
              key={i}
              x1={x}
              y1={y1}
              x2={x}
              y2={20}
              stroke={isTall ? "#4CB8FF" : "rgba(30, 155, 255, 0.45)"}
              strokeWidth={isTall ? 1.5 : 1}
            />
          );
        })}

        {/* Sliding downward triangle marker along baseline (6s loop) */}
        {!shouldReduceMotion && (
          <motion.polygon
            points="-4,4 4,4 0,11"
            fill="#4CB8FF"
            filter="drop-shadow(0 0 4px #1E9BFF)"
            animate={{
              x: [10, 225, 10],
            }}
            transition={{
              duration: 6.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
}
