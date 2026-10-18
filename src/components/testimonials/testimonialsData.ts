export interface TestimonialItem {
  id: string;
  companyName: string;
  companySubtitle?: string;
  companyType: "gillate" | "aethersec" | "kinesis" | "synthetix";
  quote: string;
  authorName: string;
  authorRole: string;
  imageSrc: string;
  imageAlt: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "gillate-ai",
    companyName: "Gillate",
    companySubtitle: "AI",
    companyType: "gillate",
    quote:
      "Their cybersecurity team completely strengthened our digital infrastructure. From continuous threat monitoring to rapid incident response, every system now feels faster, smarter, and significantly more secure.",
    authorName: "Alex Morgan",
    authorRole: "CISO, Gillate AI",
    imageSrc: "/testimonials/1.jpg",
    imageAlt: "Alex Morgan, CISO at Gillate AI wearing futuristic black cyber eyewear",
  },
  {
    id: "aethersec",
    companyName: "AetherSec",
    companySubtitle: "SYSTEMS",
    companyType: "aethersec",
    quote:
      "Deploying VAULTIX reduced our mean time to detect by 94%. Their autonomous telemetry handles multi-cloud vulnerability chaining with zero false positives across our entire perimeter.",
    authorName: "Elena Rostova",
    authorRole: "VP of Information Security, AetherSec",
    imageSrc: "/testimonials/2.jpg",
    imageAlt: "Elena Rostova, VP of Information Security at AetherSec",
  },
  {
    id: "kinesis-cloud",
    companyName: "Kinesis",
    companySubtitle: "CLOUD",
    companyType: "kinesis",
    quote:
      "The real-time attack surface mapping gives our engineering teams complete confidence during rapid deployments. Zero-day isolation at edge gateways stopped two major breaches cold.",
    authorName: "Marcus Vance",
    authorRole: "Chief Security Architect, Kinesis Cloud",
    imageSrc: "/testimonials/3.jpg",
    imageAlt: "Marcus Vance, Chief Security Architect at Kinesis Cloud",
  },
  {
    id: "synthetix-labs",
    companyName: "Synthetix",
    companySubtitle: "LABS",
    companyType: "synthetix",
    quote:
      "Autonomous containment at machine speed is not just marketing—it is the difference between an uncontained incident and business continuity. An essential defense layer.",
    authorName: "Siddharth Rao",
    authorRole: "Head of SecOps, Synthetix Labs",
    imageSrc: "/testimonials/4.jpg",
    imageAlt: "Siddharth Rao, Head of SecOps at Synthetix Labs",
  },
];
