"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconBadgeProps {
  children: React.ReactNode;
  isHovered?: boolean;
  isInView?: boolean;
  index?: number;
}

export function IconBadge({
  children,
  isHovered = false,
  isInView = true,
  index = 0,
}: IconBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-[64px] h-[64px] lg:w-[70px] lg:h-[70px] rounded-full flex items-center justify-center select-none"
    >
      {/* 1. Outer Rotating Gradient Ring SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 70 70"
        fill="none"
      >
        <defs>
          <linearGradient
            id={`badge-ring-${index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={isHovered ? "#1E9BFF" : "rgba(195,212,255,0.65)"} />
            <stop offset="50%" stopColor={isHovered ? "#3AA8FF" : "rgba(58,168,255,0.25)"} />
            <stop offset="100%" stopColor={isHovered ? "#1E9BFF" : "rgba(14,20,36,0.3)"} />
          </linearGradient>

          {/* Glow filter on hover */}
          <filter id={`badge-glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rotating Highlight Ring (12s/rev) */}
        <motion.g
          animate={
            shouldReduceMotion || !isInView
              ? { rotate: 0 }
              : { rotate: 360 }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: -index * 1.33,
          }}
          style={{ originX: "35px", originY: "35px" }}
        >
          <circle
            cx="35"
            cy="35"
            r="34"
            stroke={`url(#badge-ring-${index})`}
            strokeWidth={isHovered ? 1.5 : 1}
            filter={isHovered ? `url(#badge-glow-${index})` : "none"}
          />
        </motion.g>

        {/* Subtle Static Baseline Ring */}
        <circle
          cx="35"
          cy="35"
          r="34"
          stroke={isHovered ? "rgba(30,155,255,0.4)" : "rgba(150,170,230,0.18)"}
          strokeWidth="1"
        />
      </svg>

      {/* 2. Glass Base Fill & Inner Highlights */}
      <div
        className="w-[66px] h-[66px] rounded-full relative flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #141B2E 0%, #0E1424 100%)",
          boxShadow: isHovered
            ? "0 8px 28px rgba(0,0,0,0.7), 0 0 20px rgba(30,155,255,0.3), inset 0 1px 2px rgba(255,255,255,0.25)"
            : "0 6px 20px rgba(0,0,0,0.55), inset 0 1px 1.5px rgba(255,255,255,0.14)",
        }}
      >
        {/* Soft Inner Highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(58, 168, 255, 0.22) 0%, transparent 65%)",
          }}
        />

        {/* Subtle Ambient Vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(3, 8, 24, 0.7) 100%)",
          }}
        />

        {/* 3. Centered Icon */}
        <div className="relative z-10 flex items-center justify-center transition-transform duration-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
