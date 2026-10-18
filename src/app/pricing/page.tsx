"use client";

import React from "react";
import Link from "next/link";
import { SubpageLayout } from "@/components/common/SubpageLayout";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export default function PricingPage() {
  const tiers = [
    {
      name: "TARGETED ASSESSMENT",
      duration: "1 Week",
      scope: "Single web app or API suite",
      description: "Ideal for pre-launch validation, critical release milestones, or vendor risk questionnaires.",
      features: [
        "OWASP Top 10 & business logic testing",
        "Authenticated + unauthenticated scenarios",
        "CVSS v3.1 scored findings with PoCs",
        "1 Free retest within 30 days",
        "Executive & technical reports",
      ],
      cta: "Request Scoping",
    },
    {
      name: "FULL-SCOPE VAPT",
      duration: "2-3 Weeks",
      scope: "Web, Mobile, APIs & Cloud infrastructure",
      description: "Comprehensive offensive assessment designed for audit readiness and multi-layer attack surface reviews.",
      features: [
        "Web, iOS, Android & backend API testing",
        "Cloud configuration & IAM review (AWS/Azure/GCP)",
        "Internal/external network penetration testing",
        "Chained exploit attack path demonstration",
        "1 Free retest & technical debrief call",
        "Audit-ready compliance evidence (SOC 2, ISO 27001)",
      ],
      popular: true,
      cta: "Book Assessment",
    },
    {
      name: "RED TEAM SIMULATION",
      duration: "4+ Weeks",
      scope: "Full organisation & assumed-breach",
      description: "Adversary simulation across people, processes, and technology to test your active SOC detection and response.",
      features: [
        "Spear-phishing & social engineering campaigns",
        "External perimeter breach simulation",
        "Assumed-breach internal lateral movement",
        "Active Directory privilege escalation",
        "Detection gap matrix mapped to MITRE ATT&CK",
        "Comprehensive blue team collaborative debrief",
      ],
      cta: "Discuss Objectives",
    },
  ];

  return (
    <SubpageLayout
      title="Transparent VAPT Pricing"
      tag="Pricing"
      description="Fixed-scope assessments tailored to your attack surface. Every engagement includes authenticated testing, CVSS-rated deliverables, and one free retest."
    >
      <div className="space-y-10">
        <div className="flex justify-end">
          <SampleDataBadge />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 sm:p-8 rounded-[8px] bg-[#050C1F] border flex flex-col justify-between ${
                tier.popular
                  ? "border-[#1E9BFF] shadow-[0_0_30px_rgba(30,155,255,0.15)] relative"
                  : "border-[rgba(30,155,255,0.2)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-[#1E9BFF] text-[#020617] text-[10px] font-bold tracking-widest uppercase">
                  MOST POPULAR
                </div>
              )}

              <div>
                <h3 className="text-white font-bold text-lg mb-1">{tier.name}</h3>
                <div className="text-xs text-[#1E9BFF] mb-3">{tier.duration} · {tier.scope}</div>
                <p className="text-xs text-[#8FA3C7] mb-6 leading-relaxed">{tier.description}</p>

                <div className="border-t border-[rgba(30,155,255,0.15)] pt-4 mb-6">
                  <span className="text-[11px] font-bold text-[#6B7FA8] uppercase tracking-wider block mb-3">
                    WHAT&apos;S INCLUDED:
                  </span>
                  <ul className="space-y-2 text-xs text-[#C3D4FF]">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="text-[#1E9BFF]">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className={`w-full py-3 text-center rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all ${
                  tier.popular
                    ? "bg-[#1E9BFF] hover:bg-[#3AA8FF] text-[#020617]"
                    : "bg-[#0C1830] hover:bg-[#122547] border border-[rgba(30,155,255,0.3)] text-white"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#030818] border border-[rgba(30,155,255,0.15)] rounded text-xs text-[#8FA3C7] text-center">
          Custom testing scopes, multi-year recurring retainers, and private continuous offensive security engagements are available upon request.
        </div>
      </div>
    </SubpageLayout>
  );
}
