"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface SubpageLayoutProps {
  title: string;
  tag: string;
  description?: string;
  isDraftLegal?: boolean;
  children: React.ReactNode;
}

export function SubpageLayout({
  title,
  tag,
  description,
  isDraftLegal = false,
  children,
}: SubpageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-[#C3D4FF] flex flex-col font-mono selection:bg-[#1E9BFF]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-24 px-4 sm:px-8 max-w-[1280px] mx-auto w-full">
        {/* Subtle background cyber grid */}
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" aria-hidden="true" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.2em] text-[#6B7FA8] uppercase mb-6">
          <Link href="/" className="hover:text-[#1E9BFF] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-[#C3D4FF]">{tag}</span>
        </div>

        {/* Legal Draft Warning Banner */}
        {isDraftLegal && (
          <div
            className="mb-8 p-3.5 sm:p-4 rounded-[6px] bg-[#EAB308]/10 border border-[#EAB308]/40 flex items-center gap-3 text-[#EAB308]"
            role="alert"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shrink-0" />
            <span className="font-mono text-[12px] sm:text-[13px] tracking-wide font-medium">
              Draft: needs legal review before commercial publication.
            </span>
          </div>
        )}

        {/* Header Block */}
        <div className="border-b border-[rgba(30,155,255,0.18)] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1E9BFF] bg-[rgba(30,155,255,0.08)] border border-[rgba(30,155,255,0.25)] rounded-[4px] mb-4">
            [ {tag} ]
          </div>
          <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-white tracking-tight leading-tight uppercase">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#8FA3C7] max-w-[760px] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Page Content */}
        <div className="relative z-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
