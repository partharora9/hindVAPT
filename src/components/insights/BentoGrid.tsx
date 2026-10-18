"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { InsightCard } from "./InsightCard";
import { ControlCoverageStack } from "./ControlCoverageStack";
import { StatisticsChart } from "./StatisticsChart";
import { ThreatBarChart } from "./ThreatBarChart";
import { LiveFeed } from "./LiveFeed";
import { CoverageGauge } from "./CoverageGauge";
import { INSIGHTS_DATA } from "./bentoData";

interface BentoGridProps {
  isInView?: boolean;
}

export function BentoGrid({ isInView = true }: BentoGridProps) {
  const row2Ref = useRef<HTMLDivElement>(null);
  const row2InView = useInView(row2Ref, { amount: 0.2, once: true });

  const cardA = INSIGHTS_DATA[0];
  const cardB = INSIGHTS_DATA[1];
  const cardC = INSIGHTS_DATA[2];
  const cardD = INSIGHTS_DATA[3];
  const cardE = INSIGHTS_DATA[4];

  return (
    <div className="relative w-full max-w-[1540px] mx-auto flex flex-col gap-5 select-none">
      {/* DESKTOP (>=1024px): Row 1 (2 cards) and Row 2 (3 cards) - EXACT DESKTOP LOOK */}
      <div className="hidden lg:flex lg:flex-col gap-5 w-full">
        {/* ROW 1 (2 CARDS) */}
        <div className="grid grid-cols-2 gap-5 w-full">
          <InsightCard card={cardA} index={0} isInView={isInView}>
            <ControlCoverageStack isInView={isInView} />
          </InsightCard>
          <InsightCard card={cardB} index={1} isInView={isInView}>
            <StatisticsChart isInView={isInView} />
          </InsightCard>
        </div>

        {/* ROW 2 (3 CARDS) */}
        <div ref={row2Ref} className="grid grid-cols-3 gap-5 w-full">
          <InsightCard card={cardC} index={2} isInView={row2InView || isInView}>
            <ThreatBarChart isInView={row2InView || isInView} />
          </InsightCard>
          <InsightCard card={cardD} index={3} isInView={row2InView || isInView}>
            <LiveFeed isInView={row2InView || isInView} />
          </InsightCard>
          <InsightCard card={cardE} index={4} isInView={row2InView || isInView}>
            <CoverageGauge isInView={row2InView || isInView} />
          </InsightCard>
        </div>
      </div>

      {/* MOBILE & TABLET (<1024px): 2 columns at <1024px (the 5th card spans both) → 1 column at <640px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5 w-full">
        <div className="w-full">
          <InsightCard card={cardA} index={0} isInView={isInView}>
            <ControlCoverageStack isInView={isInView} />
          </InsightCard>
        </div>
        <div className="w-full">
          <InsightCard card={cardB} index={1} isInView={isInView}>
            <StatisticsChart isInView={isInView} />
          </InsightCard>
        </div>
        <div className="w-full">
          <InsightCard card={cardC} index={2} isInView={row2InView || isInView}>
            <ThreatBarChart isInView={row2InView || isInView} />
          </InsightCard>
        </div>
        <div className="w-full">
          <InsightCard card={cardD} index={3} isInView={row2InView || isInView}>
            <LiveFeed isInView={row2InView || isInView} />
          </InsightCard>
        </div>
        {/* 5th Card spans both columns on 2-col tablet layout */}
        <div className="sm:col-span-2 w-full">
          <InsightCard card={cardE} index={4} isInView={row2InView || isInView}>
            <CoverageGauge isInView={row2InView || isInView} />
          </InsightCard>
        </div>
      </div>
    </div>
  );
}
