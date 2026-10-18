import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VAULTIX | Detect Threats Before They Strike",
  description:
    "Enterprise-grade cybersecurity platform that monitors your entire attack surface in real time. Identify vulnerabilities, neutralize threats.",
  keywords: [
    "cybersecurity",
    "threat intelligence",
    "attack surface management",
    "enterprise security",
    "vulnerability scanner",
    "VAULTIX",
  ],
  authors: [{ name: "VAULTIX Security Labs" }],
  openGraph: {
    title: "VAULTIX | Autonomous Threat Detection & Surface Defense",
    description:
      "Enterprise-grade cybersecurity platform that monitors your entire attack surface in real time.",
    type: "website",
    siteName: "VAULTIX",
  },
  twitter: {
    card: "summary_large_image",
    title: "VAULTIX | Detect Threats Before They Strike",
    description: "Enterprise-grade cybersecurity platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#020617] text-[#C3D4FF] font-mono antialiased selection:bg-[#1E9BFF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
