"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface ControlCoverageStackProps {
  isInView?: boolean;
  isHovered?: boolean;
}

export function ControlCoverageStack({
  isInView = true,
  isHovered = false,
}: ControlCoverageStackProps) {
  const shouldReduceMotion = useReducedMotion();

  const rows = [
    {
      id: "row-1",
      label: "Critical: fix immediately",
      badge: "P0",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
      iconColor: "#EF4444",
    },
    {
      id: "row-2",
      label: "High: fix this sprint",
      badge: "P1",
      badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/40",
      iconColor: "#F97316",
    },
    {
      id: "row-3",
      label: "Medium: plan next release",
      badge: "P2",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      iconColor: "#F59E0B",
    },
  ];

  return (
    <div className="relative w-full max-w-[537px] flex flex-col items-center pt-8 sm:pt-10 select-none">
      {/* 1. Ghost Layers Stacked Behind (Fanning Up) */}
      <div className="relative w-full flex flex-col items-center -mb-[1px] z-0">
        {/* Ghost Layer 1 (Far Back, ~447px wide) */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { y: 0, opacity: 0.6 }
              : { y: 24, opacity: 0 }
          }
          animate={
            isInView
              ? {
                  y: isHovered ? -16 : shouldReduceMotion ? 0 : [0, -3, 0],
                  opacity: 0.6,
                }
              : { y: 24, opacity: 0 }
          }
          transition={{
            y: isHovered
              ? { duration: 0.3 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            opacity: { duration: 0.6, delay: 0.2 },
          }}
          className="relative w-[447px] max-w-[85%] h-[16px] rounded-t-[10px] bg-[#0C1830]/60 border-t border-l border-r border-[#1E9BFF]/25 overflow-visible"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#1E9BFF]/60 rounded-tl-[10px]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#1E9BFF]/60 rounded-tr-[10px]" />
        </motion.div>

        {/* Ghost Layer 2 (Middle, ~490px wide) */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { y: 0, opacity: 0.8 }
              : { y: 16, opacity: 0 }
          }
          animate={
            isInView
              ? {
                  y: isHovered ? -8 : shouldReduceMotion ? 0 : [-2, 1, -2],
                  opacity: 0.85,
                }
              : { y: 16, opacity: 0 }
          }
          transition={{
            y: isHovered
              ? { duration: 0.3 }
              : { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            opacity: { duration: 0.6, delay: 0.3 },
          }}
          className="relative w-[490px] max-w-[92%] h-[16px] rounded-t-[10px] bg-[#0F223D]/75 border-t border-l border-r border-[#1E9BFF]/35 overflow-visible -mt-2"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#1E9BFF]/80 rounded-tl-[10px]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#1E9BFF]/80 rounded-tr-[10px]" />
        </motion.div>
      </div>

      {/* 2. Main Pill "Remediation Plan" (~537×58px) */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 0.95, opacity: 0 }
        }
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.95, opacity: 0 }
        }
        transition={{
          duration: 0.6,
          delay: 0.35,
          ease: EASINGS.cyber,
        }}
        className="relative z-10 w-full h-[58px] rounded-[10px] px-6 flex items-center gap-3.5 border border-[rgba(30,155,255,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #183C64 0%, #102640 100%)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E9BFF]/60 to-transparent" />

        {/* 4-Point Sparkle Icon */}
        <motion.div
          animate={
            isInView
              ? {
                  rotate: shouldReduceMotion ? 0 : [0, 45, 0],
                  scale: shouldReduceMotion ? 1 : [1, 1.18, 1],
                }
              : { rotate: -90, scale: 0 }
          }
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            default: { duration: 0.6, delay: 0.45 },
          }}
          className="text-[#1E9BFF] flex items-center justify-center shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
              fill="#1E9BFF"
            />
          </svg>
        </motion.div>

        {/* Text "Remediation Plan" */}
        <span className="font-mono text-[17px] sm:text-[18px] font-semibold text-[#1E9BFF] tracking-wide">
          Remediation Plan
        </span>
      </motion.div>

      {/* 3. Status Rows Panel (~537×153px) */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
        }
        animate={
          isInView
            ? {
                opacity: 1,
                y: isHovered ? -4 : 0,
              }
            : { opacity: 0, y: 16 }
        }
        transition={{
          duration: 0.6,
          delay: 0.45,
          ease: EASINGS.cyber,
        }}
        className="relative z-10 w-full mt-3.5 rounded-[12px] bg-[#1A2A44] border border-[rgba(30,155,255,0.2)] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      >
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              y: ["-100%", "300%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
            className="absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.08)] to-transparent pointer-events-none z-20"
          />
        )}

        {rows.map((row, idx) => (
          <motion.div
            key={row.id}
            initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.55 + idx * 0.09,
              ease: EASINGS.cyber,
            }}
            className={`flex items-center justify-between px-5 py-3.5 sm:py-4 transition-colors duration-200 ${
              idx < rows.length - 1 ? "border-b border-[rgba(255,255,255,0.06)]" : ""
            } hover:bg-[#1E3354]`}
          >
            <div className="flex items-center gap-3.5">
              <motion.div
                animate={
                  shouldReduceMotion
                    ? { scale: 1 }
                    : {
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: idx * 0.7,
                  ease: "easeInOut",
                }}
                className="w-7 h-7 rounded-full bg-[rgba(30,155,255,0.12)] border border-[rgba(30,155,255,0.35)] flex items-center justify-center shrink-0"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: row.iconColor }}
                />
              </motion.div>

              <span className="font-mono text-[14px] sm:text-[15px] font-medium text-[#D5E2FF] tracking-wide">
                {row.label}
              </span>
            </div>

            <span
              className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${row.badgeColor}`}
            >
              {row.badge}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
