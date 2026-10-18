import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/context/MotionContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700", "800"],
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vaultix.cyber"),
  title: {
    default: "VAULTIX | Offensive Security & Penetration Testing",
    template: "%s | VAULTIX VAPT",
  },
  description:
    "Expert-led Vulnerability Assessment and Penetration Testing (VAPT) for web, mobile, API, network and cloud. We find exploitable risks, prove the impact, and guide you to fix them.",
  keywords: [
    "VAPT",
    "penetration testing",
    "vulnerability assessment",
    "offensive security",
    "red teaming",
    "API security",
    "web application security",
    "VAULTIX",
  ],
  authors: [{ name: "VAULTIX Security Labs" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VAULTIX | Offensive Security & Penetration Testing",
    description:
      "Expert-led Vulnerability Assessment and Penetration Testing (VAPT) for web, mobile, API, network and cloud.",
    type: "website",
    siteName: "VAULTIX",
    url: "https://vaultix.cyber",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "VAULTIX | Offensive Security & Penetration Testing",
    description:
      "Expert-led Vulnerability Assessment and Penetration Testing (VAPT) for web, mobile, API, network and cloud.",
    creator: "@vaultix_cyber",
  },
  robots: {
    index: true,
    follow: true,
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
        {/* WCAG Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1E9BFF] focus:text-[#020617] focus:font-bold focus:shadow-[0_0_20px_rgba(30,155,255,0.8)] focus:outline-none"
        >
          Skip to main content
        </a>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
