"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DottedArrow } from "./DottedArrow";

interface SideNavProps {
  onPrev: () => void;
  onNext: () => void;
  isInView?: boolean;
}

export function SideNav({ onPrev, onNext, isInView = true }: SideNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCell, setHoveredCell] = useState<"prev" | "next" | null>(null);

  const isAnyHovered = hoveredCell !== null;

  return (
    <div
      className="relative w-full max-w-[644px] lg:max-w-none lg:w-[250px] h-[56px] sm:h-[64px] lg:h-[640px] flex flex-row lg:flex-col select-none overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #031024 0%, #04122A 100%)",
      }}
    >
      {/* 1. Marching Ants Dashed Outer Border (SVG Overlay) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        fill="none"
      >
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          stroke={isAnyHovered ? "#1E9BFF" : "rgba(30,155,255,0.7)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={
            shouldReduceMotion
              ? { strokeDashoffset: 0 }
              : { strokeDashoffset: -32 }
          }
          transition={{
            duration: isAnyHovered ? 1.0 : 2.0,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Horizontal Divider Line at 50% for desktop (~315px) or vertical for mobile */}
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={isAnyHovered ? "#1E9BFF" : "rgba(30,155,255,0.7)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="hidden lg:block"
        />

        {/* Vertical Divider Line for mobile/tablet */}
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke={isAnyHovered ? "#1E9BFF" : "rgba(30,155,255,0.7)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="block lg:hidden"
        />
      </svg>

      {/* 2. Top Cell: Previous Testimonial Control */}
      <motion.button
        type="button"
        onClick={onPrev}
        onMouseEnter={() => setHoveredCell("prev")}
        onMouseLeave={() => setHoveredCell(null)}
        whileTap={{ scale: 0.96 }}
        className="relative flex-1 w-full flex items-center justify-center cursor-pointer transition-colors duration-250 outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] z-10"
        style={{
          backgroundColor:
            hoveredCell === "prev" ? "rgba(30, 155, 255, 0.12)" : "transparent",
        }}
        aria-label="Previous testimonial"
      >
        <DottedArrow direction="left" isHovered={hoveredCell === "prev"} />
      </motion.button>

      {/* 3. Bottom Cell: Next Testimonial Control */}
      <motion.button
        type="button"
        onClick={onNext}
        onMouseEnter={() => setHoveredCell("next")}
        onMouseLeave={() => setHoveredCell(null)}
        whileTap={{ scale: 0.96 }}
        className="relative flex-1 w-full flex items-center justify-center cursor-pointer transition-colors duration-250 outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] z-10"
        style={{
          backgroundColor:
            hoveredCell === "next" ? "rgba(30, 155, 255, 0.12)" : "transparent",
        }}
        aria-label="Next testimonial"
      >
        <DottedArrow direction="right" isHovered={hoveredCell === "next"} />
      </motion.button>
    </div>
  );
}
