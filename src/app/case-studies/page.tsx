"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "cs1",
      sector: "FINTECH · PAYMENT GATEWAY",
      title: "Zero-Day Logic Flaw in Payment Authorisation",
      objective: "Full-scope web & API penetration test prior to Series B launch.",
      outcome: "Discovered critical parameter tampering enabling transaction approval bypass. Remediated within 48 hours; retest verified complete closure.",
      metrics: "CVSS 9.1 · Remediated & Verified",
    },
    {
      id: "cs2",
      sector: "HEALTHCARE · SAAS PLATFORM",
      title: "Multi-Tenant Isolation and HIPAA Compliance Validation",
      objective: "Comprehensive multi-tenant API security audit and lateral movement testing.",
      outcome: "Identified 3 BOLA vulnerabilities and S3 misconfigurations. Remediated and verified with audit-ready documentation.",
      metrics: "SOC 2 & ISO 27001 Evidence Delivered",
    },
    {
      id: "cs3",
      sector: "ENTERPRISE · E-COMMERCE",
      title: "Red Team Adversary Simulation Across Hybrid Cloud",
      objective: "Simulate targeted spear-phishing and internal domain compromise.",
      outcome: "Mapped detection gaps across endpoint EDR and cloud IAM, training internal blue team on real-world threat actors.",
      metrics: "MITRE ATT&CK Matrix Completed",
    },
  ];

  return (
    <SubpageLayout
      title="Engagement Case Studies"
      tag="Case Studies"
      description="Sanitised scenario summaries demonstrating our offensive methodology, impact validation, and post-remediation verification."
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <SampleDataBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="p-6 rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono text-[#1E9BFF] mb-2 font-bold tracking-wider">
                  {cs.sector}
                </div>
                <h2 className="text-white font-bold text-base uppercase leading-snug mb-3">
                  {cs.title}
                </h2>
                <div className="text-xs text-[#8FA3C7] mb-4 space-y-2">
                  <p><strong className="text-[#C3D4FF]">Objective:</strong> {cs.objective}</p>
                  <p><strong className="text-[#C3D4FF]">Outcome:</strong> {cs.outcome}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(30,155,255,0.12)] flex items-center justify-between text-xs">
                <span className="font-mono text-[#22C55E] font-medium">{cs.metrics}</span>
                <span className="text-[#6B7FA8]">[VERIFY]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
