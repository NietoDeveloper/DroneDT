import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler: Desactivado temporalmente para permitir el build 
     sin el error de babel-plugin-react-compiler.
  */
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Mantengo tu conexión a AWS S3
      },
    ],
  },
};

export default nextConfig;