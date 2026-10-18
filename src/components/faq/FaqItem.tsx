"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PlusIcon } from "./PlusIcon";
import { CornerBracketsFrame } from "./CornerBracketsFrame";
import { RowSpotlight } from "./RowSpotlight";
import { AnswerPanel } from "./AnswerPanel";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";
import type { FaqItemData } from "./faqData";

interface FaqItemProps {
  item: FaqItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView?: boolean;
}

export function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
  isInView = true,
}: FaqItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isGlinting, setIsGlinting] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  // Periodic random glint on numbers
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const delay = 6000 + index * 4000 + Math.random() * 5000;
    const interval = setInterval(() => {
      setIsGlinting(true);
      setTimeout(() => setIsGlinting(false), 800);
    }, delay);

    return () => clearInterval(interval);
  }, [index, isInView, shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Entrance Question Scramble
  const decodedQuestion = useScramble(item.question, {
    durationMs: 650,
    delayMs: Math.round((0.8 + index * 0.11) * 1000),
    autoStart: isInView,
  });

  const isActive = isOpen || isHovered;

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full transition-all duration-300 isolate select-none"
    >
      {/* 1. Open State L-Brackets Frame and Background Glow */}
      <CornerBracketsFrame isOpen={isOpen} />

      {/* 2. Soft Cursor Spotlight and Hover Underline */}
      <RowSpotlight isHovered={isHovered && !isOpen} mouseX={mouseX} />

      {/* 3. Main Row Button (WAI-ARIA Pattern, Row pitch 120px) */}
      <button
        type="button"
        id={`${item.id}-header`}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        className="relative z-10 w-full min-h-[100px] sm:min-h-[110px] lg:min-h-[120px] flex items-center justify-between text-left px-3 sm:px-6 py-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] group"
      >
        {/* Content Wrapper: shifts 8px right on hover */}
        <motion.div
          animate={{
            x: shouldReduceMotion ? 0 : isHovered ? 8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 26,
          }}
          whileTap={{ scale: 0.995 }}
          className="flex items-center flex-1 gap-6 sm:gap-8 pr-4"
        >
          {/* Number [01] … [06] (Regular weight, tabular numerals, accent #1E9BFF) */}
          <div className="relative shrink-0 overflow-hidden">
            <span
              className={`font-mono text-[20px] sm:text-[23px] lg:text-[24px] font-normal tracking-tight tabular-nums transition-all duration-300 ${
                isOpen
                  ? "text-[#1E9BFF] [text-shadow:0_0_12px_rgba(30,155,255,0.75)]"
                  : isHovered
                  ? "text-[#4CB8FF]"
                  : "text-[#1E9BFF]"
              }`}
            >
              {item.number}
            </span>

            {/* Rare Glint across digits */}
            {isGlinting && !shouldReduceMotion && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
              />
            )}
          </div>

          {/* Question Text (~24px, bold, uppercase, single line on desktop) */}
          <h3
            className={`font-mono text-[17px] sm:text-[21px] lg:text-[24px] font-bold uppercase tracking-normal leading-[1.3] transition-colors duration-250 ${
              isOpen || isHovered ? "text-white glow-text-white" : "text-[#C3D4FF]"
            }`}
          >
            {decodedQuestion}
          </h3>
        </motion.div>

        {/* Plus Icon at Right Edge of List (~20×20px, 1px stroke) */}
        <div className="shrink-0 pl-2">
          <PlusIcon
            isOpen={isOpen}
            isHovered={isHovered}
            index={index}
            isInView={isInView}
          />
        </div>
      </button>

      {/* 4. Expandable Answer Panel */}
      <AnswerPanel isOpen={isOpen} answer={item.answer} id={item.id} />
    </div>
  );
}
