"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

interface ParallaxProps {
  parallaxOffset?: { x: number; y: number };
}

// ----------------------------------------------------------------------
// CARD 2 LEFT: ATTACK PATH PANEL (445×305px)
// ----------------------------------------------------------------------
export function AttackPathPanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const steps = [
    {
      id: "step-1",
      number: "01",
      name: "Reconnaissance",
      target: "api.example.com / subdomains",
      status: "COMPLETED",
      statusColor: "#4CB8FF",
    },
    {
      id: "step-2",
      number: "02",
      name: "Initial Foothold",
      target: "Auth bypass · CWE-287",
      status: "EXPLOITED",
      statusColor: "#FF8E3C",
    },
    {
      id: "step-3",
      number: "03",
      name: "Privilege Escalation",
      target: "Role assignment · CWE-269",
      status: "ESCALATED",
      statusColor: "#FF4C68",
    },
    {
      id: "step-4",
      number: "04",
      name: "Data Access",
      target: "Customer records · Proof of concept",
      status: "PROVEN",
      statusColor: "#FF4C68",
    },
  ];

  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.6,
        y: parallaxOffset.y * 0.6,
      }}
      className="relative w-full max-w-[445px] h-[305px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
    >
      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-[#C3D4FF] uppercase font-mono">
          ATTACK PATH
        </span>
        <SampleDataBadge />
      </div>

      <div className="relative z-10 flex flex-col gap-2 my-auto">
        {steps.map((st, i) => {
          const isActive = activeStep === i;
          return (
            <div
              key={st.id}
              className={`flex items-center justify-between p-2 rounded-[8px] border transition-all ${
                isActive
                  ? "bg-[rgba(30,155,255,0.12)] border-[#1E9BFF]/40 shadow-[0_0_12px_rgba(30,155,255,0.1)]"
                  : "bg-[#0B1426]/50 border-[rgba(120,150,255,0.08)]"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-mono font-bold text-[#1E9BFF] w-6 shrink-0">
                  {st.number}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] sm:text-[13px] font-bold text-white leading-tight truncate">
                    {st.name}
                  </span>
                  <span className="text-[10px] text-[#8FA3C7] font-mono truncate">{st.target}</span>
                </div>
              </div>

              <span
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0"
                style={{
                  color: st.statusColor,
                  borderColor: `${st.statusColor}40`,
                  backgroundColor: `${st.statusColor}15`,
                }}
              >
                {st.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <span>Chained Vulnerability Exploit</span>
        <span className="text-[#4CB8FF] font-bold">Proof of Concept</span>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 2 RIGHT: TIME TO COMPROMISE PANEL (250×300px)
// ----------------------------------------------------------------------
export function TimeToCompromisePanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[12px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          TIME TO COMPROMISE
        </span>
        <SampleDataBadge />
      </div>

      {/* Sparkline Visual */}
      <div className="relative flex flex-col items-center justify-center my-auto py-2">
        <div className="text-2xl font-bold font-mono text-white mb-2 filter drop-shadow-[0_0_8px_rgba(76,184,255,0.5)]">
          4.2h
        </div>
        <div className="w-full h-[80px]">
          <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="compromiseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF4C68" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1E9BFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 70 Q 40 60, 80 40 T 140 25 L 200 15 L 200 80 L 0 80 Z"
              fill="url(#compromiseGrad)"
            />
            <path
              d="M 0 70 Q 40 60, 80 40 T 140 25 L 200 15"
              fill="none"
              stroke="#FF4C68"
              strokeWidth="2.5"
            />
            <circle cx="200" cy="15" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FF4C68)" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono">
        <div className="flex justify-between text-[#8FA3C7]">
          <span>Recon to Access</span>
          <span className="text-[#FF4C68] font-bold">4.2 hours</span>
        </div>
        <div className="flex justify-between text-[#8FA3C7]">
          <span>Business Impact</span>
          <span className="text-[#1E9BFF]">High Severity</span>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 3 LEFT: ENGAGEMENT TIMELINE PANEL (445×305px)
// ----------------------------------------------------------------------
export function EngagementTimelinePanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  const timeline = [
    {
      id: "phase-1",
      name: "Day 1-2: Scoping & Recon",
      detail: "Asset discovery, surface enumeration, rules confirmed",
      status: "DONE",
      statusColor: "#4CB8FF",
    },
    {
      id: "phase-2",
      name: "Day 3-7: Discovery & Exploitation",
      detail: "Manual business logic testing and safe exploit chains",
      status: "ACTIVE",
      statusColor: "#1E9BFF",
    },
    {
      id: "phase-3",
      name: "Day 8-10: Reporting & Walkthrough",
      detail: "CVSS scored report, PoC delivery, developer debrief",
      status: "PLANNED",
      statusColor: "#6B7FA8",
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
          ENGAGEMENT TIMELINE
        </span>
        <SampleDataBadge />
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 my-auto">
        {timeline.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#0B1426]/50 border border-[rgba(120,150,255,0.08)]"
          >
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[13px] font-bold text-white leading-tight truncate">
                {item.name}
              </span>
              <span className="text-[11px] text-[#8FA3C7] font-mono mt-0.5 truncate">{item.detail}</span>
            </div>

            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0"
              style={{
                color: item.statusColor,
                borderColor: `${item.statusColor}40`,
                backgroundColor: `${item.statusColor}15`,
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <span>Standard engagement cycle</span>
        <span className="text-[#4CB8FF] font-bold">1-2 weeks</span>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// CARD 3 RIGHT: DETECTION COVERAGE GAUGE PANEL (250×300px)
// ----------------------------------------------------------------------
export function DetectionCoveragePanel({ parallaxOffset = { x: 0, y: 0 } }: ParallaxProps) {
  return (
    <motion.div
      style={{
        x: parallaxOffset.x * 0.9,
        y: parallaxOffset.y * 0.9,
      }}
      className="relative w-full max-w-[250px] h-[300px] rounded-[12px] bg-[#141C2E] border border-[rgba(120,150,255,0.14)] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col justify-between select-none"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(120,150,255,0.08)]">
        <span className="text-[12px] font-bold text-[#C3D4FF] tracking-wide font-mono">
          DETECTION COVERAGE
        </span>
        <SampleDataBadge />
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
            <span className="text-2xl font-bold font-mono text-white tracking-tight">86%</span>
            <span className="text-[10px] font-mono text-[#8FA3C7]">ATT&CK</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-2 border-t border-[rgba(120,150,255,0.08)] text-[11px] font-mono text-[#8FA3C7]">
        <div className="flex justify-between">
          <span>Tested Techniques</span>
          <span className="text-[#4CB8FF]">28 simulated</span>
        </div>
        <div className="flex justify-between">
          <span>Defensive Gaps</span>
          <span className="text-[#FF8E3C]">4 flagged</span>
        </div>
      </div>
    </motion.div>
  );
}

// Backward-compatible exports
export { AttackPathPanel as ResponseActionsPanel };
export { TimeToCompromisePanel as PlaybookRunsPanel };
export { EngagementTimelinePanel as AssetExposurePanel };
export { DetectionCoveragePanel as ExposureScorePanel };
