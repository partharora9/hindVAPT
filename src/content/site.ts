export interface SiteConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  contact: {
    email: string; // [CONFIRM]
    phone: string; // [CONFIRM]
    location: string; // [CONFIRM]
  };
  nav: {
    items: { id: string; label: string; href: string; isExternal?: boolean }[];
    cta: { label: string; href: string };
  };
  footer: {
    tagline: string;
    newsletterTitle: string;
    newsletterDescription: string;
    copyright: string;
    legalNotice: string;
    mainPages: { label: string; href: string }[];
    utilityPages: { label: string; href: string }[];
    socials: {
      id: string;
      name: string;
      href: string;
      icon: "linkedin" | "facebook" | "instagram";
      ariaLabel: string;
    }[];
  };
}

export const SITE_CONFIG: SiteConfig = {
  brandName: "VAULTIX",
  tagline: "we help businesses find and fix security weaknesses before attackers do.",
  subTagline: "Expert-led vulnerability assessment and penetration testing (VAPT).",
  contact: {
    email: "contact@vaultix.security", // [CONFIRM: Replace with real company inbox]
    phone: "+44 (0) 20 7946 0912", // [CONFIRM: Replace with real telephone number]
    location: "London, United Kingdom", // [CONFIRM: Replace with registered headquarters]
  },
  nav: {
    items: [
      { id: "home", label: "HOME", href: "/" },
      { id: "about", label: "ABOUT", href: "/about" },
      { id: "pricing", label: "PRICING", href: "/pricing" },
      { id: "blog", label: "BLOG", href: "/blog" },
      { id: "case-studies", label: "CASE STUDIES", href: "/case-studies" },
    ],
    cta: {
      label: "REQUEST A QUOTE",
      href: "/contact",
    },
  },
  footer: {
    tagline: "we help businesses find and fix security weaknesses before attackers do.",
    newsletterTitle: "Stay connected",
    newsletterDescription: "Get security insights, vulnerability advisories and updates from our team.",
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
    socials: [
      {
        id: "linkedin",
        name: "LinkedIn",
        href: "https://linkedin.com/company/vaultix-security",
        icon: "linkedin",
        ariaLabel: "Follow VAULTIX on LinkedIn",
      },
      {
        id: "facebook",
        name: "Facebook",
        href: "https://facebook.com/vaultixsecurity",
        icon: "facebook",
        ariaLabel: "Follow VAULTIX on Facebook",
      },
      {
        id: "instagram",
        name: "Instagram",
        href: "https://instagram.com/vaultixsecurity",
        icon: "instagram",
        ariaLabel: "Follow VAULTIX on Instagram",
      },
    ],
  },
};
