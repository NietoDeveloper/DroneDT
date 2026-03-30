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
        // 🛠️ AJUSTE CRÍTICO: Captura todo desde la raíz de /api para evitar el 404 local
        source: '/api/:path*',
        destination: 'https://drone-dt-api.up.railway.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;