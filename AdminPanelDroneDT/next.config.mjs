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
     Optimización de paquetes: Asegura que Next.js no intente compilar 
     librerías pesadas de servidor en el lado del cliente.
  */
  experimental: {
    // Optimiza el empaquetado de componentes grandes
    optimizePackageImports: ['lucide-react'],
  },

  /* 
     Configuración de salida para despliegue en Railway/Docker
  */
  output: 'standalone', // Crea un build optimizado para contenedores Docker

  // Evita errores de compilación por ESLint o TypeScript durante el deploy
  // (Opcional: solo si prefieres validar manualmente antes de subir)
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;