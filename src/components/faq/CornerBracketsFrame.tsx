"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface CornerBracketsFrameProps {
  isOpen: boolean;
}

export function CornerBracketsFrame({ isOpen }: CornerBracketsFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASINGS.cyber }}
      className="absolute inset-0 pointer-events-none z-0 overflow-visible"
      aria-hidden="true"
    >
      {/* 1. Very Faint Accent Background Fill */}
      <div className="absolute inset-0 bg-[rgba(30,155,255,0.04)]" />

      {/* 2. Four L-Shaped Corner Brackets */}
      {/* Top-Left */}
      <svg className="absolute -top-[1px] -left-[1px] w-4 h-4 overflow-visible" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M 1 14 L 1 1 L 14 1"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: EASINGS.cyber }}
        />
      </svg>

      {/* Top-Right */}
      <svg className="absolute -top-[1px] -right-[1px] w-4 h-4 overflow-visible" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M 2 1 L 15 1 L 15 14"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: EASINGS.cyber }}
        />
      </svg>

      {/* Bottom-Left */}
      <svg className="absolute -bottom-[1px] -left-[1px] w-4 h-4 overflow-visible" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M 1 2 L 1 15 L 14 15"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: EASINGS.cyber }}
        />
      </svg>

      {/* Bottom-Right */}
      <svg className="absolute -bottom-[1px] -right-[1px] w-4 h-4 overflow-visible" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M 2 15 L 15 15 L 15 2"
          stroke="#1E9BFF"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: EASINGS.cyber }}
        />
      </svg>

      {/* 3. Bottom 1px Accent Hairline */}
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.35, ease: EASINGS.cyber }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(30,155,255,0.4)] shadow-[0_0_8px_rgba(30,155,255,0.4)]"
      />
    </motion.div>
  );
}
