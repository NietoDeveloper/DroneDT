import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* En Next.js 15, el React Compiler se activa dentro de experimental.
     Esto optimiza automáticamente los re-renders de tus componentes de DroneDT.
  */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Preparado para tu S3 de AWS
      },
    ],
  },
};

export default nextConfig;