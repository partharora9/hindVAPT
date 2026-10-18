"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";

interface GaugeIconProps {
  isInView?: boolean;
  isHovered?: boolean;
}

// Total segments: 24 (360° / 24 = 15° each, ~2.5° gap, drawn clockwise starting at 12 o'clock)
const TOTAL_SEGMENTS = 24;

interface GaugeSegmentProps {
  index: number;
  totalSegments: number;
  pathData: string;
  progress: MotionValue<number>;
  isRippling: boolean;
}

// Memoized individual segment to prevent re-rendering all 24 segments on every frame
const GaugeSegment = React.memo(function GaugeSegment({
  index,
  totalSegments,
  pathData,
  progress,
  isRippling,
}: GaugeSegmentProps) {
  // State: "unlit" (dim blue), "charging" (flickering bright cyan), "lit" (full cyan glow)
  const [state, setState] = useState<"unlit" | "charging" | "lit">("unlit");

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      // Segment i lights up when progress >= (i + 1) / 24
      if (v >= (index + 1) / totalSegments) {
        setState("lit");
      } else if (v < 1 && Math.floor(v * totalSegments) === index) {
        // Currently filling / charging segment
        setState("charging");
      } else {
        setState("unlit");
      }
    });

    // Check initial state
    const currentVal = progress.get();
    if (currentVal >= (index + 1) / totalSegments) {
      setState("lit");
    } else if (currentVal < 1 && Math.floor(currentVal * totalSegments) === index) {
      setState("charging");
    } else {
      setState("unlit");
    }

    return () => unsub();
  }, [index, totalSegments, progress]);

  // Color mapping per specification
  const fill =
    state === "lit"
      ? "#4CB8FF"
      : state === "charging"
      ? "#8FD4FF"
      : "rgba(30, 155, 255, 0.22)";

  const stroke =
    state === "lit"
      ? "#1E9BFF"
      : state === "charging"
      ? "#4CB8FF"
      : "rgba(30, 155, 255, 0.28)";

  return (
    <motion.path
      d={pathData}
      fill={fill}
      stroke={stroke}
      strokeWidth="1"
      filter={state === "lit" ? "drop-shadow(0 0 6px rgba(76,184,255,0.7))" : undefined}
      style={{
        transition: "fill 120ms ease-out, stroke 120ms ease-out",
      }}
      animate={
        isRippling
          ? {
              filter: [
                "drop-shadow(0 0 6px rgba(76,184,255,0.7)) brightness(1)",
                "drop-shadow(0 0 16px rgba(143,212,255,1)) brightness(1.7)",
                "drop-shadow(0 0 6px rgba(76,184,255,0.7)) brightness(1)",
              ],
            }
          : state === "charging"
          ? { opacity: [0.85, 1, 0.85] }
          : { opacity: 1 }
      }
      transition={
        isRippling
          ? {
              delay: index * 0.03, // 30ms stagger clockwise
              duration: 0.35,
              ease: "easeInOut",
            }
          : state === "charging"
          ? { duration: 0.22, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    />
  );
});

