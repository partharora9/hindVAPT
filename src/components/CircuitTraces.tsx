"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DELAYS, EASINGS } from "@/config/animation";

interface CircuitTracesProps {
  xOffset?: any;
  yOffset?: any;
}

export function CircuitTraces({ xOffset, yOffset }: CircuitTracesProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      style={{ x: xOffset, y: yOffset }}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 700 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="traceGradTop" x1="350" y1="0" x2="350" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#1E9BFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="traceGradBottom" x1="350" y1="800" x2="350" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#1E9BFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.1" />
          </linearGradient>

          <filter id="traceGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#1E9BFF" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* ================= TOP CIRCUIT TRACES ================= */}
        {/* Trace Top 1 - Far Left jog */}
        <motion.path
          d="M 230 0 V 110 L 250 130 V 220"
          stroke="url(#traceGradTop)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.05,
            duration: 1.2,
            ease: EASINGS.cyber,
          }}
        />

        {/* Trace Top 2 - Inner Left */}
        <motion.path
          d="M 270 0 V 85 L 290 105 V 190"
          stroke="url(#traceGradTop)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.15,
            duration: 1.1,
            ease: EASINGS.cyber,
          }}
        />

        {/* Trace Top 3 - Center Left straight down */}
        <motion.path
          d="M 315 0 V 155"
          stroke="url(#traceGradTop)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.25,
            duration: 1.0,
            ease: EASINGS.cyber,
          }}
        />

        {/* Trace Top 4 - Center Right straight down */}
        <motion.path
          d="M 385 0 V 155"
          stroke="url(#traceGradTop)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.25,
            duration: 1.0,
            ease: EASINGS.cyber,
          }}
        />

        {/* Trace Top 5 - Inner Right jog */}
        <motion.path
          d="M 430 0 V 85 L 410 105 V 190"
          stroke="url(#traceGradTop)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.15,
            duration: 1.1,
            ease: EASINGS.cyber,
          }}
        />

        {/* Trace Top 6 - Far Right jog */}
        <motion.path
          d="M 470 0 V 110 L 450 130 V 220"
          stroke="url(#traceGradTop)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.05,
            duration: 1.2,
            ease: EASINGS.cyber,
          }}
        />

        {/* ================= TOP CIRCUIT NODES (Spring Pop) ================= */}
        {[
          { cx: 250, cy: 220, delay: 0.35 },
          { cx: 290, cy: 190, delay: 0.45 },
          { cx: 315, cy: 155, delay: 0.5 },
          { cx: 385, cy: 155, delay: 0.5 },
          { cx: 410, cy: 190, delay: 0.45 },
          { cx: 450, cy: 220, delay: 0.35 },
        ].map((node, i) => (
          <motion.circle
            key={`top-node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="#1E9BFF"
            filter="url(#traceGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : DELAYS.tracesStart + node.delay,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
        ))}

        {/* Top Chevron Columns */}
        {/* Left Chevron Column */}
        <g opacity="0.8">
          {[40, 52, 64, 76, 88, 100, 112].map((y, index) => (
            <motion.path
              key={`top-chev-l-${index}`}
              d={`M 252 ${y} L 256 ${y + 4} L 260 ${y}`}
              stroke="#1E9BFF"
              strokeWidth="1.2"
              fill="none"
              initial={{ opacity: 0.2 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.6 }
                  : { opacity: [0.15, 0.9, 0.15] }
              }
              transition={{
                delay: index * 0.18,
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Right Chevron Column */}
        <g opacity="0.8">
          {[40, 52, 64, 76, 88, 100, 112].map((y, index) => (
            <motion.path
              key={`top-chev-r-${index}`}
              d={`M 440 ${y} L 444 ${y + 4} L 448 ${y}`}
              stroke="#1E9BFF"
              strokeWidth="1.2"
              fill="none"
              initial={{ opacity: 0.2 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.6 }
                  : { opacity: [0.15, 0.9, 0.15] }
              }
              transition={{
                delay: index * 0.18 + 0.3,
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* ================= BOTTOM CIRCUIT TRACES ================= */}
        {/* Bottom Trace 1 - Far Left */}
        <motion.path
          d="M 230 800 V 690 L 250 670 V 580"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.1,
            duration: 1.2,
            ease: EASINGS.cyber,
          }}
        />

        {/* Bottom Trace 2 - Inner Left */}
        <motion.path
          d="M 270 800 V 715 L 290 695 V 610"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.2,
            duration: 1.1,
            ease: EASINGS.cyber,
          }}
        />

        {/* Bottom Trace 3 - Center Left */}
        <motion.path
          d="M 315 800 V 645"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.3,
            duration: 1.0,
            ease: EASINGS.cyber,
          }}
        />

        {/* Bottom Trace 4 - Center Right */}
        <motion.path
          d="M 385 800 V 645"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.3,
            duration: 1.0,
            ease: EASINGS.cyber,
          }}
        />

        {/* Bottom Trace 5 - Inner Right */}
        <motion.path
          d="M 430 800 V 715 L 410 695 V 610"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.2,
            duration: 1.1,
            ease: EASINGS.cyber,
          }}
        />

        {/* Bottom Trace 6 - Far Right */}
        <motion.path
          d="M 470 800 V 690 L 450 670 V 580"
          stroke="url(#traceGradBottom)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: DELAYS.tracesStart + 0.1,
            duration: 1.2,
            ease: EASINGS.cyber,
          }}
        />

        {/* ================= BOTTOM CIRCUIT NODES ================= */}
        {[
          { cx: 250, cy: 580, delay: 0.35 },
          { cx: 290, cy: 610, delay: 0.45 },
          { cx: 315, cy: 645, delay: 0.5 },
          { cx: 385, cy: 645, delay: 0.5 },
          { cx: 410, cy: 610, delay: 0.45 },
          { cx: 450, cy: 580, delay: 0.35 },
        ].map((node, i) => (
          <motion.circle
            key={`bottom-node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="#1E9BFF"
            filter="url(#traceGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : DELAYS.tracesStart + node.delay,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
        ))}

        {/* Bottom Chevron Columns */}
        <g opacity="0.8">
          {[720, 708, 696, 684, 672, 660].map((y, index) => (
            <motion.path
              key={`bottom-chev-l-${index}`}
              d={`M 252 ${y} L 256 ${y - 4} L 260 ${y}`}
              stroke="#1E9BFF"
              strokeWidth="1.2"
              fill="none"
              initial={{ opacity: 0.2 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.6 }
                  : { opacity: [0.15, 0.9, 0.15] }
              }
              transition={{
                delay: index * 0.18,
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Continuous Data Pulse Packets */}
        {!shouldReduceMotion && (
          <>
            {/* Top packet 1 */}
            <motion.circle
              r="2.5"
              fill="#FFFFFF"
              filter="url(#traceGlow)"
              initial={{ cx: 315, cy: 0, opacity: 0 }}
              animate={{
                cy: [0, 155],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "linear",
              }}
            />
            {/* Top packet 2 */}
            <motion.circle
              r="2.5"
              fill="#FFFFFF"
              filter="url(#traceGlow)"
              initial={{ cx: 385, cy: 0, opacity: 0 }}
              animate={{
                cy: [0, 155],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 2.8,
                delay: 1.2,
                ease: "linear",
              }}
            />
            {/* Bottom packet 1 */}
            <motion.circle
              r="2.5"
              fill="#FFFFFF"
              filter="url(#traceGlow)"
              initial={{ cx: 315, cy: 800, opacity: 0 }}
              animate={{
                cy: [800, 645],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 3.2,
                delay: 0.6,
                ease: "linear",
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
