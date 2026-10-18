export interface TestimonialContentItem {
  id: string;
  companyName: string;
  companySubtitle?: string;
  companyType: "fintech" | "healthtech" | "saas" | "enterprise";
  quote: string;
  authorName: string;
  authorRole: string;
  imageSrc: string;
  imageAlt: string;
  isVerified: boolean;
  source: string; // e.g. "Signed client authorization" or "Case study pending"
}

export const TESTIMONIALS_CONTENT: TestimonialContentItem[] = [
  {
    id: "testimonial-01",
    companyName: "[Client A]",
    companySubtitle: "FINTECH",
    companyType: "fintech",
    quote:
      "[Client quote pending: The manual penetration test uncovered critical logic flaws in our payment gateway that automated scanners completely missed. Remediation guidance was actionable and clear.]",
    authorName: "[Client Name]",
    authorRole: "Head of Information Security",
    imageSrc: "/testimonials/1.jpg",
    imageAlt: "Client portrait placeholder",
    isVerified: false,
    source: "Pending client sign-off [REAL]",
  },
  {
    id: "testimonial-02",
    companyName: "[Client B]",
    companySubtitle: "SAAS",
    companyType: "saas",
    quote:
      "[Client quote pending: VAULTIX provided comprehensive API security assessment and validated our SOC 2 and ISO 27001 audit readiness with detailed proof of concept demonstrations.]",
    authorName: "[Client Name]",
    authorRole: "VP of Engineering",
    imageSrc: "/testimonials/2.jpg",
    imageAlt: "Client portrait placeholder",
    isVerified: false,
    source: "Pending client sign-off [REAL]",
  },
  {
    id: "testimonial-03",
    companyName: "[Client C]",
    companySubtitle: "HEALTHTECH",
    companyType: "healthtech",
    quote:
      "[Client quote pending: The free retest verified all our high-severity findings were resolved before our major production release. Truly professional offensive security partner.]",
    authorName: "[Client Name]",
    authorRole: "Chief Technology Officer",
    imageSrc: "/testimonials/3.jpg",
    imageAlt: "Client portrait placeholder",
    isVerified: false,
    source: "Pending client sign-off [REAL]",
  },
  {
    id: "testimonial-04",
    companyName: "[Client D]",
    companySubtitle: "ENTERPRISE",
    companyType: "enterprise",
    quote:
      "[Client quote pending: Red team simulation tested our detection capabilities and incident response runbooks under realistic adversary conditions without causing operational downtime.]",
    authorName: "[Client Name]",
    authorRole: "Security Operations Director",
    imageSrc: "/testimonials/4.jpg",
    imageAlt: "Client portrait placeholder",
    isVerified: false,
    source: "Pending client sign-off [REAL]",
  },
];
