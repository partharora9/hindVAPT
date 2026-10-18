"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { useScramble } from "@/hooks/useScramble";
import { useGuaranteedInView } from "@/hooks/useGuaranteedInView";
import { useMotionGovernance } from "@/context/MotionContext";
import { EASINGS } from "@/config/animation";
import { HOME_CONTENT } from "@/content/home";

// 8 Distinct Stylised Security Framework Wordmarks (typographic, non-official marks)
function OwaspMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="OWASP Testing Framework">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <rect x="4" y="6" width="22" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M8 12 L15 18 L8 24" stroke="#1E9BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="16"
        letterSpacing="0.1em"
      >
        OWASP
      </text>
    </svg>
  );
}

function NistMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="NIST Cybersecurity Framework">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <circle cx="15" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="15" cy="18" r="4" fill="#1E9BFF" fillOpacity="0.3" stroke="#1E9BFF" strokeWidth="1.2" />
        <line x1="15" y1="4" x2="15" y2="8" stroke="currentColor" strokeWidth="1.4" />
        <line x1="15" y1="28" x2="15" y2="32" stroke="currentColor" strokeWidth="1.4" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="16"
        letterSpacing="0.12em"
      >
        NIST
      </text>
    </svg>
  );
}

function MitreMark() {
  return (
    <svg viewBox="0 0 180 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="MITRE ATT&CK Framework">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path d="M 6 26 L 15 10 L 24 26" stroke="#1E9BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.4" />
      </g>
      <text
        x="34"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.08em"
      >
        MITRE ATT&CK
      </text>
    </svg>
  );
}

function IsoMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="ISO 27001 Security Standard">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path d="M 15 6 L 25 10 V 21 C 25 26 15 30 15 30 C 15 30 5 26 5 21 V 10 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" fill="#1E9BFF" fillOpacity="0.15" />
        <path d="M 10 18 L 14 21 L 20 14" stroke="#1E9BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.08em"
      >
        ISO 27001
      </text>
    </svg>
  );
}

function PciMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="PCI DSS Security Standard">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <rect x="5" y="9" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="5" y1="14" x2="27" y2="14" stroke="#1E9BFF" strokeWidth="1.5" />
        <rect x="9" y="19" width="5" height="4" rx="1" fill="#1E9BFF" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.08em"
      >
        PCI DSS
      </text>
    </svg>
  );
}

function Soc2Mark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="SOC 2 Type II Security Standard">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <circle cx="12" cy="18" r="8" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" />
        <circle cx="18" cy="18" r="8" stroke="#1E9BFF" strokeWidth="1.6" />
        <circle cx="15" cy="18" r="2.5" fill="#1E9BFF" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.1em"
      >
        SOC 2
      </text>
    </svg>
  );
}

function CvssMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="CVSS Vulnerability Scoring">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <rect x="5" y="8" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.7" />
        <line x1="9" y1="21" x2="9" y2="18" stroke="#1E9BFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="21" x2="15" y2="14" stroke="#1E9BFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="21" y1="21" x2="21" y2="11" stroke="#FF4C68" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="16"
        letterSpacing="0.12em"
      >
        CVSS v3.1
      </text>
    </svg>
  );
}

function PtesMark() {
  return (
    <svg viewBox="0 0 160 36" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="PTES Penetration Testing Standard">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <circle cx="15" cy="18" r="10" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.7" />
        <path d="M 11 18 L 19 18 M 16 14 L 20 18 L 16 22" stroke="#1E9BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text
        x="36"
        y="23"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="800"
        fontSize="16"
        letterSpacing="0.12em"
      >
        PTES
      </text>
    </svg>
  );
}

const STANDARDS_WORDMARKS = [
  OwaspMark,
  NistMark,
  MitreMark,
  IsoMark,
  PciMark,
  Soc2Mark,
  CvssMark,
  PtesMark,
];

interface TrustedByProps {
  id?: string;
  clientLogosMode?: boolean;
}

