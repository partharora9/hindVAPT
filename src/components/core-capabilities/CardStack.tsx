"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { FeatureCard, CapabilityCardData } from "./FeatureCard";
import { StepIndicator } from "./StepIndicator";

export const CAPABILITY_CARDS: CapabilityCardData[] = [
  {
    id: "card-detection",
    badgeType: "browser-shield",
    titleLines: ["REAL-TIME THREAT", "DETECTION"],
    paragraph:
      "Monitor every packet, every request, every login across your entire infrastructure. Our AI engine correlates events surface real threats — not noise.",
    bullets: [
      "Sub-200ms detection and response",
      "99.9% accuracy — near-zero false positives",
      "Unified visibility across cloud, endpoint and network",
    ],
    mockType: "detection",
  },
  {
    id: "card-response",
    badgeType: "lightning-shield",
    titleLines: ["AUTOMATED INCIDENT", "RESPONSE"],
    paragraph:
      "Execute autonomous containment playbooks in milliseconds. Neutralize compromised credentials, isolate breached workloads, and roll back malicious actions with zero human delay.",
    bullets: [
      "Sub-second autonomous containment",
      "Custom trigger-action playbook chains",
      "One-click cryptographic state rollback",
    ],
    mockType: "response",
  },
  {
    id: "card-exposure",
    badgeType: "network-shield",
    titleLines: ["UNIFIED ATTACK", "SURFACE"],
    paragraph:
      "Continuous graph mapping of your external perimeter, cloud workloads, and third-party SaaS connections. Pinpoint toxic combinations and critical attack paths before adversaries exploit them.",
    bullets: [
      "Real-time shadow asset discovery",
      "Contextual exposure risk scoring",
      "Continuous compliance & MITRE mapping",
    ],
    mockType: "exposure",
  },
];

const NAV_HEIGHT = 88;

interface PerCardItemProps {
  card: CapabilityCardData;
  index: number;
  total: number;
  navHeight: number;
  peek: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
  isActive: boolean;
}

function PerCardItem({
  card,
  index,
  total,
  navHeight,
  peek,
  scrollYProgress,
  shouldReduceMotion,
  isActive,
}: PerCardItemProps) {
  const isLast = index === total - 1;
  const start = index / total;
  const scaleTarget = 1 - (total - 1 - index) * 0.05;
  const brightnessTarget = 1 - (total - 1 - index) * 0.18;

  // Scale: for index i, [start, 1] -> [1, scaleTarget]. Progress before start stays 1.
  const scale = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [0, start, 1],
    index === 0 ? [1, scaleTarget] : [1, 1, scaleTarget]
  );

  // Brightness: [start, 1] -> [1, brightnessTarget]. Progress before start stays 1.
  const brightness = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [0, start, 1],
    index === 0 ? [1, brightnessTarget] : [1, 1, brightnessTarget]
  );

  const filter = useTransform(brightness, (b) =>
    isLast ? "none" : `brightness(${b})`
  );

  return (
    <div
      className="sticky flex items-start justify-center"
      style={{
        top: navHeight,
        height: `calc(100vh - ${navHeight}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="relative w-full origin-top"
        style={{
          top: index * peek,
          scale: shouldReduceMotion || isLast ? 1 : scale,
          filter: shouldReduceMotion || isLast ? "none" : filter,
          zIndex: index + 1,
          height: `calc(100vh - ${navHeight}px - ${total * peek}px - 24px)`,
          minHeight: 580,
          maxHeight: 740,
        }}
      >
        {/* Soft shadow on overlapping cards */}
        <div
          className={`w-full h-full ${
            index > 0 ? "shadow-[0_-24px_50px_rgba(0,0,0,0.45)]" : ""
          }`}
        >
          <FeatureCard
            card={card}
            index={index}
            isInView={true}
            isActive={isActive}
          />
        </div>
      </motion.div>
    </div>
  );
}

interface CardStackProps {
  isInView?: boolean;
}

export function CardStack({ isInView = true }: CardStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [peekOffset, setPeekOffset] = useState(24);

  // Responsive peek: 16px on 768-1023px tablet, 24px on >=1024px desktop
  useEffect(() => {
    const handleResize = () => {
      setPeekOffset(window.innerWidth < 1024 ? 16 : 24);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure scroll progress over the natural sum of the sticky card wrappers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active card for step indicator & content loop throttling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveStep(0);
      } else if (latest < 0.7) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Jump to specific card when step dot is clicked
  const handleStepClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const screenHeight = window.innerHeight - NAV_HEIGHT;
    const targetY = containerTop + index * screenHeight;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* 1. MOBILE (<768px): Normal vertical flow with 24px gaps */}
      <div className="block md:hidden w-full max-w-[1496px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6 w-full">
          {CAPABILITY_CARDS.map((card, i) => (
            <div key={card.id} className="w-full min-h-[580px]">
              <FeatureCard
                card={card}
                index={i}
                isInView={true}
                isActive={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. DESKTOP & TABLET (≥768px): Per-Card Sticky Stack in Natural Document Flow */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full max-w-[1496px] mx-auto px-4 sm:px-8 lg:px-12 pb-24 select-none"
      >
        {/* Card wrappers in normal flow, one screen tall each */}
        {CAPABILITY_CARDS.map((card, i) => (
          <PerCardItem
            key={card.id}
            card={card}
            index={i}
            total={CAPABILITY_CARDS.length}
            navHeight={NAV_HEIGHT}
            peek={peekOffset}
            scrollYProgress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion ?? false}
            isActive={activeStep === i}
          />
        ))}

        {/* Vertical Step Indicator on the Right Edge */}
        <div className="hidden lg:block absolute -right-2 top-0 bottom-0 pointer-events-none">
          <div className="sticky top-[220px] pointer-events-auto pr-2">
            <StepIndicator
              activeIndex={activeStep}
              onStepClick={handleStepClick}
              isBottomLayout={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
