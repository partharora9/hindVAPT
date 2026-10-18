"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/config/animation";
import type { TestimonialItem } from "./testimonialsData";

interface PortraitPanelProps {
  testimonial: TestimonialItem;
  direction?: number;
  isInView?: boolean;
}

export function PortraitPanel({
  testimonial,
  direction = 1,
  isInView = true,
}: PortraitPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger brief chromatic glitch on slide change
  useEffect(() => {
    if (shouldReduceMotion) return;
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 280);
    return () => clearTimeout(timer);
  }, [testimonial.id, shouldReduceMotion]);

  // Mouse parallax springs (image shifts ±10px opposite to cursor)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { damping: 28, stiffness: 220 });
  const parallaxY = useSpring(rawY, { damping: 28, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // Shift opposite to cursor (±10px)
    rawX.set(-relX * 20);
    rawY.set(-relY * 20);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[524px] max-lg:aspect-[16/10] max-lg:h-auto h-[520px] sm:h-[600px] lg:h-[640px] overflow-hidden isolate select-none bg-[#0A5CFF] shadow-[0_16px_50px_rgba(0,0,0,0.7)]"
    >
      {/* 1. Wipe Entrance & Slide Transition Wrapper */}
      <motion.div
        key={testimonial.id}
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                scale: 1.12,
              }
        }
        animate={
          isInView
            ? {
                clipPath: "inset(0 0% 0 0)",
                scale: 1,
              }
            : { clipPath: "inset(0 100% 0 0)", scale: 1.12 }
        }
        transition={{
          duration: 0.85,
          ease: EASINGS.cyber,
        }}
        className="relative w-full h-full overflow-hidden"
      >
        {/* Breathing Zoom & Mouse Parallax Container */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : parallaxX,
            y: shouldReduceMotion ? 0 : parallaxY,
          }}
          animate={
            shouldReduceMotion
              ? { scale: 1 }
              : {
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full"
        >
          {/* Main Portrait Image */}
          <Image
            src={testimonial.imageSrc}
            alt={testimonial.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 524px"
            className="object-cover object-top"
          />

          {/* Chromatic Glitch Layers on slide transition */}
          {isGlitching && !shouldReduceMotion && (
            <>
              {/* Cyan Offset Layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
                style={{ transform: "translateX(-6px)" }}
              >
                <Image
                  src={testimonial.imageSrc}
                  alt=""
                  fill
                  sizes="524px"
                  aria-hidden="true"
                  className="object-cover object-top filter brightness-125 hue-rotate-15"
                />
              </div>
              {/* Blue/Magenta Offset Layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
                style={{ transform: "translateX(6px)" }}
              >
                <Image
                  src={testimonial.imageSrc}
                  alt=""
                  fill
                  sizes="524px"
                  aria-hidden="true"
                  className="object-cover object-top filter brightness-125 -hue-rotate-15"
                />
              </div>
            </>
          )}

          {/* Duotone Cobalt-Blue Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color opacity-35"
            style={{ backgroundColor: "#0A5CFF" }}
          />

          {/* Subtle Bottom & Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 2. Leading Bright Scanline during wipe & periodic loop */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              y: ["-10%", "110%"],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 5.2,
              ease: "linear",
            }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4CB8FF] to-transparent shadow-[0_0_12px_#1E9BFF] pointer-events-none z-20"
          />
        )}
      </motion.div>
    </div>
  );
}
