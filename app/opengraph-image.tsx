import { ImageResponse } from "next/og";

export const alt = "Pure Soft Restoration — North Texas soft contents and textile restoration for insurance claims";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0F2545 0%, #08182E 60%, #0A1A38 100%)",
          color: "#FCFCFC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#FCFCFC",
              color: "#0F2545",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            PS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Pure Soft Restoration
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#B68A4E",
              }}
            >
              Insurance-grade textile restoration
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#B68A4E",
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            North Texas
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            Soft contents and textile restoration.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -1,
              color: "#B68A4E",
            }}
          >
            For insurance claims.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#94A3B8",
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex" }}>Documentation · Chain of custody · Severity reduction</div>
          <div style={{ display: "flex" }}>puresoftrestoration.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
