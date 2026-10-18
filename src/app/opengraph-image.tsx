import { ImageResponse } from "next/og";
export const alt = "VAULTIX | Autonomous Threat Detection & Surface Defense";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "monospace",
          border: "1px solid rgba(30, 155, 255, 0.3)",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30, 155, 255, 0.35) 0%, transparent 70%)",
          }}
        />

        {/* Top: Logo & Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#1E9BFF",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#020617",
              fontWeight: 900,
              fontSize: "26px",
            }}
          >
            V
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "0.25em",
            }}
          >
            VAULTIX
          </span>
          <div
            style={{
              marginLeft: "24px",
              padding: "6px 14px",
              border: "1px solid rgba(30, 155, 255, 0.5)",
              color: "#1E9BFF",
              fontSize: "14px",
              letterSpacing: "0.2em",
            }}
          >
            AUTONOMOUS THREAT TELEMETRY
          </div>
        </div>

        {/* Center: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            DETECT THREATS BEFORE THEY STRIKE.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8FA3C7",
              lineHeight: 1.4,
            }}
          >
            Continuous perimeter graph mapping, AI-correlated threat telemetry, and sub-200ms autonomous containment.
          </div>
        </div>

        {/* Bottom Bar: Key Metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            borderTop: "1px solid rgba(30, 155, 255, 0.2)",
            paddingTop: "32px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", color: "#1E9BFF", fontWeight: 800 }}>&lt; 200ms</span>
            <span style={{ fontSize: "14px", color: "#6B7FA8", letterSpacing: "0.1em" }}>DETECTION SPEED</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", color: "#1E9BFF", fontWeight: 800 }}>99.9%</span>
            <span style={{ fontSize: "14px", color: "#6B7FA8", letterSpacing: "0.1em" }}>ACCURACY RATING</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", color: "#1E9BFF", fontWeight: 800 }}>24/7/365</span>
            <span style={{ fontSize: "14px", color: "#6B7FA8", letterSpacing: "0.1em" }}>SURFACE COVERAGE</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
