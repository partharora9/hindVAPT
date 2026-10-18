"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for telemetry monitoring
    console.error("VAULTIX Runtime Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#020617] text-[#C3D4FF] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 cyber-vignette pointer-events-none" />

      {/* Anomaly Tag */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 border border-red-500/40 bg-[#1a0808] text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-400 mb-6">
        <span className="w-2 h-2 bg-red-500 animate-ping" />
        SECURITY SUBSYSTEM ANOMALY
      </div>

      <h1 className="relative z-10 text-4xl sm:text-6xl font-mono font-extrabold uppercase tracking-tight text-white mb-4">
        TELEMETRY <span className="text-red-400">FAULT</span>
      </h1>

      <p className="relative z-10 max-w-md text-[#8FA3C7] font-mono text-sm leading-relaxed mb-8">
        An unexpected telemetry parsing error occurred. The autonomous defense stack has isolated the component.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="relative z-10 inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-[#1E9BFF] hover:bg-[#3cb0ff] text-[#020617] font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_24px_rgba(30,155,255,0.4)] focus-visible:ring-2 focus-visible:ring-[#1E9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] outline-none cursor-pointer"
      >
        REINITIALIZE TELEMETRY
      </button>
    </div>
  );
}
