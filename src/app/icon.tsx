import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0A0A0A",
                borderRadius: 6,
            }}
        >
            <svg width="22" height="28" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14 0L0 16.5H8.5L7 30L24 12H14.5L14 0Z"
                    fill="#00E5FF"
                />
            </svg>
        </div>,
        size,
    );
}
