export interface HomeContent {
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    stats: {
      value: number;
      suffix: string;
      prefix?: string;
      decimals?: number;
      label: string;
      confirmNote: string;
    }[];
  };
  standards: {
    label: string;
    items: { id: string; name: string; category: string }[];
    clientLogosMode: boolean;
  };
  threatLandscape: {
    tag: string;
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    cards: {
      id: string;
      title: string;
      description: string;
      gaugeValue?: number;
    }[];
  };
  capabilities: {
    tag: string;
    headlineLine1: string;
    headlineLine2: string;
    cards: {
      id: string;
      badgeType: "browser-shield" | "lightning-shield" | "network-shield";
      titleLines: [string, string];
      paragraph: string;
      bullets: string[];
      mockType: "vulnerability-assessment" | "penetration-testing" | "red-team";
    }[];
  };
  insights: {
    tag: string;
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    cardA: {
      title: string;
      description: string;
      pill: string;
      rows: { severity: "Critical" | "High" | "Medium"; text: string }[];
    };
    cardB: {
      title: string;
      description: string;
      metricLabel: string;
      metricValue: number;
      metricSuffix: string;
      metricBadge: string;
    };
    cardC: {
      title: string;
      description: string;
      bars: { label: string; count: number; color: string }[];
    };
    cardD: {
      title: string;
      description: string;
      alerts: { title: string; host: string }[];
    };
    cardE: {
      title: string;
      description: string;
      gaugeLabel: string;
      resolvedCount: number;
      openCount: number;
    };
  };
}

