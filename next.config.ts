import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    distDir: "build",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
    turbopack: {
        root: path.join(__dirname),
    },
};

export default nextConfig;
