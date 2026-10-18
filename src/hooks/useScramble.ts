"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface ScrambleOptions {
  durationMs?: number;
  delayMs?: number;
  charset?: string;
  autoStart?: boolean;
}

const DEFAULT_CHARSET = "010101_#@<>/*[]%!=+~&^$#";

export function useScramble(
  targetText: string,
  options: ScrambleOptions = {}
): string {
  const {
    durationMs = 700,
    delayMs = 0,
    charset = DEFAULT_CHARSET,
    autoStart = true,
  } = options;

  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState<string>(
    shouldReduceMotion ? targetText : ""
  );
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (!autoStart) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const resolvedCount = Math.floor(progress * targetText.length);

      let result = "";
      for (let i = 0; i < targetText.length; i++) {
        const char = targetText[i];
        if (char === " " || char === "\n") {
          result += char;
        } else if (i < resolvedCount) {
          result += char;
        } else {
          result += charset[Math.floor(Math.random() * charset.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
      }
    };

    const timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetText, durationMs, delayMs, charset, autoStart, shouldReduceMotion]);

  return displayText;
}
