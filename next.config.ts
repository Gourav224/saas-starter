import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typedRoutes: true,
    reactCompiler: true,
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
        incomingRequests: true,
    },
};

export default nextConfig;
