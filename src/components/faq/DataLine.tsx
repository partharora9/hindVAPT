"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DataLineProps {
  isInView?: boolean;
}

export function DataLine({ isInView = true }: DataLineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className="absolute top-0 bottom-0 -left-6 sm:-left-8 lg:-left-12 w-[1px] bg-[rgba(30,155,255,0.10)] pointer-events-none hidden md:block overflow-hidden"
      aria-hidden="true"
    >
      {/* Small bright pulse traveling down every ~7s */}
      {isInView && (
        <motion.div
          animate={{
            top: ["-10%", "110%"],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            repeatDelay: 3.8,
            ease: "easeInOut",
          }}
          className="absolute left-0 w-[1px] h-20 bg-gradient-to-b from-transparent via-[#1E9BFF] to-transparent shadow-[0_0_8px_#1E9BFF]"
        />
      )}
    </div>
  );
}
