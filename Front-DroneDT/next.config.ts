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

  // 🛰️ UPLINK TUNNEL: Conexión blindada con el Cluster de Railway
  async rewrites() {
    return [
      {
        // Intercepta peticiones locales y las redirige al backend online
        source: '/api/v1/:path*',
        destination: 'https://drone-dt-api.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;