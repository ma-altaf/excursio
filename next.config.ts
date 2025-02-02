import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
