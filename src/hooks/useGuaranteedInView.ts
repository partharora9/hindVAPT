"use client";

import { useState, useEffect, type RefObject } from "react";
import { useInView } from "framer-motion";

interface GuaranteedInViewOptions {
  amount?: number | "some" | "all";
  fallbackMs?: number;
}

export function useGuaranteedInView(
  ref: RefObject<HTMLElement | null>,
  options?: GuaranteedInViewOptions
): boolean {
  const amount = options?.amount ?? 0.2;
  const fallbackMs = options?.fallbackMs ?? 1200;

  const inView = useInView(ref, { amount, once: true });
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (inView) return;

    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, fallbackMs);

    return () => clearTimeout(timer);
  }, [inView, fallbackMs]);

  return inView || hasTimedOut;
}
