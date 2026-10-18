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
      {/* ================= ROW 1 (2 CARDS, ~739px wide each, ~560px tall) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* Card A: AI-POWERED FIXING ISSUES */}
        <InsightCard card={cardA} index={0} isInView={isInView}>
          <ControlCoverageStack isInView={isInView} />
        </InsightCard>

        {/* Card B: THREATS BLOCKED */}
        <InsightCard card={cardB} index={1} isInView={isInView}>
          <StatisticsChart isInView={isInView} />
        </InsightCard>
      </div>

      {/* ================= ROW 2 (3 CARDS, ~486px wide each, ~723px tall) ================= */}
      <div
        ref={row2Ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
      >
        {/* Card C: THREAT CATEGORIES */}
        <InsightCard card={cardC} index={2} isInView={row2InView || isInView}>
          <ThreatBarChart isInView={row2InView || isInView} />
        </InsightCard>

        {/* Card D: LIVE THREAD FEED */}
        <InsightCard card={cardD} index={3} isInView={row2InView || isInView}>
          <LiveFeed isInView={row2InView || isInView} />
        </InsightCard>

        {/* Card E: CONTROL COVERAGE (Spans 2 columns on tablet md:col-span-2 lg:col-span-1) */}
        <div className="md:col-span-2 lg:col-span-1 w-full">
          <InsightCard card={cardE} index={4} isInView={row2InView || isInView}>
            <CoverageGauge isInView={row2InView || isInView} />
          </InsightCard>
        </div>
      </div>
    </div>
  );
}
