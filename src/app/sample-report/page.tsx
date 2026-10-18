"use client";

import React from "react";
import Link from "next/link";
import { SubpageLayout } from "@/components/common/SubpageLayout";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export default function SampleReportPage() {
  return (
    <SubpageLayout
      title="VAULTIX VAPT Sample Report"
      tag="Report"
      description="Review the structure of our offensive security deliverables: executive summary, CVSS v3.1 scoring, step-by-step reproduction and developer-ready remediation guidance."
    >
      <div className="space-y-8">
        <div className="bg-[#050C1F] border border-[rgba(30,155,255,0.2)] p-6 sm:p-8 rounded-[8px] relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              Deliverable Anatomy
            </h2>
            <SampleDataBadge />
          </div>
          <p className="text-sm text-[#8FA3C7] mb-6 leading-relaxed">
            Our assessment reports are built for two distinct audiences: business executives who need clear risk posture metrics and resource priorities, and engineering teams who need exact reproduction steps and code-level fixes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#030818] border border-[rgba(30,155,255,0.15)] rounded">
              <span className="text-[#1E9BFF] font-bold block mb-1">SECTION 1</span>
              <span className="text-white font-bold block mb-2">Executive Summary</span>
              <p className="text-[#8FA3C7]">High-level risk narrative, CVSS distribution chart, and compliance impact overview.</p>
            </div>
            <div className="p-4 bg-[#030818] border border-[rgba(30,155,255,0.15)] rounded">
              <span className="text-[#1E9BFF] font-bold block mb-1">SECTION 2</span>
              <span className="text-white font-bold block mb-2">Technical Findings</span>
              <p className="text-[#8FA3C7]">CVSS v3.1 score, CWE/CVE mapping, HTTP request/response proofs and chained attack paths.</p>
            </div>
            <div className="p-4 bg-[#030818] border border-[rgba(30,155,255,0.15)] rounded">
              <span className="text-[#1E9BFF] font-bold block mb-1">SECTION 3</span>
              <span className="text-white font-bold block mb-2">Remediation Guide</span>
              <p className="text-[#8FA3C7]">Framework-specific fix instructions, config patches, and validation test cases for retesting.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#050C1F] border border-[rgba(30,155,255,0.18)] p-6 rounded-[8px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-base mb-1">Request a Redacted PDF Deliverable</h3>
            <p className="text-xs text-[#8FA3C7]">Download our sanitised enterprise pentest report with real vulnerability write-ups.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#1E9BFF] text-[#020617] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#3AA8FF] transition-colors shrink-0"
          >
            Request PDF Sample
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
}
