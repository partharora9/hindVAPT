"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";
import type { InsightCardData } from "./bentoData";

interface InsightCardProps {
  card: InsightCardData;
  index: number;
  isInView?: boolean;
  children: React.ReactNode;
}

export function InsightCard({
  card,
  index,
  isInView = true,
  children,
}: InsightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Guaranteed fallback visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setFallbackVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const activeVisible = isInView || fallbackVisible;

  // Cursor Spotlight & Edge Glow coordinates
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const springX = useSpring(rawX, { damping: 30, stiffness: 240 });
  const springY = useSpring(rawY, { damping: 30, stiffness: 240 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x);
    rawY.set(y);

    // 3D Tilt calculation (±4°)
    if (window.innerWidth >= 768) {
      const relX = x / rect.width - 0.5;
      const relY = y / rect.height - 0.5;
      setTilt({
        rotateX: -relY * 8, // ±4 deg
        rotateY: relX * 8,  // ±4 deg
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    rawX.set(-300);
    rawY.set(-300);
  };

  const activeActive = isHovered || isFocused;

  // Stagger calculations
  const staggerDelay = card.row === 1 ? 0.8 + index * 0.14 : 0.15 + (index - 2) * 0.12;

  // Title Scramble Decode
  const decodedTitle = useScramble(card.title, {
    durationMs: 650,
    delayMs: Math.round((staggerDelay + 0.3) * 1000),
    autoStart: activeVisible,
  });

  const isRow1 = card.row === 1;

  return (
    <motion.article
      ref={cardRef}
      tabIndex={0}
      role="region"
      aria-label={card.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      animate={
        activeVisible
          ? {
              opacity: 1,
              y: activeActive ? -4 : 0,
            }
          : { opacity: 0, y: 30 }
      }
      transition={{
        duration: 0.8,
        delay: staggerDelay,
        ease: EASINGS.cyber,
      }}
      className={`relative isolate flex flex-col justify-between rounded-none overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] transition-all duration-300 border-t border-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${
        isRow1 ? "min-h-[520px] lg:h-[560px]" : "min-h-[640px] lg:h-[723px]"
      } ${
        activeActive ? "brightness-105" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #101A30 0%, #0B1224 100%)",
        perspective: 1000,
      }}
    >
      {/* 1. Cursor Spotlight Layer (~300px soft radial) */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none z-10 hidden md:block"
          animate={{
            opacity: activeActive ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(30, 155, 255, 0.12) 0%, rgba(30, 155, 255, 0.03) 50%, transparent 70%)",
            }}
          />
        </motion.div>
      )}

      {/* 2. Top Edge Glow Line on Hover */}
      <motion.div
        animate={{
          opacity: activeActive ? 1 : 0,
          scaleX: activeActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1E9BFF] to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* 3. Ambient Scanline Sweep (~9s cycle with random offset) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            y: ["-100%", "900%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 5.5 + (index % 3) * 1.5,
            ease: "linear",
          }}
          className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[rgba(30,155,255,0.08)] to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
      )}

      {/* 4. Upper Mock UI Container with 3D Tilt */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center pt-8 pb-4 px-4 sm:px-6">
        <motion.div
          animate={{
            rotateX: shouldReduceMotion ? 0 : tilt.rotateX,
            rotateY: shouldReduceMotion ? 0 : tilt.rotateY,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
          }}
          className="w-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </div>

      {/* 5. Lower Content Block (Title + Description) */}
      <div className="relative z-20 w-full flex flex-col items-center text-center px-6 sm:px-10 pb-8 sm:pb-12 mt-auto">
        {/* Title (~30px, uppercase, wide tracking, turns white on hover) */}
        <h3
          className={`font-mono text-[22px] sm:text-[26px] lg:text-[29px] font-bold uppercase tracking-[0.05em] leading-tight mb-3 transition-colors duration-300 max-w-[580px] ${
            activeActive ? "text-white glow-text-white" : "text-[#C3D4FF]"
          }`}
        >
          {decodedTitle}
        </h3>

        {/* Description (~17px, line-height 30px, max-w ~460px) */}
        <motion.p
          initial={
            shouldReduceMotion
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(6px)" }
          }
          animate={
            activeVisible
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(6px)" }
          }
          transition={{
            duration: 0.6,
            delay: staggerDelay + 0.35,
            ease: EASINGS.cyber,
          }}
          className={`font-mono text-[15px] sm:text-[16px] lg:text-[17px] leading-[28px] sm:leading-[30px] font-normal max-w-[460px] transition-colors duration-300 ${
            activeActive ? "text-[#C3D4FF]" : "text-[#8FA3C7]"
          }`}
        >
          {card.description}
        </motion.p>
      </div>
    </motion.article>
  );
}
