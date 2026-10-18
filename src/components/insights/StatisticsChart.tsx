"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StatisticsChartProps {
  isInView?: boolean;
}

// Engagement trend data: findings dropping over engagements
const POINTS_TREND = [
  { x: 0, y: 40, val: 38 },
  { x: 70, y: 65, val: 32 },
  { x: 140, y: 80, val: 29 },
  { x: 210, y: 95, val: 26 },
  { x: 280, y: 110, val: 22 },
  { x: 350, y: 130, val: 18 },
  { x: 420, y: 145, val: 14 },
  { x: 490, y: 160, val: 10 },
  { x: 560, y: 170, val: 7 },
  { x: 640, y: 175, val: 4 },
];

const POINTS_ENGAGEMENT = [
  { x: 0, y: 50, val: 42 },
  { x: 80, y: 75, val: 36 },
  { x: 160, y: 90, val: 30 },
  { x: 240, y: 120, val: 24 },
  { x: 320, y: 135, val: 19 },
  { x: 400, y: 150, val: 15 },
  { x: 480, y: 165, val: 11 },
  { x: 560, y: 172, val: 8 },
  { x: 640, y: 178, val: 5 },
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
  const [datasetMode, setDatasetMode] = useState<"Current" | "All Engagements">("Current");
  const [totalCount, setTotalCount] = useState(0);
  const [scrubPoint, setScrubPoint] = useState<{ x: number; y: number; val: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activePoints = datasetMode === "Current" ? POINTS_TREND : POINTS_ENGAGEMENT;
  const targetTotal = datasetMode === "Current" ? 24 : 86;

  const defaultPeak = activePoints[3];
  const currentHover = scrubPoint || defaultPeak;

  // Entrance count-up animation
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setTotalCount(targetTotal);
      return;
    }

    const duration = 1600;
    const stepTime = 25;
    const steps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setTotalCount(Math.round(ease * targetTotal));

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetTotal, shouldReduceMotion]);

  // Mouse scrubbing over SVG chart
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (shouldReduceMotion) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX - rect.left;
    const scaleX = 640 / rect.width;
    const chartX = Math.max(0, Math.min(640, clientX * scaleX));

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

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (shouldReduceMotion) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;

    const clientX = e.touches[0].clientX - rect.left;
    const scaleX = 640 / rect.width;
    const chartX = Math.max(0, Math.min(640, clientX * scaleX));

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
        {/* Left: "Findings" Label */}
        <h4 className="font-mono text-[20px] sm:text-[22px] font-bold text-white tracking-wide">
          Findings
        </h4>

        {/* Center Button: Toggle View Mode */}
        <button
          type="button"
          onClick={() =>
            setDatasetMode((prev) =>
              prev === "Current" ? "All Engagements" : "Current"
            )
          }
          className="px-3 h-[36px] rounded-[6px] bg-[#0C1830] border border-[rgba(30,155,255,0.25)] hover:border-[#1E9BFF]/60 hover:bg-[#122547] text-[#8FA3C7] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer font-mono text-[11px] uppercase tracking-wider"
          title={`Switch view (${datasetMode})`}
          aria-label="Toggle dataset view"
        >
          <span>{datasetMode}</span>
        </button>

        {/* Right: Count & Trend Badge */}
        <div className="flex flex-col items-end">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold text-white tracking-tight tabular-nums">
            {totalCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#22C55E] bg-[#22C55E]/15 px-1.5 py-0.5 rounded border border-[#22C55E]/30">
              -35% Post-Retest
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
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          role="img"
          aria-label="Findings reduction trend chart"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.32" />
              <stop offset="45%" stopColor="#304868" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0B1224" stopOpacity="0.0" />
            </linearGradient>

            <filter id="lineGlow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#1E9BFF" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Reference Grid Lines */}
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

          {/* Primary Trend Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1E9BFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#lineGlow)"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Interactive Scrub Line & Marker */}
          {currentHover && (
            <g>
              <line
                x1={currentHover.x}
                y1={0}
                x2={currentHover.x}
                y2={200}
                stroke="rgba(30,155,255,0.4)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={currentHover.x}
                cy={currentHover.y}
                r="6"
                fill="#FFFFFF"
                stroke="#1E9BFF"
                strokeWidth="3"
                className="drop-shadow-[0_0_8px_#1E9BFF]"
              />
              {/* Tooltip */}
              <g transform={`translate(${Math.max(35, Math.min(570, currentHover.x - 35))}, ${Math.max(15, currentHover.y - 32)})`}>
                <rect
                  width="70"
                  height="22"
                  rx="4"
                  fill="#0E1A30"
                  stroke="rgba(30,155,255,0.6)"
                  strokeWidth="1"
                />
                <text
                  x="35"
                  y="15"
                  textAnchor="middle"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#FFFFFF"
                >
                  {currentHover.val} open
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
