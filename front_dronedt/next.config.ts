import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler: Desactivado para estabilidad en producción */
  experimental: {
    reactCompiler: false,
  },

  /* Configuración de imágenes AWS */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },

  /* Bypass de Seguridad y Calidad - SOLO PARA DESARROLLO RÁPIDO */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* Output Standalone para Docker/Vercel */
  output: 'standalone',

  /* Desactivar indicadores en producción */
  devIndicators: {
    appIsrStatus: false,
  },

  /* Optimización de builds */
  poweredByHeader: false,
  compress: true,
  
  /* Configuración específica para Vercel */
  ...(process.env.VERCEL && {
    output: 'standalone',
  }),
};

export default nextConfig;
