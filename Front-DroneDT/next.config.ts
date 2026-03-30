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




export default nextConfig;