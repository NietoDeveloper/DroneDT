/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 
      REACT STRICT MODE
      Detección proactiva de efectos secundarios. 
      Mandatorio para el Ciclo S+.
  */
  reactStrictMode: true,

  /* 
      SECURITY & ASSET MANAGEMENT
      Configuración optimizada para S3 (Esmeraldas) y referencias de SpaceX.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.spacex.com',
      },
    ],
  },

  /* 
      DOCKER & RAILWAY OPTIMIZATION
      Build standalone para máxima eficiencia en contenedores.
  */
  output: 'standalone',

  /* 
      PERFORMANCE & EXPERIMENTAL
      Turbopack optimizado: tree-shaking agresivo para el Dashboard.
  */
  experimental: {
    optimizePackageImports: [
