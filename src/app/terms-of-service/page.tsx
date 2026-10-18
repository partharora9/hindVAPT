"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";

export default function TermsOfServicePage() {
  return (
    <SubpageLayout
      title="Terms of Service"
      tag="Legal"
      description="Terms and conditions governing use of the VAULTIX web portal and security testing service agreements."
      isDraftLegal={true}
    >
      <div className="prose prose-invert max-w-none text-sm text-[#8FA3C7] space-y-6">
        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            1. Authorisation Requirement
          </h2>
          <p className="leading-relaxed">
            All security testing services provided by VAULTIX require explicit, prior written authorisation from the asset owner. Clients represent and warrant that they possess full legal ownership, administrative authority, and all necessary third-party consents (including cloud service provider notifications where applicable) for all systems, IP addresses, domains, and applications submitted for testing.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            2. Rules of Engagement
          </h2>
          <p className="leading-relaxed">
            Every penetration test is executed strictly within agreed Rules of Engagement (RoE). The RoE document defines target boundaries, prohibited exploit classes (e.g. denial-of-service), testing windows, emergency contact protocols, and rate-limiting thresholds to prevent service interruption.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            3. Limitation of Liability
          </h2>
          <p className="leading-relaxed">
            While VAULTIX employs industry-standard offensive methodologies and non-destructive proof-of-concept exploits, security testing inherently carries minor risks of unexpected system behaviour. Liability caps, mutual indemnifications, and service warranties are detailed in each client&apos;s bilateral Statement of Work.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            4. Retesting Policy
          </h2>
          <p className="leading-relaxed">
            VAULTIX includes one complimentary retest for in-scope findings within 30 days of initial report publication. Subsequent retests or scope modifications are billed under standard day rates.
          </p>
        </section>
      </div>
    </SubpageLayout>
  );
}
