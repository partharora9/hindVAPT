"use client";

import React, { useState } from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";
import { SITE_CONFIG } from "@/content/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    scope: "Web Application Pentest",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SubpageLayout
      title="Request a Security Assessment"
      tag="Contact"
      description="Tell us about your testing scope, target environments and timelines. Our offensive security engineers will schedule a confidential scoping discussion."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Scoping Form */}
        <div className="lg:col-span-7 bg-[#050C1F] border border-[rgba(30,155,255,0.2)] p-6 sm:p-8 rounded-[8px]">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] flex items-center justify-center text-xl font-bold mb-4">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Assessment Request Received</h3>
              <p className="text-[#8FA3C7] text-sm max-w-md mx-auto">
                Thank you for contacting VAULTIX. A lead security engineer will review your scope and provide a mutual NDA and scoping questionnaire within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8FA3C7] mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[#030818] border border-[rgba(30,155,255,0.25)] rounded-[4px] px-4 py-2.5 text-white placeholder-[#455A7C] focus:border-[#1E9BFF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8FA3C7] mb-2">
                    Corporate Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-[#030818] border border-[rgba(30,155,255,0.25)] rounded-[4px] px-4 py-2.5 text-white placeholder-[#455A7C] focus:border-[#1E9BFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8FA3C7] mb-2">
                    Company Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corporation"
                    className="w-full bg-[#030818] border border-[rgba(30,155,255,0.25)] rounded-[4px] px-4 py-2.5 text-white placeholder-[#455A7C] focus:border-[#1E9BFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8FA3C7] mb-2">
                  Primary Assessment Scope
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-[#030818] border border-[rgba(30,155,255,0.25)] rounded-[4px] px-4 py-2.5 text-white focus:border-[#1E9BFF] focus:outline-none"
                >
                  <option>Web Application Pentest</option>
                  <option>API Security Testing</option>
                  <option>Mobile App Security (iOS/Android)</option>
                  <option>Network & Infrastructure Pentest</option>
                  <option>Cloud Architecture & IAM Review</option>
                  <option>Red Team Objective Simulation</option>
                  <option>Secure Code Review</option>
                  <option>Compliance Readiness (SOC 2 / ISO 27001)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8FA3C7] mb-2">
                  Target Details & Timelines
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline asset counts (IPs, endpoints, pages), staging vs production preference, compliance drivers and requested start window."
                  className="w-full bg-[#030818] border border-[rgba(30,155,255,0.25)] rounded-[4px] px-4 py-2.5 text-white placeholder-[#455A7C] focus:border-[#1E9BFF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E9BFF] hover:bg-[#3AA8FF] text-[#020617] font-bold text-sm tracking-wider uppercase rounded-[4px] transition-all shadow-[0_0_20px_rgba(30,155,255,0.4)]"
              >
                Submit Scoping Request
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Commitments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#050C1F] border border-[rgba(30,155,255,0.18)] p-6 rounded-[8px]">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm text-[#8FA3C7]">
              <div>
                <span className="block text-xs text-[#6B7FA8] uppercase">Scoping Inquiries</span>
                <span className="text-white font-medium">{SITE_CONFIG.contact.email}</span>
              </div>
              <div>
                <span className="block text-xs text-[#6B7FA8] uppercase">Direct Line</span>
                <span className="text-white font-medium">{SITE_CONFIG.contact.phone}</span>
              </div>
              <div>
                <span className="block text-xs text-[#6B7FA8] uppercase">Headquarters</span>
                <span className="text-white font-medium">{SITE_CONFIG.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#050C1F] border border-[rgba(30,155,255,0.18)] p-6 rounded-[8px]">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-3">
              Assessment Commitments
            </h3>
            <ul className="space-y-2.5 text-xs text-[#8FA3C7]">
              <li className="flex items-start gap-2">
                <span className="text-[#1E9BFF] font-bold">✓</span>
                <span>Mutual NDA executed prior to any technical disclosure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E9BFF] font-bold">✓</span>
                <span>Testing conducted strictly inside agreed rules of engagement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E9BFF] font-bold">✓</span>
                <span>Every engagement includes 1 free retest to verify your fixes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
