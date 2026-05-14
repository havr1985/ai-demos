import { ImageResponse } from "next/og";

export const alt = "Bright Smile Dental · Yurii AI Demos";
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 9999,
            background: CREAM,
            color: BURGUNDY,
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          B
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            Bright Smile Dental
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: "system-ui, -apple-system, sans-serif",
              opacity: 0.85,
            }}
          >
            AI-assisted dental care in Austin, TX
          </div>
        </div>

        <div
          style={{
            fontSize: 20,
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: 0.85,
            letterSpacing: "0.04em",
          }}
        >
          yurii — ai automation studio · live demo
        </div>
      </div>
    ),
    { ...size },
  );
}
