import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        navy: {
          950: "#020617",
          900: "#030818",
          850: "#07112c",
          800: "#0a1c3d",
          glow: "#0a3a7a",
        },
        accent: {
          DEFAULT: "#1E9BFF",
          hover: "#3cb0ff",
          glow: "rgba(30, 155, 255, 0.6)",
          dim: "rgba(30, 155, 255, 0.15)",
          subtle: "rgba(30, 155, 255, 0.08)",
        },
        cyber: {
          headline: "#C3D4FF",
          body: "#8FA3C7",
          label: "#6B7FA8",
          muted: "#45567c",
          border: "rgba(30, 155, 255, 0.15)",
          borderGlow: "rgba(30, 155, 255, 0.4)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.05em",
        wider: "0.15em",
        widest: "0.25em",
        mega: "0.35em",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        orbitRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        orbitCounterRotate: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        radarSweep: {
          "0%": { transform: "scale(1)", opacity: "0.45" },
          "100%": { transform: "scale(1.45)", opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        orbit: "orbitRotate 60s linear infinite",
        orbitReverse: "orbitCounterRotate 90s linear infinite",
        shimmer: "shimmer 7s ease-in-out infinite",
        radar: "radarSweep 4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
