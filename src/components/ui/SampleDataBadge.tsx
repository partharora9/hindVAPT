import React from "react";

interface SampleDataBadgeProps {
  className?: string;
}

export function SampleDataBadge({ className = "" }: SampleDataBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[10px] sm:text-[11px] font-mono tracking-[0.12em] text-[#6B7FA8] bg-[rgba(107,127,168,0.12)] border border-[rgba(107,127,168,0.25)] uppercase select-none ${className}`}
      aria-label="Sample illustrative data only"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7FA8]/80" aria-hidden="true" />
      Sample data
    </span>
  );
}
