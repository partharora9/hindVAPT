export interface ServiceContentItem {
  id: string;
  row: number; // 0, 1, 2
  col: number; // 0, 1, 2
  title: string;
  description: string;
  iconType:
    | "web-app"
    | "mobile-app"
    | "api-security"
    | "network-pentest"
    | "cloud-security"
    | "red-team"
    | "secure-code"
    | "phishing-social"
    | "compliance-audit";
}

export interface ServicesSectionContent {
  tag: string;
  headlineLine1: string;
  headlineLine2: string;
  services: ServiceContentItem[];
}

export const SERVICES_CONTENT: ServicesSectionContent = {
  tag: "Services",
  headlineLine1: "OFFENSIVE SECURITY",
  headlineLine2: "FOR EVERY ATTACK SURFACE",
  services: [
    {
      id: "web-app-pentest",
      row: 0,
      col: 0,
      title: "WEB APPLICATION PENTEST",
      description:
        "OWASP Top 10 and business-logic testing of your web apps, from authentication to payments.",
      iconType: "web-app",
    },
    {
      id: "mobile-app-security",
      row: 0,
      col: 1,
      title: "MOBILE APP SECURITY",
      description:
        "Android and iOS testing covering insecure storage, weak crypto, API abuse and reverse engineering.",
      iconType: "mobile-app",
    },
    {
      id: "api-security-testing",
      row: 0,
      col: 2,
      title: "API SECURITY TESTING",
      description:
        "REST, GraphQL and SOAP testing for broken authorisation, injection and data exposure.",
      iconType: "api-security",
    },
    {
      id: "network-pentest",
      row: 1,
      col: 0,
      title: "NETWORK PENETRATION TEST",
      description:
        "Internal and external testing of servers, firewalls and Active Directory for exploitable paths.",
      iconType: "network-pentest",
    },
    {
      id: "cloud-security-review",
      row: 1,
      col: 1,
      title: "CLOUD SECURITY REVIEW",
      description:
        "AWS, Azure and GCP configuration, IAM and storage reviews against CIS and vendor best practice.",
      iconType: "cloud-security",
    },
    {
      id: "red-team-operations",
      row: 1,
      col: 2,
      title: "RED TEAM OPERATIONS",
      description:
        "Objective-based attack simulations that test your people, processes and detection capability.",
      iconType: "red-team",
    },
    {
      id: "secure-code-review",
      row: 2,
      col: 0,
      title: "SECURE CODE REVIEW",
      description:
        "Manual and tool-assisted source code analysis to catch flaws before they reach production.",
      iconType: "secure-code",
    },
    {
      id: "phishing-social-engineering",
      row: 2,
      col: 1,
      title: "PHISHING & SOCIAL ENGINEERING",
      description:
        "Controlled campaigns that measure staff awareness and turn results into targeted training.",
      iconType: "phishing-social",
    },
    {
      id: "compliance-audit-readiness",
      row: 2,
      col: 2,
      title: "COMPLIANCE & AUDIT READINESS",
      description:
        "Testing evidence mapped to ISO 27001, SOC 2, PCI DSS and GDPR requirements.",
      iconType: "compliance-audit",
    },
  ],
};
