"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface GlyphCell {
  char: string;
  isFilled: boolean;
  baseAlpha: number;
  currentAlpha: number;
  fadePeriod: number;
  fadePhase: number;
  waveBright: number;
  cursorBright: number;
  scrambleCooldown: number;
}

const CHAR_SET = [
  "Ω", "β", "θ", "π", "μ", "δ", "Σ", "Δ", "Φ", "Ψ", "λ",
  "Q", "X", "A", "Z", "K", "J", "O", "E", "H", "L", "M", "N", "P",
  "&", "+", "*", ".", "0", "1", "5", "8", "9", "#", "<", ">",
];

function getRandomChar(): string {
  return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
}

interface GlyphFieldProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function GlyphField({ containerRef, className = "" }: GlyphFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellWidth = 50;
    let cellHeight = 29;
    let fontSize = 22;

    let grid: GlyphCell[][] = [];

    // Mouse coordinates relative to footer
    const mouse = { x: -1000, y: -1000, active: false };

    // Diagonal wave state
    let waveStartTime = performance.now();
    const WAVE_INTERVAL = 10000; // Wave every 10s
    const WAVE_DURATION = 2400; // Wave crosses in 2.4s

    // Column drift state (shift 1 cell every 6s)
    let driftOffset = 0;

    const initGrid = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Adaptive cell size based on viewport
      if (width >= 1280) {
        cellWidth = 50;
        cellHeight = 29;
        fontSize = 22;
      } else if (width >= 768) {
        cellWidth = 44;
        cellHeight = 26;
        fontSize = 19;
      } else {
        cellWidth = 40;
        cellHeight = 24;
        fontSize = 17;
      }

      cols = Math.ceil(width / cellWidth) + 1;
      rows = Math.ceil(height / cellHeight) + 1;

      grid = [];
      for (let r = 0; r < rows; r++) {
        const rowData: GlyphCell[] = [];
        for (let c = 0; c < cols; c++) {
          const isFilled = Math.random() < 0.55; // 55% filled as in reference
          const isBrighter = Math.random() < 0.15;
          const baseAlpha = isBrighter ? 0.42 : 0.22 + Math.random() * 0.12;

          rowData.push({
            char: getRandomChar(),
            isFilled,
            baseAlpha,
            currentAlpha: baseAlpha,
            fadePeriod: 3000 + Math.random() * 6000, // 3 to 9s
            fadePhase: Math.random() * Math.PI * 2,
            waveBright: 0,
            cursorBright: 0,
            scrambleCooldown: 0,
          });
        }
        grid.push(rowData);
      }
    };

    initGrid();

    // Resize handler (throttled)
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initGrid();
        if (shouldReduceMotion) drawStatic();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    // Mouse movement on container
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion || width < 768) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const targetEl = containerRef?.current || canvas.parentElement || window;
    targetEl.addEventListener("mousemove", handleMouseMove as EventListener);
    targetEl.addEventListener("mouseleave", handleMouseLeave as EventListener);

    // Visibility / Intersection observer
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Static render for reduced motion
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `400 ${fontSize}px var(--font-mono), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r++) {
        const y = r * cellHeight + cellHeight / 2;
        const normY = y / height;
        const verticalMask = Math.pow(Math.max(0, (normY - 0.28) / 0.72), 1.6);
        if (verticalMask <= 0.02) continue;

        for (let c = 0; c < cols; c++) {
          const cell = grid[r]?.[c];
          if (!cell || !cell.isFilled) continue;

          const x = c * cellWidth + cellWidth / 2;
          const alpha = cell.baseAlpha * verticalMask;
          ctx.fillStyle = `rgba(120, 160, 255, ${alpha.toFixed(3)})`;
          ctx.fillText(cell.char, x, y);
        }
      }
    };

    if (shouldReduceMotion) {
      drawStatic();
      return () => {
        window.removeEventListener("resize", handleResize);
        targetEl.removeEventListener("mousemove", handleMouseMove as EventListener);
        targetEl.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        observer.disconnect();
      };
    }

    // Main animation loop
    let lastTime = performance.now();

    const loop = (now: number) => {
      animationFrameId = requestAnimationFrame(loop);

      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = now - lastTime;
      lastTime = now;

      // Update vertical drift (1 cell every 6000ms)
      driftOffset = (now % 6000) / 6000;

      // Wave calculation
      const waveElapsed = (now - waveStartTime) % WAVE_INTERVAL;
      const isWaveActive = waveElapsed < WAVE_DURATION;
      const waveProgress = isWaveActive ? waveElapsed / WAVE_DURATION : -1;
      const waveFront = waveProgress * (width + height * 1.5 + 200);

      ctx.clearRect(0, 0, width, height);
      ctx.font = `400 ${fontSize}px var(--font-mono), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r++) {
        const y = r * cellHeight + cellHeight / 2;
        const normY = y / height;

        // Mask covers lower ~70% of footer (opacity 0 at ~0.28, rising to 1 at bottom)
        const verticalMask = Math.pow(Math.max(0, (normY - 0.26) / 0.74), 1.5);

        for (let c = 0; c < cols; c++) {
          const cell = grid[r]?.[c];
          if (!cell || !cell.isFilled) continue;

          const x = c * cellWidth + cellWidth / 2;

          // 1. Slow random fade in and out (period 3 to 9s)
          const phase = (now / cell.fadePeriod) * Math.PI * 2 + cell.fadePhase;
          const fadeFactor = 0.5 + 0.5 * Math.sin(phase);

          // Occasionally change character when nearly invisible
          if (fadeFactor < 0.08 && Math.random() < 0.04) {
            cell.char = getRandomChar();
          }

          // 2. Cursor interaction (~180px radius)
          if (mouse.active) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            if (dist < 180) {
              const boost = (1 - dist / 180) * 0.55;
              cell.cursorBright = Math.max(cell.cursorBright, boost);
              if (cell.scrambleCooldown <= 0 && Math.random() < 0.15) {
                cell.char = getRandomChar();
                cell.scrambleCooldown = 180;
              }
            }
          }

          // Smooth cursor decay
          cell.cursorBright *= 0.94;
          if (cell.cursorBright < 0.005) cell.cursorBright = 0;

          // 3. Diagonal wave interaction
          if (isWaveActive) {
            const diagDist = Math.abs(x + y * 1.3 - waveFront);
            if (diagDist < 120) {
              const waveIntensity = (1 - diagDist / 120) * 0.45;
              cell.waveBright = Math.max(cell.waveBright, waveIntensity);
              if (cell.scrambleCooldown <= 0 && Math.random() < 0.2) {
                cell.char = getRandomChar();
                cell.scrambleCooldown = 150;
              }
            }
          }

          // Decay wave brightness
          cell.waveBright *= 0.93;
          if (cell.waveBright < 0.005) cell.waveBright = 0;

          if (cell.scrambleCooldown > 0) {
            cell.scrambleCooldown -= dt;
          }

          // Cursor can gently reveal glyphs even above the normal vertical mask
          const effectiveMask = Math.min(1, verticalMask + cell.cursorBright * 0.7);

          if (effectiveMask <= 0.01 && cell.cursorBright <= 0.01) continue;

          // Final alpha calculation
          const alpha = Math.min(
            0.85,
            (cell.baseAlpha * fadeFactor + cell.cursorBright + cell.waveBright) *
              effectiveMask
          );

          if (alpha <= 0.02) continue;

          // Extra bright or cyan glow when illuminated by cursor or wave
          if (cell.cursorBright > 0.15 || cell.waveBright > 0.15) {
            ctx.fillStyle = `rgba(180, 220, 255, ${alpha.toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(120, 160, 255, ${alpha.toFixed(3)})`;
          }

          ctx.fillText(cell.char, x, y);
        }
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      targetEl.removeEventListener("mousemove", handleMouseMove as EventListener);
      targetEl.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [containerRef, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
