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
        hostname: '**.amazonaws.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 🛰️ UPLINK TUNNEL: Conexión blindada con el Cluster de Railway
  async rewrites() {
    return [
      {
        // Intercepta cualquier llamada que empiece por /api/v1
        source: '/api/v1/:path*',
        // La redirige INTEGRALMENTE al cluster remoto
        destination: 'https://drone-dt-api.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;