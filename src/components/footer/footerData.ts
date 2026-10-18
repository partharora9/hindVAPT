export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterSocialItem {
  id: string;
  name: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin";
  ariaLabel: string;
}

export const MAIN_PAGES_LINKS: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "PRICING", href: "/pricing" }, // Exact uppercase as in reference
  { label: "Blog", href: "/blog" },
  { label: "Case Study", href: "/case-study" },
  { label: "Blog Details", href: "/blog/sample-post" },
  { label: "Case Study Details", href: "/case-study/sample" },
];

export const UTILITY_PAGES_LINKS: FooterLinkItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Style Guide", href: "/style-guide" },
  { label: "Licenses", href: "/licenses" },
  { label: "Changelog", href: "/changelog" },
  { label: "Instruction", href: "/instruction" },
  { label: "Not Found", href: "/404" },
  { label: "Password", href: "/password" },
];

export const SOCIAL_LINKS: FooterSocialItem[] = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://facebook.com",
    icon: "facebook",
    ariaLabel: "Follow VAULTIX on Facebook",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com",
    icon: "instagram",
    ariaLabel: "Follow VAULTIX on Instagram",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
    ariaLabel: "Follow VAULTIX on LinkedIn",
  },
];
