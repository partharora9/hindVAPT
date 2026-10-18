"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";

export default function ResponsibleDisclosurePage() {
  return (
    <SubpageLayout
      title="Responsible Disclosure Policy"
      tag="Security"
      description="Guidelines for security researchers to report vulnerabilities discovered in VAULTIX infrastructure."
      isDraftLegal={true}
    >
      <div className="prose prose-invert max-w-none text-sm text-[#8FA3C7] space-y-6">
        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Our Commitment to Coordinated Disclosure
          </h2>
          <p className="leading-relaxed">
            VAULTIX welcomes responsible vulnerability reports from the independent security research community. If you believe you have discovered a security weakness in our public systems or web properties, we request that you report it to us in accordance with this policy.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Guidelines for Responsible Research
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Do not disrupt production systems, degrade service availability, or execute Denial-of-Service (DoS/DDoS) payloads.</li>
            <li>Do not compromise customer privacy or access, modify, or destroy data belonging to any third party.</li>
            <li>Provide reasonable time for our engineering team to remediate findings prior to any public disclosure.</li>
            <li>Use secure channels (encrypted email or PGP) when transmitting technical proofs of concept.</li>
          </ul>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Reporting Channel & PGP Key
          </h2>
          <p className="leading-relaxed mb-3">
            Send vulnerability reports with step-by-step reproduction steps to <code className="text-[#1E9BFF]">security@example.com</code>.
          </p>
          <div className="bg-[#020617] p-3 rounded border border-[rgba(30,155,255,0.2)] font-mono text-xs text-[#6B7FA8]">
            Key Fingerprint: 4E5F 89A2 B3C4 D5E6 F701 2345 6789 ABCD EF01 2345 [VERIFY]
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
