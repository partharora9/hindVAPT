"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface CursorSpotlightProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function CursorSpotlight({ containerRef }: CursorSpotlightProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isInside, setIsInside] = useState(false);

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);

  // Smooth springs for fluid cyber motion
  const springX = useSpring(rawX, { damping: 28, stiffness: 220 });
  const springY = useSpring(rawY, { damping: 28, stiffness: 220 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        rawX.set(x);
        rawY.set(y);
        setIsInside(true);
      } else {
        setIsInside(false);
      }
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, rawX, rawY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden md:block" aria-hidden="true">
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isInside ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="w-[360px] h-[360px] rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(30, 155, 255, 0.12) 0%, rgba(30, 155, 255, 0.04) 45%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
