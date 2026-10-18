/**
 * RFC 2606 & RFC 5737 Reserved Documentation Hosts and IP Addresses
 * Guarantees zero accidental usage of real infrastructure addresses.
 */
export const RESERVED_DOMAINS = {
  api: "api.example.com",
  app: "app.example.com",
  auth: "auth.example.com",
  portal: "portal.example.com",
  storage: "storage.example.com",
} as const;

export const RESERVED_IPS = {
  gateway: "203.0.113.1",
  waf: "203.0.113.10",
  tlsServer: "203.0.113.24",
  dmzNode: "203.0.113.48",
  bastion: "203.0.113.88",
} as const;

export function formatFindingHost(subdomain: keyof typeof RESERVED_DOMAINS, path = ""): string {
  const host = RESERVED_DOMAINS[subdomain] || RESERVED_DOMAINS.api;
  return path ? `${host}${path.startsWith("/") ? path : `/${path}`}` : host;
}

export function formatFindingIp(node: keyof typeof RESERVED_IPS, port?: number): string {
  const ip = RESERVED_IPS[node] || RESERVED_IPS.gateway;
  return port ? `${ip}:${port}` : ip;
}
