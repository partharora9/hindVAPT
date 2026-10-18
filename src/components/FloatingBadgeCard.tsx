"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingBadgeCardProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function FloatingBadgeCard({
  isVisible = false,
  onClose,
}: FloatingBadgeCardProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 w-[240px] p-3 rounded-2xl bg-[#081126]/90 backdrop-blur-xl border border-[rgba(30,155,255,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(30,155,255,0.15)] flex flex-col gap-2 select-none"
        >
          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0a1c3d] border border-[#1E9BFF]/40 text-[#8FA3C7] hover:text-white flex items-center justify-center text-xs transition-colors"
              aria-label="Dismiss badge"
            >
              ✕
            </button>
          )}

          {/* Option 1: Customize Template */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.15)] hover:border-[#1E9BFF]/40 transition-colors cursor-pointer group">
            <svg
              className="w-4 h-4 text-[#1E9BFF] group-hover:rotate-45 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span className="text-xs font-medium text-[#C3D4FF] tracking-wide">
              Customize Template
            </span>
          </div>

          {/* Option 2: Request Figma */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white text-[#0a1c3d] hover:bg-white/95 transition-all shadow-sm cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 38 57" fill="none">
              <path
                d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z"
                fill="#1ABCFE"
              />
              <path
                d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                fill="#0ACF83"
              />
              <path
                d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                fill="#FF7262"
              />
              <path
                d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                fill="#F24E1E"
              />
              <path
                d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                fill="#A259FF"
              />
            </svg>
            <span className="text-xs font-semibold tracking-wide text-gray-900">
              Request Figma
            </span>
          </div>

          {/* Option 3: Premium template */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#030919] border border-[rgba(30,155,255,0.12)]">
            <span className="text-[11px] text-[#8FA3C7] tracking-wider uppercase font-medium">
              Premium template
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1E9BFF] animate-pulse" />
              <span className="text-[10px] text-[#1E9BFF] font-bold">PRO</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