export function GaugeIcon({ isInView = true, isHovered = false }: GaugeIconProps) {
  const shouldReduceMotion = useReducedMotion();

  // One motionValue "progress" (0 to 1) as the single source of truth
  const progress = useMotionValue(shouldReduceMotion ? 1 : 0);

  // Synchronized counter display value
  const [displayNum, setDisplayNum] = useState<number>(shouldReduceMotion ? 100 : 0);
  const [isComplete, setIsComplete] = useState<boolean>(shouldReduceMotion ?? false);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [isRippling, setIsRippling] = useState<boolean>(false);
  const [showShockwave, setShowShockwave] = useState<boolean>(false);
  const [glowSurge, setGlowSurge] = useState<boolean>(false);
  const [fastSpin, setFastSpin] = useState<boolean>(false);

  const animationControlsRef = useRef<AnimationPlaybackControls | null>(null);
  const isAnimatingRef = useRef(false);
  const hasCompletedRef = useRef(shouldReduceMotion ?? false);
  const hasStartedRef = useRef(false);
  const prevHoveredRef = useRef(false);

  // Trigger completion sequence when progress reaches 1.0 (100%)
  const triggerCompletionEffect = () => {
    setIsComplete(true);
    hasCompletedRef.current = true;
    isAnimatingRef.current = false;

    if (shouldReduceMotion) {
      setDisplayNum(100);
      return;
    }

    // 1. All 24 segments pulse in clockwise ripple (30ms stagger)
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), TOTAL_SEGMENTS * 30 + 400);

    // 2. Center number flashes white once (400ms), then settles to #E8F0FF with soft glow
    setIsFlash(true);
    setTimeout(() => setIsFlash(false), 400);

    // 3. Shockwave ring expands from center (scale 1 -> 1.35, opacity 0.5 -> 0)
    setShowShockwave(true);
    setTimeout(() => setShowShockwave(false), 800);

    // 4. Glow behind icon brightens for 600ms
    setGlowSurge(true);
    setTimeout(() => setGlowSurge(false), 600);

    // 5. Outer arcs complete one fast rotation (360° in 1s), then back to slow
    setFastSpin(true);
    setTimeout(() => setFastSpin(false), 1000);
  };

  // Start / restart loading animation from 0 to 1
  const startAnimation = () => {
    if (shouldReduceMotion) {
      progress.set(1);
      setDisplayNum(100);
      setIsComplete(true);
      hasCompletedRef.current = true;
      return;
    }

    // Cancel any running animation first with stop()
    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }

    isAnimatingRef.current = true;
    hasCompletedRef.current = false;
    setIsComplete(false);
    setIsFlash(false);
    setIsRippling(false);
    setShowShockwave(false);
    setGlowSurge(false);
    setFastSpin(false);

    progress.set(0);
    setDisplayNum(0);

    // Animate 0 -> 1 over 3.2s with ease [0.22, 1, 0.36, 1]
    animationControlsRef.current = animate(progress, 1, {
      duration: 3.2,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        triggerCompletionEffect();
      },
    });
  };

  // Subscribe display number directly to progress motionValue
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      // Math.min(100, Math.floor(v * 100)) guarantees number NEVER reads 100 while any segment is dim
      const num = v >= 1 ? 100 : Math.min(99, Math.floor(v * 100));
      setDisplayNum(num);
    });
    return () => unsub();
  }, [progress]);

  // Initial entrance trigger: starts 0.4s after card scrolls into view
  useEffect(() => {
    if (shouldReduceMotion) {
      progress.set(1);
      setDisplayNum(100);
      setIsComplete(true);
      hasCompletedRef.current = true;
      return;
    }

    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        startAnimation();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, shouldReduceMotion]);

  // Replay trigger on hover: restarts 0 to 100 ONLY after it has completed
  useEffect(() => {
    if (isHovered && !prevHoveredRef.current) {
      if (hasCompletedRef.current && !isAnimatingRef.current && !shouldReduceMotion) {
        startAnimation();
      }
    }
    prevHoveredRef.current = isHovered;
  }, [isHovered, shouldReduceMotion]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationControlsRef.current) {
        animationControlsRef.current.stop();
      }
    };
  }, []);

  // Pre-calculate 24 segment geometries around (120, 120)
  // Starting at 12 o'clock (-90°), clockwise 15° step, ~2.5° gap
  const segmentGeometries = useMemo(() => {
    const rInner = 68;
    const rOuter = 85;
    const angleStep = 360 / TOTAL_SEGMENTS; // 15 degrees
    const gap = 2.5; // degrees gap

    return Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
      const startAngle = -90 + i * angleStep + gap / 2;
      const endAngle = -90 + (i + 1) * angleStep - gap / 2;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = (120 + rInner * Math.cos(startRad)).toFixed(2);
      const y1 = (120 + rInner * Math.sin(startRad)).toFixed(2);
      const x2 = (120 + rOuter * Math.cos(startRad)).toFixed(2);
      const y2 = (120 + rOuter * Math.sin(startRad)).toFixed(2);
      const x3 = (120 + rOuter * Math.cos(endRad)).toFixed(2);
      const y3 = (120 + rOuter * Math.sin(endRad)).toFixed(2);
      const x4 = (120 + rInner * Math.cos(endRad)).toFixed(2);
      const y4 = (120 + rInner * Math.sin(endRad)).toFixed(2);

      const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rInner} ${rInner} 0 0 0 ${x1} ${y1} Z`;

      return { index: i, pathData };
    });
  }, []);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 210, height: 210 }}
      role="img"
      aria-label={isComplete ? "Loading complete, 100 percent" : `Loading progress, ${displayNum} percent`}
    >
      {/* Expanding circular shockwave ring on completion (scale 1 -> 1.35, opacity 0.5 -> 0) */}
      <AnimatePresence>
        {showShockwave && (
          <motion.div
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 1.35, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full border border-[#4CB8FF] pointer-events-none -z-0"
          />
        )}
      </AnimatePresence>

      {/* Radial glow surge behind icon for 600ms on completion */}
      <AnimatePresence>
        {glowSurge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1.15 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-[-20px] rounded-full blur-[35px] pointer-events-none -z-0"
            style={{
              background: "radial-gradient(circle at center, rgba(76, 184, 255, 0.8) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <svg
        viewBox="0 0 240 240"
        width="210"
        height="210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_24px_rgba(30,155,255,0.45)]"
      >
        <defs>
          <filter id="gaugeBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#1E9BFF" floodOpacity="0.9" />
          </filter>
          <filter id="numeralGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFFFFF" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#1E9BFF" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* 1. OUTER MECHANICAL NOTCHED RING */}
        {/* Ambient slow rotation (40s/rev); fast spin (360° in 1s) on completion */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={
            fastSpin
              ? { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
              : shouldReduceMotion
              ? { duration: 0 }
              : { duration: 40, repeat: Infinity, ease: "linear" }
          }
          style={{ transformOrigin: "120px 120px" }}
        >
          {/* Dashed outer hairline ring */}
          <circle
            cx="120"
            cy="120"
            r="104"
            stroke="rgba(30, 155, 255, 0.3)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />

          {/* 4 Mechanical notched corner brackets along circumference */}
          <path
            d="M 120 16 A 104 104 0 0 1 194 46"
            stroke="#1E9BFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#gaugeBlueGlow)"
          />
          <path
            d="M 224 120 A 104 104 0 0 1 194 194"
            stroke="#1E9BFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 120 224 A 104 104 0 0 1 46 194"
            stroke="#1E9BFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#gaugeBlueGlow)"
          />
          <path
            d="M 16 120 A 104 104 0 0 1 46 46"
            stroke="#1E9BFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Radial tick marks */}
          <line x1="120" y1="12" x2="120" y2="20" stroke="#1E9BFF" strokeWidth="2.5" />
          <line x1="228" y1="120" x2="220" y2="120" stroke="#1E9BFF" strokeWidth="2.5" />
          <line x1="120" y1="228" x2="120" y2="220" stroke="#1E9BFF" strokeWidth="2.5" />
          <line x1="12" y1="120" x2="20" y2="120" stroke="#1E9BFF" strokeWidth="2.5" />

          {/* Stepped notch blocks */}
          <rect x="115" y="10" width="10" height="4" fill="#1E9BFF" />
          <rect x="226" y="115" width="4" height="10" fill="#1E9BFF" />
          <rect x="115" y="226" width="10" height="4" fill="#1E9BFF" />
          <rect x="10" y="115" width="4" height="10" fill="#1E9BFF" />
        </motion.g>

        {/* 2. INNER 24-SEGMENT RADIAL ARC GAUGE (Clockwise from 12 o'clock, 0 to 100%) */}
        <g>
          {segmentGeometries.map((seg) => (
            <GaugeSegment
              key={seg.index}
              index={seg.index}
              totalSegments={TOTAL_SEGMENTS}
              pathData={seg.pathData}
              progress={progress}
              isRippling={isRippling}
            />
          ))}
        </g>

        {/* Inner thin baseline track */}
        <circle
          cx="120"
          cy="120"
          r="63"
          stroke="rgba(30, 155, 255, 0.25)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* 3. CENTER NUMERAL (Counts 0 -> 100 in sync with progress, tabular numerals, % fixed right) */}
        <g filter="url(#numeralGlow)">
          {/* Main Number: Large italic serif (anchored to right edge at x=112 so % never moves) */}
          <text
            x="112"
            y="136"
            textAnchor="end"
            fill={isFlash ? "#FFFFFF" : isComplete ? "#E8F0FF" : "#FFFFFF"}
            fontFamily="Georgia, Cambria, 'Times New Roman', serif"
            fontStyle="italic"
            fontWeight="bold"
            fontSize="52"
            className="tabular-nums select-none"
            style={{
              textShadow: isFlash
                ? "0 0 24px #FFFFFF, 0 0 35px #FFFFFF"
                : isComplete
                ? "0 0 12px rgba(76,184,255,0.6)"
                : "0 0 8px rgba(30,155,255,0.5)",
              transition: "fill 400ms ease",
            }}
          >
            {displayNum}
          </text>

          {/* Suffix %: Fixed to the right of number at x=116, slightly raised at y=114 */}
          <text
            x="116"
            y="114"
            textAnchor="start"
            fill={isFlash ? "#FFFFFF" : isComplete ? "#E8F0FF" : "#FFFFFF"}
            fontFamily="Georgia, Cambria, 'Times New Roman', serif"
            fontStyle="italic"
            fontWeight="bold"
            fontSize="24"
            className="select-none"
            style={{
              textShadow: isFlash
                ? "0 0 24px #FFFFFF"
                : isComplete
                ? "0 0 12px rgba(76,184,255,0.6)"
                : "0 0 8px rgba(30,155,255,0.5)",
              transition: "fill 400ms ease",
            }}
          >
            %
          </text>
        </g>
      </svg>
    </div>
  );
}
