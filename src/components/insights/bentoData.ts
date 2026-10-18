export interface LiveAlertItem {
  id: string;
  title: string;
  ip: string;
  isNew?: boolean;
}

export const INITIAL_ALERTS: LiveAlertItem[] = [
  { id: "alert-1", title: "BRUTE FORCE ATTEMPT", ip: "192.168.1.47" },
  { id: "alert-2", title: "SUSPICIOUS OUTBOUND", ip: "216.239.38.10" },
  { id: "alert-3", title: "PORT SCAN DETECTED", ip: "172.16.0.8" },
  { id: "alert-4", title: "GEOIP ANOMALY", ip: "192.168.1.47" },
];

export const ALERT_POOL: Omit<LiveAlertItem, "id">[] = [
  { title: "MALWARE SIGNATURE", ip: "10.0.4.112" },
  { title: "DATA EXFIL ATTEMPT", ip: "185.220.101.5" },
  { title: "CREDENTIAL STUFFING", ip: "198.51.100.24" },
  { title: "DNS TUNNELING", ip: "203.0.113.88" },
  { title: "RANSOMWARE PROBE", ip: "194.26.29.11" },
  { title: "PRIVILEGE ESCALATION", ip: "10.240.0.15" },
  { title: "SQL INJECTION VECTOR", ip: "45.154.255.8" },
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
    id: "ai-fixing-issues",
    row: 1,
    title: "AI-POWERED FIXING ISSUES",
    description:
      "Experience the full power of Bester with no commitment. Sign up today and unlock all features",
  },
  {
    id: "threats-blocked",
    row: 1,
    title: "THREATS BLOCKED",
    description:
      "Stay informed with up-to-the-minute data interactions, preferences and trends across your whole infrastructure.",
  },

  // ROW 2
  {
    id: "threat-categories",
    row: 2,
    title: "THREAT CATEGORIES",
    description:
      "Identify and classify cyber threats using advanced behavioral analysis detection systems.",
  },
  {
    id: "live-thread-feed",
    row: 2,
    title: "LIVE THREAD FEED",
    description:
      "Receive instant notifications and automated incident tracking to strengthen your security response",
  },
  {
    id: "control-coverage",
    row: 2,
    title: "CONTROL COVERAGE",
    description:
      "Leverage AI features, insights, and efficiency to boost your security productivity.",
  },
];
