"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/about";
import { useScramble } from "@/hooks/useScramble";
import { EASINGS } from "@/config/animation";

export function AboutTeam() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const shouldReduceMotion = useReducedMotion();
  const team = ABOUT_CONTENT.team;

  const decodedHeading = useScramble(team.h2, {
    durationMs: 700,
    delayMs: 200,
    autoStart: isInView,
  });

  const isProduction = process.env.NODE_ENV === "production";
  const verifiedMembers = team.members.filter((m) => m.isVerified);
  const displayMembers = isProduction ? verifiedMembers : team.members;

  // Build guard: hide completely in production if no members are verified
  if (isProduction && verifiedMembers.length === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative w-full py-24 border-b border-[rgba(30,155,255,0.15)] bg-[#020617] select-none"
      aria-label="Security Team and Leadership"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
            [ {team.tag} ]
          </div>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-white font-mono tracking-tight leading-tight uppercase">
            {decodedHeading || team.h2}
          </h2>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: EASINGS.cyber }}
              className="relative rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col group"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#1E9BFF] z-20" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#1E9BFF] z-20" />

              {/* Development Placeholder Ribbon */}
              {!member.isVerified && !isProduction && (
                <div className="absolute top-3 right-3 z-30">
                  <span className="font-mono text-[9px] font-bold text-[#EAB308] bg-[#EAB308]/15 border border-[#EAB308]/40 px-2 py-0.5 rounded tracking-widest uppercase">
                    PLACEHOLDER
                  </span>
                </div>
              )}

              {/* Portrait with Blue-Duotone Effect */}
              <div className="relative w-full aspect-[4/5] bg-[#091B3A] overflow-hidden">
                <Image
                  src={member.imageSrc}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Duotone blue color grade overlay */}
                <div className="absolute inset-0 bg-[#1E9BFF]/25 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1F] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Details Block */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-white font-mono text-[16px] font-bold uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <div className="text-[#8FA3C7] font-mono text-[13px] mt-0.5 mb-4">
                    {member.role}
                  </div>
                </div>

                {/* Credential Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(30,155,255,0.12)]">
                  {member.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-2 py-0.5 rounded bg-[rgba(30,155,255,0.1)] border border-[rgba(30,155,255,0.25)] text-[#1E9BFF] text-[10px] font-mono font-bold tracking-wider"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
