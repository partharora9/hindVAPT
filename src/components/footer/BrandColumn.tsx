"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { CornerBrackets } from "./CornerBrackets";
import { SOCIAL_LINKS, type FooterSocialItem } from "./footerData";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface BrandColumnProps {
  isInView?: boolean;
}

export function BrandColumn({ isInView = true }: BrandColumnProps) {
  const shouldReduceMotion = useReducedMotion();

  // Tagline 3-line scramble decodes
  const line1 = useScramble("we help businesses stay", {
    durationMs: 650,
    delayMs: 200,
    autoStart: isInView,
  });

  const line2 = useScramble("protected in an increasingly", {
    durationMs: 750,
    delayMs: 350,
    autoStart: isInView,
  });

  const line3 = useScramble("connected world.", {
    durationMs: 600,
    delayMs: 500,
    autoStart: isInView,
  });

  return (
    <div className="flex flex-col w-full max-w-[560px]">
      {/* 1. LOGO ROW: 4-point sparkle (~36px) + "VAULTIX" (~22px, tracking ~0.25em, white) */}
      <Link
        href="/"
        className="group inline-flex items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none w-fit"
        aria-label="VAULTIX - Home"
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1, rotate: 0 }
              : { opacity: 0, rotate: -90, scale: 0.8 }
          }
          animate={
            isInView || shouldReduceMotion
              ? { opacity: 1, rotate: 0, scale: 1 }
              : { opacity: 0, rotate: -90, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.cyber }}
          className="relative flex items-center justify-center w-9 h-9"
        >
          {/* Continuous sparkle pulse */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.08, 1],
                    filter: [
                      "drop-shadow(0 0 8px rgba(30,155,255,0.75))",
                      "drop-shadow(0 0 16px rgba(30,155,255,0.95))",
                      "drop-shadow(0 0 8px rgba(30,155,255,0.75))",
                    ],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#1E9BFF]"
              aria-hidden="true"
            >
              <path
                d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
                fill="currentColor"
              />
            </svg>
            {/* Center white core dot */}
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#FFFFFF]" />
          </motion.div>
        </motion.div>

        {/* VAULTIX Letter Stagger */}
        <motion.span
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASINGS.cyber }}
          className="text-[22px] font-mono font-bold tracking-[0.25em] text-white select-none transition-colors duration-200 group-hover:text-[#1E9BFF]"
        >
          VAULTIX
        </motion.span>
      </Link>

      {/* 2. TAGLINE (~70px below logo row top, 3 lines, lowercase, color #8FA3C7, line-height 30px, max-w ~360px) */}
      <div className="mt-8 sm:mt-[38px] max-w-[360px] select-none">
        <p className="text-[19px] sm:text-[20px] leading-[30px] font-mono text-[#8FA3C7] lowercase tracking-normal">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASINGS.cyber }}
            className="block"
          >
            {line1 || "we help businesses stay"}
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6, delay: 0.38, ease: EASINGS.cyber }}
            className="block"
          >
            {line2 || "protected in an increasingly"}
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6, delay: 0.52, ease: EASINGS.cyber }}
            className="block"
          >
            {line3 || "connected world."}
          </motion.span>
        </p>
      </div>

      {/* 3. SOCIAL BUTTONS (~45px below tagline, 60x60 squares, 15px gap, dark fill #0A1020, corner brackets) */}
      <div className="mt-10 sm:mt-[45px] flex items-center gap-[15px]">
        {SOCIAL_LINKS.map((item, index) => (
          <SocialButton
            key={item.id}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

interface SocialButtonProps {
  item: FooterSocialItem;
  index: number;
  isInView: boolean;
}

function SocialButton({ item, index, isInView }: SocialButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  // Magnetic cursor tracking within ±8px
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    mouseX.set(Math.max(-8, Math.min(8, deltaX)));
    mouseY.set(Math.max(-8, Math.min(8, deltaY)));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const delay = 0.5 + index * 0.09;

  return (
    <motion.a
      ref={buttonRef}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-[60px] h-[60px] transition-colors duration-250 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none select-none"
      style={{
        backgroundColor: isHovered ? "rgba(30, 155, 255, 0.12)" : "#0A1020",
        x: shouldReduceMotion ? 0 : smoothX,
        y: shouldReduceMotion ? 0 : smoothY,
      }}
    >
      {/* 4 L-shaped Corner Brackets with hover expansion & draw-in */}
      <CornerBrackets
        size={8}
        strokeWidth={1}
        color="rgba(195, 212, 255, 0.4)"
        activeColor="#1E9BFF"
        isHovered={isHovered}
        expandOffset={4}
        drawIn={isInView}
        delay={delay}
        pulseInterval={4500 + index * 1200}
      />

      {/* Icon with scale 1.12 & accent glow on hover */}
      <motion.div
        animate={{
          scale: isHovered && !shouldReduceMotion ? 1.12 : 1,
          color: isHovered ? "#1E9BFF" : "#FFFFFF",
          filter: isHovered
            ? "drop-shadow(0 0 8px rgba(30,155,255,0.8))"
            : "drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-[28px] h-[28px] flex items-center justify-center pointer-events-none"
      >
        {item.icon === "facebook" && (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[26px] h-[26px]"
            aria-hidden="true"
          >
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.7-1.5 1.7-1.5H17.5V2.3c-.68-.09-1.88-.3-3.2-.3-3.1 0-5.3 1.88-5.3 5.4v2.1H6v4h3v9.5h5v-9.5z" />
          </svg>
        )}

        {item.icon === "instagram" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[26px] h-[26px]"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
          </svg>
        )}

        {item.icon === "linkedin" && (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[26px] h-[26px]"
            aria-hidden="true"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        )}
      </motion.div>
    </motion.a>
  );
}
