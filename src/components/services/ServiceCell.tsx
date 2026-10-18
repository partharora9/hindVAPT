"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconBadge } from "./IconBadge";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";
import type { ServiceItem } from "./servicesData";

interface ServiceCellProps {
  item: ServiceItem;
  index: number;
  isInView?: boolean;
}

export function ServiceCell({ item, index, isInView = true }: ServiceCellProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cellRef = useRef<HTMLDivElement>(null);

  // Safeguard: Fallback to visible after 1.2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setFallbackVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const activeVisible = isInView || fallbackVisible;

  // Stagger calculation: diagonal wave (row + col * 90ms)
  const staggerDelay = (item.row + item.col) * 0.09;

  // Title scramble decode
  const decodedTitle = useScramble(item.title, {
    durationMs: 600,
    delayMs: Math.round((1.0 + staggerDelay + 0.2) * 1000),
    autoStart: activeVisible,
  });

  // 3D Tilt calculation (±8°)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || window.innerWidth < 768) return;
    const rect = cellRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: -relY * 16, // ±8 deg
      rotateY: relX * 16,  // ±8 deg
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const activeHover = isHovered || isFocused;
  const { IconComponent } = item;

  // Grid border classes based on 3x3 layout
  // Column 0, 1 have border-r; Row 0, 1 have border-b
  const borderClasses = `
    ${item.col < 2 ? "lg:border-r" : ""}
    ${item.row < 2 ? "lg:border-b" : ""}
    ${index % 2 === 0 ? "md:max-lg:border-r" : ""}
    ${index < 8 ? "md:max-lg:border-b" : ""}
    max-md:border-b last:border-b-0
    border-[rgba(150,170,230,0.28)]
  `;

  return (
    <motion.div
      ref={cellRef}
      tabIndex={0}
      role="region"
      aria-label={item.title.replace("\n", " ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      animate={
        activeVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{
        duration: 0.8,
        delay: staggerDelay,
        ease: EASINGS.cyber,
      }}
      className={`relative isolate flex flex-col items-center text-center px-6 sm:px-8 pt-10 pb-12 min-h-[340px] lg:h-[366px] overflow-hidden transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] cursor-default ${borderClasses} ${
        activeHover ? "bg-[rgba(30,155,255,0.05)]" : "bg-transparent"
      }`}
      style={{
        perspective: 1000,
      }}
    >
      {/* 1. Top Edge Accent Sweep Line on Hover */}
      <motion.div
        initial={false}
        animate={{
          scaleX: activeHover ? 1 : 0,
          opacity: activeHover ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0.5 }}
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#1E9BFF] shadow-[0_0_8px_#1E9BFF] pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* 2. Soft Radial Hover Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 ${
          activeHover ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(30, 155, 255, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Icon Badge with 3D Tilt (~40px below cell top) */}
      <div className="relative z-10 mb-8 sm:mb-9">
        <motion.div
          animate={{
            rotateX: shouldReduceMotion ? 0 : tilt.rotateX,
            rotateY: shouldReduceMotion ? 0 : tilt.rotateY,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.6 }}
            animate={activeVisible ? { scale: 1 } : { scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 22,
              delay: staggerDelay + 0.15,
            }}
          >
            <IconBadge
              isHovered={activeHover}
              isInView={activeVisible}
              index={index}
            >
              <IconComponent isHovered={activeHover} isInView={activeVisible} />
            </IconBadge>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Cell Title (~50px below badge, uppercase, tracking, white on hover) */}
      <h3
        className={`relative z-10 font-mono text-[22px] sm:text-[24px] lg:text-[27px] font-bold uppercase tracking-[0.06em] leading-tight mb-4 transition-colors duration-300 whitespace-pre-line max-w-[420px] ${
          activeHover ? "text-white glow-text-white" : "text-[#C3D4FF]"
        }`}
      >
        {decodedTitle}
      </h3>

      {/* 5. Cell Description (~17px, line-height 30px, max-w 400px, 3 lines) */}
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
        className={`relative z-10 font-mono text-[15px] sm:text-[16px] lg:text-[17px] leading-[28px] sm:leading-[30px] font-normal max-w-[400px] transition-colors duration-300 ${
          activeHover ? "text-[#C3D4FF]" : "text-[#8FA3C7]"
        }`}
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}