export function TrustedBy({
  id = "trusted-by",
  clientLogosMode = false,
}: TrustedByProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isTouch } = useMotionGovernance();
  const [isHovered, setIsHovered] = useState(false);

  // Entrance trigger when section is ~25% in view (with guaranteed 1.2s fallback)
  const isInView = useGuaranteedInView(sectionRef, { amount: 0.25, fallbackMs: 1200 });

  // Scroll parallax mapping
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollY);

  // Parallax: label and logo strip move with an ~8px differential
  const labelY = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // Decode scramble effect on header label triggered on entrance
  const scrambledLabel = useScramble(HOME_CONTENT.standards.label, {
    durationMs: 750,
    delayMs: 200,
    autoStart: isInView,
  });

  // Smooth physical marquee ticker with scroll-velocity boost & responsive speed
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animationFrameId: number;
    let xOffset = 0;
    const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
    const baseSpeed = isSmall ? 0.42 : 0.75; // ~25px/s on mobile, 45px/s on desktop
    let currentSpeed = baseSpeed;

    // Card width per screen tier
    const cardWidth = isSmall ? 140 : 224;
    const singleSetWidth = STANDARDS_WORDMARKS.length * cardWidth;

    const tick = () => {
      const vel = Math.abs(scrollVelocity.get() || 0);

      let targetSpeed = baseSpeed;
      if (vel > 12 && isInView) {
        targetSpeed = baseSpeed + Math.min(2.5, vel * 0.0018);
      }

      if (isHovered && !isTouch) {
        targetSpeed = 0.15; // Slow down gently on hover on mouse devices
      }

      // Smooth exponential decay back to base speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.055;

      xOffset -= currentSpeed;
      if (xOffset <= -singleSetWidth) {
        xOffset += singleSetWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xOffset}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isHovered, shouldReduceMotion, scrollVelocity, isTouch]);

  // 3 identical sets to guarantee seamless continuous scroll
  const logoSets = [0, 1, 2];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-[#020617] overflow-x-clip select-none"
      aria-label="Security Standards & Frameworks"
    >
      {/* Continuity: Shared background cyber grid and vignette */}
      <div className="absolute inset-0 cyber-grid pointer-events-none -z-20" aria-hidden="true" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none -z-10" aria-hidden="true" />

      {/* Continuity: 1px outer frame lines along left and right boundary */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-30 max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 w-[1px] bg-[rgba(30,155,255,0.15)]" />

        {/* Junction tick brackets on the outer frame */}
        <div className="absolute top-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-t border-r border-[#1E9BFF]/60" />
        <div className="absolute top-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-t border-l border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 left-4 sm:left-8 -translate-x-1/2 w-2 h-2 border-b border-r border-[#1E9BFF]/60" />
        <div className="absolute bottom-0 right-4 sm:right-8 translate-x-1/2 w-2 h-2 border-b border-l border-[#1E9BFF]/60" />
      </div>

      {/* Boundary 1px Accent-Blue Light Line Sweep */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-40">
        <div className="absolute inset-0 bg-[rgba(30,155,255,0.2)]" />
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "200%" } : { x: "-100%" }}
          transition={{
            duration: 1.4,
            ease: EASINGS.cyber,
          }}
          className="absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-transparent via-[#1E9BFF] to-white shadow-[0_0_16px_#1E9BFF,0_0_32px_#1E9BFF]"
        />
      </div>

      {/* 1. TOP HATCH BAND: Wipes in from left to right as Section 2 enters view */}
      <div className="w-full overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: EASINGS.cyber,
          }}
          style={{ originX: 0 }}
          className="w-full h-11 sm:h-12 cyber-hatch border-t border-b border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>

      {/* 2. SECTION CONTENT: Parallax-separated Label and Logo Marquee */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Centered Heading Label with Scramble Decode */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: labelY }}
          className="flex items-center justify-center mb-6 sm:mb-8"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-semibold tracking-[0.28em] text-[#6B7FA8] uppercase select-none transition-colors duration-200 hover:text-[#C3D4FF]">
            {scrambledLabel}
          </span>
        </motion.div>

        {/* 3. LOGO MARQUEE STRIP CONTAINER (with HUD crosshairs, corner ticks & borders) */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: marqueeY }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full overflow-hidden border-t border-b border-[rgba(30,155,255,0.15)] py-0 bg-[#020617]/50"
        >
          {/* Edge Fade Gradients for smooth infinite entry/exit */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

          {/* Continuous Running Logo Track */}
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ width: "fit-content" }}
          >
            {logoSets.map((setIdx) => (
              <div key={setIdx} className="flex items-center">
                {STANDARDS_WORDMARKS.map((LogoComp, logoIdx) => (
                  <div
                    key={`${setIdx}-${logoIdx}`}
                    className="relative flex-shrink-0 w-[140px] xs:w-[160px] sm:w-[190px] xl:w-[224px] h-[76px] sm:h-[88px] xl:h-[102px] flex items-center justify-center px-4 sm:px-6 border-r border-[rgba(30,155,255,0.12)] bg-[#030919]/50 hover:bg-[#07112c]/65 transition-colors duration-200 group cursor-pointer"
                  >
                    {/* Top Crosshair Junction Tick (┬) */}
                    <div className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px] pointer-events-none z-10 flex items-center justify-center">
                      <span className="absolute w-[10px] h-[1px] bg-[#1E9BFF]/45" />
                      <span className="absolute h-[5px] w-[1px] bg-[#1E9BFF]/45 top-[4px]" />
                    </div>

                    {/* Bottom Crosshair Junction Tick (┴) */}
                    <div className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px] pointer-events-none z-10 flex items-center justify-center">
                      <span className="absolute w-[10px] h-[1px] bg-[#1E9BFF]/45" />
                      <span className="absolute h-[5px] w-[1px] bg-[#1E9BFF]/45 bottom-[4px]" />
                    </div>

                    {/* Inner CAD Corner Brackets (┌ ┐ └ ┘) */}
                    <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />

                    {/* Logo Visual with Cyber Cyan Glow on Hover */}
                    <div className="text-[#C3D4FF] group-hover:text-white transition-all duration-200 filter drop-shadow-[0_0_8px_rgba(30,155,255,0.12)] group-hover:drop-shadow-[0_0_14px_rgba(30,155,255,0.6)]">
                      <LogoComp />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4. BOTTOM HATCH BAND: Symmetrical with top band */}
      <div className="w-full overflow-hidden mt-2">
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: EASINGS.cyber,
          }}
          style={{ originX: 0 }}
          className="w-full h-11 sm:h-12 cyber-hatch border-t border-b border-[rgba(30,155,255,0.15)] shadow-[inset_0_0_20px_rgba(2,6,23,0.8)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
