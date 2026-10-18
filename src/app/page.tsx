"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { ThreatLandscape } from "@/components/ThreatLandscape";
import { CoreCapabilities } from "@/components/CoreCapabilities";
import { Services } from "@/components/Services";
import { Insights } from "@/components/Insights";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [targetDomain, setTargetDomain] = useState("");
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete">("idle");

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDomain) return;
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("complete");
    }, 2400);
  };

  const handleLearnMore = () => {
    const el = document.getElementById("threat-landscape");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#C3D4FF]">
      {/* 1. MASTER HERO SECTION (Section 1) */}
      <Hero
        showFloatingBadge={false}
        onCtaClick={() => setTrialModalOpen(true)}
        onLearnMoreClick={handleLearnMore}
      />

      {/* 2. TRUSTED BY LOGO MARQUEE (Section 2 - Seamless continuity from Hero) */}
      <TrustedBy id="trusted-by" />

      {/* 3. THE THREAT LANDSCAPE (Section 3 - 3-Column Card Grid) */}
      <ThreatLandscape id="threat-landscape" />

      {/* 4. CORE CAPABILITIES (Section 4 - Scroll-Driven Card Stack) */}
      <CoreCapabilities id="capabilities" />

      {/* 5. SERVICES (Section 5 - 3x3 Animated Security Matrix) */}
      <Services id="services" />

      {/* 6. INSIGHTS BENTO GRID (Section 6 - 2+3 Bento Matrix) */}
      <Insights id="insights" />

      {/* 7. TESTIMONIALS (Section 7 - Animated Customer Showcase) */}
      <Testimonials id="testimonials" />

      {/* 8. FAQ (Section 8 - Animated Cybersecurity Accordion) */}
      <Faq id="faq" />

      {/* 9. FOOTER (Final Section - Pixel-Perfect Cybersecurity Footer) */}
      <Footer id="footer" />

      {/* 4. INTERACTIVE TRIAL / SCANNER MODAL */}
      <AnimatePresence>
        {trialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[560px] bg-[#030919] border border-[#1E9BFF]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(30,155,255,0.25)]"
            >
              <button
                type="button"
                onClick={() => {
                  setTrialModalOpen(false);
                  setScanStatus("idle");
                }}
                className="absolute top-4 right-4 text-[#8FA3C7] hover:text-white p-2 text-sm focus-visible:ring-2 focus-visible:ring-[#1E9BFF] outline-none"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#1E9BFF] tracking-[0.2em] uppercase mb-2">
                <span className="w-2 h-2 bg-[#1E9BFF]" />
                ATTACK SURFACE RECONNAISSANCE
              </div>

              <h3 className="text-2xl font-bold uppercase text-white tracking-wide">
                Start Free Enterprise Assessment
              </h3>
              <p className="text-sm text-[#8FA3C7] mt-2 mb-6">
                Deploy VAULTIX non-invasive threat crawlers against your target
                perimeter. Instant analysis report generated in real time.
              </p>

              {scanStatus === "idle" && (
                <form onSubmit={handleStartScan} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6B7FA8] mb-1">
                      Target Domain or IP Block
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. security.enterprise.com"
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      className="w-full px-4 py-3 bg-[#020617] border border-[#1E9BFF]/30 text-white placeholder-[#45567c] text-sm focus:border-[#1E9BFF] focus:outline-none focus:ring-1 focus:ring-[#1E9BFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1E9BFF] hover:bg-[#3cb0ff] text-[#020617] font-bold text-sm tracking-[0.18em] uppercase transition-colors cursor-pointer mt-2"
                  >
                    DEPLOY ACTIVE THREAT AUDIT
                  </button>
                </form>
              )}

              {scanStatus === "scanning" && (
                <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                  <div className="w-12 h-12 border-2 border-[#1E9BFF] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm tracking-widest uppercase text-[#C3D4FF] font-semibold animate-pulse">
                    Probing attack surface: {targetDomain}...
                  </span>
                  <div className="w-full bg-[#020617] h-1.5 overflow-hidden border border-[#1E9BFF]/20">
                    <motion.div
                      className="h-full bg-[#1E9BFF]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2, ease: "linear" }}
                    />
                  </div>
                </div>
              )}

              {scanStatus === "complete" && (
                <div className="flex flex-col gap-4 py-4 text-left">
                  <div className="p-4 bg-[#020617] border border-emerald-500/40 text-emerald-400 text-xs font-mono">
                    ✓ ASSESSMENT COMPLETE: 14 perimeter assets indexed. Zero critical leaks detected. Continuous telemetry armed.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTrialModalOpen(false);
                      setScanStatus("idle");
                    }}
                    className="w-full py-3 bg-[#1E9BFF] text-[#020617] font-bold text-xs tracking-widest uppercase cursor-pointer"
                  >
                    ACCESS LIVE DASHBOARD
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
