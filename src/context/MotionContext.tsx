"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export type PerformanceTier = "high" | "medium" | "low";

interface MotionContextValue {
  reduced: boolean;
  tier: PerformanceTier;
  isTouch: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  reduced: false,
  tier: "high",
  isTouch: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [tier, setTier] = useState<PerformanceTier>("high");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch / fine pointer
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(touchQuery.matches);

    // Compute tier
    const computeTier = (): PerformanceTier => {
      // 1. Reduced motion forces low tier
      if (shouldReduceMotion) return "low";

      // 2. Save-data connection forces low tier
      const nav = navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
        deviceMemory?: number;
      };

      if (nav.connection?.saveData) return "low";

      // 3. Hardware concurrency check
      const cores = navigator.hardwareConcurrency || 8;
      if (cores <= 2) return "low";

      // 4. Device memory check (in GB)
      const mem = nav.deviceMemory || 8;
      if (mem <= 2) return "low";

      // 5. Mobile / Tablet width (<768px = medium at most)
      const width = window.innerWidth;
      if (width < 768) return "medium";

      if (cores <= 4 || mem <= 4) return "medium";

      return "high";
    };

    setTier(computeTier());

    const handleResize = () => {
      setTier(computeTier());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [shouldReduceMotion]);

  const value = useMemo(
    () => ({
      reduced: Boolean(shouldReduceMotion),
      tier,
      isTouch,
    }),
    [shouldReduceMotion, tier, isTouch]
  );

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionGovernance(): MotionContextValue {
  return useContext(MotionContext);
}
