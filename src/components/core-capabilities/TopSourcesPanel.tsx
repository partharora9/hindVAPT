"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagnifierLens } from "./MagnifierLens";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

interface FindingRowItem {
  id: string;
  type: "injection" | "access" | "cloud";
  title: string;
  subtitle: string;
  severity: "Critical" | "High";
  severityColor: string;
  cvss: number;
}

const FINDING_ROWS: FindingRowItem[] = [
  {
    id: "finding-1",
    type: "injection",
    title: "SQL Injection",
    subtitle: "Login API · CVSS 9.8",
    severity: "Critical",
    severityColor: "#FF4C68",
    cvss: 9.8,
  },
  {
    id: "finding-2",
    type: "access",
    title: "Broken Access Control",
    subtitle: "Admin panel · CVSS 8.1",
    severity: "High",
    severityColor: "#FF8E3C",
    cvss: 8.1,
  },
  {
    id: "finding-3",
    type: "cloud",
    title: "Cloud Storage Exposure",
    subtitle: "Object storage · CVSS 7.5",
    severity: "High",
    severityColor: "#FF8E3C",
    cvss: 7.5,
  },
];

interface TopSourcesPanelProps {
  isInView?: boolean;
  isActive?: boolean;
  parallaxOffset?: { x: number; y: number };
}

export function TopSourcesPanel({
  isActive = true,
  parallaxOffset = { x: 0, y: 0 },
}: TopSourcesPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Feed highlight sweep down rows every 4s
  useEffect(() => {
    if (shouldReduceMotion || !isActive) return;

    const interval = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % 3);
    }, 4200);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isActive]);

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.6,
        y: parallaxOffset.y * 0.6,
      }}
      className="relative w-full max-w-[445px] h-[305px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle top inner gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,155,255,0.04)] to-transparent pointer-events-none" />

      {/* Panel Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(120,150,255,0.08)]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-[#C3D4FF] uppercase font-mono">
            TOP FINDINGS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SampleDataBadge />
        </div>
      </div>

      {/* 3 Finding Rows */}
      <div className="relative z-10 flex flex-col gap-2.5 my-auto">
        {FINDING_ROWS.map((row, idx) => {
          const isHighlighted = activeHighlightIndex === idx;
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={row.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                backgroundColor: isHovered
                  ? "rgba(30, 155, 255, 0.12)"
                  : isHighlighted
                  ? "rgba(30, 155, 255, 0.05)"
                  : "rgba(11, 20, 38, 0.4)",
                scale: isHovered ? 1.015 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-between p-2 sm:p-2.5 rounded-[8px] border border-[rgba(120,150,255,0.08)] transition-colors cursor-pointer group"
            >
              {/* Left: Icon Tile + Title/Subtitle */}
              <div className="flex items-center gap-3">
                {/* 40px Icon Tile */}
                <div
                  className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? "bg-[#1E9BFF]/25 shadow-[0_0_12px_rgba(30,155,255,0.4)] border border-[#4CB8FF]/40"
                      : "bg-[#0E1A30] border border-[rgba(30,155,255,0.18)]"
                  }`}
                >
                  {row.type === "injection" && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#FF4C68]" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                  {row.type === "access" && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#FF8E3C]" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                  )}
                  {row.type === "cloud" && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1E9BFF]" stroke="currentColor" strokeWidth="1.8">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                  )}
                </div>

                {/* Title + Subtitle */}
                <div className="flex flex-col">
                  <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight leading-tight group-hover:text-[#4CB8FF] transition-colors">
                    {row.title}
                  </span>
                  <span className="text-[11px] text-[#8FA3C7] font-mono tracking-tight mt-0.5">
                    {row.subtitle}
                  </span>
                </div>
              </div>

              {/* Right: Severity Badge */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border"
                  style={{
                    color: row.severityColor,
                    borderColor: `${row.severityColor}40`,
                    backgroundColor: `${row.severityColor}15`,
                  }}
                >
                  {row.severity}
                </span>
                <span className="text-[10px] font-mono text-[#6B7FA8]">
                  CVSS {row.cvss}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Magnifier Lens overlay on hover */}
      <MagnifierLens
        isParentHovered={hoveredIndex !== null}
        focalText={hoveredIndex !== null ? FINDING_ROWS[hoveredIndex].title : "SQL Injection"}
      />

      {/* Footer Meta Row */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <span>All findings manually validated</span>
        <span className="text-[#4CB8FF] font-semibold">100% verified</span>
      </div>
    </motion.div>
  );
}
