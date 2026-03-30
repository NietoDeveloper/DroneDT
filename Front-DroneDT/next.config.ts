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

  // 🛰️ UPLINK REDIRECT (El túnel al Backend de Railway)
  async rewrites() {
    return [
      {
        // Esto captura /api/v1/CUALQUIER_COSA y lo manda al clúster
        source: '/api/v1/:path*',
        destination: 'https://tu-api-real.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;