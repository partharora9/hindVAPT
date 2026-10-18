"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

// 8 Distinct High-Tech Corporate / Security Logos matching reference screenshot
function Logo1() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="Logoipsum security">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path
          d="M 16 3 C 22 3 28 5 28 9 C 28 20 22 26 16 29 C 10 26 4 20 4 9 C 4 5 10 3 16 3 Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M 16 8 L 17.5 13.5 L 23 15 L 17.5 16.5 L 16 22 L 14.5 16.5 L 9 15 L 14.5 13.5 Z"
          fill="currentColor"
        />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        Logoipsum
      </text>
    </svg>
  );
}

function Logo2() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="logoipsum systems">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <rect x="4" y="5" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M 4 5 H 15 C 21 5 26 10 26 16 C 26 22 21 27 15 27 H 4 V 5 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <circle cx="15" cy="16" r="3.5" fill="currentColor" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        logoipsum
      </text>
    </svg>
  );
}

function Logo3() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="Logoipsum defense">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path
          d="M 16 3 L 26 8.5 V 23.5 L 16 29 L 6 23.5 V 8.5 Z"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="currentColor"
          fillOpacity="0.18"
        />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <line x1="16" y1="3" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="16" y1="24" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        Logoipsum
      </text>
    </svg>
  );
}

function Logo4() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="logo ipsum global">
      <text
        x="2"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="14"
        letterSpacing="-0.02em"
      >
        logo
      </text>
      <g className="transition-transform duration-500 group-hover:rotate-45" transform="translate(43, 5)">
        <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="11" cy="11" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1" />
        <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.2" />
        <line x1="11" y1="1" x2="11" y2="21" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <text
        x="72"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="14"
        letterSpacing="-0.02em"
      >
        ipsum
      </text>
    </svg>
  );
}

function Logo5() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="Logoipsum orbit">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path
          d="M 6 22 C 12 22 26 18 26 8 C 26 4 21 4 16 7 C 9 11 5 18 5 22 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="24" cy="22" r="2.5" fill="currentColor" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontStyle="italic"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.01em"
      >
        Logoipsum
      </text>
    </svg>
  );
}

function Logo6() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="Logoipsum shield">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <path
          d="M 6 6 L 16 3 L 26 6 V 17 C 26 23 21 27 16 29 C 11 27 6 23 6 17 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <circle cx="16" cy="14" r="3" fill="currentColor" />
        <path d="M 16 9 V 19 M 11 14 H 21" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        Logoipsum
      </text>
    </svg>
  );
}

function Logo7() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="logoipsum node">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <rect x="5" y="6" width="22" height="20" rx="6" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
        <path d="M 12 6 C 18 6 21 11 21 16 C 21 21 18 26 12 26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        logoipsum
      </text>
    </svg>
  );
}

function Logo8() {
  return (
    <svg viewBox="0 0 155 32" fill="none" className="h-6 sm:h-7 w-auto select-none" aria-label="Logoipsum vault">
      <g className="transition-transform duration-300 group-hover:scale-105">
        <polygon points="16,4 26,14 16,24 6,14" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.2" />
        <circle cx="16" cy="14" r="2.5" fill="currentColor" />
      </g>
      <text
        x="36"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        fontSize="15"
        letterSpacing="-0.02em"
      >
        Logoipsum
      </text>
    </svg>
  );
}

const LOGO_COMPONENTS = [
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
];

interface TrustedByProps {
  id?: string;
}

export function TrustedBy({ id = "trusted-by" }: TrustedByProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Entrance trigger when section is ~25% in view (once)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

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
  const scrambledLabel = useScramble("TRUSTED BY SECURITY TEAMS AT", {
    durationMs: 750,
    delayMs: 200,
    autoStart: isInView,
  });

  // Smooth physical marquee ticker with scroll-velocity boost
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animationFrameId: number;
    let xOffset = 0;
    const baseSpeed = 0.75; // pixels per frame at 60fps
    let currentSpeed = baseSpeed;

    // Width of 1 complete set: 8 logos * 224px = 1792px
    const cardWidth = 224;
    const singleSetWidth = LOGO_COMPONENTS.length * cardWidth;

    const tick = () => {
      const vel = Math.abs(scrollVelocity.get() || 0);

      // Boost speed when scrolling through section, then ease back
      let targetSpeed = baseSpeed;
      if (vel > 12 && isInView) {
        targetSpeed = baseSpeed + Math.min(2.8, vel * 0.0018);
      }

      if (isHovered) {
        targetSpeed = 0.15; // Slow down gently on hover
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
  }, [isInView, isHovered, shouldReduceMotion, scrollVelocity]);

  // 3 identical sets of 8 logos to guarantee seamless continuous scroll
  const logoSets = [0, 1, 2];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-[#020617] overflow-hidden select-none"
      aria-label="Trusted By Security Teams"
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

      {/* Boundary 1px Accent-Blue Light Line Sweep (sweeps left to right along boundary once on entry) */}
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
                {LOGO_COMPONENTS.map((LogoComp, logoIdx) => (
                  <div
                    key={`${setIdx}-${logoIdx}`}
                    className="relative flex-shrink-0 w-[200px] sm:w-[224px] h-[92px] sm:h-[102px] flex items-center justify-center px-6 border-r border-[rgba(30,155,255,0.12)] bg-[#030919]/50 hover:bg-[#07112c]/65 transition-colors duration-200 group cursor-pointer"
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
                    {/* Top-Left ┌ */}
                    <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    {/* Top-Right ┐ */}
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    {/* Bottom-Left └ */}
                    <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[#1E9BFF]/30 group-hover:border-[#1E9BFF] transition-colors duration-200" />
                    {/* Bottom-Right ┘ */}
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
