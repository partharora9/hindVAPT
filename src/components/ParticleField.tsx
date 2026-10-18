"use client";

import React, { useEffect, useRef } from "react";
import { useMotionGovernance } from "@/context/MotionContext";
import { useSharedTicker } from "@/hooks/useSharedTicker";
import { useSectionInView } from "@/hooks/useSectionInView";
import type { Particle, StarDust } from "@/types";

interface ParticleFieldProps {
  xOffset?: unknown;
  yOffset?: unknown;
  className?: string;
  inView?: boolean;
}

export function ParticleField({
  className = "",
  inView = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reduced, tier } = useMotionGovernance();
  const isSectionVisible = useSectionInView(containerRef, "200px 0px 200px 0px");

  const isLowTier = reduced || tier === "low";
  const shouldAnimate = inView && isSectionVisible && !isLowTier;

  const starsRef = useRef<StarDust[]>([]);
  const orbsRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 700, height: 800, centerX: 350, centerY: 400 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 700;
    const height = canvas.parentElement?.clientHeight || 800;
    dimensionsRef.current = {
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
    };

    const maxDpr = tier === "high" ? 2 : tier === "medium" ? 1.5 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isSmallScreen = width < 768;
    const orbCount = isLowTier ? 8 : tier === "medium" || isSmallScreen ? 14 : 30;
    const starCount = isLowTier ? 15 : tier === "medium" || isSmallScreen ? 25 : 55;

    const colors = [
      "rgba(30, 155, 255,",
      "rgba(0, 229, 255,",
      "rgba(56, 171, 255,",
      "rgba(10, 100, 220,",
    ];

    const orbs: Particle[] = [];
    for (let i = 0; i < orbCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadiusX = 120 + Math.random() * (width * 0.42);
      const orbitRadiusY = 120 + Math.random() * (height * 0.42);
      orbs.push({
        x: dimensionsRef.current.centerX + Math.cos(angle) * orbitRadiusX,
        y: dimensionsRef.current.centerY + Math.sin(angle) * orbitRadiusY,
        radius: 2.5 + Math.random() * 4,
        speed: (Math.random() * 0.0003 + 0.00015) * (Math.random() > 0.5 ? 1 : -1),
        angle,
        orbitRadiusX,
        orbitRadiusY,
        alpha: 0.15 + Math.random() * 0.4,
        baseAlpha: 0.15 + Math.random() * 0.4,
        blur: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    orbsRef.current = orbs;

    const stars: StarDust[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    // Static frame for low tier
    if (isLowTier) {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(195, 212, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [tier, isLowTier]);

  useSharedTicker((_, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, centerX, centerY } = dimensionsRef.current;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw star-dust
    ctx.globalCompositeOperation = "source-over";
    starsRef.current.forEach((s) => {
      s.twinklePhase += s.twinkleSpeed * delta;
      const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
      ctx.fillStyle = `rgba(195, 212, 255, ${currentAlpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw glowing orbs with additive blending
    ctx.globalCompositeOperation = "lighter";
    orbsRef.current.forEach((o) => {
      o.angle += o.speed * delta;
      o.x = centerX + Math.cos(o.angle) * o.orbitRadiusX;
      o.y = centerY + Math.sin(o.angle) * o.orbitRadiusY;

      const pulse = 0.8 + 0.2 * Math.sin(o.angle * 3);
      const drawRadius = o.radius * 2.2;

      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, drawRadius);
      grad.addColorStop(0, `${o.color} ${o.alpha * pulse})`);
      grad.addColorStop(0.45, `${o.color} ${o.alpha * 0.4 * pulse})`);
      grad.addColorStop(1, `${o.color} 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(o.x, o.y, drawRadius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, shouldAnimate);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full select-none"
      />
    </div>
  );
}
