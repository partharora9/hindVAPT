"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FooterBackground } from "./footer/FooterBackground";
import { GlyphField } from "./footer/GlyphField";
import { BrandColumn } from "./footer/BrandColumn";
import { LinkColumn } from "./footer/LinkColumn";
import { NewsletterForm } from "./footer/NewsletterForm";
import { BottomBar } from "./footer/BottomBar";
import { MAIN_PAGES_LINKS, UTILITY_PAGES_LINKS } from "./footer/footerData";
import { FloatingBadgeCard } from "./FloatingBadgeCard";

export interface FooterProps {
  id?: string;
  showFloatingBadge?: boolean;
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
}

export function Footer({
  id = "footer",
  showFloatingBadge = false,
  onSubscribe,
  className = "",
}: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance trigger at 20% in view (once)
  const inViewTrigger = useInView(footerRef, { amount: 0.2, once: true });
  const [hasEntered, setHasEntered] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(showFloatingBadge);

  // Fallback: Ensure everything becomes visible after 1.2s even if observer doesn't trigger
  useEffect(() => {
    if (inViewTrigger) {
      setHasEntered(true);
      return;
    }
    const fallbackTimer = setTimeout(() => {
      setHasEntered(true);
    }, 1200);

    return () => clearTimeout(fallbackTimer);
  }, [inViewTrigger]);

  const isInView = inViewTrigger || hasEntered;

  // Scroll parallax: canvas and content move with subtle ~12px relative shift
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const canvasParallaxY = useTransform(scrollYProgress, [0, 1], [6, -6]);

  return (
    <footer
      ref={footerRef}
      id={id}
      className={`relative w-full min-h-[748px] bg-gradient-to-b from-[#020617] via-[#020617] to-[#030818] overflow-hidden select-none ${className}`}
      aria-label="Site Footer"
    >
      {/* 1. SEAMLESS BACKGROUND GLOWS (Top glow band + Breathing bottom radial glow) */}
      <FooterBackground isInView={isInView} />

      {/* 2. GLYPH FIELD (Canvas 2D cipher matrix covering lower ~70%) */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : canvasParallaxY }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <GlyphField containerRef={footerRef} />
      </motion.div>

      {/* 3. MAIN CONTENT LAYER (z-10, sits cleanly above canvas, starts ~125px below top) */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : contentParallaxY }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-[57px] pt-[100px] sm:pt-[125px] flex flex-col justify-between"
      >
        {/* 4-COLUMN RESPONSIVE GRID (x ≈ 57 / 697 / 946 / 1195) */}
        {/* Desktop (>=1280px): 4 columns */}
        {/* Tablet (768-1023px): 2 rows (Brand + Newsletter / Main + Utility) */}
        {/* Mobile (<768px): single column stack */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(320px,560px)_250px_250px_360px] gap-12 sm:gap-14 lg:gap-8 xl:gap-0 justify-between items-start">
          {/* Column 1: Brand (~560px) */}
          <div className="xl:w-[560px] xl:pr-12">
            <BrandColumn isInView={isInView} />
          </div>

          {/* Tablet Row 1 Right: Newsletter (on md: shown on top row right; on xl: moved to Col 4) */}
          <div className="block xl:hidden md:order-2">
            <NewsletterForm isInView={isInView} onSubscribe={onSubscribe} />
          </div>

          {/* Column 2: Main pages (~250px) */}
          <div className="md:order-3 xl:order-2 xl:w-[250px] xl:pl-3">
            <LinkColumn
              title="Main pages"
              tagWidth="w-[135px]"
              links={MAIN_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.4}
            />
          </div>

          {/* Column 3: Utility pages (~250px) */}
          <div className="md:order-4 xl:order-3 xl:w-[250px] xl:pl-3">
            <LinkColumn
              title="Utility pages"
              tagWidth="w-[166px]"
              links={UTILITY_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.48}
            />
          </div>

          {/* Column 4: Newsletter (~360px, right-aligned, desktop only position) */}
          <div className="hidden xl:flex xl:order-4 xl:w-[360px] justify-end">
            <NewsletterForm isInView={isInView} onSubscribe={onSubscribe} />
          </div>
        </div>

        {/* 4. BOTTOM BAR (~40px above bottom edge) */}
        <div className="w-full mt-16 sm:mt-24 lg:mt-28 border-t border-[rgba(30,155,255,0.08)]">
          <BottomBar isInView={isInView} />
        </div>
      </motion.div>

      {/* 5. OPTIONAL FLOATING BADGE CARD (Default OFF) */}
      <FloatingBadgeCard
        isVisible={badgeVisible}
        onClose={() => setBadgeVisible(false)}
      />
    </footer>
  );
}

export default Footer;
