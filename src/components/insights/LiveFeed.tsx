"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { INITIAL_ALERTS, ALERT_POOL, type LiveAlertItem } from "./bentoData";

interface LiveFeedProps {
  isInView?: boolean;
}

export function LiveFeed({ isInView = true }: LiveFeedProps) {
  const shouldReduceMotion = useReducedMotion();
  const [alerts, setAlerts] = useState<LiveAlertItem[]>(INITIAL_ALERTS);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Periodic alert rotation every ~3.5s
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let poolIndex = 0;
    const interval = setInterval(() => {
      const template = ALERT_POOL[poolIndex % ALERT_POOL.length];
      poolIndex++;

      const newAlert: LiveAlertItem = {
        id: `alert-${Date.now()}`,
        title: template.title,
        ip: template.ip,
        isNew: true,
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 3)]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  return (
    <div
      className="relative w-full max-w-[405px] mx-auto flex flex-col gap-3 pt-2 select-none"
      role="region"
      aria-label="Live threat alert notifications"
    >
      <div className="flex flex-col gap-3" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {alerts.map((alert) => {
            const isHovered = hoveredRowId === alert.id;

            return (
              <motion.div
                key={alert.id}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -24, scale: 0.96 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  backgroundColor: alert.isNew ? "#185B8F" : isHovered ? "#145182" : "#0F4A78",
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, scale: 0.95 }
                }
                transition={{
                  layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  duration: 0.35,
                }}
                onMouseEnter={() => setHoveredRowId(alert.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className="relative w-full h-[83px] rounded-[8px] px-4 sm:px-5 flex items-center justify-between border border-[rgba(30,155,255,0.22)] shadow-[0_4px_16px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden transition-colors"
                style={{
                  background: "linear-gradient(180deg, #125283 0%, #0B3E66 100%)",
                }}
              >
                {/* Left Content with White Vertical Bar */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* White 3px Vertical Bar (~34px tall) */}
                  <motion.div
                    animate={
                      alert.isNew
                        ? {
                            boxShadow: [
                              "0 0 12px rgba(255,255,255,0.9)",
                              "0 0 2px rgba(255,255,255,0.4)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                    className="w-[3px] h-[34px] bg-white rounded-full shrink-0"
                  />

                  {/* Title & IP subline */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[15px] sm:text-[16.5px] font-bold text-white tracking-[0.04em] uppercase leading-tight">
                      {alert.title}
                    </span>
                    <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#9FB8D9] font-normal tracking-wide mt-1">
                      {alert.ip}
                    </span>
                  </div>
                </div>

                {/* Right Arrow (nudges 4px right on hover) */}
                <motion.div
                  animate={{
                    x: isHovered ? 4 : 0,
                    opacity: isHovered ? 1 : 0.8,
                    color: isHovered ? "#FFFFFF" : "#9FB8D9",
                  }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 flex items-center justify-center pl-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
