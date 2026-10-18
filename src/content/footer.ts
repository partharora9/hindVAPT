export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterContent {
  taglineLines: string[];
  newsletterTitle: string;
  newsletterDescription: string;
  copyright: string;
  legalNotice: string;
  mainPages: FooterLinkItem[];
  utilityPages: FooterLinkItem[];
}

export const FOOTER_CONTENT: FooterContent = {
  taglineLines: [
    "we help businesses find and fix",
    "security weaknesses before",
    "attackers do.",
  ],
  newsletterTitle: "Stay connected",
  newsletterDescription:
    "Get security insights, vulnerability advisories and updates from our team.",
  copyright: "Copyright © VAULTIX",
  legalNotice: "All testing is performed with written authorisation.",
  mainPages: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Methodology", href: "/about#process" },
  ],
  utilityPages: [
    { label: "Contact", href: "/contact" },
    { label: "Sample Report", href: "/sample-report" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Responsible Disclosure", href: "/responsible-disclosure" },
    { label: "Security Policy", href: "/security-policy" },
    { label: "FAQ", href: "/#faq" },
  ],
};
