import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone', 
  
  typescript: {
    ignoreBuildErrors: false, 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 🛰️ UPLINK TUNNEL
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://drone-dt-api.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;