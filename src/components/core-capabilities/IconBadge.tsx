"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconBadgeProps {
  type?: "browser-shield" | "lightning-shield" | "network-shield";
  isInView?: boolean;
}

export function IconBadge({ type = "browser-shield", isInView = true }: IconBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 14,
        stiffness: 140,
      }}
      className="relative flex items-center justify-center w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-full select-none"
    >
      {/* Outer glassy gradient ring border */}
      <div
        className="absolute inset-0 rounded-full p-[1.5px] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(76, 184, 255, 0.8) 0%, rgba(30, 155, 255, 0.2) 50%, rgba(10, 58, 122, 0.6) 100%)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[#0B1528]/85 backdrop-blur-md" />
      </div>

      {/* Soft inner radial glow highlight */}
      <div
        className="absolute inset-2 rounded-full pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(76, 184, 255, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Thin line icon in white-blue */}
      <div className="relative z-10 w-9 h-9 text-[#C3D4FF] flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(30,155,255,0.6)]">
        {type === "browser-shield" && (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.8">
            {/* Browser Window Outline */}
            <rect x="4" y="5" width="28" height="23" rx="4" strokeLinecap="round" />
            <line x1="4" y1="12" x2="32" y2="12" />
            {/* Browser window title dots */}
            <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
            <circle cx="13" cy="8.5" r="1.2" fill="currentColor" />
            <circle cx="17.5" cy="8.5" r="1.2" fill="currentColor" />
            {/* Shield inside browser */}
            <path
              d="M 23 16 C 26 16 29 17.5 29 20 C 29 25 26 28 23 30 C 20 28 17 25 17 20 C 17 17.5 20 16 23 16 Z"
              fill="#1E9BFF"
              fillOpacity="0.25"
              stroke="#4CB8FF"
              strokeWidth="1.6"
            />
          </svg>
        )}

        {type === "lightning-shield" && (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.8">
            {/* Shield Frame */}
            <path
              d="M 18 4 C 24 4 30 6 30 11 C 30 22 25 28 18 32 C 11 28 6 22 6 11 C 6 6 12 4 18 4 Z"
              fill="#1E9BFF"
              fillOpacity="0.2"
              stroke="#4CB8FF"
            />
            {/* Lightning Bolt */}
            <path
              d="M 19 9 L 12 19 H 18 L 17 27 L 24 17 H 18 L 19 9 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {type === "network-shield" && (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.8">
            {/* Shield Frame */}
            <path
              d="M 18 4 C 24 4 30 6 30 11 C 30 22 25 28 18 32 C 11 28 6 22 6 11 C 6 6 12 4 18 4 Z"
              fill="#1E9BFF"
              fillOpacity="0.2"
              stroke="#4CB8FF"
            />
            {/* Radar / Network Nodes */}
            <circle cx="18" cy="18" r="6" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="2 2" />
            <circle cx="18" cy="18" r="2.2" fill="#FFFFFF" />
            <circle cx="12" cy="13" r="1.8" fill="#4CB8FF" />
            <circle cx="24" cy="14" r="1.8" fill="#4CB8FF" />
            <circle cx="21" cy="24" r="1.8" fill="#4CB8FF" />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
