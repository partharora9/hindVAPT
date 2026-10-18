"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StepIndicatorProps {
  activeIndex: number;
  onStepClick: (index: number) => void;
  className?: string;
  isBottomLayout?: boolean;
}

const STEPS = [
  { id: 0, label: "01", title: "Threat Detection" },
  { id: 1, label: "02", title: "Incident Response" },
  { id: 2, label: "03", title: "Attack Surface" },
];

export function StepIndicator({
  activeIndex,
  onStepClick,
  className = "",
  isBottomLayout = false,
}: StepIndicatorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Capability cards navigation"
      className={`select-none z-30 ${
        isBottomLayout
          ? "flex flex-row items-center justify-center gap-6 py-4"
          : "flex flex-col items-center gap-5"
      } ${className}`}
    >
      {STEPS.map((step) => {
        const isActive = activeIndex === step.id;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            aria-label={`Jump to capability ${step.label}: ${step.title}`}
            aria-current={isActive ? "step" : undefined}
            className={`group flex ${
              isBottomLayout ? "flex-col items-center gap-1.5" : "items-center gap-3"
            } p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#1E9BFF] focus:ring-offset-2 focus:ring-offset-[#020617] transition-all`}
          >
            {/* Step Label (01, 02, 03) */}
            <span
              className={`text-[11px] font-mono tracking-wider transition-colors duration-300 ${
                isActive
                  ? "text-[#4CB8FF] font-bold"
                  : "text-[#6B7FA8] group-hover:text-[#C3D4FF]"
              }`}
            >
              {step.label}
            </span>

            {/* Elongated Indicator Pill / Dot */}
            <div
              className={`relative flex items-center justify-center ${
                isBottomLayout ? "h-1.5 w-6" : "w-1.5 h-6"
              }`}
            >
              <motion.div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#4CB8FF] shadow-[0_0_10px_#1E9BFF]"
                    : "bg-[#6B7FA8]/40 group-hover:bg-[#C3D4FF]/70"
                }`}
                animate={
                  isBottomLayout
                    ? {
                        width: isActive ? 24 : 6,
                        height: 6,
                      }
                    : {
                        width: 6,
                        height: isActive ? 24 : 6,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                }}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}
