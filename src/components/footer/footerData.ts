import { FOOTER_CONTENT, type FooterLinkItem } from "@/content/footer";
import { SITE_CONFIG } from "@/content/site";

export type { FooterLinkItem };

export interface FooterSocialItem {
  id: string;
  name: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin";
  ariaLabel: string;
}

export const MAIN_PAGES_LINKS: FooterLinkItem[] = FOOTER_CONTENT.mainPages;
export const UTILITY_PAGES_LINKS: FooterLinkItem[] = FOOTER_CONTENT.utilityPages;

export const SOCIAL_LINKS: FooterSocialItem[] = SITE_CONFIG.footer.socials.map((s) => ({
  id: s.id,
  name: s.name,
  href: s.href,
  icon: s.icon,
  ariaLabel: s.ariaLabel,
}));
