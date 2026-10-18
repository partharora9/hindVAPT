"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ServiceCell } from "./ServiceCell";
import { GridMarks } from "./GridMarks";
import { CursorSpotlight } from "./CursorSpotlight";
import { SERVICES_DATA } from "./servicesData";

interface ServicesGridProps {
  isInView?: boolean;
}

export function ServicesGrid({ isInView = true }: ServicesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1498px] mx-auto border border-[rgba(150,170,230,0.28)] bg-[#020617] overflow-visible"
    >
      {/* 1. Grid Marks (Corner L-Brackets, T-Ticks, and Interior "+" Crosshairs) */}
      <GridMarks isInView={isInView} />

      {/* 2. Grid-wide Interactive Cursor Spotlight */}
      <CursorSpotlight containerRef={containerRef} />

      {/* 3. Ambient Traveling Data Pulses along Grid Dividers */}
      {!shouldReduceMotion && isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden lg:block" aria-hidden="true">
          {/* Pulse along Horizontal Divider 1 (at 33.333%) */}
          <motion.div
            className="absolute top-[33.333333%] h-[1.5px] w-16 bg-gradient-to-r from-transparent via-[#1E9BFF] to-transparent"
            animate={{
              left: ["-10%", "110%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />

          {/* Pulse along Horizontal Divider 2 (at 66.666%) */}
          <motion.div
            className="absolute top-[66.666667%] h-[1.5px] w-20 bg-gradient-to-r from-transparent via-[#1E9BFF] to-transparent"
            animate={{
              left: ["110%", "-10%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 5.5,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Pulse along Vertical Divider 1 (at 33.333%) */}
          <motion.div
            className="absolute left-[33.333333%] w-[1.5px] h-16 bg-gradient-to-b from-transparent via-[#1E9BFF] to-transparent"
            animate={{
              top: ["-10%", "110%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Pulse along Vertical Divider 2 (at 66.666%) */}
          <motion.div
            className="absolute left-[66.666667%] w-[1.5px] h-20 bg-gradient-to-b from-transparent via-[#1E9BFF] to-transparent"
            animate={{
              top: ["110%", "-10%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              repeatDelay: 7,
              ease: "easeInOut",
              delay: 3.5,
            }}
          />

          {/* 4. Very Faint Vertical Scanline Sweeping Across Grid Every ~10s */}
          <motion.div
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.4)] to-transparent pointer-events-none shadow-[0_0_12px_rgba(30,155,255,0.3)]"
            animate={{
              left: ["-5%", "105%"],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 5.5,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* 5. The 9 Service Cells */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
        {SERVICES_DATA.map((item, index) => {
          // In 2-col mode (<1024px), 9th item spans both columns centered
          const isLastInTwoCols = index === 8 ? "sm:col-span-2 lg:col-span-1" : "";
          return (
            <li key={item.id} className={isLastInTwoCols}>
              <ServiceCell item={item} index={index} isInView={isInView} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
