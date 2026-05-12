import { ImageResponse } from "next/og";

export const alt = "Yurii — AI Automation Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BURGUNDY = "#8B1E1E";
const CREAM = "#FAF7F2";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BURGUNDY,
          color: CREAM,
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
          }}
        >
          AI Automation Studio
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 960,
          }}
        >
          AI chatbots and automation workflows that actually work.
        </div>

        <div
          style={{
            fontSize: 20,
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: 0.85,
          }}
        >
          yurii — ai automation studio · 3 live demos
        </div>
      </div>
    ),
    { ...size },
  );
}