export const HOME_CONTENT: HomeContent = {
  hero: {
    headlineLine1: "FIND WEAKNESSES",
    headlineLine2: "BEFORE THEY STRIKE",
    paragraph:
      "Expert-led VAPT for web, mobile, API, cloud and network. We find exploitable risks, prove the impact, and guide you to fix them.",
    ctaPrimary: {
      label: "BOOK AN ASSESSMENT",
      href: "/contact",
    },
    ctaSecondary: {
      label: "SEE OUR PROCESS",
      href: "/#services",
    },
    stats: [
      {
        value: 100,
        suffix: "%",
        label: "FINDINGS VALIDATED",
        confirmNote: "[CONFIRM: 100% manual validation commitment]",
      },
      {
        value: 10,
        suffix: "+",
        prefix: "",
        label: "TESTING DOMAINS",
        confirmNote: "[CONFIRM: 10+ testing domains scope]",
      },
      {
        value: 1,
        suffix: "",
        label: "FREE RETEST",
        confirmNote: "[CONFIRM: 1 free retest policy]",
      },
    ],
  },
  standards: {
    label: "ALIGNED WITH GLOBAL SECURITY STANDARDS",
    clientLogosMode: false,
    items: [
      { id: "owasp", name: "OWASP", category: "AppSec Standard" },
      { id: "nist", name: "NIST", category: "Cybersecurity Framework" },
      { id: "mitre", name: "MITRE ATT&CK", category: "Threat Matrix" },
      { id: "iso27001", name: "ISO 27001", category: "Information Security" },
      { id: "pci-dss", name: "PCI DSS", category: "Payment Card Security" },
      { id: "soc2", name: "SOC 2", category: "Trust Services Criteria" },
      { id: "cvss", name: "CVSS", category: "Vulnerability Scoring" },
      { id: "ptes", name: "PTES", category: "Pen Testing Standard" },
    ],
  },
  threatLandscape: {
    tag: "THE THREAT LANDSCAPE",
    headlineLine1: "WHY AUTOMATED SCANS",
    headlineLine2: "ALONE FALL SHORT",
    paragraph:
      "Attackers chain small flaws into real breaches. Scanners miss logic flaws and attack paths. Expert testing finds them first.",
    cards: [
      {
        id: "incomplete-coverage",
        title: "INCOMPLETE COVERAGE",
        description:
          "Point-in-time scans skip business logic and chained exploits. Full-scope testing covers all ten OWASP categories.",
        gaugeValue: 100,
      },
      {
        id: "expanding-attack-surface",
        title: "EXPANDING ATTACK SURFACE",
        description:
          "Cloud, APIs and third-party code add new entry points every release. Untested assets become the easiest targets.",
      },
      {
        id: "scanner-noise",
        title: "SCANNER NOISE",
        description:
          "Automated tools flood teams with false positives. Manual validation separates real, exploitable risk from noise.",
      },
    ],
  },
  capabilities: {
    tag: "CAPABILITIES",
    headlineLine1: "ATTACK-TESTED.",
    headlineLine2: "EVIDENCE-BACKED.",
    cards: [
      {
        id: "card-vulnerability-assessment",
        badgeType: "browser-shield",
        titleLines: ["VULNERABILITY", "ASSESSMENT"],
        paragraph:
          "Systematic discovery and prioritisation of weaknesses across your applications, networks and cloud, scored with CVSS so you know where to start.",
        bullets: [
          "Authenticated and unauthenticated scanning",
          "Every finding manually validated",
          "CVSS v3.1 scoring with CWE and CVE mapping",
        ],
        mockType: "vulnerability-assessment",
      },
      {
        id: "card-penetration-testing",
        badgeType: "lightning-shield",
        titleLines: ["PENETRATION", "TESTING"],
        paragraph:
          "Manual, scenario-based attacks that mimic real adversaries. We chain weaknesses to show real business impact, then help you close them.",
        bullets: [
          "Web, mobile, API, network and cloud",
          "Exploit chains with proof of concept",
          "Retest to verify your fixes",
        ],
        mockType: "penetration-testing",
      },
      {
        id: "card-red-team",
        badgeType: "network-shield",
        titleLines: ["RED TEAM", "OPERATIONS"],
        paragraph:
          "Objective-based simulations of targeted attacks across people, process and technology, to test your detection and response.",
        bullets: [
          "Social engineering and phishing",
          "External and assumed-breach scenarios",
          "Detection and response gap analysis",
        ],
        mockType: "red-team",
      },
    ],
  },
  insights: {
    tag: "REPORTING",
    headlineLine1: "FINDINGS YOU",
    headlineLine2: "CAN ACT ON",
    paragraph:
      "Every engagement ends with a clear report: an executive summary, technical detail, proof of concept and prioritised fixes.",
    cardA: {
      title: "PRIORITISED REMEDIATION",
      description:
        "Every finding comes with a severity rating, business impact and step-by-step fix guidance your developers can act on.",
      pill: "Remediation Plan",
      rows: [
        { severity: "Critical", text: "Fix immediately" },
        { severity: "High", text: "Fix this sprint" },
        { severity: "Medium", text: "Plan next release" },
      ],
    },
    cardB: {
      title: "SEVERITY TRENDS",
      description:
        "Track findings by severity across engagements and watch your risk fall with every retest.",
      metricLabel: "Findings",
      metricValue: 24,
      metricSuffix: "",
      metricBadge: "CVSS v3.1",
    },
    cardC: {
      title: "SEVERITY BREAKDOWN",
      description:
        "Findings are rated with CVSS and mapped to CWE and OWASP categories so teams know exactly where to start.",
      bars: [
        { label: "Critical", count: 3, color: "#FF4C68" },
        { label: "High", count: 8, color: "#FF8E3C" },
        { label: "Medium", count: 11, color: "#1E9BFF" },
        { label: "Low", count: 2, color: "#4CB8FF" },
      ],
    },
    cardD: {
      title: "ENGAGEMENT ACTIVITY",
      description:
        "Follow progress through the engagement with regular status updates and early alerts on critical findings.",
      alerts: [
        { title: "SQL INJECTION CONFIRMED", host: "api.example.com/login" },
        { title: "WEAK TLS CONFIGURATION", host: "203.0.113.24:443" },
        { title: "EXPOSED ADMIN PANEL", host: "app.example.com/admin" },
        { title: "MISSING RATE LIMITING", host: "api.example.com/auth" },
      ],
    },
    cardE: {
      title: "REMEDIATION PROGRESS",
      description:
        "Retesting confirms every fix. Reports show what is resolved, what is open and what comes next.",
      gaugeLabel: "RESOLVED",
      resolvedCount: 41,
      openCount: 8,
    },
  },
};
