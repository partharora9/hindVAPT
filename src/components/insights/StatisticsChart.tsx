"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";

interface StatisticsChartProps {
  isInView?: boolean;
}

// 7D Dataset curve points [x, y, value]
const POINTS_7D = [
  { x: 0, y: 130, val: 340 },
  { x: 60, y: 120, val: 365 },
  { x: 120, y: 135, val: 320 },
  { x: 180, y: 110, val: 395 },
  { x: 240, y: 118, val: 380 },
  { x: 300, y: 85, val: 460 },
  { x: 380, y: 35, val: 574 }, // Default Peak
  { x: 440, y: 80, val: 450 },
  { x: 500, y: 65, val: 490 },
  { x: 560, y: 115, val: 370 },
  { x: 640, y: 135, val: 325 },
];

const POINTS_30D = [
  { x: 0, y: 140, val: 1200 },
  { x: 80, y: 105, val: 1650 },
  { x: 160, y: 125, val: 1420 },
  { x: 240, y: 70, val: 2100 },
  { x: 320, y: 90, val: 1850 },
  { x: 400, y: 25, val: 2840 }, // Peak
  { x: 480, y: 60, val: 2200 },
  { x: 560, y: 95, val: 1750 },
  { x: 640, y: 120, val: 1480 },
];

function generateSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export function StatisticsChart({ isInView = true }: StatisticsChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const [datasetMode, setDatasetMode] = useState<"7D" | "30D">("7D");
  const [totalCount, setTotalCount] = useState(0);
  const [percentageCount, setPercentageCount] = useState(0);
  const [scrubPoint, setScrubPoint] = useState<{ x: number; y: number; val: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activePoints = datasetMode === "7D" ? POINTS_7D : POINTS_30D;
  const targetTotal = datasetMode === "7D" ? 1027 : 4892;
  const targetPct = datasetMode === "7D" ? 12.75 : 18.4;

  const defaultPeak = datasetMode === "7D"
    ? { x: 380, y: 35, val: 574 }
    : { x: 400, y: 25, val: 2840 };

  const currentHover = scrubPoint || defaultPeak;

  // Entrance count-up animation
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setTotalCount(targetTotal);
      setPercentageCount(targetPct);
      return;
    }

    let start = 0;
    const duration = 2000;
    const stepTime = 25;
    const steps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setTotalCount(Math.round(ease * targetTotal));
      setPercentageCount(parseFloat((ease * targetPct).toFixed(2)));

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetTotal, targetPct, shouldReduceMotion]);

  // Ambient Live Stream Ticking
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const interval = setInterval(() => {
      setTotalCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3200);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  // Mouse scrubbing over SVG chart
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (shouldReduceMotion) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX - rect.left;
    const scaleX = 640 / rect.width;
    const chartX = Math.max(0, Math.min(640, clientX * scaleX));

    // Find nearest point
    let nearest = activePoints[0];
    let minDist = 9999;
    for (const pt of activePoints) {
      const dist = Math.abs(pt.x - chartX);
      if (dist < minDist) {
        minDist = dist;
        nearest = pt;
      }
    }
    setScrubPoint(nearest);
  };

  const handleMouseLeave = () => {
    setScrubPoint(null);
  };

  const linePath = generateSmoothPath(activePoints);
  const areaPath = `${linePath} L 640 200 L 0 200 Z`;

  return (
    <div className="relative w-full px-5 sm:px-8 pt-7 pb-6 select-none flex flex-col justify-between">
      {/* 1. TOP HEADER ROW */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(150,170,230,0.14)]">
        {/* Left: "Statistics" Label */}
        <h4 className="font-mono text-[20px] sm:text-[22px] font-bold text-white tracking-wide">
          Statistics
        </h4>

        {/* Center Button: Toggle View Mode */}
        <button
          type="button"
          onClick={() => setDatasetMode((prev) => (prev === "7D" ? "30D" : "7D"))}
          className="w-[46px] sm:w-[50px] h-[40px] sm:h-[44px] rounded-[8px] bg-[#0C1830] border border-[rgba(30,155,255,0.25)] hover:border-[#1E9BFF]/60 hover:bg-[#122547] text-[#8FA3C7] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm group"
          title={`Switch view (${datasetMode})`}
          aria-label="Toggle dataset view"
        >
          <svg
            className="w-4 h-4 text-[#8FA3C7] group-hover:text-[#1E9BFF] transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>

        {/* Right: Count & Percentage */}
        <div className="flex flex-col items-end">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold text-white tracking-tight tabular-nums">
            {totalCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {/* Green circular up-right arrow badge */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scale: 1 }
                  : { scale: [1, 1.15, 1] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-4 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center text-[10px]"
            >
              ↗
            </motion.div>
            <span className="font-mono text-[12.5px] sm:text-[13px] font-bold text-[#22C55E] tabular-nums">
              {percentageCount.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. AREA LINE CHART (~640×200px) */}
      <div className="relative w-full h-[200px] mt-4 flex items-center justify-center overflow-visible">
        <svg
          ref={svgRef}
          viewBox="0 0 640 200"
          className="w-full h-full overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Interactive threats blocked line chart"
        >
          <defs>
            {/* Area Fill Gradient (Steel blue-gray fading to transparent) */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.32" />
              <stop offset="45%" stopColor="#304868" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0B1224" stopOpacity="0.0" />
            </linearGradient>

            {/* Line Glow Filter */}
            <filter id="lineGlow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#1E9BFF" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Background Grid Lines (Subtle horizontal references) */}
          <line x1="0" y1="50" x2="640" y2="50" stroke="rgba(150,170,230,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="640" y2="100" stroke="rgba(150,170,230,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="150" x2="640" y2="150" stroke="rgba(150,170,230,0.06)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Area Fill */}
          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />

          {/* Primary Wavy Line (3px with glow) */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1E9BFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 2.0,
              ease: EASINGS.cyber,
            }}
          />

          {/* Vertical Guide Line on Hover */}
          {scrubPoint && (
            <line
              x1={scrubPoint.x}
              y1="0"
              x2={scrubPoint.x}
              y2="200"
              stroke="#1E9BFF"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.75"
            />
          )}

          {/* Active Data Dot */}
          <motion.circle
            cx={currentHover.x}
            cy={currentHover.y}
            r="4.5"
            fill="#FFFFFF"
            stroke="#1E9BFF"
            strokeWidth="2.5"
            filter="drop-shadow(0 0 6px #1E9BFF)"
            animate={{
              cx: currentHover.x,
              cy: currentHover.y,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
          />

          {/* Baseline 1px Divider Line below chart */}
          <line x1="0" y1="199" x2="640" y2="199" stroke="rgba(150,170,230,0.18)" strokeWidth="1" />
        </svg>

        {/* Floating Tooltip Bubble ("574" or scrubbed value) */}
        <motion.div
          animate={{
            left: `${(currentHover.x / 640) * 100}%`,
            top: `${(currentHover.y / 200) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className="absolute -translate-x-1/2 -translate-y-[135%] z-20 pointer-events-none"
        >
          <div className="relative px-3 py-1 rounded-[6px] bg-[#14233D] border border-[rgba(30,155,255,0.4)] shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            <span className="font-mono text-[13px] font-bold text-white tracking-wide">
              {currentHover.val}
            </span>
            {/* Downward Pointer Triangle */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#14233D]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
