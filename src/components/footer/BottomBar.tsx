"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface BottomBarProps {
  isInView?: boolean;
}

export function BottomBar({ isInView = true }: BottomBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const [inksHovered, setInksHovered] = useState(false);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.7, delay: 1.2, ease: EASINGS.cyber }}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left select-none pt-12 pb-10"
    >
      {/* Left: Copyright © VAULTIX (~18px, white) */}
      <div className="text-[17px] sm:text-[18px] font-mono font-medium text-white tracking-normal">
        Copyright © VAULTIX
      </div>

      {/* Right: Designed by inksstudio - Built with Next.js */}
      <div className="text-[15px] sm:text-[16px] font-mono text-[#8FA3C7] tracking-normal flex items-center justify-center gap-1.5 flex-wrap">
        <span>Designed by</span>
        <Link
          href="https://inksstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setInksHovered(true)}
          onMouseLeave={() => setInksHovered(false)}
          className="relative inline-block text-[#1E9BFF] font-medium outline-none focus-visible:ring-1 focus-visible:ring-[#1E9BFF] px-0.5"
        >
          <span>inksstudio</span>
          {/* Accent Underline that retracts and redraws on hover */}
          <motion.span
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={
              isInView || shouldReduceMotion
                ? inksHovered
                  ? { scaleX: [1, 0, 1] }
                  : { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={
              inksHovered
                ? { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut" }
                : { duration: 0.6, delay: 1.3, ease: EASINGS.cyber }
            }
            style={{ originX: inksHovered ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1E9BFF] pointer-events-none"
            aria-hidden="true"
          />
        </Link>
        <span className="text-[#8FA3C7]">- Built with Next.js</span>
      </div>
    </motion.div>
  );
}
