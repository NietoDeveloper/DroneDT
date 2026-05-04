/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 
      REACT STRICT MODE
      Detección proactiva de efectos secundarios y fugas de memoria.
      Esencial para mantener la estabilidad del Ciclo S+.
  */
  reactStrictMode: true,

  /* 
      SECURITY & ASSET MANAGEMENT
      Configuración de Remote Patterns para S3 y referencias visuales.
      Asegura que las esmeraldas y assets industriales se rendericen con Next/Image.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Buckets globales de AWS
      },
      {
        protocol: 'https',
        hostname: 'www.spacex.com', // Referencias estéticas SpaceX
      },
    ],
  },

