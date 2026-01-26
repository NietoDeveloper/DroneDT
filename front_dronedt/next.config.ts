import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;