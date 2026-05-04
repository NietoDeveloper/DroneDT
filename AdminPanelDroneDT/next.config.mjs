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

  /* 
      DOCKER & RAILWAY OPTIMIZATION
      'standalone' reduce drásticamente el tamaño de la imagen Docker al copiar
      solo los archivos necesarios para el servidor Node.js.
  */
  output: 'standalone',

  /* 
      PERFORMANCE & EXPERIMENTAL
      Forzamos el 'tree-shaking' en librerías pesadas de UI para 
      maximizar la velocidad de carga en el Dashboard.
  */
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@headlessui/react', 
      'framer-motion'
    ],
  },

  /* 
      STRICT VALIDATION
      No se permiten errores de TypeScript ni advertencias de ESLint en el Build.
      Mantiene el estándar de calidad de Nieto Laboratory.
  */
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // Nota: Aunque Turbopack es estricto, forzamos la validación en el build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;