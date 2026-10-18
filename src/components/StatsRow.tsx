"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { statsContainerVariants } from "@/config/animation";
import { useCountUp } from "@/hooks/useCountUp";
import { HOME_CONTENT } from "@/content/home";

export function StatsRow() {
  const shouldReduceMotion = useReducedMotion();
  const [statData1, statData2, statData3] = HOME_CONTENT.hero.stats;

  // Stat 1: 100% FINDINGS VALIDATED
  const stat1 = useCountUp({
    from: 0,
    to: statData1.value,
    duration: 1.8,
    delay: 1.5,
    decimals: statData1.decimals || 0,
    suffix: statData1.suffix,
    enableLiveTick: false,
  });

  // Stat 2: 10+ TESTING DOMAINS
  const stat2 = useCountUp({
    from: 0,
    to: statData2.value,
    duration: 1.6,
    delay: 1.6,
    decimals: 0,
    suffix: statData2.suffix,
    enableLiveTick: false,
  });

  // Stat 3: 1 FREE RETEST
  const stat3 = useCountUp({
    from: 0,
    to: statData3.value,
    duration: 1.2,
    delay: 1.7,
    decimals: 0,
    suffix: statData3.suffix,
    enableLiveTick: false,
  });

  return (
    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 pt-6 sm:pt-8 mt-2 border-t border-[rgba(30,155,255,0.12)] max-w-[540px] w-full"
    >
      {/* Stat 1: Findings Validated */}
      <div className="flex flex-col pr-2 xs:pr-3 sm:pr-6 border-r border-[rgba(30,155,255,0.15)] min-w-0">
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 truncate"
          >
            {stat1.formatted}
          </span>
        </div>
        <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          {statData1.label}
        </span>
      </div>

      {/* Stat 2: Testing Domains */}
      <div className="flex flex-col px-2 xs:px-3 sm:px-6 border-r border-[rgba(30,155,255,0.15)] min-w-0">
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 truncate"
          >
            {stat2.formatted}
          </span>
        </div>
        <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          {statData2.label}
        </span>
      </div>

      {/* Stat 3: Free Retest */}
      <div className="flex flex-col pl-2 xs:pl-3 sm:pl-6 min-w-0">
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#C3D4FF] tabular-nums transition-colors duration-200 truncate"
          >
            {stat3.formatted}
          </span>
        </div>
        <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-[#6B7FA8] uppercase mt-1">
          {statData3.label}
        </span>
      </div>
    </motion.div>
  );
}
