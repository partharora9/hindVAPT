"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface GridMarksProps {
  isInView?: boolean;
  mousePos?: { x: number; y: number } | null;
  gridRect?: DOMRect | null;
}

export function GridMarks({ isInView = true }: GridMarksProps) {
  const shouldReduceMotion = useReducedMotion();

  // 4 Interior Intersections for 3x3 Grid
  const intersections = [
    { id: "int-1", left: "33.333333%", top: "33.333333%", delay: 0 },
    { id: "int-2", left: "66.666667%", top: "33.333333%", delay: 0.2 },
    { id: "int-3", left: "33.333333%", top: "66.666667%", delay: 0.4 },
    { id: "int-4", left: "66.666667%", top: "66.666667%", delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible" aria-hidden="true">
      {/* 1. Four Outer Corner L-Brackets */}
      {/* Top-Left */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -top-[1px] -left-[1px] w-6 h-6 overflow-visible"
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: EASINGS.cyber }}
      >
        <path
          d="M 0 16 L 0 0 L 16 0"
          stroke="rgba(150,170,230,0.65)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </motion.svg>

      {/* Top-Right */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -top-[1px] -right-[1px] w-6 h-6 overflow-visible"
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: EASINGS.cyber }}
      >
        <path
          d="M 24 16 L 24 0 L 8 0"
          stroke="rgba(150,170,230,0.65)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </motion.svg>

      {/* Bottom-Left */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -bottom-[1px] -left-[1px] w-6 h-6 overflow-visible"
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: EASINGS.cyber }}
      >
        <path
          d="M 0 8 L 0 24 L 16 24"
          stroke="rgba(150,170,230,0.65)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </motion.svg>

      {/* Bottom-Right */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -bottom-[1px] -right-[1px] w-6 h-6 overflow-visible"
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: EASINGS.cyber }}
      >
        <path
          d="M 24 8 L 24 24 L 8 24"
          stroke="rgba(150,170,230,0.65)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </motion.svg>

      {/* 2. Top Edge T-Ticks (┬) hidden on small screens */}
      <div className="hidden lg:block">
        {/* Top Col 1 Divider */}
        <div className="absolute top-0 left-[33.333333%] -translate-x-1/2 -translate-y-1/2">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="9" y1="5" x2="9" y2="10" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Top Col 2 Divider */}
        <div className="absolute top-0 left-[66.666667%] -translate-x-1/2 -translate-y-1/2">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="9" y1="5" x2="9" y2="10" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Bottom Col 1 Divider (┴) */}
        <div className="absolute bottom-0 left-[33.333333%] -translate-x-1/2 translate-y-1/2">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="9" y1="0" x2="9" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Bottom Col 2 Divider (┴) */}
        <div className="absolute bottom-0 left-[66.666667%] -translate-x-1/2 translate-y-1/2">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="9" y1="0" x2="9" y2="5" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Left Row 1 Divider (├) */}
        <div className="absolute left-0 top-[33.333333%] -translate-x-1/2 -translate-y-1/2">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <line x1="5" y1="0" x2="5" y2="18" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="5" y1="9" x2="10" y2="9" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Left Row 2 Divider (├) */}
        <div className="absolute left-0 top-[66.666667%] -translate-x-1/2 -translate-y-1/2">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <line x1="5" y1="0" x2="5" y2="18" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="5" y1="9" x2="10" y2="9" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Right Row 1 Divider (┤) */}
        <div className="absolute right-0 top-[33.333333%] translate-x-1/2 -translate-y-1/2">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <line x1="5" y1="0" x2="5" y2="18" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="0" y1="9" x2="5" y2="9" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Right Row 2 Divider (┤) */}
        <div className="absolute right-0 top-[66.666667%] translate-x-1/2 -translate-y-1/2">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <line x1="5" y1="0" x2="5" y2="18" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
            <line x1="0" y1="9" x2="5" y2="9" stroke="rgba(150,170,230,0.6)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* 3. Four Interior "+" Crosshair Marks (~24px, 1px lines) */}
      <div className="hidden lg:block">
        {intersections.map((item) => (
          <div
            key={item.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: item.left, top: item.top }}
          >
            <motion.div
              initial={shouldReduceMotion ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: 90, scale: 0, opacity: 0 }}
              animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: 90, scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.8 + item.delay * 0.2,
              }}
              className="relative w-6 h-6 flex items-center justify-center"
            >
              {/* Pulsing Ambient Crosshair */}
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 overflow-visible"
                animate={
                  shouldReduceMotion || !isInView
                    ? { opacity: 0.8 }
                    : {
                        opacity: [0.6, 1, 0.6],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                {/* Horizontal Bar */}
                <line
                  x1="0"
                  y1="12"
                  x2="24"
                  y2="12"
                  stroke="#C3D4FF"
                  strokeWidth="1"
                />
                {/* Vertical Bar */}
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="24"
                  stroke="#C3D4FF"
                  strokeWidth="1"
                />
                {/* Center Accent Dot */}
                <circle cx="12" cy="12" r="1" fill="#1E9BFF" />
              </motion.svg>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
