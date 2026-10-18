"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { navVariants, logoVariants, EASINGS } from "@/config/animation";
import { useMotionGovernance } from "@/context/MotionContext";
import { useScramble } from "@/hooks/useScramble";
import { SITE_CONFIG } from "@/content/site";

const NAV_ITEMS = SITE_CONFIG.nav.items;

interface NavbarProps {
  onStartTrial?: () => void;
}

export function Navbar({ onStartTrial }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathname === "/about" ? "about" : "home");
  const [hasScrolled, setHasScrolled] = useState(false);
  const { reduced, isTouch } = useMotionGovernance();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Sync active section on route change
  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
    } else if (pathname === "/") {
      setActiveSection("home");
    }
  }, [pathname]);

  // Scroll progress for the 1px accent line
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track 8px scroll for background blur intensity
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 8);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ESC key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !menuRef.current) return;
    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [mobileMenuOpen]);

  // Active section tracking via IntersectionObserver (only on root homepage)
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = [
      "home",
      "trusted-by",
      "threat-landscape",
      "capabilities",
      "services",
      "insights",
      "testimonials",
      "faq",
    ];
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
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      const targetEl = document.getElementById(sectionId);
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
      className={`fixed top-0 left-0 right-0 z-40 w-full h-[104px] border-b transition-colors duration-300 pt-safe ${
        hasScrolled
          ? "border-[rgba(30,155,255,0.2)] bg-[#020617]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "border-[rgba(30,155,255,0.12)] bg-[#020617]/80 backdrop-blur-md"
      }`}
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
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#FFFFFF] animate-pulse" />
          </motion.div>

          <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white select-none transition-colors duration-200 group-hover:text-[#1E9BFF]">
            VAULTIX
          </span>
        </Link>

        {/* Desktop Navigation Links (>=1024px) */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              (item.href === "/about" && pathname === "/about") ||
              (item.href === "/#home" && pathname === "/" && activeSection === "home") ||
              (item.id === activeSection);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25 + index * 0.05,
                  duration: 0.5,
                  ease: EASINGS.cyber,
                }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`group relative text-[13px] font-mono tracking-[0.18em] transition-colors duration-200 py-1 select-none focus-visible:ring-1 focus-visible:ring-[#1E9BFF] outline-none ${
                    isActive ? "text-white font-bold" : "text-[#8FA3C7] hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E9BFF] shadow-[0_0_12px_#1E9BFF]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <Link
            href={SITE_CONFIG.nav.cta.href}
            onClick={(e) => {
              if (onStartTrial) {
                e.preventDefault();
                onStartTrial();
              }
            }}
            className="relative hidden sm:inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-[#1E9BFF] text-[#020617] text-[13px] font-bold tracking-[0.18em] uppercase rounded-none overflow-hidden transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none cursor-pointer hover:shadow-[0_0_32px_rgba(30,155,255,0.65)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">{SITE_CONFIG.nav.cta.label}</span>
          </Link>

          {/* Mobile Hamburger Button (<1024px, >=44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 min-h-[44px] min-w-[44px] border border-[#1E9BFF]/30 text-[#1E9BFF] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#1E9BFF] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#1E9BFF] my-1.5 transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#1E9BFF] transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 1px Accent Scroll Progress Bar (Phase 5.4) */}
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#1E9BFF] via-[#3cb0ff] to-[#1E9BFF] shadow-[0_0_8px_rgba(30,155,255,0.8)]"
        aria-hidden="true"
      />

      {/* Full-Screen Animated Mobile Menu (<1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASINGS.cyber }}
            className="fixed inset-0 z-50 lg:hidden bg-[#020617]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-safe pb-safe overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header: Logo & Close Button */}
            <div className="w-full flex items-center justify-between border-b border-[rgba(30,155,255,0.15)] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-[#1E9BFF]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#1E9BFF]">
                    <path
                      d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-[0.25em] text-white">VAULTIX</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#1E9BFF]/30 text-[#8FA3C7] hover:text-white text-lg focus-visible:ring-2 focus-visible:ring-[#1E9BFF] outline-none"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Links with Staggered Entrance & Decode */}
            <nav className="flex flex-col gap-3 my-auto py-8" aria-label="Mobile Navigation Links">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4, ease: EASINGS.cyber }}
                  >
                    <MobileNavLink
                      item={item}
                      isActive={isActive}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, item.href, item.id);
                      }}
                    />
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA Button */}
            <div className="w-full pt-6 border-t border-[rgba(30,155,255,0.15)]">
              <Link
                href={SITE_CONFIG.nav.cta.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartTrial?.();
                }}
                className="block w-full min-h-[48px] py-4 bg-[#1E9BFF] text-[#020617] text-sm font-bold tracking-[0.2em] uppercase text-center cursor-pointer shadow-[0_0_24px_rgba(30,155,255,0.5)] active:scale-[0.98] transition-transform"
              >
                {SITE_CONFIG.nav.cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileNavLink({
  item,
  isActive,
  onClick,
}: {
  item: { id: string; label: string; href: string };
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const decoded = useScramble(item.label, { durationMs: 400, delayMs: 100 });

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center justify-between min-h-[44px] py-2 px-3 text-lg font-mono tracking-[0.2em] uppercase border-l-2 transition-all ${
        isActive
          ? "border-[#1E9BFF] bg-[rgba(30,155,255,0.08)] text-white font-bold"
          : "border-transparent text-[#8FA3C7] hover:text-white"
      }`}
    >
      <span>{decoded || item.label}</span>
      {isActive && <span className="text-[#1E9BFF] text-xs">● ACTIVE</span>}
    </Link>
  );
}
