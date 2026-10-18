import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#C3D4FF] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none" />

      {/* Cyber Glow */}
      <div
        className="absolute w-[600px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(30, 155, 255, 0.45) 0%, transparent 70%)",
        }}
      />

      {/* 404 Status Tag */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#1E9BFF]/30 bg-[#0B1528] text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#1E9BFF] mb-6">
        <span className="w-2 h-2 bg-[#1E9BFF] animate-pulse" />
        ERROR 404 // ROUTE NOT FOUND
      </div>

      <h1 className="relative z-10 text-5xl sm:text-7xl font-mono font-extrabold uppercase tracking-tight text-white mb-4">
        SECTOR <span className="text-[#1E9BFF]">UNREACHABLE</span>
      </h1>

      <p className="relative z-10 max-w-md text-[#8FA3C7] font-mono text-sm sm:text-base leading-relaxed mb-8">
        The requested perimeter coordinate does not exist or has been relocated by autonomous defense protocols.
      </p>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-[#1E9BFF] hover:bg-[#3cb0ff] text-[#020617] font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_24px_rgba(30,155,255,0.4)] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none"
      >
        RETURN TO PERIMETER
      </Link>
    </div>
  );
}
