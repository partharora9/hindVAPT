"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RadarIconProps {
  isInView?: boolean;
  isHovered?: boolean;
}

export function RadarIcon({ isInView = true, isHovered = false }: RadarIconProps) {
  const shouldReduceMotion = useReducedMotion();

  // Attack-surface polygon vertices centered at (120, 120)
  const baseVertices = [
    { id: 1, x: 78, y: 86 },
    { id: 2, x: 158, y: 76 },
    { id: 3, x: 190, y: 126 },
    { id: 4, x: 140, y: 182 },
    { id: 5, x: 82, y: 160 },
  ];

  const polygonPath = `M ${baseVertices[0].x} ${baseVertices[0].y} L ${baseVertices[1].x} ${baseVertices[1].y} L ${baseVertices[2].x} ${baseVertices[2].y} L ${baseVertices[3].x} ${baseVertices[3].y} L ${baseVertices[4].x} ${baseVertices[4].y} Z`;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 210, height: 210 }}
      role="img"
      aria-label="Scaling blind spots radar map"
    >
      <svg
        viewBox="0 0 240 240"
        width="210"
        height="210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_24px_rgba(30,155,255,0.45)]"
      >
        <defs>
          <filter id="radarGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#1E9BFF" floodOpacity="0.85" />
          </filter>

          {/* Strict circular clipPath to guarantee NOTHING renders outside the outer ring */}
          <clipPath id="radarInnerCircleClip">
            <circle cx="120" cy="120" r="102" />
          </clipPath>

          {/* Sweeping radar cone trailing gradient */}
          <linearGradient id="sweepConeGrad" x1="120" y1="120" x2="224" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E9BFF" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#4CB8FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4CB8FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. FAINT CROSSHAIR AXES & CONCENTRIC CALIBRATION RINGS */}
        <g stroke="rgba(30, 155, 255, 0.25)" strokeWidth="1">
          {/* Main X/Y Axes */}
          <line x1="24" y1="120" x2="216" y2="120" />
          <line x1="120" y1="24" x2="120" y2="216" />

          {/* Diagonal 45-degree Crosshairs */}
          <line x1="48" y1="48" x2="192" y2="192" strokeDasharray="3 4" strokeOpacity="0.5" />
          <line x1="192" y1="48" x2="48" y2="192" strokeDasharray="3 4" strokeOpacity="0.5" />

          {/* Concentric Calibration Rings */}
          <circle cx="120" cy="120" r="40" strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx="120" cy="120" r="70" strokeOpacity="0.35" />
        </g>

        {/* 2. ROTATING RADAR SWEEP CONE (Clipped INSIDE the circle, rotating 8s/rev) */}
        {!shouldReduceMotion && (
          <g clipPath="url(#radarInnerCircleClip)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "120px 120px" }}
            >
              {/* Trailing wedge path */}
              <path
                d="M 120 120 L 224 120 A 104 104 0 0 0 196 56 Z"
                fill="url(#sweepConeGrad)"
                opacity="0.4"
              />
              {/* Leading beam line */}
              <line
                x1="120"
                y1="120"
                x2="224"
                y2="120"
                stroke="#4CB8FF"
                strokeWidth="2"
                filter="url(#radarGlow)"
              />
              {/* Center pivot blip */}
              <circle cx="120" cy="120" r="3" fill="#FFFFFF" filter="url(#radarGlow)" />
            </motion.g>
          </g>
        )}

        {/* 3. DOUBLE OUTER RING WITH CALIBRATION NOTCHES AT 8 POSITIONS */}
        <g>
          {/* Outermost Solid Thin Ring */}
          <circle
            cx="120"
            cy="120"
            r="104"
            stroke="#1E9BFF"
            strokeWidth="1.5"
            filter="url(#radarGlow)"
          />

          {/* Secondary Dashed Inner Ring */}
          <circle
            cx="120"
            cy="120"
            r="98"
            stroke="rgba(30, 155, 255, 0.35)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Ticks and notch brackets at 8 positions (every 45 degrees) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 120 + 98 * Math.cos(rad);
            const y1 = 120 + 98 * Math.sin(rad);
            const x2 = 120 + 104 * Math.cos(rad);
            const y2 = 120 + 104 * Math.sin(rad);
            const isCardinal = deg % 90 === 0;

            return (
              <g key={deg}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isCardinal ? "#4CB8FF" : "#1E9BFF"}
                  strokeWidth={isCardinal ? 2.5 : 1.5}
                />
              </g>
            );
          })}

          {/* Notch Bracket Tabs at 4 cardinal edges */}
          <path d="M 116 14 H 124" stroke="#4CB8FF" strokeWidth="2.5" />
          <path d="M 226 116 V 124" stroke="#4CB8FF" strokeWidth="2.5" />
          <path d="M 116 226 H 124" stroke="#4CB8FF" strokeWidth="2.5" />
          <path d="M 14 116 V 124" stroke="#4CB8FF" strokeWidth="2.5" />
        </g>

        {/* 4. TRANSLUCENT RADAR CHART POLYGON WITH SUBTLE VERTEX BREATHING */}
        <motion.g
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.03, 0.98, 1],
                  rotate: [0, 1.2, -1, 0],
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 120px" }}
        >
          {/* Main Facet Base */}
          <path
            d={polygonPath}
            fill="rgba(30, 155, 255, 0.22)"
            stroke="#1E9BFF"
            strokeWidth="1.8"
            filter="url(#radarGlow)"
          />

          {/* Internal Geometric Facet Lines (connects to center and sub-nodes) */}
          <g stroke="rgba(76, 184, 255, 0.45)" strokeWidth="1">
            <line x1="120" y1="120" x2={baseVertices[0].x} y2={baseVertices[0].y} />
            <line x1="120" y1="120" x2={baseVertices[1].x} y2={baseVertices[1].y} />
            <line x1="120" y1="120" x2={baseVertices[2].x} y2={baseVertices[2].y} />
            <line x1="120" y1="120" x2={baseVertices[3].x} y2={baseVertices[3].y} />
            <line x1="120" y1="120" x2={baseVertices[4].x} y2={baseVertices[4].y} />
            {/* Lighter sub-facet triangulation */}
            <polygon
              points={`120,120 ${baseVertices[0].x},${baseVertices[0].y} ${baseVertices[1].x},${baseVertices[1].y}`}
              fill="rgba(76, 184, 255, 0.14)"
            />
            <polygon
              points={`120,120 ${baseVertices[1].x},${baseVertices[1].y} ${baseVertices[2].x},${baseVertices[2].y}`}
              fill="rgba(30, 155, 255, 0.2)"
            />
          </g>

          {/* Glowing Vertex Nodes */}
          {baseVertices.map((v, idx) => (
            <motion.circle
              key={v.id}
              cx={v.x}
              cy={v.y}
              r="3.5"
              fill="#FFFFFF"
              stroke="#1E9BFF"
              strokeWidth="1.5"
              filter="url(#radarGlow)"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: [0.75, 1, 0.75],
                      scale: [1, 1.25, 1],
                    }
              }
              transition={{
                duration: 2.2 + idx * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
