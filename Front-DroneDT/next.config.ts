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

  // 🛰️ UPLINK TUNNEL: Sincronización con la raíz de Railway
  async rewrites() {
    return [
      {
        /**
         * ❌ ERROR ANTERIOR: destination: 'https://drone-dt-api.up.railway.app/:path*'
         * El :path* solo capturaba "products/menu", eliminando el prefijo "api/v1".
         * * ✅ SOLUCIÓN: Mapear el path completo incluyendo el prefijo que el Back espera.
         */
        source: '/api/v1/:path*',
        destination: 'https://drone-dt-api.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;