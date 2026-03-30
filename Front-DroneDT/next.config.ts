import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
  compress: true,
  reactStrictMode: true,
  // 🛰️ AQUÍ ESTÁ EL TÚNEL PARA EVITAR EL CORS Y ARREGLAR YOUTUBE:
  async rewrites() {
    return [
      {
        // Cuando pidas /api/... en tu código, Next lo redirige a Railway por debajo
        source: '/api/:path*',
        destination: 'https://tu-api-real.up.railway.app/api/:path*', 
      },
    ];
  },
};

export default nextConfig;