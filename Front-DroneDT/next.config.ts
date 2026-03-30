import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚡ Optimización de Rendimiento
  reactStrictMode: true,
  compress: true,
  
  // 🛡️ Arquitectura de Seguridad y Despliegue
  output: 'standalone', // Ideal para Docker y Railway
  
  typescript: {
    ignoreBuildErrors: false, // Mantenemos la integridad del tipado en producción
  },

  // 🖼️ Configuración de Assets Externos (S3 y Cloudinary)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Soporta todos los buckets de AWS S3
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 🛰️ TÚNEL DE COMUNICACIÓN (Uplink Redirect)
  async rewrites() {
    return [
      {
        // Intercepta todas las llamadas locales a /api/v1/ y las redirige al clúster de Railway
        source: '/api/v1/:path*',
        destination: 'https://tu-api-real.up.railway.app/api/v1/:path*', 
      },
    ];
  },
};

export default nextConfig;