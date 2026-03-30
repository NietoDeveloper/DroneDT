import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚡ Rendimiento & Core
  reactStrictMode: true,
  compress: true,
  
  // 🛡️ Despliegue de Alta Seguridad (Emerald/Drone DT Standard)
  output: 'standalone', 
  
  typescript: {
    ignoreBuildErrors: false, 
  },

  // 🖼️ Assets Externos (S3 & Cloudinary)
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

  // 🛰️ UPLINK REDIRECT (Local Link al Puerto 5000)
  async rewrites() {
    return [
      {
        // Intercepta /api/v1/ y lo manda a tu servidor local de Node.js
        source: '/api/v1/:path*',
        destination: 'http://localhost:5000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;