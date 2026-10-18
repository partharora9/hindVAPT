"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { CornerBrackets, JunctionTick } from "./CornerBrackets";
import { GlowBackdrop } from "./GlowBackdrop";
import { useScramble } from "@/hooks/useScramble";

export interface ThreatCardData {
  id: string;
  title: string;
  description: string;
  iconComponent: React.ComponentType<{ isInView: boolean; isHovered: boolean }>;
}

interface ThreatCardProps {
  card: ThreatCardData;
  index: number;
  isInView: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isLastCard?: boolean;
}

export function ThreatCard({
  card,
  index,
  isInView,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
  isLastCard = false,
}: ThreatCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Per-card cursor spotlight coordinates
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(260);

  // 3D tilt spring values (±5 deg) applied ONLY to the icon wrapper
  const tiltRotateX = useSpring(0, { damping: 20, stiffness: 180 });
  const tiltRotateY = useSpring(0, { damping: 20, stiffness: 180 });

  // Glow offset moves opposite to tilt for physical depth perception
  const glowX = useSpring(0, { damping: 22, stiffness: 160 });
  const glowY = useSpring(0, { damping: 22, stiffness: 160 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;

    tiltRotateX.set(rotX);
    tiltRotateY.set(rotY);

    // Opposing depth shift
    glowX.set(-rotY * 2.5);
    glowY.set(-rotX * 2.5);
  };

  const handleMouseEnter = () => {
    setIsCardHovered(true);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    onHoverEnd();
    tiltRotateX.set(0);
    tiltRotateY.set(0);
    glowX.set(0);
    glowY.set(0);
  };

  // Scramble decode effect for card title
  const decodedTitle = useScramble(card.title, {
    durationMs: 700,
    delayMs: 300 + index * 150,
    autoStart: isInView,
  });

  const IconComponent = card.iconComponent;
  const floatPhaseDelay = index * 1.8;

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className={`relative overflow-hidden isolate grid grid-rows-[320px_auto_1fr] items-start justify-items-center px-6 sm:px-10 pt-12 pb-12 w-full bg-gradient-to-b from-[#0B1426] to-[#0E1A30] border-b border-[rgba(30,155,255,0.15)] ${
        !isLastCard ? "lg:border-r border-[rgba(30,155,255,0.15)]" : ""
      } transition-opacity duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] group cursor-pointer ${
        isAnyHovered && !isCardHovered ? "opacity-70" : "opacity-100"
      }`}
      style={{
        boxShadow: isCardHovered
          ? "inset 0 0 40px rgba(30, 155, 255, 0.12), 0 0 35px rgba(30, 155, 255, 0.15)"
          : "none",
      }}
      aria-labelledby={`card-title-${card.id}`}
    >
      {/* 1. PER-CARD CURSOR SPOTLIGHT (pointer-events-none, z-0) */}
      {!shouldReduceMotion && isCardHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(380px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(30, 155, 255, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* 2. SUBTLE FAINT INNER SCANLINE SWEEP (pointer-events-none, z-0) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 2,
            delay: index * 2.2,
            ease: "linear",
          }}
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.04)] to-transparent pointer-events-none z-0"
        />
      )}

      {/* 3. L-SHAPED CORNER BRACKETS (Inset exactly 12px, z-30) */}
      <CornerBrackets isHovered={isCardHovered} />

      {/* 4. T-SHAPED TICK MARKS WHERE CARDS MEET AT TOP & BOTTOM (z-30) */}
      {!isLastCard && (
        <>
          <JunctionTick position="top" color={isCardHovered ? "#1E9BFF" : undefined} />
          <JunctionTick position="bottom" color={isCardHovered ? "#1E9BFF" : undefined} />
        </>
      )}

      {/* 5. HOVER LIGHT SWEEP PASS ACROSS CARD (z-0) */}
      {!shouldReduceMotion && isCardHovered && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-0"
        />
      )}

      {/* ================= ROW 1: ICON ZONE (Fixed height 320px, icon centered both ways, glow z-0, icon z-10) ================= */}
      <div className="relative w-full h-[320px] flex items-center justify-center pointer-events-none">
        {/* Glow backdrop behind icon (z-0, inset-0) */}
        <GlowBackdrop
          isInView={isInView}
          isHovered={isCardHovered}
          offsetX={glowX}
          offsetY={glowY}
        />

        {/* Icon wrapper with tilt and float applied ONLY here (z-10) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  rotateX: tiltRotateX,
                  rotateY: tiltRotateY,
                  transformStyle: "preserve-3d",
                }
          }
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-6, 6, -6],
                }
          }
          transition={{
            duration: 6.0,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatPhaseDelay,
          }}
          className={`relative z-10 flex items-center justify-center transition-transform duration-300 pointer-events-auto ${
            isCardHovered ? "scale-105" : "scale-100"
          }`}
        >
          <IconComponent isInView={isInView} isHovered={isCardHovered} />
        </motion.div>
      </div>

      {/* ================= ROW 2: TITLE ZONE (Min-height 40px, same baseline, default #C3D4FF with NO glow, hover white) ================= */}
      <div className="relative z-20 w-full flex items-center justify-center min-h-[40px] px-2">
        <h3
          id={`card-title-${card.id}`}
          className={`whitespace-nowrap xl:whitespace-nowrap text-[clamp(20px,1.8vw,26px)] tracking-[0.08em] font-bold uppercase font-mono select-none transition-colors duration-200 ${
            isCardHovered ? "text-white glow-text-white" : "text-[#C3D4FF]"
          }`}
        >
          {decodedTitle}
        </h3>
      </div>

      {/* ================= ROW 3: DESCRIPTION ZONE (Max-w 400px, text-[17px], leading-[30px], same start y) ================= */}
      <div className="relative z-20 w-full flex justify-center mt-4">
        <p className="max-w-[400px] text-center text-[17px] leading-[30px] text-[#8FA3C7] font-mono font-normal select-none">
          {card.description}
        </p>
      </div>
    </article>
  );
}
