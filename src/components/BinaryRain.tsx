"use client";

import React, { useEffect, useRef } from "react";
import { useMotionGovernance } from "@/context/MotionContext";
import { useSharedTicker } from "@/hooks/useSharedTicker";
import { useSectionInView } from "@/hooks/useSectionInView";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reduced, tier } = useMotionGovernance();
  const isSectionVisible = useSectionInView(containerRef, "200px 0px 200px 0px");

  const isLowTier = reduced || tier === "low";
  const shouldAnimate = inView && isSectionVisible && !isLowTier;

  const columnsRef = useRef<Column[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const maxDpr = tier === "high" ? 2 : tier === "medium" ? 1.5 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const fontSize = 12;
    const charSpacing = 16;
    const colSpacing = tier === "medium" ? 24 : 16; // Fewer columns on medium tier
    const colCount = Math.floor(width / colSpacing);

    const cols: Column[] = [];
    for (let i = 0; i < colCount; i++) {
      const length = 10 + Math.floor(Math.random() * 10);
      const chars: string[] = [];
      for (let j = 0; j < length; j++) {
        chars.push(Math.random() > 0.5 ? "1" : "0");
      }
      cols.push({
        x: i * colSpacing + 8,
        y: Math.random() * height * -1,
        speed: 0.6 + Math.random() * 0.9,
        chars,
        length,
        lastFlip: 0,
      });
    }
    columnsRef.current = cols;

    // Static frame if low tier or reduced motion
    if (isLowTier) {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
      cols.forEach((col) => {
        col.chars.forEach((char, idx) => {
          const cy = (idx * charSpacing) % height;
          const alpha = Math.max(0.1, 0.7 - (cy / height) * 0.6);
          ctx.fillStyle = `rgba(30, 155, 255, ${alpha})`;
          ctx.fillText(char, col.x, cy);
        });
      });
    }
  }, [width, height, isLowTier, tier]);

  // Shared ticker loop
  useSharedTicker((time, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.font = `600 12px "JetBrains Mono", monospace`;
    ctx.textAlign = "center";

    const charSpacing = 16;

    columnsRef.current.forEach((col) => {
      col.y += col.speed * (delta / 16);
      if (col.y > height + col.length * charSpacing) {
        col.y = -col.length * charSpacing;
        col.speed = 0.6 + Math.random() * 0.9;
      }

      if (time - col.lastFlip > 200 + Math.random() * 300) {
        const flipIdx = Math.floor(Math.random() * col.chars.length);
        col.chars[flipIdx] = col.chars[flipIdx] === "0" ? "1" : "0";
        col.lastFlip = time;
      }

      col.chars.forEach((char, idx) => {
        const charY = col.y + idx * charSpacing;
        if (charY > -20 && charY < height + 20) {
          const isLead = idx === col.chars.length - 1;
          const progress = idx / col.chars.length;
          const alpha = isLead ? 1 : Math.max(0.08, progress * 0.65);

          if (isLead) {
            ctx.fillStyle = "#FFFFFF";
            ctx.shadowColor = "#1E9BFF";
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(30, 155, 255, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, col.x, charY);
        }
      });
    });
  }, shouldAnimate);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        aria-hidden="true"
        className="pointer-events-none select-none"
      />
    </div>
  );
}
