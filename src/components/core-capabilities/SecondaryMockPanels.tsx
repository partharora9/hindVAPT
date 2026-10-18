"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  parallaxOffset?: { x: number; y: number };
}

// ----------------------------------------------------------------------
// CARD 2: RESPONSE ACTIONS PANEL (445×305px)
// ----------------------------------------------------------------------
export function ResponseActionsPanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const actions = [
    {
      id: "action-1",
      title: "Isolate Host",
      target: "Workload: k8s-prod-04",
      duration: "42ms",
      status: "CONTAINED",
      statusColor: "#4CB8FF",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4CB8FF]" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      ),
    },
    {
      id: "action-2",
      title: "Revoke IAM Token",
      target: "IAM: service-agent-vault",
      duration: "18ms",
      status: "REVOKED",
      statusColor: "#1E9BFF",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4CB8FF]" stroke="currentColor" strokeWidth="1.8">
          <circle cx="8" cy="15" r="4" />
          <path d="M10.85 12.15L19 4" />
          <path d="M18 5L20 7" />
          <path d="M15 8L17 10" />
        </svg>
      ),
    },
    {
      id: "action-3",
      title: "Block Ingress IP",
      target: "Edge: cloudflare-waf",
      duration: "65ms",
      status: "BLOCKED",
      statusColor: "#6B7FA8",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4CB8FF]" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.6,
        y: parallaxOffset.y * 0.6,
      }}
      className="relative w-full max-w-[445px] h-[305px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
    >
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-[#C3D4FF] uppercase font-mono">
          RESPONSE ACTIONS
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4CB8FF] animate-pulse" />
          <span className="text-[11px] text-[#4CB8FF] font-mono tracking-wider">AUTONOMOUS</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 my-auto">
        {actions.map((act, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={act.id}
              className={`flex items-center justify-between p-2.5 rounded-[8px] border transition-all ${
                isActive
                  ? "bg-[rgba(30,155,255,0.12)] border-[#1E9BFF]/40 shadow-[0_0_15px_rgba(30,155,255,0.1)]"
                  : "bg-[#0B1426]/50 border-[rgba(120,150,255,0.08)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-[#0E1A30] border border-[rgba(30,155,255,0.2)] flex items-center justify-center">
                  {act.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                    {act.title}
                  </span>
                  <span className="text-[11px] text-[#8FA3C7] font-mono mt-0.5">{act.target}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[12px] font-mono text-[#4CB8FF] font-bold">{act.duration}</span>
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
                  style={{
                    color: act.statusColor,
                    borderColor: `${act.statusColor}40`,
                    backgroundColor: `${act.statusColor}15`,
                  }}
                >
                  {act.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <span>Mean Containment Latency</span>
        <span className="text-[#4CB8FF] font-bold">34ms avg</span>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 2: PLAYBOOK RUNS PANEL (250×300px)
// ----------------------------------------------------------------------
export function PlaybookRunsPanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          Playbook Runs
        </span>
        <span className="text-[11px] font-mono text-[#4CB8FF] font-bold">100% AUTO</span>
      </div>

      {/* Center Graph Sparkline */}
      <div className="relative flex flex-col items-center justify-center my-auto py-2">
        <div className="text-2xl font-bold font-mono text-white mb-2 filter drop-shadow-[0_0_8px_rgba(76,184,255,0.5)]">
          1,429
        </div>
        <div className="w-full h-[80px]">
          <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CB8FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 65 Q 30 50, 60 55 T 120 30 T 170 18 L 200 22 L 200 80 L 0 80 Z"
              fill="url(#sparkGrad)"
            />
            <path
              d="M 0 65 Q 30 50, 60 55 T 120 30 T 170 18 L 200 22"
              fill="none"
              stroke="#4CB8FF"
              strokeWidth="2.5"
            />
            <circle cx="200" cy="22" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #1E9BFF)" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono">
        <div className="flex justify-between text-[#8FA3C7]">
          <span>Auto-Mitigated</span>
          <span className="text-[#4CB8FF]">99.4%</span>
        </div>
        <div className="flex justify-between text-[#8FA3C7]">
          <span>Quarantined</span>
          <span className="text-[#1E9BFF]">0.6%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 3: ASSET EXPOSURE PANEL (445×305px)
// ----------------------------------------------------------------------
export function AssetExposurePanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  const assets = [
    {
      id: "asset-1",
      title: "Multi-Cloud Workloads",
      subtitle: "AWS · GCP · Azure (418 nodes)",
      risk: "CRITICAL",
      riskPercent: 84,
      riskColor: "#FF4C68",
    },
    {
      id: "asset-2",
      title: "Managed Endpoints",
      subtitle: "12,450 active host agents",
      risk: "LOW RISK",
      riskPercent: 22,
      riskColor: "#4CB8FF",
    },
    {
      id: "asset-3",
      title: "Edge Gateways & APIs",
      subtitle: "84 publicly exposed endpoints",
      risk: "MEDIUM",
      riskPercent: 58,
      riskColor: "#1E9BFF",
    },
  ];

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.6,
        y: parallaxOffset.y * 0.6,
      }}
      className="relative w-full max-w-[445px] h-[305px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
    >
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-[#C3D4FF] uppercase font-mono">
          ASSET EXPOSURE
        </span>
        <span className="text-[11px] text-[#6B7FA8] font-mono tracking-wider">GRAPH-MAPPED</span>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 my-auto">
        {assets.map((ast) => (
          <div
            key={ast.id}
            className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#0B1426]/50 border border-[rgba(120,150,255,0.08)]"
          >
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                {ast.title}
              </span>
              <span className="text-[11px] text-[#8FA3C7] font-mono mt-0.5">{ast.subtitle}</span>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
                style={{
                  color: ast.riskColor,
                  borderColor: `${ast.riskColor}40`,
                  backgroundColor: `${ast.riskColor}15`,
                }}
              >
                {ast.risk}
              </span>
              <div className="w-[84px] h-1.5 bg-[#0B1426] rounded-full overflow-hidden border border-[rgba(76,184,255,0.2)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${ast.riskPercent}%`,
                    backgroundColor: ast.riskColor,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <span>Attack Path Reduction</span>
        <span className="text-[#4CB8FF] font-bold">-92% exposure</span>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 3: EXPOSURE SCORE PANEL (250×300px)
// ----------------------------------------------------------------------
export function ExposureScorePanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          Exposure Score
        </span>
        <span className="text-[11px] font-mono text-[#4CB8FF] font-bold">GRADE A</span>
      </div>

      {/* Radial Gauge */}
      <div className="relative flex items-center justify-center my-auto py-2">
        <div className="relative w-[124px] h-[124px] flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="rgba(30, 155, 255, 0.15)"
              strokeWidth="9"
              strokeDasharray="210 70"
              transform="rotate(135 60 60)"
              strokeLinecap="round"
            />
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="#4CB8FF"
              strokeWidth="9"
              strokeDasharray="180 100"
              transform="rotate(135 60 60)"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #1E9BFF)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">88</span>
            <span className="text-[10px] font-mono text-[#8FA3C7]">/ 100</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <div className="flex justify-between">
          <span>Zero-Day Ingress</span>
          <span className="text-[#4CB8FF]">0 found</span>
        </div>
        <div className="flex justify-between">
          <span>Shadow Subdomains</span>
          <span className="text-[#1E9BFF]">Neutralized</span>
        </div>
      </div>
    </motion.div>
  );
}
