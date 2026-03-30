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

  // 🛰️ UPLINK REDIRECT (Túnel directo a Producción)
  async rewrites() {
    return [
      {
        // Intercepta /api/v1/ y lo redirige al clúster de Railway
        // IMPORTANTE: Asegúrate de que esta URL sea la misma de tu .env
        source: '/api/v1/:path*',
        destination: 'https://tu-api-real.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;