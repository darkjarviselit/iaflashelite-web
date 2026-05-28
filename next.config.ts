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
    async redirects() {
        // Match EXACTO de /gestoria sin :path*. Las subrutas (/gestoria/install.sh,
        // /gestoria/*.pdf, /gestoria/*.tgz, /gestoria/audio/*) son assets reales del
        // producto GestorIA Local servidos desde public/gestoria/ y NO deben
        // interceptarse — los referencia GESTORIA_LOCAL_DELIVERY_LINKS en constants.ts.
        return [
            {
                source: "/gestoria",
                destination: "/gestoria-local",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
