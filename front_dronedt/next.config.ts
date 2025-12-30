
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Activación del React Compiler */
  /* Esto automatiza useMemo y useCallback para máximo rendimiento en DroneDT */
  experimental: {
    reactCompiler: true,
  },

  /* 2. Optimización de Imágenes (Para el catálogo de Drones) */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Permitir fotos desde tus buckets de AWS S3
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Backup por si usas Cloudinary para assets rápidos
      },
    ],
  },

  /* 3. Configuración de Seguridad y Limpieza */
  poweredByHeader: false, // Oculta que la app corre con Next.js (Seguridad)
  reactStrictMode: true,  // Ayuda a detectar renderizados dobles en desarrollo

  /* 4. Alias de Rutas y Webpack (Opcional, Next lo maneja por defecto con el alias @/*) */
  
  /* 5. Redirecciones Estratégicas */
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;