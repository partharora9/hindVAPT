"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";
import { FOOTER_CONTENT } from "@/content/footer";
import { SITE_CONFIG } from "@/content/site";

interface BottomBarProps {
  isInView?: boolean;
}

export function BottomBar({ isInView = true }: BottomBarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.7, delay: 1.2, ease: EASINGS.cyber }}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left select-none pt-12 pb-10 border-t border-[rgba(30,155,255,0.12)] mt-12"
    >
      {/* Left: Copyright © VAULTIX */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[15px] sm:text-[16px] font-mono font-medium text-white tracking-normal">
        <span>{FOOTER_CONTENT.copyright}</span>
        <span className="hidden sm:inline text-[#6B7FA8]" aria-hidden="true">·</span>
        <span className="text-[13px] sm:text-[14px] text-[#6B7FA8]">
          {SITE_CONFIG.contact.email}
        </span>
      </div>

      {/* Right: All testing is performed with written authorisation. */}
      <div className="text-[13px] sm:text-[14px] font-mono text-[#8FA3C7] tracking-normal flex items-center justify-center gap-1.5 flex-wrap">
        <span>{FOOTER_CONTENT.legalNotice}</span>
      </div>
    </motion.div>
  );
}
