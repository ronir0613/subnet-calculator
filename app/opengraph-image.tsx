import { ImageResponse } from "next/og";

export const alt = "IPv4 Subnet Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px",
        background: "#ffffff",
        color: "#17191d",
        border: "1px solid #e7e8eb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: 28, color: "#5d6470", marginBottom: 20 }}>IPv4 networking utility</div>
      <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3 }}>Subnet Calculator</div>
      <div style={{ fontSize: 32, color: "#5d6470", marginTop: 24 }}>
        CIDR · network · broadcast · host range
      </div>
      <div style={{ fontSize: 30, fontFamily: "monospace", marginTop: 58, color: "#2855a5" }}>
        192.168.1.0/24
      </div>
    </div>,
    size,
  );
}
