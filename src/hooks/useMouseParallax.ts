"use client";

import { useEffect, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface MouseParallaxReturn {
  tracesX: MotionValue<number>;
  tracesY: MotionValue<number>;
  ringX: MotionValue<number>;
  ringY: MotionValue<number>;
  shieldX: MotionValue<number>;
  shieldY: MotionValue<number>;
  orbsX: MotionValue<number>;
  orbsY: MotionValue<number>;
  tiltRotateX: MotionValue<number>;
  tiltRotateY: MotionValue<number>;
  reflectionX: MotionValue<string>;
  reflectionY: MotionValue<string>;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

export function useMouseParallax(): MouseParallaxReturn {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth springs with damping
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Layer offsets
  // Traces: 6px
  const tracesX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const tracesY = useTransform(smoothMouseY, [-1, 1], [-6, 6]);

  // Ring: 12px
  const ringX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const ringY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  // Shield: 20px
  const shieldX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const shieldY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Orbs: 28px
  const orbsX = useTransform(smoothMouseX, [-1, 1], [-28, 28]);
  const orbsY = useTransform(smoothMouseY, [-1, 1], [-28, 28]);

  // 3D tilt: ±6 degrees
  const tiltRotateX = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  const tiltRotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  // Shifting light reflection percentage
  const reflectionX = useTransform(smoothMouseX, [-1, 1], ["20%", "80%"]);
  const reflectionY = useTransform(smoothMouseY, [-1, 1], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawMouseX.set(Math.max(-1, Math.min(1, x)));
    rawMouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return {
    tracesX,
    tracesY,
    ringX,
    ringY,
    shieldX,
    shieldY,
    orbsX,
    orbsY,
    tiltRotateX,
    tiltRotateY,
    reflectionX,
    reflectionY,
    handleMouseMove,
    handleMouseLeave,
  };
}
