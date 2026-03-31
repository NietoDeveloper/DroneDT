import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  // 💡 Mantenemos standalone para producción (Railway/Docker)
  output: 'standalone', 
  
  typescript: {
    ignoreBuildErrors: false, 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  },
};

export default nextConfig;