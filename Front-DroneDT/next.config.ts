import type { NextConfig } from "next";

/**
 * ARCHITECT: Manuel Nieto | Rank #1 Colombia
 * CONFIGURATION: Drone DT Enterprise Ecosystem
 * PURPOSE: Multi-Cluster Uplink & Asset Security
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  
  // 💡 Mantenemos standalone para optimización en Railway/Docker
  output: 'standalone', 
  
  typescript: {
    ignoreBuildErrors: false, 
  },

  images: {
    /**
     * 🖼️ REMOTE PATTERNS: 
     * Autorizamos los buckets de S3 y Cloudinary para evitar el error "Hostname not configured".
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Acepta cualquier subdominio de S3 (us-east-1, etc.)
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'back-dronedt-production.up.railway.app', // Autorizamos el Back para imágenes locales
      }
    ],
  },

  // 🛰️ UPLINK TUNNEL: Conexión blindada con el Cluster de Railway (Nieto Laboratory)
  async rewrites() {
    return [
      {
        /** * 🛠️ AJUSTE CRÍTICO DE RANGO #1: 
         * Mapeamos /api/v1/:path* para que:
         * 1. Navbar.tsx encuentre /api/v1/products/menu
         * 2. GalleryShowcase.tsx encuentre /api/v1/gallery
         * 3. Cualquier endpoint futuro en Railway sea transparente para el Front local.
         */
        source: '/api/v1/:path*',
        destination: 'https://back-dronedt-production.up.railway.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;