"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagnifierLensProps {
  className?: string;
  parallaxX?: number;
  parallaxY?: number;
  isParentHovered?: boolean;
  focalText?: string;
}

export function MagnifierLens({
  className = "",
  parallaxX = 0,
  parallaxY = 0,
  isParentHovered,
  focalText,
}: MagnifierLensProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute pointer-events-none select-none z-30 ${className}`}
      animate={
        shouldReduceMotion
          ? { x: parallaxX, y: parallaxY }
          : {
              x: [parallaxX - 10, parallaxX + 14, parallaxX - 8, parallaxX - 10],
              y: [parallaxY - 8, parallaxY + 12, parallaxY + 6, parallaxY - 8],
              rotate: [-2, 3, -1, -2],
            }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px]">
        {/* Glass Lens Circle with Multi-layer Glow & Rim */}
        <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#4CB8FF]/60 via-[#1E9BFF]/20 to-[#0A162B] shadow-[0_12px_28px_rgba(0,0,0,0.65),inset_0_0_15px_rgba(30,155,255,0.25)] backdrop-blur-[2px]">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A1424]/40 border border-[rgba(76,184,255,0.35)]">
            {/* Soft inner radial magnification highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(76,184,255,0.3) 0%, rgba(30,155,255,0.05) 55%, transparent 75%)",
              }}
            />

            {/* Diagonal glass reflection sheen */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 w-[200%] h-full -left-1/2"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Inner rim crosshair or subtle focal tick */}
            <div className="absolute inset-2 rounded-full border border-[rgba(76,184,255,0.15)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CB8FF]/40 shadow-[0_0_6px_#1E9BFF]" />
            </div>
          </div>
        </div>

        {/* Magnifying Glass Handle extending down-right */}
        <div
          className="absolute -bottom-3 -right-3 w-8 h-3.5 bg-gradient-to-r from-[#18263E] via-[#0E182A] to-[#070D18] rounded-full border border-[rgba(76,184,255,0.25)] shadow-[0_4px_10px_rgba(0,0,0,0.8)] origin-left"
          style={{ transform: "rotate(45deg)" }}
        >
          {/* Metallic highlight on handle */}
          <div className="w-full h-[1px] mt-[1px] bg-gradient-to-r from-transparent via-[#4CB8FF]/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
