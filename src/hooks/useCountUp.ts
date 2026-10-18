"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface CountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  enableLiveTick?: boolean;
  tickIntervalSeconds?: number;
  autoStart?: boolean;
}

export function useCountUp({
  from = 0,
  to,
  duration = 2.0,
  delay = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  enableLiveTick = true,
  tickIntervalSeconds = 6,
  autoStart = true,
}: CountUpOptions): { value: number; formatted: string; isTicking: boolean } {
  const shouldReduceMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState<number>(shouldReduceMotion ? to : from);
  const [isTicking, setIsTicking] = useState<boolean>(false);
  const isCompleteRef = useRef<boolean>(shouldReduceMotion ?? false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentValue(to);
      isCompleteRef.current = true;
      return;
    }

    if (!autoStart) return;

    let timeoutId: NodeJS.Timeout;
    let controls: { stop: () => void } | null = null;

    timeoutId = setTimeout(() => {
      controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo equivalent
        onUpdate: (latest) => {
          setCurrentValue(latest);
        },
        onComplete: () => {
          setCurrentValue(to);
          isCompleteRef.current = true;
        },
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (controls) controls.stop();
    };
  }, [from, to, duration, delay, shouldReduceMotion]);

  // Subtle live tick flicker every ~6 seconds after count up completes
  useEffect(() => {
    if (!enableLiveTick || shouldReduceMotion) return;

    const interval = setInterval(() => {
      if (!isCompleteRef.current) return;

      setIsTicking(true);
      // Small micro tick effect
      const timer = setTimeout(() => {
        setIsTicking(false);
      }, 400);

      return () => clearTimeout(timer);
    }, tickIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [enableLiveTick, tickIntervalSeconds, shouldReduceMotion]);

  const formattedNumber = decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue).toString();
  const formatted = `${prefix}${formattedNumber}${suffix}`;

  return { value: currentValue, formatted, isTicking };
}
