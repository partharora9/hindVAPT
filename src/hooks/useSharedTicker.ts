"use client";

import { useEffect, useRef } from "react";

type TickerCallback = (now: number, delta: number) => void;

class TickerManager {
  private subscribers = new Set<TickerCallback>();
  private frameId: number | null = null;
  private lastTime = 0;
  private isRunning = false;

  constructor() {
    if (typeof window !== "undefined") {
      document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else if (this.subscribers.size > 0) {
      this.start();
    }
  };

  private loop = (now: number) => {
    if (!this.isRunning) return;

    const delta = this.lastTime ? now - this.lastTime : 16.67;
    this.lastTime = now;

    this.subscribers.forEach((cb) => {
      try {
        cb(now, delta);
      } catch (err) {
        console.error("Ticker subscriber error:", err);
      }
    });

    this.frameId = requestAnimationFrame(this.loop);
  };

  private start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.loop);
  }

  private stop() {
    this.isRunning = false;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.lastTime = 0;
  }

  public subscribe(callback: TickerCallback): () => void {
    this.subscribers.add(callback);
    if (!this.isRunning && (typeof document === "undefined" || !document.hidden)) {
      this.start();
    }

    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }
}

// Global singleton instance
const globalTicker = typeof window !== "undefined" ? new TickerManager() : null;

export function useSharedTicker(callback: TickerCallback, enabled = true) {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || !globalTicker) return;

    const subscriber: TickerCallback = (now, delta) => {
      cbRef.current(now, delta);
    };

    const unsubscribe = globalTicker.subscribe(subscriber);
    return () => unsubscribe();
  }, [enabled]);
}
