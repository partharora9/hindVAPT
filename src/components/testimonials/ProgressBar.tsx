"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <div
      className="relative w-full max-w-[281px] h-[8px] bg-[rgba(30,155,255,0.15)] select-none overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Autoplay progress indicator"
    >
      {/* Filled Accent Bar */}
      <div
        className="h-full bg-[#1E9BFF] shadow-[0_0_10px_#1E9BFF] transition-all duration-100 ease-linear"
        style={{ width: `${clampedProgress * 100}%` }}
      />
    </div>
  );
}
