import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutProcess } from "@/components/about/AboutProcess";
import { AboutStandards } from "@/components/about/AboutStandards";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutEthics } from "@/components/about/AboutEthics";
import { AboutCta } from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About VAULTIX | VAPT and Penetration Testing",
  description:
    "VAULTIX is a team of offensive security engineers. We find the weaknesses attackers look for, prove their impact, and help you fix them with clear, practical guidance.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About VAULTIX | VAPT and Penetration Testing",
    description:
      "VAULTIX is a team of offensive security engineers providing expert-led vulnerability assessment, penetration testing and adversary simulations.",
    url: "https://vaultix.cyber/about",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "About VAULTIX | VAPT and Penetration Testing",
    description:
      "VAULTIX is a team of offensive security engineers providing expert-led vulnerability assessment, penetration testing and adversary simulations.",
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About VAULTIX",
  url: "https://vaultix.cyber/about",
  description:
    "VAULTIX is a team of offensive security engineers providing expert-led VAPT, penetration testing and red teaming.",
  mainEntity: {
    "@type": "Organization",
    name: "VAULTIX",
    url: "https://vaultix.cyber",
    logo: "https://vaultix.cyber/logo.png",
    knowsAbout: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Red Team Operations",
      "Web Application Security",
      "API Security Testing",
      "Cloud Infrastructure Review",
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://vaultix.cyber",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://vaultix.cyber/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#C3D4FF] font-mono selection:bg-[#1E9BFF]/30 selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Shared Global Navbar */}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* A. Hero */}
        <AboutHero />

        {/* B. Story & Mission (#story) */}
        <AboutStory />

        {/* C. Values & Principles (#values) */}
        <AboutValues />

        {/* D. Engagement Process (#process) */}
        <AboutProcess />

        {/* E. Standards & Frameworks (#standards) */}
        <AboutStandards />

        {/* F. Team (#team) - Hidden in prod if unverified */}
        <AboutTeam />

        {/* G. Trust & Rules of Engagement (#ethics) */}
        <AboutEthics />

        {/* H. Call to Action */}
        <AboutCta />
      </main>

      {/* Shared Global Footer */}
      <Footer />
    </div>
  );
}
