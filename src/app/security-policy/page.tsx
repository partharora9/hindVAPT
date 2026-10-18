"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";

export default function SecurityPolicyPage() {
  return (
    <SubpageLayout
      title="Corporate Security Policy"
      tag="Security"
      description="Internal security controls, tooling hygiene and data governance practices enforced across VAULTIX operations."
      isDraftLegal={true}
    >
      <div className="prose prose-invert max-w-none text-sm text-[#8FA3C7] space-y-6">
        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Testing Infrastructure Hygiene
          </h2>
          <p className="leading-relaxed">
            All penetration testing workstations and scanner nodes operate in isolated VPCs with hardened base images, mandatory disk encryption (FIPS 140-2 validated), and multi-factor authentication enforced via hardware security keys. Customer credentials and assessment tokens are maintained in dedicated ephemeral secret stores.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Personnel and Access Governance
          </h2>
          <p className="leading-relaxed">
            All technical assessment staff undergo background checks and adhere to strict least-privilege access policies. Assessment findings are restricted strictly to assigned engagement personnel on a need-to-know basis.
          </p>
        </section>

        <section className="bg-[#050C1F] border border-[rgba(30,155,255,0.15)] p-6 rounded-[8px]">
          <h2 className="text-white font-bold text-base uppercase tracking-wider mb-3">
            Evidence Handling and Secure Destruction
          </h2>
          <p className="leading-relaxed">
            All client proofs of concept, sample databases, and vulnerability evidence are purged from testing jumpboxes within 30 days of engagement sign-off, or immediately upon client request.
          </p>
        </section>
      </div>
    </SubpageLayout>
  );
}
