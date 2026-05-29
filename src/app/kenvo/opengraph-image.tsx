import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Kenvo — Workspace IA privado y local";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "80px",
				background:
					"radial-gradient(ellipse 80% 70% at 50% 0%, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0) 70%), #0a0a0a",
				color: "#ffffff",
				fontFamily: "sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					alignSelf: "flex-start",
					border: "1px solid rgba(0,229,255,0.35)",
					background: "rgba(0,229,255,0.10)",
					color: "#00e5ff",
					borderRadius: 999,
					padding: "8px 18px",
					fontSize: 22,
					letterSpacing: 3,
					textTransform: "uppercase",
					fontWeight: 600,
				}}
			>
				Workspace IA privado
			</div>
			<div
				style={{
					marginTop: 36,
					fontSize: 92,
					fontWeight: 800,
					lineHeight: 1.02,
					letterSpacing: -2,
				}}
			>
				Kenvo
			</div>
			<div
				style={{
					marginTop: 20,
					fontSize: 44,
					fontWeight: 600,
					color: "#e5e5e5",
				}}
			>
				Tu IA privada y local. Sin servidores intermediarios.
			</div>
			<div style={{ marginTop: 28, fontSize: 28, color: "#888888" }}>
				Pago único · Cifrado en disco · Mac (Windows pronto)
			</div>
		</div>,
		{ ...size },
	);
}
