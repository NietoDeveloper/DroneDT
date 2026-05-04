/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 
      Habilita el modo estricto de React para detectar efectos secundarios 
      y problemas de renderizado en el ciclo S+.
  */
  reactStrictMode: true,

  /* 
      Configuración de imágenes: Vital para mostrar las gemas (esmeraldas) 
      desde S3 o AWS sin errores de seguridad.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Permitir imágenes de tus buckets de AWS
      },
      {
        protocol: 'https',
        hostname: 'www.spacex.com', // Para tus referencias visuales
      },
    ],
  },

  /* 
      Configuración de salida para despliegue en Railway/Docker.
      Crea un build optimizado para contenedores Docker (Nieto Laboratory Standard).
  */
  output: 'standalone',

  /* 
      Optimización de paquetes y características experimentales.
      Nota: 'optimizePackageImports' ya es estable en versiones recientes, 
      pero se mantiene aquí para forzar la eficiencia en librerías de iconos.
  */
  experimental: {
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
  },

  /* 
      Configuración de TypeScript: 
      Mantenemos validación estricta para asegurar la calidad del código.
  */
  typescript: {
    ignoreBuildErrors: false,
  },

};

export default nextConfig;