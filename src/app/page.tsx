"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { ThreatLandscape } from "@/components/ThreatLandscape";
import { FAQS_DATA } from "@/components/faq/faqData";

// Dynamic imports with reserved layout dimensions for zero CLS (Phase 4)
const CoreCapabilities = dynamic(
  () => import("@/components/CoreCapabilities").then((mod) => mod.CoreCapabilities),
  {
    ssr: true,
    loading: () => <div className="min-h-[800px] w-full" aria-hidden="true" />,
  }
);

const Services = dynamic(
  () => import("@/components/Services").then((mod) => mod.Services),
  {
    ssr: true,
    loading: () => <div className="min-h-[750px] w-full" aria-hidden="true" />,
  }
);

const Insights = dynamic(
  () => import("@/components/Insights").then((mod) => mod.Insights),
  {
    ssr: true,
    loading: () => <div className="min-h-[800px] w-full" aria-hidden="true" />,
  }
);

const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((mod) => mod.Testimonials),
  {
    ssr: true,
    loading: () => <div className="min-h-[700px] w-full" aria-hidden="true" />,
  }
);

const Faq = dynamic(
  () => import("@/components/Faq").then((mod) => mod.Faq),
  {
    ssr: true,
    loading: () => <div className="min-h-[600px] w-full" aria-hidden="true" />,
  }
);

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  {
    ssr: true,
    loading: () => <div className="min-h-[600px] w-full" aria-hidden="true" />,
  }
);

// Structured JSON-LD Data (Phase 7)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VAULTIX",
  url: "https://vaultix.cyber",
  logo: "https://vaultix.cyber/logo.png",
  description:
    "Expert-led Vulnerability Assessment and Penetration Testing (VAPT) for web, mobile, API, network and cloud environments.",
  sameAs: [
    "https://facebook.com/vaultix",
    "https://instagram.com/vaultix",
    "https://linkedin.com/company/vaultix",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VAULTIX",
  url: "https://vaultix.cyber",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-[#C3D4FF]">
      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd, websiteJsonLd, faqJsonLd]),
        }}
      />

      {/* 1. MASTER HERO SECTION (Above the fold - loaded eagerly for instant LCP) */}
      <Hero />

      {/* 2. MAIN CONTENT LANDMARK (WCAG 2.2 AA) */}
      <main id="main-content" className="w-full">
        {/* 2. TRUSTED BY LOGO MARQUEE (Section 2 - Seamless continuity from Hero) */}
        <TrustedBy id="trusted-by" />

        {/* 3. THE THREAT LANDSCAPE (Section 3 - 3-Column Card Grid) */}
        <ThreatLandscape id="threat-landscape" />

        {/* 4. CORE CAPABILITIES (Section 4 - Scroll-Driven Card Stack) */}
        <CoreCapabilities id="capabilities" />

        {/* 5. SERVICES (Section 5 - 3x3 Animated Security Matrix) */}
        <Services id="services" />

        {/* 6. INSIGHTS BENTO GRID (Section 6 - 2+3 Bento Matrix) */}
        <Insights id="insights" />

        {/* 7. TESTIMONIALS (Section 7 - Animated Customer Showcase) */}
        <Testimonials id="testimonials" />

        {/* 8. FAQ (Section 8 - Animated Cybersecurity Accordion) */}
        <Faq id="faq" />
      </main>

      {/* 9. FOOTER LANDMARK (Final Section - Pixel-Perfect Cybersecurity Footer) */}
      <Footer id="footer" />
    </div>
  );
}
