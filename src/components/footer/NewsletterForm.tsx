"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CornerBrackets } from "./CornerBrackets";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

interface NewsletterFormProps {
  isInView?: boolean;
  onSubscribe?: (email: string) => Promise<void>;
}

export function NewsletterForm({
  isInView = true,
  onSubscribe,
}: NewsletterFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Decoded heading text
  const headingText = useScramble("Stay connected", {
    durationMs: 650,
    delayMs: 600,
    autoStart: isInView,
  });

  // Decoded status messages
  const successDecoded = useScramble("You're on the list.", {
    durationMs: 400,
    delayMs: 50,
    autoStart: status === "success",
  });

  const errorDecoded = useScramble(errorMessage || "Please enter a valid email address", {
    durationMs: 400,
    delayMs: 50,
    autoStart: status === "error",
  });

  // Basic email validation regex
  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Default simulated network delay
        await new Promise((res) => setTimeout(res, 900));
      }
      setStatus("success");
      setEmail("");

      // Auto-reset back to idle after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch {
      setStatus("error");
      setErrorMessage("Subscription failed. Please try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const isLabelFloated = isFocused || email.length > 0;

  return (
    <div className="flex flex-col w-full max-w-[360px] select-none">
      {/* 1. HEADING: "Stay connected" (~26px, tracking ~0.05em, #C3D4FF) */}
      <motion.h3
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASINGS.cyber }}
        className="text-[26px] font-mono font-bold tracking-[0.05em] text-[#C3D4FF] leading-tight"
      >
        {headingText || "Stay connected"}
      </motion.h3>

      {/* 2. PARAGRAPH (~16px, line-height 26px, #8FA3C7) */}
      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASINGS.cyber }}
        className="mt-3 text-[16px] leading-[26px] font-mono text-[#8FA3C7] tracking-normal"
      >
        Join our newsletter and stay updated on the latest trends in digital design
      </motion.p>

      {/* 3. EMAIL FORM FIELD (~360px wide, label/placeholder "E-mail", 2px solid #1E9BFF bottom line, square submit button) */}
      <motion.form
        onSubmit={handleSubmit}
        animate={isShaking && !shouldReduceMotion ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mt-8 sm:mt-10 w-full"
        noValidate
      >
        <div className="relative flex items-center justify-between pb-3">
          {/* Floating Label */}
          <label
            htmlFor="newsletter-email-input"
            className={`absolute left-0 transition-all duration-200 pointer-events-none font-mono text-[17px] ${
              isLabelFloated
                ? "-top-[22px] text-xs text-[#1E9BFF] font-semibold"
                : "top-1 text-[#8FA3C7]"
            }`}
          >
            E-mail
          </label>

          {/* Real Input */}
          <input
            id="newsletter-email-input"
            ref={inputRef}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-describedby="newsletter-status-message"
            disabled={status === "loading"}
            className="w-[calc(100%-52px)] bg-transparent border-none outline-none font-mono text-[17px] text-[#D5E2FF] placeholder-transparent pt-1 pb-1 focus:ring-0 select-text"
          />

          {/* Square Submit Button (~40x40px, corner brackets, no fill, dotted arrow) */}
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            whileTap={{ scale: 0.95 }}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.75, ease: EASINGS.cyber }}
            aria-label="Subscribe to newsletter"
            className="relative flex items-center justify-center w-[40px] h-[40px] bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] select-none"
            style={{
              backgroundColor: buttonHovered
                ? "rgba(30, 155, 255, 0.15)"
                : "transparent",
            }}
          >
            {/* 4 L-shaped Corner Brackets */}
            <CornerBrackets
              size={7}
              strokeWidth={1}
              color="rgba(195, 212, 255, 0.5)"
              activeColor="#1E9BFF"
              isHovered={buttonHovered || isFocused}
              expandOffset={3}
              drawIn={isInView}
              delay={0.8}
              pulseInterval={4800}
            />

            {/* Submit Button Icons: Dotted Arrow / Spinner / Checkmark */}
            <div className="relative w-full h-full flex items-center justify-center">
              {status === "loading" ? (
                <LoadingSpinner />
              ) : status === "success" ? (
                <CheckMarkIcon />
              ) : (
                <DottedArrow isHovered={buttonHovered} />
              )}
            </div>
          </motion.button>
        </div>

        {/* 2px Solid Accent Line (#1E9BFF) with Draw-in, Focus Glow, and Travelling Light Pulse */}
        <div className="relative w-full h-[2px] bg-[rgba(30,155,255,0.25)] overflow-hidden">
          {/* Main 2px accent underline that draws in */}
          <motion.div
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={isInView || shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASINGS.cyber }}
            style={{ originX: 0 }}
            className={`w-full h-full bg-[#1E9BFF] transition-shadow duration-300 ${
              isFocused ? "shadow-[0_0_14px_rgba(30,155,255,0.85)]" : ""
            }`}
          />

          {/* Traveling light pulse every ~6s at rest */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            />
          )}
        </div>

        {/* Status / Error Message */}
        <div
          id="newsletter-status-message"
          aria-live="polite"
          className="min-h-[26px] mt-2 text-xs font-mono select-none"
        >
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[#F59E0B] flex items-center gap-1.5"
              >
                <span>✕</span>
                <span>{errorDecoded || errorMessage}</span>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[#1E9BFF] flex items-center gap-1.5 font-semibold"
              >
                <span>✓</span>
                <span>{successDecoded || "You're on the list."}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>
    </div>
  );
}

