"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useCanHover } from "@/hooks/useCanHover";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const canHover = useCanHover();

  const baseStyles =
    "relative inline-flex items-center justify-center font-mono font-bold uppercase tracking-[0.18em] transition-all duration-200 outline-none select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "min-h-[38px] px-4 py-2 text-[11px]",
    md: "min-h-[44px] px-6 py-3 text-[13px]",
    lg: "min-h-[50px] px-8 py-3.5 text-[14px]",
  };

  const variantStyles = {
    primary:
      "bg-[#1E9BFF] hover:bg-[#3cb0ff] text-[#020617] shadow-[0_0_24px_rgba(30,155,255,0.4)] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
    secondary:
      "bg-[#0E1A30] hover:bg-[#152545] text-white border border-[rgba(30,155,255,0.3)] hover:border-[#1E9BFF] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
    outline:
      "bg-transparent hover:bg-[#1E9BFF]/10 text-[#C3D4FF] hover:text-white border border-[rgba(30,155,255,0.35)] hover:border-[#1E9BFF] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
    ghost:
      "bg-transparent hover:bg-white/5 text-[#8FA3C7] hover:text-white focus-visible:ring-1 focus-visible:ring-[#1E9BFF]",
  };

  return (
    <motion.button
      whileHover={canHover && !disabled && !isLoading ? { y: -1 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>PROCESSING...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
