"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Particle, StarDust } from "@/types";

interface ParticleFieldProps {
  xOffset?: any;
  yOffset?: any;
  className?: string;
  inView?: boolean;
}

export function ParticleField({
  xOffset,
  yOffset,
  className = "",
  inView = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isSmallScreen = width < 768;
    const orbCount = isSmallScreen ? 16 : 32;
    const starCount = isSmallScreen ? 25 : 55;

    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize glowing orbs
    const orbs: Particle[] = [];
    const colors = [
      "rgba(30, 155, 255,",   // Cyan blue
      "rgba(0, 229, 255,",    // Electric cyan
      "rgba(56, 171, 255,",   // Soft azure
      "rgba(10, 100, 220,",   // Deep electric blue
    ];

    for (let i = 0; i < orbCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadiusX = 140 + Math.random() * 220;
      const orbitRadiusY = 120 + Math.random() * 200;
      const speed = (0.0003 + Math.random() * 0.0006) * (Math.random() > 0.5 ? 1 : -1);
      const radius = 4 + Math.random() * 14;
      const baseAlpha = 0.15 + Math.random() * 0.45;
      const color = colors[Math.floor(Math.random() * colors.length)];

      orbs.push({
        x: centerX + Math.cos(angle) * orbitRadiusX,
        y: centerY + Math.sin(angle) * orbitRadiusY,
        radius,
        orbitRadiusX,
        orbitRadiusY,
        angle,
        speed,
        alpha: baseAlpha,
        baseAlpha,
        color,
        blur: radius * 1.5,
      });
    }

    // Initialize twinkling star-dust
    const stars: StarDust[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.1 + Math.random() * 0.5,
        twinkleSpeed: 0.002 + Math.random() * 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    if (shouldReduceMotion) {
      // Draw static particles once
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(195, 212, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "lighter";
      orbs.forEach((o) => {
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius * 2);
        grad.addColorStop(0, `${o.color} ${o.alpha})`);
        grad.addColorStop(0.5, `${o.color} ${o.alpha * 0.4})`);
        grad.addColorStop(1, `${o.color} 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    let animationFrameId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!inView || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw star-dust
      ctx.globalCompositeOperation = "source-over";
      stars.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed * delta;
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx.fillStyle = `rgba(195, 212, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw glowing orbs with additive blending
      ctx.globalCompositeOperation = "lighter";
      orbs.forEach((o) => {
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

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [inView, shouldReduceMotion, isMounted]);

  return (
    <motion.div
      style={{ x: xOffset, y: yOffset }}
      className={`absolute inset-0 pointer-events-none z-15 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  );
}
