import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "thepdftools - Free Online Image & PDF Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #6D28D9 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(255,255,255,0.2)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: 800, color: "white" }}>PDF</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          thepdftools
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Free Image & PDF Tools
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["Compress", "Convert", "Crop", "Resize", "Merge"].map((t) => (
            <div
              key={t}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 100,
                padding: "10px 24px",
                fontSize: 18,
                color: "white",
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          100% Private &middot; No Upload &middot; Free Forever &middot; thepdftools.site
        </div>
      </div>
    ),
    { ...size }
  );
}
