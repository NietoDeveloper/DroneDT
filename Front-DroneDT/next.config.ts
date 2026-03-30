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



export default nextConfig;