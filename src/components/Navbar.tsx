"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { NavItem } from "@/types";
import { navVariants, logoVariants } from "@/config/animation";

const NAV_ITEMS: { id: string; label: string; href: string }[] = [
  { id: "home", label: "HOME", href: "#home" },
  { id: "trusted-by", label: "TRUSTED BY", href: "#trusted-by" },
  { id: "threat-landscape", label: "THREAT LANDSCAPE", href: "#threat-landscape" },
  { id: "capabilities", label: "CAPABILITIES", href: "#capabilities" },
  { id: "services", label: "SERVICES", href: "#services" },
  { id: "insights", label: "INSIGHTS", href: "#insights" },
  { id: "testimonials", label: "TESTIMONIALS", href: "#testimonials" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

interface NavbarProps {
  onStartTrial?: () => void;
}

export function Navbar({ onStartTrial }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const shouldReduceMotion = useReducedMotion();

  // Active nav link updating via IntersectionObserver
  React.useEffect(() => {
    const sectionIds = ["home", "trusted-by", "threat-landscape", "capabilities", "services", "insights", "testimonials", "faq"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (href.startsWith("#")) {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="relative z-50 w-full h-[104px] border-b border-[rgba(30,155,255,0.12)] bg-[#020617]/85 backdrop-blur-md"
    >
      <div className="max-w-[1600px] h-full mx-auto px-6 sm:px-10 lg:px-[52px] flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none"
          aria-label="VAULTIX - Home"
        >
          <motion.div
            variants={logoVariants}
            className="relative flex items-center justify-center w-7 h-7"
          >
            {/* Sparkle 4-point star SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#1E9BFF] filter drop-shadow-[0_0_8px_rgba(30,155,255,0.85)]"
              aria-hidden="true"
            >
              <path
                d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
                fill="currentColor"
              />
            </svg>
            {/* Ambient center pulse dot */}
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#FFFFFF] animate-pulse" />
          </motion.div>

          <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white select-none transition-colors duration-200 group-hover:text-[#1E9BFF]">
            VAULTIX
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-10"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25 + index * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative py-1 text-[13px] tracking-[0.22em] font-medium uppercase transition-colors duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] ${
                    isActive
                      ? "text-[#1E9BFF] font-semibold drop-shadow-[0_0_8px_rgba(30,155,255,0.4)]"
                      : "text-[#8FA3C7] hover:text-[#1E9BFF]"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Underline grows from left */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-[#1E9BFF] transition-all duration-300 ${
                      isActive
                        ? "w-full shadow-[0_0_8px_#1E9BFF]"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            onClick={onStartTrial}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -2,
                    boxShadow: "0 0 32px rgba(30, 155, 255, 0.65)",
                  }
            }
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="relative hidden sm:inline-flex items-center justify-center px-6 py-3 bg-[#1E9BFF] text-[#020617] text-[13px] font-bold tracking-[0.18em] uppercase rounded-none overflow-hidden transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none cursor-pointer"
          >
            {/* Hover shine sweep effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">START FREE TRIAL</span>
          </motion.button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-[#1E9BFF]/30 text-[#1E9BFF] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-5 h-0.5 bg-[#1E9BFF] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#1E9BFF] my-1 transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#1E9BFF] transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[104px] left-0 w-full bg-[#020617]/98 border-b border-[#1E9BFF]/20 backdrop-blur-xl px-6 py-8 flex flex-col gap-6"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.href, item.id);
                  }}
                  className={`text-base font-semibold tracking-[0.2em] uppercase py-2 border-b border-[#1E9BFF]/10 ${
                    isActive ? "text-[#1E9BFF]" : "text-[#8FA3C7]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartTrial?.();
              }}
              className="w-full py-3.5 bg-[#1E9BFF] text-[#020617] text-sm font-bold tracking-[0.2em] uppercase text-center mt-2 cursor-pointer shadow-[0_0_20px_rgba(30,155,255,0.4)]"
            >
              START FREE TRIAL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
