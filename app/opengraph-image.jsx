import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Mortgage Helpline — Straight answers for your mortgage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0e1b16", color: "#fff", display: "flex", flexDirection: "column", padding: 80, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: "#19b57f" }} />Mortgage Helpline
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
          <span>Straight answers</span><span>for your mortgage.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#b9cec4" }}>
          <span>Canada · USA · India — live rates · free tools</span><span style={{ color: "#f5b04c" }}>mortgagehelpline.com</span>
        </div>
      </div>
    ),
    size
  );
}
