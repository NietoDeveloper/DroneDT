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

  // 🛰️ UPLINK TUNNEL: Conexión blindada con el Cluster de Railway (Nieto Laboratory)
  async rewrites() {
    return [
      {
        /** * 🛠️ AJUSTE CRÍTICO: 
         * Mapeamos /api/v1/:path* para que el Navbar.tsx encuentre los productos
         * sin causar CORS ni 404 en localhost.
         */
        source: '/api/v1/:path*',
        destination: 'https://back-dronedt-production.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;