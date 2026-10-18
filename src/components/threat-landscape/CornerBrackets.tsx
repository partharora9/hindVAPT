"use client";

import React from "react";

interface CornerBracketsProps {
  className?: string;
  size?: number;
  color?: string;
  isHovered?: boolean;
}

export function CornerBrackets({
  className = "",
  size = 11,
  color = "rgba(30, 155, 255, 0.4)",
  isHovered = false,
}: CornerBracketsProps) {
  const activeColor = isHovered ? "#1E9BFF" : color;
  const bracketSize = isHovered ? size + 3 : size;

  return (
    <div className={`absolute inset-0 pointer-events-none z-30 ${className}`} aria-hidden="true">
      {/* Top-Left ┌ (Exactly inset 12px) */}
      <div
        className="absolute top-3 left-3 transition-all duration-200"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderTop: `1.5px solid ${activeColor}`,
          borderLeft: `1.5px solid ${activeColor}`,
        }}
      />

      {/* Top-Right ┐ (Exactly inset 12px) */}
      <div
        className="absolute top-3 right-3 transition-all duration-200"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderTop: `1.5px solid ${activeColor}`,
          borderRight: `1.5px solid ${activeColor}`,
        }}
      />

      {/* Bottom-Left └ (Exactly inset 12px) */}
      <div
        className="absolute bottom-3 left-3 transition-all duration-200"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderBottom: `1.5px solid ${activeColor}`,
          borderLeft: `1.5px solid ${activeColor}`,
        }}
      />

      {/* Bottom-Right ┘ (Exactly inset 12px) */}
      <div
        className="absolute bottom-3 right-3 transition-all duration-200"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderBottom: `1.5px solid ${activeColor}`,
          borderRight: `1.5px solid ${activeColor}`,
        }}
      />
    </div>
  );
}

// Junction Tick marks for card seams (┬ on top, ┴ on bottom)
export function JunctionTick({
  position = "top",
  color = "rgba(30, 155, 255, 0.45)",
}: {
  position?: "top" | "bottom";
  color?: string;
}) {
  return (
    <div
      className={`absolute ${
        position === "top" ? "-top-[6px]" : "-bottom-[6px]"
      } -right-[6px] w-[12px] h-[12px] pointer-events-none z-30 flex items-center justify-center`}
      aria-hidden="true"
    >
      {/* Horizontal tick bar along seam */}
      <span className="absolute w-[12px] h-[1.5px]" style={{ backgroundColor: color }} />
      {/* Vertical tick extending into the seam */}
      <span
        className={`absolute h-[6px] w-[1.5px] ${
          position === "top" ? "top-[5px]" : "bottom-[5px]"
        }`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
