"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { CompanyLogo } from "./CompanyLogo";
import { ProgressBar } from "./ProgressBar";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";
import type { TestimonialItem } from "./testimonialsData";

interface QuoteCardProps {
  testimonial: TestimonialItem;
  progress: number;
  direction?: number;
  isInView?: boolean;
}

export function QuoteCard({
  testimonial,
  progress,
  direction = 1,
  isInView = true,
}: QuoteCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight coordinates following cursor
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const springX = useSpring(rawX, { damping: 28, stiffness: 220 });
  const springY = useSpring(rawY, { damping: 28, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawX.set(-300);
    rawY.set(-300);
  };

  // Text scramble on quote transition
  const decodedQuote = useScramble(testimonial.quote, {
    durationMs: 750,
    delayMs: 100,
    autoStart: isInView,
  });

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[644px] max-lg:h-auto min-h-[380px] h-[520px] sm:h-[600px] lg:h-[640px] bg-[#030818] border border-[rgba(30,155,255,0.18)] p-6 sm:p-11 lg:p-12 flex flex-col justify-between isolate select-none overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.7)]"
      role="blockquote"
    >
      {/* 1. Corner Brackets (Top-Left and Top-Right ONLY as in reference) */}
      {/* Top-Left Bracket */}
      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none z-30">
        <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
          <path d="M 0 12 L 0 0 L 12 0" stroke="#1E9BFF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Top-Right Bracket */}
      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none z-30">
        <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
          <path d="M 16 12 L 16 0 L 4 0" stroke="#1E9BFF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Development Placeholder Ribbon */}
      {!testimonial.isVerified && process.env.NODE_ENV !== "production" && (
        <div className="absolute top-3 right-8 z-30">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#EAB308] bg-[#EAB308]/15 border border-[#EAB308]/40 px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">
            PLACEHOLDER · PENDING CLIENT SIGN-OFF
          </span>
        </div>
      )}

      {/* 2. Diagonal Radial Glow from Top-Left and Faint Bottom-Right Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, rgba(30, 155, 255, 0.28) 0%, rgba(30, 155, 255, 0.08) 35%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(30, 155, 255, 0.10) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Cursor Spotlight (~320px soft radial) */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[320px] h-[320px] rounded-full pointer-events-none z-0 hidden md:block"
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

      {/* 4. Top: Company Logo */}
      <div className="relative z-10">
        <CompanyLogo testimonial={testimonial} isInView={isInView} />
      </div>

      {/* 5. Center: Quote Text */}
      <div className="relative z-10 my-auto pt-6 sm:pt-8 pb-4">
        <motion.p
          key={testimonial.id}
          initial={
            shouldReduceMotion
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(6px)", y: direction > 0 ? 12 : -12 }
          }
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: EASINGS.cyber,
          }}
          className="font-mono text-[18px] sm:text-[21px] lg:text-[24px] font-medium text-[#C3D4FF] leading-[28px] sm:leading-[34px] lg:leading-[38px] text-left max-w-[530px]"
        >
          &ldquo;{decodedQuote}&rdquo;
        </motion.p>
      </div>

      {/* 6. Bottom: Progress Bar & Author Block */}
      <div className="relative z-10 flex flex-col gap-4 mt-auto">
        {/* Progress Bar (~281×8px) */}
        <ProgressBar progress={progress} />

        {/* Author Block */}
        <motion.div
          key={`author-${testimonial.id}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col text-left"
        >
          <span className="font-mono text-[17px] sm:text-[18px] font-bold text-white tracking-wide">
            {testimonial.authorName}
          </span>
          <span className="font-mono text-[14px] sm:text-[15px] text-[#8FA3C7] tracking-normal mt-0.5">
            {testimonial.authorRole}
          </span>
        </motion.div>
      </div>
    </article>
  );
}
