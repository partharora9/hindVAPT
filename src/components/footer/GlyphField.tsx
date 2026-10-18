"use client";

import React, { useEffect, useRef } from "react";
import { useMotionGovernance } from "@/context/MotionContext";
import { useSharedTicker } from "@/hooks/useSharedTicker";
import { useSectionInView } from "@/hooks/useSectionInView";

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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { reduced, tier, isTouch } = useMotionGovernance();
  const isSectionVisible = useSectionInView(containerRef || wrapperRef, "200px 0px 200px 0px");

  const isLowTier = reduced || tier === "low";
  const shouldAnimate = isSectionVisible && !isLowTier;

  const gridRef = useRef<GlyphCell[][]>([]);
  const stateRef = useRef({
    width: 0,
    height: 0,
    cols: 0,
    rows: 0,
    cellWidth: 50,
    cellHeight: 29,
    fontSize: 22,
    waveStartTime: 0,
    mouse: { x: -1000, y: -1000, active: false },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    stateRef.current.width = width;
    stateRef.current.height = height;
    stateRef.current.waveStartTime = performance.now();

    const maxDpr = tier === "high" ? 2 : tier === "medium" ? 1.5 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    let cellWidth = 50;
    let cellHeight = 29;
    let fontSize = 22;

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

    stateRef.current.cellWidth = cellWidth;
    stateRef.current.cellHeight = cellHeight;
    stateRef.current.fontSize = fontSize;

    const cols = Math.ceil(width / cellWidth) + 1;
    const rows = Math.ceil(height / cellHeight) + 1;
    stateRef.current.cols = cols;
    stateRef.current.rows = rows;

    const fillProbability = isLowTier ? 0.35 : tier === "medium" ? 0.45 : 0.55;

    const grid: GlyphCell[][] = [];
    for (let r = 0; r < rows; r++) {
      const rowData: GlyphCell[] = [];
      for (let c = 0; c < cols; c++) {
        const isFilled = Math.random() < fillProbability;
        const isBrighter = Math.random() < 0.15;
        const baseAlpha = isBrighter ? 0.42 : 0.22 + Math.random() * 0.12;

        rowData.push({
          char: getRandomChar(),
          isFilled,
          baseAlpha,
          currentAlpha: baseAlpha,
          fadePeriod: 3000 + Math.random() * 6000,
          fadePhase: Math.random() * Math.PI * 2,
          waveBright: 0,
          cursorBright: 0,
          scrambleCooldown: 0,
        });
      }
      grid.push(rowData);
    }
    gridRef.current = grid;

    // Render static frame if low tier
    if (isLowTier) {
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
    }

    // Cursor tracking (disabled on touch or low tier)
    if (!isTouch && !isLowTier) {
      const targetEl = containerRef?.current || parent;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        stateRef.current.mouse.x = e.clientX - rect.left;
        stateRef.current.mouse.y = e.clientY - rect.top;
        stateRef.current.mouse.active = true;
      };

      const handleMouseLeave = () => {
        stateRef.current.mouse.active = false;
        stateRef.current.mouse.x = -1000;
        stateRef.current.mouse.y = -1000;
      };

      targetEl.addEventListener("mousemove", handleMouseMove as EventListener);
      targetEl.addEventListener("mouseleave", handleMouseLeave as EventListener);

      return () => {
        targetEl.removeEventListener("mousemove", handleMouseMove as EventListener);
        targetEl.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      };
    }
  }, [containerRef, tier, isLowTier, isTouch]);

  // Shared ticker animation
  useSharedTicker((now, dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, cellWidth, cellHeight, fontSize, rows, cols, waveStartTime, mouse } = stateRef.current;
    const grid = gridRef.current;

    const WAVE_INTERVAL = 10000;
    const WAVE_DURATION = 2400;
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
      const verticalMask = Math.pow(Math.max(0, (normY - 0.26) / 0.74), 1.5);

      for (let c = 0; c < cols; c++) {
        const cell = grid[r]?.[c];
        if (!cell || !cell.isFilled) continue;

        const x = c * cellWidth + cellWidth / 2;
        const phase = (now / cell.fadePeriod) * Math.PI * 2 + cell.fadePhase;
        const fadeFactor = 0.5 + 0.5 * Math.sin(phase);

        if (fadeFactor < 0.08 && Math.random() < 0.04) {
          cell.char = getRandomChar();
        }

        if (mouse.active && !isTouch) {
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

        cell.cursorBright *= 0.94;
        if (cell.cursorBright < 0.005) cell.cursorBright = 0;

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

        cell.waveBright *= 0.93;
        if (cell.waveBright < 0.005) cell.waveBright = 0;

        if (cell.scrambleCooldown > 0) {
          cell.scrambleCooldown -= dt;
        }

        const effectiveMask = Math.min(1, verticalMask + cell.cursorBright * 0.7);
        if (effectiveMask <= 0.01 && cell.cursorBright <= 0.01) continue;

        const alpha = Math.min(
          0.85,
          (cell.baseAlpha * fadeFactor + cell.cursorBright + cell.waveBright) * effectiveMask
        );

        if (alpha <= 0.02) continue;

        if (cell.cursorBright > 0.15 || cell.waveBright > 0.15) {
          ctx.fillStyle = `rgba(180, 220, 255, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(120, 160, 255, ${alpha.toFixed(3)})`;
        }

        ctx.fillText(cell.char, x, y);
      }
    }
  }, shouldAnimate);

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className={`w-full h-full pointer-events-none select-none z-0 ${className}`}
        aria-hidden="true"
      />
    </div>
  );
}
