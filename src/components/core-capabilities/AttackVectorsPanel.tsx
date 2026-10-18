"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

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
    id: "injection",
    name: "Injection",
    percentage: 45,
    color: "#FF4C68",
    dashLength: 90,
    rotation: -90,
  },
  {
    id: "access-control",
    name: "Broken Access Control",
    percentage: 35,
    color: "#1E9BFF",
    dashLength: 70,
    rotation: 72,
  },
  {
    id: "misconfig",
    name: "Misconfiguration",
    percentage: 20,
    color: "#4CB8FF",
    dashLength: 40,
    rotation: 198,
  },
];

interface AttackVectorsPanelProps {
  isInView?: boolean;
  isActive?: boolean;
  parallaxOffset?: { x: number; y: number };
}

export function AttackVectorsPanel({
  isActive = true,
  parallaxOffset = { x: 0, y: 0 },
}: AttackVectorsPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [activeGlowId, setActiveGlowId] = useState<string>("injection");

  useEffect(() => {
    if (shouldReduceMotion || !isActive) return;

    const ids = ["injection", "access-control", "misconfig"];
    let idx = 0;

    const interval = setInterval(() => {
      idx = (idx + 1) % ids.length;
      setActiveGlowId(ids[idx]);
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isActive]);

  const circumference = 2 * Math.PI * 40; // ~251.3

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      {/* Header with Title and Sample Data */}
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          OWASP Categories
        </span>
        <SampleDataBadge />
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
                  strokeWidth={isHovered ? 11 : isGlowActive ? 10 : 9}
                  strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
                  strokeDashoffset={0}
                  transform={`rotate(${seg.rotation} 60 60)`}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredSegment(seg.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  filter={isHovered || isGlowActive ? "url(#vectorGlow)" : "none"}
                  animate={{
                    opacity: hoveredSegment && !isHovered ? 0.35 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Center Cutout Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono font-bold text-[#8FA3C7] tracking-wider uppercase">
              TOP 10
            </span>
            <span className="text-xl font-bold font-mono text-white tracking-tight">
              100%
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3-Row Legend */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(120,150,255,0.08)]">
        {SEGMENTS.map((seg) => {
          const isHovered = hoveredSegment === seg.id;
          const isGlowActive = activeGlowId === seg.id;

          return (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredSegment(seg.id)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex items-center justify-between text-[11px] font-mono transition-colors cursor-pointer px-1 py-0.5 rounded ${
                isHovered
                  ? "bg-[rgba(30,155,255,0.08)] text-white"
                  : isGlowActive
                  ? "text-[#C3D4FF]"
                  : "text-[#8FA3C7]"
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: seg.color,
                    boxShadow: isHovered || isGlowActive ? `0 0 8px ${seg.color}` : "none",
                  }}
                />
                <span className="truncate">{seg.name}</span>
              </div>
              <span className="font-bold shrink-0">{seg.percentage}%</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
