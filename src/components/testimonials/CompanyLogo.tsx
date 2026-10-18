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

  return (
    <div
      className="flex items-center gap-3 select-none"
      role="img"
      aria-label={`${testimonial.companyName} logo`}
    >
      {/* Cyber Glyph */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASINGS.cyber }}
        className="w-10 h-10 rounded-[6px] bg-[#1E9BFF]/15 border border-[#1E9BFF]/40 flex items-center justify-center text-[#1E9BFF] font-mono text-[14px] font-bold"
      >
        #
      </motion.div>

      {/* Wordmark + Category Subtitle */}
      <div className="flex items-baseline gap-2">
        <motion.span
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.cyber }}
          className="text-[28px] sm:text-[34px] font-sans font-bold text-white tracking-tight leading-none"
        >
          {testimonial.companyName}
        </motion.span>
        {testimonial.companySubtitle && (
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[13px] sm:text-[14px] font-mono font-bold text-[#1E9BFF] tracking-widest uppercase"
          >
            {testimonial.companySubtitle}
          </motion.span>
        )}
      </div>
    </div>
  );
}
