"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PortraitPanel } from "./PortraitPanel";
import { QuoteCard } from "./QuoteCard";
import { SideNav } from "./SideNav";
import { TESTIMONIALS_DATA, type TestimonialItem } from "./testimonialsData";

interface TestimonialCarouselProps {
  isInView?: boolean;
  items?: TestimonialItem[];
}

export function TestimonialCarousel({
  isInView = true,
  items = TESTIMONIALS_DATA,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_DURATION_MS = 7000;
  const UPDATE_INTERVAL_MS = 50;

  const count = items.length;

  const handleNext = useCallback(() => {
    if (count <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % count);
    setProgress(0);
  }, [count]);

  const handlePrev = useCallback(() => {
    if (count <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
    setProgress(0);
  }, [count]);

  // Autoplay timer with pause on hover/tab hidden
  useEffect(() => {
    if (!isInView || isHovered || count <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + UPDATE_INTERVAL_MS / AUTOPLAY_DURATION_MS;
        if (next >= 1) {
          handleNext();
          return 0;
        }
        return next;
      });
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isInView, isHovered, handleNext, count]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (count === 0) return null;

  const currentTestimonial = items[currentIndex % count];

  return (
    <div
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer Testimonials Carousel"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[1540px] mx-auto select-none outline-none focus-visible:ring-1 focus-visible:ring-[#1E9BFF]/50"
    >
      {/* 3-Column Main Row Layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-8 w-full">
        {/* Column 1: Portrait Photo */}
        <div className="w-full lg:w-[524px] shrink-0 flex justify-center">
          <PortraitPanel
            testimonial={currentTestimonial}
            direction={direction}
            isInView={isInView}
          />
        </div>

        {/* Column 2: Quote Card */}
        <div className="w-full lg:w-[644px] flex-1 flex justify-center">
          <QuoteCard
            testimonial={currentTestimonial}
            progress={progress}
            direction={direction}
            isInView={isInView}
          />
        </div>

        {/* Column 3: Side Navigation Column */}
        <div className="w-full lg:w-[250px] shrink-0 flex justify-center">
          <SideNav
            onPrev={handlePrev}
            onNext={handleNext}
            isInView={isInView}
          />
        </div>
      </div>
    </div>
  );
}
