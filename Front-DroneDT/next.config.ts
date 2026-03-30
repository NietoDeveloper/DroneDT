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
        // Cuando pidas /api/v1/products/menu...
        source: '/api/v1/:path*',
        // ...se enviará a https://drone-dt-api.up.railway.app/api/v1/products/menu
        // Eliminamos el duplicado manual de '/api/v1' en el destination
        destination: 'https://drone-dt-api.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;