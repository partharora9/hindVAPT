import { HOME_CONTENT } from "@/content/home";

export interface LiveAlertItem {
  id: string;
  title: string;
  ip: string;
  isNew?: boolean;
}

export const INITIAL_ALERTS: LiveAlertItem[] = [
  { id: "alert-1", title: "SQL INJECTION CONFIRMED", ip: "api.example.com/login" },
  { id: "alert-2", title: "WEAK TLS CONFIGURATION", ip: "203.0.113.24:443" },
  { id: "alert-3", title: "EXPOSED ADMIN PANEL", ip: "app.example.com/admin" },
  { id: "alert-4", title: "MISSING RATE LIMITING", ip: "api.example.com/auth" },
];

export const ALERT_POOL: Omit<LiveAlertItem, "id">[] = [
  { title: "IDOR VULNERABILITY CONFIRMED", ip: "api.example.com/v1/users/4102" },
  { title: "S3 BUCKET PUBLIC LISTING", ip: "storage.example.com/backups" },
  { title: "DEFAULT CREDENTIALS ACTIVE", ip: "203.0.113.88:8080" },
  { title: "UNAUTHENTICATED GRAPHQL INTROSPECTION", ip: "api.example.com/graphql" },
  { title: "CROSS-SITE SCRIPTING (STORED)", ip: "app.example.com/feedback" },
  { title: "JWT WEAK HMAC SECRET", ip: "auth.example.com/token" },
  { title: "CORS MISCONFIGURATION", ip: "api.example.com/data" },
];

export interface InsightCardData {
  id: string;
  title: string;
  description: string;
  row: 1 | 2;
}

export const INSIGHTS_DATA: InsightCardData[] = [
  // ROW 1
  {
    id: "prioritised-remediation",
    row: 1,
    title: HOME_CONTENT.insights.cardA.title,
    description: HOME_CONTENT.insights.cardA.description,
  },
  {
    id: "severity-trends",
    row: 1,
    title: HOME_CONTENT.insights.cardB.title,
    description: HOME_CONTENT.insights.cardB.description,
  },

  // ROW 2
  {
    id: "severity-breakdown",
    row: 2,
    title: HOME_CONTENT.insights.cardC.title,
    description: HOME_CONTENT.insights.cardC.description,
  },
  {
    id: "engagement-activity",
    row: 2,
    title: HOME_CONTENT.insights.cardD.title,
    description: HOME_CONTENT.insights.cardD.description,
  },
  {
    id: "remediation-progress",
    row: 2,
    title: HOME_CONTENT.insights.cardE.title,
    description: HOME_CONTENT.insights.cardE.description,
  },
];
