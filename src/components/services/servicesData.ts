import type { ComponentType } from "react";
import { WebAppPentestIcon } from "./icons/WebAppPentestIcon";
import { MobileAppSecurityIcon } from "./icons/MobileAppSecurityIcon";
import { ApiSecurityIcon } from "./icons/ApiSecurityIcon";
import { NetworkPentestIcon } from "./icons/NetworkPentestIcon";
import { CloudSecurityIcon } from "./icons/CloudSecurityIcon";
import { RedTeamIcon } from "./icons/RedTeamIcon";
import { SecureCodeReviewIcon } from "./icons/SecureCodeReviewIcon";
import { PhishingIcon } from "./icons/PhishingIcon";
import { ComplianceAuditIcon } from "./icons/ComplianceAuditIcon";
import { SERVICES_CONTENT } from "@/content/services";

export interface ServiceItem {
  id: string;
  row: number; // 0, 1, 2
  col: number; // 0, 1, 2
  title: string;
  description: string;
  IconComponent: ComponentType<{ isHovered?: boolean; isInView?: boolean }>;
}

const ICON_MAP: Record<string, ComponentType<{ isHovered?: boolean; isInView?: boolean }>> = {
  "web-app": WebAppPentestIcon,
  "mobile-app": MobileAppSecurityIcon,
  "api-security": ApiSecurityIcon,
  "network-pentest": NetworkPentestIcon,
  "cloud-security": CloudSecurityIcon,
  "red-team": RedTeamIcon,
  "secure-code": SecureCodeReviewIcon,
  "phishing-social": PhishingIcon,
  "compliance-audit": ComplianceAuditIcon,
};

export const SERVICES_DATA: ServiceItem[] = SERVICES_CONTENT.services.map((item) => ({
  id: item.id,
  row: item.row,
  col: item.col,
  title: item.title,
  description: item.description,
  IconComponent: ICON_MAP[item.iconType] || WebAppPentestIcon,
}));