// Dotted Arrow Icon: 3 dots + chevron, shimmers periodically and nudges 4px right on hover
function DottedArrow({ isHovered }: { isHovered: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [shimmerIndex, setShimmerIndex] = useState(-1);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Ambient shimmer every ~5s
    const timer = setInterval(() => {
      // Light up 0 -> 1 -> 2 -> chevron
      setShimmerIndex(0);
      setTimeout(() => setShimmerIndex(1), 120);
      setTimeout(() => setShimmerIndex(2), 240);
      setTimeout(() => setShimmerIndex(3), 360);
      setTimeout(() => setShimmerIndex(-1), 540);
    }, 5000);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <motion.svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      animate={{
        x: isHovered && !shouldReduceMotion ? 4 : 0,
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="text-white overflow-visible pointer-events-none"
      aria-hidden="true"
    >
      {/* Dot 1 */}
      <circle
        cx="4"
        cy="7"
        r="1.4"
        fill="currentColor"
        className="transition-colors duration-200"
        style={{
          fill:
            shimmerIndex === 0 || isHovered
              ? "#1E9BFF"
              : "#FFFFFF",
        }}
      />
      {/* Dot 2 */}
      <circle
        cx="8.5"
        cy="7"
        r="1.4"
        fill="currentColor"
        className="transition-colors duration-200"
        style={{
          fill:
            shimmerIndex === 1 || isHovered
              ? "#1E9BFF"
              : "#FFFFFF",
        }}
      />
      {/* Dot 3 */}
      <circle
        cx="13"
        cy="7"
        r="1.4"
        fill="currentColor"
        className="transition-colors duration-200"
        style={{
          fill:
            shimmerIndex === 2 || isHovered
              ? "#1E9BFF"
              : "#FFFFFF",
        }}
      />
      {/* Chevron Arrowhead */}
      <path
        d="M13.5 3.5 L17.5 7 L13.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        className="transition-colors duration-200"
        style={{
          stroke:
            shimmerIndex === 3 || isHovered
              ? "#1E9BFF"
              : "#FFFFFF",
        }}
      />
    </motion.svg>
  );
}

// Loading Dotted Arc Spinner
function LoadingSpinner() {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      className="text-[#1E9BFF]"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        className="opacity-40"
      />
      <path
        d="M12 3 A 9 9 0 0 1 21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

// Success Checkmark
function CheckMarkIcon() {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-[#1E9BFF]"
      aria-hidden="true"
    >
      <path
        d="M4 12.5L9.5 18L20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </motion.svg>
  );
}
