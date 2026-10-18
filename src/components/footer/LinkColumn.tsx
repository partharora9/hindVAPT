"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CornerBrackets } from "./CornerBrackets";
import type { FooterLinkItem } from "./footerData";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface LinkColumnProps {
  title: string;
  tagWidth?: string;
  links: FooterLinkItem[];
  isInView?: boolean;
  columnDelay?: number;
}

export function LinkColumn({
  title,
  tagWidth = "w-[135px]",
  links,
  isInView = true,
  columnDelay = 0.4,
}: LinkColumnProps) {
  const shouldReduceMotion = useReducedMotion();
  const [tagHovered, setTagHovered] = useState(false);
  const [tagDecodeKey, setTagDecodeKey] = useState(0);

  const tagText = useScramble(title, {
    durationMs: 500,
    delayMs: (columnDelay + 0.1) * 1000,
    autoStart: isInView,
  });

  const handleTagMouseEnter = () => {
    setTagHovered(true);
    setTagDecodeKey((k) => k + 1);
  };

  const handleTagMouseLeave = () => {
    setTagHovered(false);
  };

  return (
    <nav
      aria-label={title}
      className="flex flex-col w-full max-w-[250px] select-none"
    >
      {/* 1. LABEL TAG ("Main pages" ~135x40px or "Utility pages" ~166x40px) */}
      <motion.div
        onMouseEnter={handleTagMouseEnter}
        onMouseLeave={handleTagMouseLeave}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.6, delay: columnDelay, ease: EASINGS.cyber }}
        className={`relative flex items-center justify-center h-[40px] ${tagWidth} bg-[#0E1424] cursor-default transition-colors duration-200`}
      >
        <CornerBrackets
          size={7}
          strokeWidth={1}
          color="rgba(195, 212, 255, 0.45)"
          activeColor="#1E9BFF"
          isHovered={tagHovered}
          expandOffset={3}
          drawIn={isInView}
          delay={columnDelay}
          pulseInterval={5000}
        />
        <span className="text-[16px] font-mono tracking-[0.05em] text-[#C3D4FF] font-medium transition-colors duration-200">
          <TagDecodeText text={title} trigger={tagDecodeKey} defaultText={tagText} />
        </span>
      </motion.div>

      {/* 2. LINKS LIST (first link ~25px below tag, row pitch ≈ 46px) */}
      <ul className="mt-[25px] flex flex-col list-none p-0 m-0">
        {links.map((link, idx) => {
          const itemDelay = columnDelay + 0.15 + idx * 0.06;
          return (
            <li key={link.label} className="h-[46px] flex items-center">
              <FooterLink
                link={link}
                isInView={isInView}
                delay={itemDelay}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function TagDecodeText({
  text,
  trigger,
  defaultText,
}: {
  text: string;
  trigger: number;
  defaultText: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [currentText, setCurrentText] = useState(defaultText || text);

  React.useEffect(() => {
    if (trigger === 0 || shouldReduceMotion) {
      setCurrentText(defaultText || text);
      return;
    }

    let startTime: number | null = null;
    const duration = 300;
    const charset = "01#@%&ΔΩΣ";
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const resolved = Math.floor(progress * text.length);

      let scrambled = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
        } else if (i < resolved) {
          scrambled += text[i];
        } else {
          scrambled += charset[Math.floor(Math.random() * charset.length)];
        }
      }
      setCurrentText(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCurrentText(text);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, text, defaultText, shouldReduceMotion]);

  return <>{currentText || text}</>;
}

interface FooterLinkProps {
  link: FooterLinkItem;
  isInView: boolean;
  delay: number;
}

function FooterLink({ link, isInView, delay }: FooterLinkProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(link.label);

  const decodedLabel = useScramble(link.label, {
    durationMs: 400,
    delayMs: delay * 1000,
    autoStart: isInView,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shouldReduceMotion) return;

    // Quick 200ms flicker decode on hover
    let startTime: number | null = null;
    const duration = 200;
    const charset = "01#_~*";
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const resolved = Math.floor(progress * link.label.length);

      let scrambled = "";
      for (let i = 0; i < link.label.length; i++) {
        if (link.label[i] === " ") {
          scrambled += " ";
        } else if (i < resolved) {
          scrambled += link.label[i];
        } else {
          scrambled += charset[Math.floor(Math.random() * charset.length)];
        }
      }
      setDisplayText(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(link.label);
      }
    };

    frameId = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDisplayText(link.label);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, delay, ease: EASINGS.cyber }}
      className="relative flex items-center"
    >
      <Link
        href={link.href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative inline-flex items-center text-[17px] font-mono text-[#D5E2FF] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] px-1 py-0.5"
      >
        {/* Caret '›' sliding in from left */}
        <motion.span
          animate={{
            x: isHovered && !shouldReduceMotion ? 0 : -6,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-3.5 text-[#1E9BFF] text-[16px] font-bold select-none pointer-events-none"
          aria-hidden="true"
        >
          ›
        </motion.span>

        {/* Text with 6px right spring shift & color shift */}
        <motion.span
          animate={{
            x: isHovered && !shouldReduceMotion ? 6 : 0,
            color: isHovered ? "#FFFFFF" : "#D5E2FF",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 25 }}
          className="tracking-normal select-none"
        >
          {isHovered ? displayText : decodedLabel || link.label}
        </motion.span>

        {/* 1px accent underline drawing from left on hover */}
        <motion.span
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-1 right-0 h-[1px] bg-[#1E9BFF] origin-left pointer-events-none"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}
