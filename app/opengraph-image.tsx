import { ImageResponse } from "next/og";

export const alt =
  "Pure Soft Restoration — The textile recovery operation insurance carriers call first.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F4F1EA";
const PAPER_BRIGHT = "#FAF8F2";
const INK_900 = "#0B0D0C";
const INK_500 = "#5A5F5B";
const SIGNAL = "#D9691F";
const SIGNAL_SOFT = "#F7E2CB";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, ${PAPER_BRIGHT} 0%, ${PAPER} 100%)`,
          color: INK_900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Geist, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top operational bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 16px",
            background: INK_900,
            color: PAPER,
            borderRadius: 4,
            alignSelf: "flex-start",
            fontFamily: "ui-monospace, monospace",
            fontSize: 13,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: SIGNAL,
            }}
          />
          <span style={{ color: SIGNAL }}>CAT-2026-04 · Active</span>
          <span style={{ color: INK_500 }}>·</span>
          <span>North Texas · 41 properties</span>
        </div>

        {/* Editorial headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -2.4,
              fontFamily: "Georgia, serif",
              maxWidth: 1020,
            }}
          >
            The textile recovery operation
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: 18,
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -2.4,
              fontFamily: "Georgia, serif",
              maxWidth: 1020,
            }}
          >
            <span style={{ display: "flex" }}>insurance carriers call</span>
            <span
              style={{
                position: "relative",
                display: "flex",
                paddingInline: 6,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 6,
                  height: 16,
                  background: SIGNAL_SOFT,
                  zIndex: 0,
                  borderRadius: 2,
                  display: "flex",
                }}
              />
              <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
                first.
              </span>
            </span>
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: INK_500,
            fontSize: 18,
            paddingTop: 32,
            borderTop: `1px solid rgba(11, 13, 12, 0.10)`,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", color: INK_900, fontSize: 18, letterSpacing: 3 }}>
              PURE SOFT RESTORATION
            </div>
            <div style={{ display: "flex", fontSize: 13 }}>
              Documentation · Chain of custody · CAT response
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 14 }}>
            puresoftrestoration.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
