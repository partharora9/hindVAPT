"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { BinaryRain } from "./BinaryRain";
import { DELAYS, DURATIONS, EASINGS } from "@/config/animation";

interface ShieldVisualProps {
  ringX: MotionValue<number>;
  ringY: MotionValue<number>;
  shieldX: MotionValue<number>;
  shieldY: MotionValue<number>;
  tiltRotateX: MotionValue<number>;
  tiltRotateY: MotionValue<number>;
  reflectionX: MotionValue<string>;
  reflectionY: MotionValue<string>;
  scrollScale?: MotionValue<number>;
  scrollOpacity?: MotionValue<number>;
}

export function ShieldVisual({
  ringX,
  ringY,
  shieldX,
  shieldY,
  tiltRotateX,
  tiltRotateY,
  reflectionX,
  reflectionY,
  scrollScale,
  scrollOpacity,
}: ShieldVisualProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // Exact cyber shield path (viewBox 0 0 320 380)
  const outerShieldPath =
    "M 160 30 C 215 30 275 48 275 80 C 275 210 235 295 160 355 C 85 295 45 210 45 80 C 45 48 105 30 160 30 Z";
  const innerShieldPath =
    "M 160 44 C 208 44 260 59 260 88 C 260 200 226 275 160 332 C 94 275 60 200 60 88 C 60 59 112 44 160 44 Z";

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[520px] sm:h-[620px] lg:h-[720px] select-none perspective-[1200px]"
      aria-hidden="true"
    >
      {/* 1. ATMOSPHERIC RADIAL GLOW BEHIND SHIELD */}
      <div className="absolute w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] rounded-full shield-radial-glow pointer-events-none -z-10" />

      {/* 2. EXPANDING RADAR PULSE (every 4s) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            scale: [1, 1.45],
            opacity: [0.45, 0],
          }}
          transition={{
            duration: 4.0,
            repeat: Infinity,
            ease: EASINGS.cyber,
          }}
          className="absolute w-[420px] sm:w-[520px] h-[420px] sm:h-[520px] rounded-full border border-[#1E9BFF]/35 pointer-events-none"
        />
      )}

      {/* 3. ORBIT RINGS WITH MOUSE PARALLAX (12px) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        className="absolute flex items-center justify-center w-[440px] sm:w-[520px] lg:w-[540px] h-[440px] sm:h-[520px] lg:h-[540px] pointer-events-none"
      >
        {/* Outer Circular Ring: draws at 0.9s, rotates 60s/rev */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-[#1E9BFF]/35 shadow-[0_0_20px_rgba(30,155,255,0.2)]"
        >
          {/* Subtle orbit satellite nodes */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1E9BFF] rounded-full shadow-[0_0_12px_#1E9BFF]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1E9BFF]/60 rounded-full" />
        </motion.div>

        {/* Inner Dashed Counter-Rotating Ring (90s/rev) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute w-[360px] sm:w-[440px] lg:w-[460px] h-[360px] sm:h-[440px] lg:h-[460px] rounded-full border border-dashed border-[#1E9BFF]/20"
        />
      </motion.div>

      {/* 4. SOFT SHIELD SHADOW (SCALES OPPOSITE TO FLOAT) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 0.88, 1],
                opacity: [0.35, 0.2, 0.35],
              }
        }
        transition={{
          duration: 6.0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 sm:bottom-12 w-[220px] sm:w-[280px] h-[30px] rounded-[100%] bg-[#001333] blur-xl pointer-events-none"
      />

      {/* 5. 3D TILT & FLOATING SHIELD CONTAINER */}
      <motion.div
        style={{
          x: shieldX,
          y: shieldY,
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          scale: scrollScale,
          opacity: scrollOpacity,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: DELAYS.shieldBloom,
          duration: DURATIONS.shieldScale,
          ease: EASINGS.cyber,
        }}
        className="relative z-20 flex items-center justify-center"
      >
        {/* Floating continuous oscillation (±8px, 6s ease-in-out) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-8, 8, -8],
                }
          }
          transition={{
            duration: 6.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[280px] sm:w-[320px] h-[330px] sm:h-[380px]"
        >
          {/* Main Shield SVG Artwork */}
          <svg
            viewBox="0 0 320 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible drop-shadow-[0_0_35px_rgba(30,155,255,0.4)]"
          >
            <defs>
              {/* Shield Body Gradient: Midnight to Azure */}
              <linearGradient
                id="shieldBodyGrad"
                x1="160"
                y1="30"
                x2="160"
                y2="360"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#0B306D" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#082252" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#03112E" stopOpacity="0.95" />
              </linearGradient>

              {/* Glossy Edge Outline Gradient */}
              <linearGradient
                id="shieldBorderGrad"
                x1="45"
                y1="30"
                x2="275"
                y2="360"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#1E9BFF" stopOpacity="1" />
                <stop offset="50%" stopColor="#5EC0FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1E9BFF" stopOpacity="1" />
              </linearGradient>

              {/* Outer Neon Glow Filter */}
              <filter id="neonShieldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#1E9BFF" floodOpacity="0.8" />
              </filter>

              {/* White Keyhole Intense Glow */}
              <filter id="keyholeFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#FFFFFF" floodOpacity="0.9" />
                <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#1E9BFF" floodOpacity="0.8" />
              </filter>

              {/* Clip path for Binary Rain and Diagonal Glass Shine */}
              <clipPath id="innerShieldClip">
                <path d={innerShieldPath} />
              </clipPath>
            </defs>

            {/* Base Translucent Shield Surface */}
            <path
              d={outerShieldPath}
              fill="url(#shieldBodyGrad)"
              className="transition-colors duration-300"
            />

            {/* Outer Double Outline - Primary Neon Trace */}
            <motion.path
              d={outerShieldPath}
              stroke="url(#shieldBorderGrad)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#neonShieldGlow)"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: DELAYS.shieldBloom,
                duration: 1.2,
                ease: EASINGS.cyber,
              }}
            />

            {/* Inner Double Outline - Hairline Border */}
            <motion.path
              d={innerShieldPath}
              stroke="#1E9BFF"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: DELAYS.shieldBloom + 0.2,
                duration: 1.0,
                ease: EASINGS.cyber,
              }}
            />

            {/* Embedded Binary Rain Canvas (Clipped inside Shield) */}
            <g clipPath="url(#innerShieldClip)">
              <foreignObject x="0" y="0" width="320" height="380">
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                  <BinaryRain width={320} height={380} inView={inView} />
                </div>
              </foreignObject>
            </g>

            {/* Diagonal Light Sweep across Shield Glass (every ~7s) */}
            {!shouldReduceMotion && (
              <g clipPath="url(#innerShieldClip)">
                <motion.rect
                  x="-200"
                  y="0"
                  width="120"
                  height="450"
                  fill="url(#lightSweepGrad)"
                  transform="rotate(25 160 190)"
                  animate={{
                    x: [-200, 450],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 4.8,
                    ease: "easeInOut",
                  }}
                />
                <defs>
                  <linearGradient id="lightSweepGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </g>
            )}

            {/* Center Solid White Keyhole Symbol */}
            {/* 1.8s: keyhole flashes white, then breathes (glow 0.6 <-> 1.0, 3s loop) */}
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: DELAYS.keyholeFlash,
                duration: 0.6,
                ease: EASINGS.cyber,
              }}
            >
              {/* White keyhole: circular upper head and tapering trapezoid lower body */}
              <motion.path
                d="M 160 160 C 147 160 136 171 136 184 C 136 193 141 201 148 205 L 140 248 C 139 250 141 252 143 252 H 177 C 179 252 181 250 180 248 L 172 205 C 179 201 184 193 184 184 C 184 171 173 160 160 160 Z"
                fill="#FFFFFF"
                filter="url(#keyholeFilter)"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        filter: [
                          "drop-shadow(0 0 8px rgba(255,255,255,0.7)) drop-shadow(0 0 16px rgba(30,155,255,0.6))",
                          "drop-shadow(0 0 18px rgba(255,255,255,1)) drop-shadow(0 0 35px rgba(30,155,255,0.95))",
                          "drop-shadow(0 0 8px rgba(255,255,255,0.7)) drop-shadow(0 0 16px rgba(30,155,255,0.6))",
                        ],
                      }
                }
                transition={{
                  duration: 3.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
