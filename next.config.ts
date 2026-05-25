import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        "/api/downloads/[slug]": [
            "./dist/academia/pack-arranque-ia-v1.zip",
            "./dist/academia/sistema-ia-pro-v1.zip",
            "./dist/academia/primer-sistema-ia-vendible-v1.zip",
        ],
        "/api/downloads/pack-arranque-ia": [
            "./dist/academia/pack-arranque-ia-v1.zip",
        ],
    },
};

export default nextConfig;
