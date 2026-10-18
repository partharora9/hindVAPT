"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DonutSegment {
  id: string;
  name: string;
  percentage: number;
  color: string;
  dashLength: number;
  rotation: number;
}

const SEGMENTS: DonutSegment[] = [
  {
    id: "malware",
    name: "Malware",
    percentage: 48,
    color: "#4CB8FF",
    dashLength: 96,
    rotation: -90,
  },
  {
    id: "phishing",
    name: "Phishing",
    percentage: 32,
    color: "#1E9BFF",
    dashLength: 64,
    rotation: 58,
  },
  {
    id: "insider",
    name: "Insider/Other",
    percentage: 20,
    color: "rgba(76, 184, 255, 0.28)",
    dashLength: 40,
    rotation: 162,
  },
];

interface AttackVectorsPanelProps {
  isInView?: boolean;
  isActive?: boolean;
  parallaxOffset?: { x: number; y: number };
}

export function AttackVectorsPanel({
  isInView = true,
  isActive = true,
  parallaxOffset = { x: 0, y: 0 },
}: AttackVectorsPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [activeGlowId, setActiveGlowId] = useState<string>("malware");

  // Every 6s one segment briefly highlights and matching legend glows (paused on covered cards)
  useEffect(() => {
    if (shouldReduceMotion || !isActive) return;

    const ids = ["malware", "phishing", "insider"];
    let idx = 0;

    const interval = setInterval(() => {
      idx = (idx + 1) % ids.length;
      setActiveGlowId(ids[idx]);
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const circumference = 2 * Math.PI * 40; // ~251.3

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      {/* Header with Title and "..." Menu */}
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          Attack Vectors
        </span>
        <button
          type="button"
          aria-label="More options"
          className="text-[#6B7FA8] hover:text-[#C3D4FF] transition-colors p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#1E9BFF]"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <circle cx="3" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="13" cy="8" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Segmented Donut Chart Area */}
      <div className="relative flex items-center justify-center my-auto py-2">
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-[128px] h-[128px] flex items-center justify-center"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            <defs>
              <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4CB8FF" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="rgba(30, 155, 255, 0.08)"
              strokeWidth="9"
            />

            {/* 3 Donut Arc Segments */}
            {SEGMENTS.map((seg) => {
              const isHovered = hoveredSegment === seg.id;
              const isGlowActive = activeGlowId === seg.id;

              return (
                <motion.circle
                  key={seg.id}
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? 12 : isGlowActive ? 11 : 9.5}
                  strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "60px 60px",
                    transform: `rotate(${seg.rotation}deg)`,
                  }}
                  filter={isHovered || isGlowActive ? "url(#vectorGlow)" : undefined}
                  initial={false}
                  animate={{
                    pathLength: 1,
                    strokeWidth: isHovered ? 12 : [9.5, 10.5, 9.5],
                  }}
                  transition={{
                    pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    strokeWidth: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  onMouseEnter={() => setHoveredSegment(seg.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className="cursor-pointer transition-colors"
                />
              );
            })}
          </svg>

          {/* Center Number "1" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-mono text-white tracking-tight filter drop-shadow-[0_0_8px_rgba(76,184,255,0.6)]">
              {hoveredSegment
                ? `${SEGMENTS.find((s) => s.id === hoveredSegment)?.percentage}%`
                : "1"}
            </span>
          </div>
        </motion.div>

        {/* Hover Tooltip Overlay */}
        {hoveredSegment && (
          <div className="absolute -top-3 px-2 py-1 bg-[#0A1424] border border-[#4CB8FF]/40 rounded text-[11px] font-mono text-white shadow-lg pointer-events-none z-30">
            {SEGMENTS.find((s) => s.id === hoveredSegment)?.name}:{" "}
            {SEGMENTS.find((s) => s.id === hoveredSegment)?.percentage}%
          </div>
        )}
      </div>

      {/* Legend with Square Bullets */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(120,150,255,0.08)]">
        {SEGMENTS.map((seg) => {
          const isGlow = activeGlowId === seg.id || hoveredSegment === seg.id;

          return (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredSegment(seg.id)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="flex items-center justify-between text-[11px] font-mono cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-[2px] transition-all"
                  style={{
                    backgroundColor: seg.color,
                    boxShadow: isGlow ? `0 0 6px ${seg.color}` : "none",
                  }}
                />
                <span
                  className={`transition-colors ${
                    isGlow ? "text-white font-bold" : "text-[#8FA3C7]"
                  }`}
                >
                  {seg.name}
                </span>
              </div>
              <span className="text-[#6B7FA8] text-[10px] group-hover:text-[#4CB8FF]">
                {seg.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
