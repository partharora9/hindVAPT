"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";

export default function PrivacyPolicyPage() {
  return (
    <SubpageLayout
      title="Privacy Policy"
      tag="Legal"
      description="How VAULTIX collects, processes and protects customer personal and technical assessment data."
      isDraftLegal={true}
    >
      <div className="prose prose-invert max-w-none text-sm text-[#8FA3C7] space-y-6">
        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            1. Scope and Controller Information
          </h2>
          <p className="leading-relaxed">
            This Privacy Policy governs the processing of personal data by VAULTIX in connection with our website, client portal, and vulnerability assessment and penetration testing engagements. For all commercial pentest engagements, customer data handling is further governed by the executed Master Services Agreement and Mutual Non-Disclosure Agreement.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            2. Customer Assessment and Technical Data
          </h2>
          <p className="leading-relaxed">
            During security testing, VAULTIX security engineers may temporarily interact with system logs, network metadata, and vulnerability proofs of concept. All assessment findings, target IP addresses, API responses, and proof-of-concept artefacts are encrypted at rest using AES-256 and transmitted exclusively via end-to-end encrypted tunnels.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            3. Data Retention and Secure Deletion
          </h2>
          <p className="leading-relaxed">
            Technical assessment data, raw vulnerability scanner logs, and evidentiary payloads are retained for a standard period of 30 days post final report delivery to support client remediation queries and the included retest. Following retest completion or upon written client request, all target telemetry is permanently purged in compliance with NIST SP 800-88 guidelines.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            4. Contact and Data Protection Officer
          </h2>
          <p className="leading-relaxed">
            For questions regarding our privacy practices, data subject rights under GDPR or UK Data Protection Act, please contact our Data Protection Officer at privacy@example.com.
          </p>
        </section>
      </div>
    </SubpageLayout>
  );
}
