"use client";

import React from "react";
import { SubpageLayout } from "@/components/common/SubpageLayout";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export default function BlogPage() {
  const posts = [
    {
      id: "b1",
      title: "Chaining Broken Access Control with GraphQL Introspection",
      category: "OFFENSIVE RESEARCH",
      date: "OCTOBER 2026",
      readTime: "7 MIN READ",
      summary: "How subtle GraphQL misconfigurations allow attackers to map hidden queries and bypass BOLA authorisation in multi-tenant architectures.",
    },
    {
      id: "b2",
      title: "Why Automated Scanners Miss Critical Business Logic Flaws",
      category: "METHODOLOGY",
      date: "OCTOBER 2026",
      readTime: "5 MIN READ",
      summary: "Analysis of 120 manual pentest engagements: why scanners fail at state transitions, payment flows, and role impersonation.",
    },
    {
      id: "b3",
      title: "Hardening Cloud IAM: Lessons from 50 AWS & Azure Penetration Tests",
      category: "CLOUD SECURITY",
      date: "SEPTEMBER 2026",
      readTime: "9 MIN READ",
      summary: "The most common privilege escalation paths in cloud infrastructure and actionable policies to enforce true least privilege.",
    },
  ];

  return (
    <SubpageLayout
      title="Offensive Security Insights"
      tag="Blog"
      description="Technical advisories, exploitation deep-dives, and remediation playbooks written by VAULTIX penetration testing engineers."
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <SampleDataBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-[8px] bg-[#050C1F] border border-[rgba(30,155,255,0.2)] flex flex-col justify-between hover:border-[#1E9BFF]/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#1E9BFF] font-mono mb-3">
                  <span>{post.category}</span>
                  <span className="text-[#6B7FA8]">{post.date}</span>
                </div>
                <h2 className="text-white font-bold text-base uppercase leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-xs text-[#8FA3C7] leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(30,155,255,0.12)] text-[11px]">
                <span className="text-[#6B7FA8]">{post.readTime}</span>
                <span className="text-[#1E9BFF] font-bold">READ ARTICLE →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
