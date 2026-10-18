"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaqItem } from "./FaqItem";
import { DataLine } from "./DataLine";
import { FAQS_DATA } from "./faqData";

interface FaqAccordionProps {
  allowMultiple?: boolean;
  isInView?: boolean;
}

export function FaqAccordion({
  allowMultiple = false,
  isInView = true,
}: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Deep link support via URL hash on load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = FAQS_DATA.find((f) => f.id === hash);
      if (matched) {
        setOpenIds([matched.id]);
        setTimeout(() => {
          const el = document.getElementById(`${matched.id}-header`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const isAlreadyOpen = prev.includes(id);
      if (allowMultiple) {
        return isAlreadyOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isAlreadyOpen ? [] : [id];
    });
  };

  // Keyboard navigation across accordion items (ArrowUp, ArrowDown, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
    if (!buttons || buttons.length === 0) return;

    const currentFocusedIndex = Array.from(buttons).findIndex(
      (btn) => btn === document.activeElement
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentFocusedIndex + 1) % buttons.length;
      buttons[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentFocusedIndex - 1 + buttons.length) % buttons.length;
      buttons[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      buttons[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      buttons[buttons.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className="relative w-full max-w-[1150px] mx-auto flex flex-col select-none"
      role="region"
      aria-label="Frequently Asked Questions Accordion"
    >
      {/* 1. Left Vertical Data Line with traveling pulse */}
      <DataLine isInView={isInView} />

      {/* 2. The 6 Accordion Rows */}
      <div className="flex flex-col w-full">
        {FAQS_DATA.map((item, index) => {
          const isOpen = openIds.includes(item.id);

          return (
            <FaqItem
              key={item.id}
              item={item}
              index={index}
              isOpen={isOpen}
              onToggle={() => handleToggle(item.id)}
              isInView={isInView}
            />
          );
        })}
      </div>
    </div>
  );
}
