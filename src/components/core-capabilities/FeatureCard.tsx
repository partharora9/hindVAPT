"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useInView } from "framer-motion";
import { IconBadge } from "./IconBadge";
import { TopSourcesPanel } from "./TopSourcesPanel";
import { AttackVectorsPanel } from "./AttackVectorsPanel";
import { TickRuler } from "./TickRuler";
import {
  ResponseActionsPanel,
  PlaybookRunsPanel,
  AssetExposurePanel,
  ExposureScorePanel,
} from "./SecondaryMockPanels";

export interface CapabilityCardData {
  id: string;
  badgeType: "browser-shield" | "lightning-shield" | "network-shield";
  titleLines: [string, string];
  paragraph: string;
  bullets: string[];
  mockType: "detection" | "response" | "exposure";
}

interface FeatureCardProps {
  card: CapabilityCardData;
  index: number;
  isInView?: boolean;
  isActive?: boolean;
  showTemplateOverlay?: boolean;
}

export function FeatureCard({
  card,
  index,
  isInView = true,
  isActive = true,
  showTemplateOverlay = false,
}: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hoveredBulletIdx, setHoveredBulletIdx] = useState<number | null>(null);

  // Content reveal: Card 0 reveals immediately on section entry;
  // subsequent cards reveal when reaching sticky position via useInView (-35% margin).
  // Guaranteed fallback timeout of 1.2s ensures content is never left unrevealed.
  const cardInView = useInView(cardRef, { margin: "-35% 0px -35% 0px", once: true });
  const [revealed, setRevealed] = useState(index === 0 || shouldReduceMotion === true);

  useEffect(() => {
    if (cardInView) {
      setRevealed(true);
    }
  }, [cardInView]);

  useEffect(() => {
    if (revealed) return;
    const fallbackTimer = setTimeout(() => {
      setRevealed(true);
    }, 1200);
    return () => clearTimeout(fallbackTimer);
  }, [revealed]);

  // 3D Tilt with useSpring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Rotate ±5°
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current || !isActive) return;
      const rect = cardRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(normX);
      mouseY.set(normY);
      setParallaxOffset({ x: normX * 18, y: normY * 18 });
    },
    [mouseX, mouseY, shouldReduceMotion, isActive]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setParallaxOffset({ x: 0, y: 0 });
    setIsCardHovered(false);
  }, [mouseX, mouseY]);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[1496px] h-full mx-auto bg-gradient-to-b from-[#0B1426] via-[#0D182E] to-[#0E1A30] border border-[rgba(30,155,255,0.18)] transition-all duration-300 select-none overflow-hidden"
    >
      {/* 4 L-shaped Corner Brackets */}
      {/* Top Left */}
      <div
        className={`absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 transition-all duration-300 pointer-events-none z-20 ${
          isCardHovered ? "border-[#4CB8FF] w-6 h-6" : "border-[#C3D4FF]"
        }`}
      />
      {/* Top Right */}
      <div
        className={`absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 transition-all duration-300 pointer-events-none z-20 ${
          isCardHovered ? "border-[#4CB8FF] w-6 h-6" : "border-[#C3D4FF]"
        }`}
      />
      {/* Bottom Left */}
      <div
        className={`absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 transition-all duration-300 pointer-events-none z-20 ${
          isCardHovered ? "border-[#4CB8FF] w-6 h-6" : "border-[#C3D4FF]"
        }`}
      />
      {/* Bottom Right */}
      <div
        className={`absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 transition-all duration-300 pointer-events-none z-20 ${
          isCardHovered ? "border-[#4CB8FF] w-6 h-6" : "border-[#C3D4FF]"
        }`}
      />

      {/* Subtle Inner Gradient Border Sheen on Hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-[rgba(30,155,255,0.08)] via-transparent to-[rgba(76,184,255,0.04)] ${
          isCardHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Two-Column Content */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 lg:p-8 xl:p-10 gap-6 lg:gap-8 items-center">
        {/* Left Column (~45% width on desktop -> 5 of 12 cols or 45%) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Circular Icon Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-4 sm:mb-6"
          >
            <IconBadge type={card.badgeType} isInView={true} />
          </motion.div>

          {/* Title (2 lines, ~40px, line-height 1.3, wide tracking, uppercase) */}
          <motion.h3
            initial={shouldReduceMotion ? false : { y: 14, opacity: 0, filter: "blur(4px)" }}
            animate={revealed ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: 14, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-mono font-extrabold uppercase tracking-tight text-[#C3D4FF] leading-[1.22] mb-4"
          >
            {card.titleLines[0]}
            <br />
            {card.titleLines[1]}
          </motion.h3>

          {/* Paragraph (~19px, line-height 30px, #8FA3C7) */}
          <motion.p
            initial={shouldReduceMotion ? false : { y: 14, opacity: 0, filter: "blur(4px)" }}
            animate={revealed ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: 14, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] sm:leading-[26px] text-[#8FA3C7] font-normal mb-6 max-w-[520px]"
          >
            {card.paragraph}
          </motion.p>

          {/* Feature Bullet List with 4-point Sparkle */}
          <ul className="flex flex-col gap-3" role="list">
            {card.bullets.map((bullet, bIdx) => {
              const isHovered = hoveredBulletIdx === bIdx;

              return (
                <motion.li
                  key={bIdx}
                  tabIndex={0}
                  onMouseEnter={() => setHoveredBulletIdx(bIdx)}
                  onMouseLeave={() => setHoveredBulletIdx(null)}
                  initial={shouldReduceMotion ? false : { x: -12, opacity: 0, filter: "blur(4px)" }}
                  animate={revealed ? { x: 0, opacity: 1, filter: "blur(0px)" } : { x: -12, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, delay: 0.18 + bIdx * 0.06 }}
                  className="group flex items-start gap-3.5 cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-[#1E9BFF] p-1 -m-1 transition-colors"
                >
                  {/* 4-point thin sparkle icon */}
                  <motion.div
                    animate={isHovered ? { rotate: 90, scale: 1.15 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-1 text-[#4CB8FF]"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 filter drop-shadow-[0_0_4px_#1E9BFF]"
                    >
                      <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
                    </svg>
                  </motion.div>

                  <span
                    className={`text-[13px] sm:text-[14px] font-mono leading-relaxed transition-colors duration-200 ${
                      isHovered ? "text-white font-medium" : "text-[#8FA3C7]"
                    }`}
                  >
                    {bullet}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Right Column (~55% width -> 7 of 12 cols on desktop) */}
        <motion.div
          initial={shouldReduceMotion ? false : { x: 32, opacity: 0 }}
          animate={revealed ? { x: 0, opacity: 1 } : { x: 32, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.14 }}
          className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[480px]"
        >
          {/* Faint Dark Grid Panel / Chassis behind floating elements */}
          <div className="absolute inset-0 rounded-[16px] bg-[#0A1224]/50 border border-[rgba(30,155,255,0.08)] shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div
              className="w-full h-full opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(30, 155, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 155, 255, 0.12) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            {/* Ambient Scanline sweep every ~8s */}
            {!shouldReduceMotion && isActive && (
              <motion.div
                className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[rgba(76,184,255,0.07)] to-transparent pointer-events-none"
                animate={{ y: ["-100%", "900%"] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>

          {/* 3D Tilt Wrapper Container */}
          <motion.div
            style={
              shouldReduceMotion || !isActive
                ? {}
                : {
                    rotateX,
                    rotateY,
                    transformPerspective: 1200,
                  }
            }
            className="relative z-10 w-full max-w-[680px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 py-4"
          >
            {/* RENDER MOCK FOR CARD 1: REAL-TIME THREAT DETECTION */}
            {card.mockType === "detection" && (
              <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6">
                {/* Left Stack: TOP SOURCES Panel + Bottom TickRuler */}
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <TopSourcesPanel isInView={true} isActive={isActive} parallaxOffset={parallaxOffset} />

                  {/* TickRuler sparkline below Top Sources panel */}
                  <div className="pl-2">
                    <TickRuler width={260} />
                  </div>
                </div>

                {/* Right Stack: Top TickRuler + Attack Vectors Panel (offset lower) */}
                <div className="flex flex-col items-center sm:items-start gap-3 sm:mt-5">
                  {/* TickRuler sparkline above Attack Vectors panel */}
                  <div className="pl-1">
                    <TickRuler width={220} />
                  </div>

                  <AttackVectorsPanel isInView={true} isActive={isActive} parallaxOffset={parallaxOffset} />
                </div>
              </div>
            )}

            {/* RENDER MOCK FOR CARD 2: AUTOMATED INCIDENT RESPONSE */}
            {card.mockType === "response" && (
              <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <ResponseActionsPanel parallaxOffset={parallaxOffset} />
                  <div className="pl-2">
                    <TickRuler width={260} />
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-3 sm:mt-5">
                  <div className="pl-1">
                    <TickRuler width={220} />
                  </div>
                  <PlaybookRunsPanel parallaxOffset={parallaxOffset} />
                </div>
              </div>
            )}

            {/* RENDER MOCK FOR CARD 3: UNIFIED ATTACK SURFACE */}
            {card.mockType === "exposure" && (
              <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <AssetExposurePanel parallaxOffset={parallaxOffset} />
                  <div className="pl-2">
                    <TickRuler width={260} />
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-3 sm:mt-5">
                  <div className="pl-1">
                    <TickRuler width={220} />
                  </div>
                  <ExposureScorePanel parallaxOffset={parallaxOffset} />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
