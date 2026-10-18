"use client";

import React from "react";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";

interface GlowBackdropProps {
  isInView?: boolean;
  isHovered?: boolean;
  offsetX?: MotionValue<number>;
  offsetY?: MotionValue<number>;
  size?: number;
}

export function GlowBackdrop({
  isInView = true,
  isHovered = false,
  offsetX,
  offsetY,
  size = 320,
}: GlowBackdropProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
      <motion.div
        style={{
          width: size,
          height: size,
          x: offsetX,
          y: offsetY,
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={
          isInView
            ? {
                scale: isHovered ? 1.15 : 1,
                opacity: isHovered ? 0.38 : 0.28,
              }
            : { scale: 0.6, opacity: 0 }
        }
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative rounded-full flex items-center justify-center pointer-events-none"
      >
        {/* Soft radial blue glow (#1E9BFF at 25-30% opacity, ~320px diameter, blur 60px) */}
        <div
          className="w-full h-full rounded-full blur-[60px] transition-opacity duration-300 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(30, 155, 255, 0.85) 0%, rgba(30, 155, 255, 0.4) 45%, transparent 70%)",
          }}
        />

        {/* Ambient slow pulse */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.65, 0.95, 0.65],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full blur-[45px] pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(76, 184, 255, 0.6) 0%, transparent 65%)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
