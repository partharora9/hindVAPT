"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface FooterBackgroundProps {
  isInView?: boolean;
}

export function FooterBackground({ isInView = true }: FooterBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
      {/* 1. TOP 1PX BORDER LINE (fades out at edges, draws outward from center) */}
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        animate={isInView || shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.0, ease: EASINGS.cyber }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(30,155,255,0.25)] to-transparent origin-center z-10"
      />

      {/* 2. TOP HORIZONTAL BLUE GLOW (blurred ellipse ~1200x160px, #0A3A7A ~60%, blur 60px) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 0, scaleY: 0.7 }}
        animate={isInView || shouldReduceMotion ? { opacity: 0.6, scaleY: 1 } : { opacity: 0, scaleY: 0.7 }}
        transition={{ duration: 1.1, ease: EASINGS.cyber }}
        className="absolute -top-[40px] left-1/2 -translate-x-1/2 w-[1200px] max-w-[95vw] h-[160px] rounded-full blur-[60px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10, 58, 122, 0.7) 0%, rgba(10, 40, 95, 0.4) 50%, transparent 80%)",
        }}
      />

      {/* 3. BOTTOM RADIAL GLOW (rising from bottom center, ~900px radius, breathing 6s) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.9 } : { opacity: 0 }}
        animate={
          isInView || shouldReduceMotion
            ? shouldReduceMotion
              ? { opacity: 0.9 }
              : { opacity: [0.8, 1, 0.8] }
            : { opacity: 0 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.5 }
            : {
                opacity: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
        className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[1600px] max-w-[120vw] h-[900px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 900px at 50% 100%, rgba(10, 70, 150, 0.35) 0%, rgba(10, 58, 122, 0.18) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}
