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

export interface FooterProps {
  id?: string;
  showFloatingBadge?: boolean;
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
}

export function Footer({
  id = "footer",
  onSubscribe,
  className = "",
}: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance trigger at 20% in view (once)
  const inViewTrigger = useInView(footerRef, { amount: 0.2, once: true });
  const [hasEntered, setHasEntered] = useState(false);

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
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-[57px] pt-[80px] sm:pt-[100px] lg:pt-[125px] flex flex-col justify-between"
      >
        {/* RESPONSIVE LAYOUTS: */}
        {/* A. DESKTOP (>=1024px / lg / xl): 4 columns */}
        <div className="w-full hidden lg:grid lg:grid-cols-4 xl:grid-cols-[minmax(320px,560px)_250px_250px_360px] gap-8 xl:gap-0 justify-between items-start">
          {/* Column 1: Brand (~560px) */}
          <div className="xl:w-[560px] xl:pr-12">
            <BrandColumn isInView={isInView} />
          </div>

          {/* Column 2: Main pages (~250px) */}
          <div className="xl:w-[250px] xl:pl-3">
            <LinkColumn
              title="Main pages"
              tagWidth="w-[135px]"
              links={MAIN_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.4}
            />
          </div>

          {/* Column 3: Utility pages (~250px) */}
          <div className="xl:w-[250px] xl:pl-3">
            <LinkColumn
              title="Utility pages"
              tagWidth="w-[166px]"
              links={UTILITY_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.48}
            />
          </div>

          {/* Column 4: Newsletter (~360px, right-aligned) */}
          <div className="flex xl:w-[360px] justify-end">
            <NewsletterForm isInView={isInView} onSubscribe={onSubscribe} />
          </div>
        </div>

        {/* B. TABLET (640px to 1023px): 2 columns (Brand + Newsletter, then Link columns) */}
        <div className="w-full hidden sm:max-lg:grid sm:max-lg:grid-cols-2 gap-10 sm:gap-12 justify-between items-start">
          {/* Row 1 Left: Brand */}
          <div className="w-full">
            <BrandColumn isInView={isInView} />
          </div>

          {/* Row 1 Right: Newsletter */}
          <div className="w-full">
            <NewsletterForm isInView={isInView} onSubscribe={onSubscribe} />
          </div>

          {/* Row 2 Left: Main pages */}
          <div className="w-full">
            <LinkColumn
              title="Main pages"
              tagWidth="w-[135px]"
              links={MAIN_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.4}
            />
          </div>

          {/* Row 2 Right: Utility pages */}
          <div className="w-full">
            <LinkColumn
              title="Utility pages"
              tagWidth="w-[166px]"
              links={UTILITY_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.48}
            />
          </div>
        </div>

        {/* C. MOBILE (<640px): Single column stack (brand, newsletter, two link columns side by side) */}
        <div className="w-full flex flex-col sm:hidden gap-10 items-start">
          {/* 1. Brand & social buttons */}
          <div className="w-full">
            <BrandColumn isInView={isInView} />
          </div>

          {/* 2. Newsletter (full width) */}
          <div className="w-full">
            <NewsletterForm isInView={isInView} onSubscribe={onSubscribe} />
          </div>

          {/* 3. Two link columns side by side */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <LinkColumn
              title="Main pages"
              tagWidth="w-[135px]"
              links={MAIN_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.4}
            />
            <LinkColumn
              title="Utility pages"
              tagWidth="w-[166px]"
              links={UTILITY_PAGES_LINKS}
              isInView={isInView}
              columnDelay={0.48}
            />
          </div>
        </div>

        {/* 4. BOTTOM BAR (~40px above bottom edge, centered on mobile) */}
        <div className="w-full mt-12 sm:mt-20 lg:mt-28 border-t border-[rgba(30,155,255,0.08)]">
          <BottomBar isInView={isInView} />
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
