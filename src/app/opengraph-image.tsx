import { ImageResponse } from "next/og";

export const alt = "IA Flash Elite — Automatización con IA en 48h";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "radial-gradient(circle at 50% 35%, rgba(0,229,255,0.18) 0%, rgba(0,0,0,0) 55%), #0A0A0A",
                fontFamily: "system-ui, sans-serif",
                color: "#FFFFFF",
                padding: 80,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <svg width="92" height="115" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 0L0 16.5H8.5L7 30L24 12H14.5L14 0Z" fill="#00E5FF" />
                </svg>
                <div
                    style={{
                        fontSize: 88,
                        fontWeight: 800,
                        letterSpacing: "-3px",
                        display: "flex",
                        gap: 16,
                    }}
                >
                    <span style={{ color: "#FFFFFF" }}>IA</span>
                    <span style={{ color: "#00E5FF" }}>Flash</span>
                    <span style={{ color: "#FFFFFF" }}>Elite</span>
                </div>
            </div>
            <div
                style={{
                    marginTop: 32,
                    fontSize: 32,
                    color: "#888888",
                    letterSpacing: "-0.5px",
                    maxWidth: 900,
                    textAlign: "center",
                }}
            >
                Automatización con IA. Entregado en 48 horas.
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: 48,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 22px",
                    background: "rgba(0,229,255,0.1)",
                    border: "1px solid rgba(0,229,255,0.3)",
                    borderRadius: 999,
                    color: "#00E5FF",
                    fontSize: 22,
                    fontWeight: 500,
                }}
            >
                ⚡ Bots · Chatbots · Scripts · 48h
            </div>
        </div>,
        size,
    );
}
