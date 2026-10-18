"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface BinaryRainProps {
  width?: number;
  height?: number;
  className?: string;
  inView?: boolean;
}

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  lastFlip: number;
}

export function BinaryRain({
  width = 320,
  height = 360,
  className = "",
  inView = true,
}: BinaryRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const fontSize = 12;
    const charSpacing = 16;
    const colSpacing = 16;
    const colCount = Math.floor(width / colSpacing);

    const columns: Column[] = [];

    // Initialize columns
    for (let i = 0; i < colCount; i++) {
      const length = 12 + Math.floor(Math.random() * 12);
      const chars: string[] = [];
      for (let j = 0; j < length; j++) {
        chars.push(Math.random() > 0.5 ? "1" : "0");
      }
      columns.push({
        x: i * colSpacing + 8,
        y: Math.random() * height * -1,
        speed: 0.6 + Math.random() * 0.9,
        chars,
        length,
        lastFlip: 0,
      });
    }

    if (shouldReduceMotion) {
      // Static render
      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
      columns.forEach((col) => {
        col.chars.forEach((char, idx) => {
          const cy = (idx * charSpacing) % height;
          const alpha = Math.max(0.1, 0.7 - (cy / height) * 0.6);
          ctx.fillStyle = `rgba(30, 155, 255, ${alpha})`;
          ctx.fillText(char, col.x, cy);
        });
      });
      return;
    }

    let animationFrameId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!inView || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";

      columns.forEach((col) => {
        // Scroll downward
        col.y += col.speed * (delta / 16);
        if (col.y > height + col.length * charSpacing) {
          col.y = -col.length * charSpacing;
          col.speed = 0.6 + Math.random() * 0.9;
        }

        // Random bit flips
        if (time - col.lastFlip > 180 + Math.random() * 300) {
          const flipIdx = Math.floor(Math.random() * col.chars.length);
          col.chars[flipIdx] = col.chars[flipIdx] === "0" ? "1" : "0";
          col.lastFlip = time;
        }

        // Draw character column
        col.chars.forEach((char, idx) => {
          const cy = col.y + idx * charSpacing;
          if (cy >= -10 && cy <= height + 10) {
            // Fade downward mask factor
            const verticalFade = Math.max(0, 1 - Math.pow(cy / height, 1.4));
            const isHead = idx === col.chars.length - 1;

            if (isHead) {
              ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * verticalFade})`;
            } else {
              const alpha = (0.2 + (idx / col.length) * 0.55) * verticalFade;
              ctx.fillStyle = `rgba(30, 155, 255, ${alpha})`;
            }
            ctx.fillText(char, col.x, cy);
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [width, height, inView, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
