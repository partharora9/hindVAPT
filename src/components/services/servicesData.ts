import type { ComponentType } from "react";
import { DatabaseSyncIcon } from "./icons/DatabaseSyncIcon";
import { AiLockIcon } from "./icons/AiLockIcon";
import { CloudSparkIcon } from "./icons/CloudSparkIcon";
import { FirewallIcon } from "./icons/FirewallIcon";
import { EncryptionIcon } from "./icons/EncryptionIcon";
import { FingerprintIcon } from "./icons/FingerprintIcon";
import { RansomwareIcon } from "./icons/RansomwareIcon";
import { AccessScanIcon } from "./icons/AccessScanIcon";
import { AwarenessIcon } from "./icons/AwarenessIcon";

export interface ServiceItem {
  id: string;
  row: number; // 0, 1, 2
  col: number; // 0, 1, 2
  title: string;
  description: string;
  IconComponent: ComponentType<{ isHovered?: boolean; isInView?: boolean }>;
}

export const SERVICES_DATA: ServiceItem[] = [
  // ROW 1
  {
    id: "cross-exchange-sync",
    row: 0,
    col: 0,
    title: "CROSS-EXCHANGE SYNC",
    description:
      "Track all assets across wallets and exchanges in one view. Stay informed about your performance",
    IconComponent: DatabaseSyncIcon,
  },
  {
    id: "ai-risk-analysis",
    row: 0,
    col: 1,
    title: "AI-POWERED RISK ANALYSIS",
    description:
      "Use intelligent analytics to quickly detect unusual behavior instantly. respond to potential.",
    IconComponent: AiLockIcon,
  },
  {
    id: "endpoint-protection",
    row: 0,
    col: 2,
    title: "ENDPOINT PROTECTION",
    description:
      "AI-Powered Risk Analysis with intelligent analytics to secure every device on your network.",
    IconComponent: CloudSparkIcon,
  },

  // ROW 2
  {
    id: "firewall-security",
    row: 1,
    col: 0,
    title: "FIREWALL SECURITY",
    description:
      "Strengthen your infrastructure with advanced firewall enterprise-grade configuration.",
    IconComponent: FirewallIcon,
  },
  {
    id: "data-encryption",
    row: 1,
    col: 1,
    title: "DATA ENCRYPTION",
    description:
      "Protect sensitive business and customer data with enterprise-grade encryption",
    IconComponent: EncryptionIcon,
  },
  {
    id: "two-factor-auth",
    row: 1,
    col: 2,
    title: "TWO FACTOR\nAUTHENTICATION",
    description:
      "Add extra layers of login protection to prevent unauthorized access.",
    IconComponent: FingerprintIcon,
  },

  // ROW 3
  {
    id: "ransomware-protection",
    row: 2,
    col: 0,
    title: "RANSOMWARE PROTECTION",
    description:
      "Prevent, detect, and recover from ransomware attacks prevent unauthorized with proactive",
    IconComponent: RansomwareIcon,
  },
  {
    id: "secure-access-management",
    row: 2,
    col: 1,
    title: "SECURE ACCESS MANAGEMENT",
    description:
      "Control user permissions and protect critical systems with identity",
    IconComponent: AccessScanIcon,
  },
  {
    id: "security-awareness-training",
    row: 2,
    col: 2,
    title: "SECURITY AWARENESS\nTRAINING",
    description:
      "Educate employees to recognize phishing, scams, and social engineering threats, and prevent unauthorized access.",
    IconComponent: AwarenessIcon,
  },
];
