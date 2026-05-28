import { ImageResponse } from "next/og";

export const alt =
  "Pure Soft Restoration — When a loss touches textiles, the claim comes to us.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BONE = "#F6F2E9";
const BONE_BRIGHT = "#FBF8F1";
const INK = "#1A1813";
const INK_3 = "#6A6356";
const INK_4 = "#938B7B";
const OX = "#7A2E2E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, ${BONE_BRIGHT} 0%, ${BONE} 100%)`,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            color: OX,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Textile &amp; Soft-Contents Restoration · North Texas
        </div>

        {/* Editorial headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: -2.8,
              fontFamily: "Georgia, serif",
              maxWidth: 1060,
              color: INK,
            }}
          >
            When a loss touches textiles,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: -2.8,
              fontFamily: "Georgia, serif",
              maxWidth: 1060,
              color: INK,
            }}
          >
            the claim comes to{" "}
            <span style={{ display: "flex", fontStyle: "italic", color: OX, paddingLeft: 18 }}>
              us.
            </span>
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: INK_3,
            fontSize: 18,
            paddingTop: 32,
            borderTop: `1px solid rgba(26, 24, 19, 0.14)`,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                display: "flex",
                color: INK,
                fontFamily: "Georgia, serif",
                fontSize: 28,
                letterSpacing: -0.5,
              }}
            >
              Pure Soft Restoration
            </div>
            <div style={{ display: "flex", color: INK_4, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
              {/*
                Per CANONICAL_FACTS Round 1, "IICRC-certified" and "Licensed
                & insured in Texas" remain Round-2-pending. Replaced with a
                Round-1-confirmed framing.
              */}
              North Texas Textile &amp; Soft-Contents Restoration
            </div>
          </div>
          <div style={{ display: "flex", color: INK_3, fontSize: 16, letterSpacing: 1 }}>
            puresoftrestoration.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
