"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";
import type { TestimonialItem } from "./testimonialsData";

interface CompanyLogoProps {
  testimonial: TestimonialItem;
  isInView?: boolean;
}

export function CompanyLogo({ testimonial, isInView = true }: CompanyLogoProps) {
  const shouldReduceMotion = useReducedMotion();

  if (testimonial.companyType === "gillate") {
    return (
      <div className="flex items-center gap-3.5 select-none" role="img" aria-label="Gillate AI logo">
        {/* Stylized Icon: Two Bold Slanted Parallelogram Bars forming dynamic glyph */}
        <div className="relative w-[46px] h-[44px] flex items-center justify-center">
          <svg viewBox="0 0 46 44" fill="none" className="w-full h-full overflow-visible">
            {/* Left Slanted Bar */}
            <motion.path
              d="M 6 36 L 16 12 H 24 L 14 36 Z"
              fill="#FFFFFF"
              initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASINGS.cyber }}
            />
            {/* Right Slanted Bar */}
            <motion.path
              d="M 22 28 L 32 4 H 40 L 30 28 Z"
              fill="#FFFFFF"
              initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 16, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 16, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASINGS.cyber }}
            />
          </svg>
        </div>

        {/* Wordmark "Gillate" + Superscript "AI" */}
        <div className="flex items-start">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASINGS.cyber }}
            className="text-[36px] sm:text-[40px] font-sans font-medium text-white tracking-[-0.02em] leading-none"
          >
            Gillate
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.5 }}
            className="text-[17px] sm:text-[19px] font-mono font-bold text-white ml-1.5 -mt-0.5 tracking-wider"
          >
            AI
          </motion.span>
        </div>
      </div>
    );
  }

  // Placeholder logos for other testimonials (AetherSec, Kinesis, Synthetix)
  return (
    <div className="flex items-center gap-3 select-none" role="img" aria-label={`${testimonial.companyName} logo`}>
      {/* Dynamic Cyber Glyph */}
      <div className="w-10 h-10 rounded-[6px] bg-[#1E9BFF]/20 border border-[#1E9BFF]/50 flex items-center justify-center text-[#1E9BFF] font-bold">
        {testimonial.companyName[0]}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[34px] sm:text-[38px] font-sans font-semibold text-white tracking-tight">
          {testimonial.companyName}
        </span>
        {testimonial.companySubtitle && (
          <span className="text-[15px] font-mono font-bold text-[#1E9BFF] tracking-wider">
            {testimonial.companySubtitle}
          </span>
        )}
      </div>
    </div>
  );
}
