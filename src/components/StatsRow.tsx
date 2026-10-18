"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { statsContainerVariants } from "@/config/animation";
import { useCountUp } from "@/hooks/useCountUp";

export function StatsRow() {
  const shouldReduceMotion = useReducedMotion();

  // Detection rate: counts 0.0 -> 99.9%
  const stat1 = useCountUp({
    from: 0,
    to: 99.9,
    duration: 2.0,
    delay: 1.6,
    decimals: 1,
    suffix: "%",
    enableLiveTick: true,
    tickIntervalSeconds: 6,
  });

  // Response time: animated counter resolving to <1ms
  const stat2 = useCountUp({
    from: 45,
    to: 1,
    duration: 1.8,
    delay: 1.7,
    decimals: 0,
    prefix: "<",
    suffix: "ms",
    enableLiveTick: true,
    tickIntervalSeconds: 5,
  });

  // Events analyzed: counts 0 -> 500M+
  const stat3 = useCountUp({
    from: 0,
    to: 500,
    duration: 2.2,
    delay: 1.8,
    decimals: 0,
    suffix: "M+",
    enableLiveTick: true,
    tickIntervalSeconds: 7,
  });

  return (
    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 mt-2 border-t border-[rgba(30,155,255,0.12)] max-w-[540px]"
    >
      {/* Stat 1: Detection Rate */}
      <div className="flex flex-col pr-3 sm:pr-6 border-r border-[rgba(30,155,255,0.15)]">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 ${
              stat1.isTicking ? "text-white glow-text-white" : ""
            }`}
          >
            {stat1.formatted}
          </span>
          {stat1.isTicking && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF] animate-ping" />
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          DETECTION RATE
        </span>
      </div>

      {/* Stat 2: Response Time */}
      <div className="flex flex-col px-3 sm:px-6 border-r border-[rgba(30,155,255,0.15)]">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 ${
              stat2.isTicking ? "text-white glow-text-white" : ""
            }`}
          >
            {stat2.formatted}
          </span>
          {stat2.isTicking && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF] animate-ping" />
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          RESPONSE TIME
        </span>
      </div>

      {/* Stat 3: Events Analyzed */}
      <div className="flex flex-col pl-3 sm:pl-6">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 ${
              stat3.isTicking ? "text-white glow-text-white" : ""
            }`}
          >
            {stat3.formatted}
          </span>
          {stat3.isTicking && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E9BFF] animate-ping" />
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          EVENTS ANALYZED
        </span>
      </div>
    </motion.div>
  );
}
