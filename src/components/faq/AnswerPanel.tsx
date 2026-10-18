"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface AnswerPanelProps {
  isOpen: boolean;
  answer: string;
  id: string;
}

export function AnswerPanel({ isOpen, answer, id }: AnswerPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-header`}
          initial={
            shouldReduceMotion
              ? { opacity: 1, height: "auto" }
              : { height: 0, opacity: 0 }
          }
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={
            shouldReduceMotion
              ? { opacity: 0, height: 0 }
              : { height: 0, opacity: 0 }
          }
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden w-full"
        >
          {/* Answer text container: indented to the question text, max-w 900px, 28px top spacing, 40px bottom padding */}
          <div className="pt-7 pb-10 pl-0 sm:pl-[76px] lg:pl-[84px] pr-8 sm:pr-12 max-w-[900px]">
            <motion.p
              initial={
                shouldReduceMotion
                  ? { opacity: 1, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(6px)", y: 8 }
              }
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              exit={{
                opacity: 0,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-mono text-[16px] sm:text-[17px] lg:text-[18px] leading-[28px] sm:leading-[30px] font-normal text-[#8FA3C7] text-left select-text"
            >
              {answer}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
