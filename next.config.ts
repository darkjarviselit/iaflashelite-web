import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        "/api/downloads/pack-arranque-ia": [
            "./dist/academia/pack-arranque-ia-v1.zip",
        ],
    },
};

export default nextConfig;
