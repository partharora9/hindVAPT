export interface AboutContent {
  hero: {
    breadcrumb: string;
    tag: string;
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  story: {
    tag: string;
    h2: string;
    paragraphs: string[];
    checklist: { status: "done" | "in-progress" | "pending"; text: string }[];
    stats: { value: string; label: string; numericValue?: number; suffix?: string }[];
  };
  values: {
    tag: string;
    h2: string;
    items: {
      id: string;
      title: string;
      description: string;
      iconType: "auth" | "evidence" | "responsible" | "transfer";
    }[];
  };
  process: {
    tag: string;
    h2: string;
    steps: {
      number: string;
      title: string;
      description: string;
      deliverable: string;
    }[];
  };
  standards: {
    tag: string;
    h2: string;
    footnote: string;
    items: {
      id: string;
      name: string;
      usage: string;
    }[];
  };
  team: {
    tag: string;
    h2: string;
    members: {
      id: string;
      name: string;
      role: string;
      chips: string[];
      imageSrc: string;
      isVerified: boolean;
    }[];
  };
  ethics: {
    tag: string;
    h2: string;
    commitments: string[];
  };
  cta: {
    tag: string;
    h2: string;
    paragraph: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
}

export const ABOUT_CONTENT: AboutContent = {
  hero: {
    breadcrumb: "HOME / ABOUT",
    tag: "About VAULTIX",
    headlineLine1: "WE THINK LIKE ATTACKERS.",
    headlineLine2: "WE WORK FOR DEFENDERS.",
    paragraph:
      "VAULTIX is a team of offensive security engineers. We find the weaknesses attackers look for, prove their impact, and help you fix them with clear, practical guidance.",
    ctaPrimary: {
      label: "BOOK AN ASSESSMENT",
      href: "/contact",
    },
    ctaSecondary: {
      label: "VIEW SERVICES",
      href: "/#services",
    },
  },
  story: {
    tag: "Our mission",
    h2: "BUILT TO FIND WHAT OTHERS MISS",
    paragraphs: [
      "Most breaches start with a weakness that was never tested. We started VAULTIX to give organisations the same view an attacker has, before an attacker uses it.",
      "Our engineers combine manual testing, real-world attack techniques and clear reporting so security teams and developers know what to fix first and why.",
    ],
    checklist: [
      { status: "done", text: "Scope agreed in writing" },
      { status: "done", text: "Rules of engagement signed" },
      { status: "done", text: "Reconnaissance complete" },
      { status: "in-progress", text: "Testing in progress" },
      { status: "pending", text: "Report and walkthrough" },
    ],
    stats: [
      { value: "10+", label: "Testing domains", numericValue: 10, suffix: "+" },
      { value: "OWASP · PTES · NIST", label: "Methodologies" },
      { value: "CVSS v3.1", label: "Severity scoring" },
      { value: "1", label: "Free retest", numericValue: 1 },
    ],
  },
  values: {
    tag: "Principles",
    h2: "HOW WE WORK",
    items: [
      {
        id: "authorised-only",
        title: "AUTHORISED ONLY",
        description:
          "We test only what you have approved in writing, inside agreed rules of engagement.",
        iconType: "auth",
      },
      {
        id: "evidence-over-alarm",
        title: "EVIDENCE OVER ALARM",
        description:
          "Every finding is validated and comes with proof of concept, so you fix real risk, not noise.",
        iconType: "evidence",
      },
      {
        id: "responsible-by-default",
        title: "RESPONSIBLE BY DEFAULT",
        description:
          "Safe payloads, careful timing and secure handling of your data protect your systems during testing.",
        iconType: "responsible",
      },
      {
        id: "knowledge-transfer",
        title: "KNOWLEDGE TRANSFER",
        description:
          "Clear reports and walkthroughs help your developers learn from every finding and avoid repeating it.",
        iconType: "transfer",
      },
    ],
  },
  process: {
    tag: "Methodology",
    h2: "HOW AN ENGAGEMENT WORKS",
    steps: [
      {
        number: "[01]",
        title: "SCOPING AND RULES OF ENGAGEMENT",
        description:
          "We agree targets, timelines, testing windows and approvals in writing.",
        deliverable: "Signed scope",
      },
      {
        number: "[02]",
        title: "RECONNAISSANCE AND MAPPING",
        description:
          "We map your attack surface: domains, services, applications and APIs.",
        deliverable: "Asset map",
      },
      {
        number: "[03]",
        title: "VULNERABILITY DISCOVERY",
        description:
          "Automated tools and manual testing uncover weaknesses across the agreed scope.",
        deliverable: "Candidate findings",
      },
      {
        number: "[04]",
        title: "EXPLOITATION AND VALIDATION",
        description:
          "We safely exploit issues to confirm impact and chain them into realistic attack paths.",
        deliverable: "Validated findings",
      },
      {
        number: "[05]",
        title: "REPORTING AND WALKTHROUGH",
        description:
          "An executive summary, technical details, proof of concept and prioritised fixes, presented to your team.",
        deliverable: "Final report",
      },
      {
        number: "[06]",
        title: "REMEDIATION SUPPORT AND RETEST",
        description:
          "We answer fix questions and retest to confirm each issue is closed.",
        deliverable: "Retest results",
      },
    ],
  },
  standards: {
    tag: "Standards",
    h2: "ALIGNED WITH INDUSTRY FRAMEWORKS",
    footnote:
      "Standards named are the frameworks we test against; no endorsement is implied.",
    items: [
      {
        id: "owasp-top-10",
        name: "OWASP Top 10",
        usage: "Core web application vulnerability assessment standard.",
      },
      {
        id: "owasp-asvs",
        name: "OWASP ASVS",
        usage: "Application Security Verification Standard testing.",
      },
      {
        id: "owasp-masvs",
        name: "OWASP MASVS",
        usage: "Mobile application security verification benchmarks.",
      },
      {
        id: "ptes",
        name: "PTES",
        usage: "Penetration Testing Execution Standard lifecycle.",
      },
      {
        id: "nist-800-115",
        name: "NIST SP 800-115",
        usage: "Technical guide to information security testing and assessment.",
      },
      {
        id: "osstmm",
        name: "OSSTMM",
        usage: "Open Source Security Testing Methodology Manual.",
      },
      {
        id: "mitre-attack",
        name: "MITRE ATT&CK",
        usage: "Adversary tactics, techniques and attack path simulation.",
      },
      {
        id: "cvss",
        name: "CVSS v3.1",
        usage: "Industry-standard severity scoring for every finding.",
      },
      {
        id: "cwe-cve",
        name: "CWE / CVE",
        usage: "Standardised weakness classification and vulnerability indexing.",
      },
      {
        id: "iso-27001",
        name: "ISO 27001",
        usage: "Evidence mapping for information security management audits.",
      },
      {
        id: "soc-2",
        name: "SOC 2",
        usage: "Trust Services Criteria validation for security controls.",
      },
      {
        id: "pci-dss",
        name: "PCI DSS",
        usage: "Cardholder data environment penetration testing requirements.",
      },
    ],
  },
  team: {
    tag: "Team",
    h2: "THE PEOPLE BEHIND THE TESTS",
    members: [
      {
        id: "member-1",
        name: "[Security Engineer 1]",
        role: "Lead Penetration Tester",
        chips: ["OSCP", "OSWE", "CREST"],
        imageSrc: "/testimonials/1.jpg",
        isVerified: false,
      },
      {
        id: "member-2",
        name: "[Security Engineer 2]",
        role: "Cloud Security Specialist",
        chips: ["AWS Security", "GCP-PCA", "CISSP"],
        imageSrc: "/testimonials/2.jpg",
        isVerified: false,
      },
      {
        id: "member-3",
        name: "[Security Engineer 3]",
        role: "Red Team Lead",
        chips: ["CRTO", "OSCE", "eCPPT"],
        imageSrc: "/testimonials/3.jpg",
        isVerified: false,
      },
      {
        id: "member-4",
        name: "[Security Engineer 4]",
        role: "AppSec & Code Auditor",
        chips: ["OSWE", "GWAPT", "CISSP"],
        imageSrc: "/testimonials/4.jpg",
        isVerified: false,
      },
    ],
  },
  ethics: {
    tag: "Trust",
    h2: "RULES OF ENGAGEMENT",
    commitments: [
      "Written authorisation before any test",
      "NDA and strict confidentiality",
      "Safe testing that protects availability",
      "Secure handling and deletion of client data",
      "Responsible disclosure of any third-party issues",
      "Findings shared only with you",
    ],
  },
  cta: {
    tag: "Get started",
    h2: "READY TO FIND YOUR WEAKNESSES FIRST?",
    paragraph:
      "Tell us about your scope and we will reply with a plan and a quote.",
    ctaPrimary: {
      label: "BOOK AN ASSESSMENT",
      href: "/contact",
    },
    ctaSecondary: {
      label: "DOWNLOAD SAMPLE REPORT",
      href: "/sample-report",
    },
  },
};
