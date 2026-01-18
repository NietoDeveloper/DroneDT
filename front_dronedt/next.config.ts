
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Activación del React Compiler */
  /* Esto automatiza useMemo y useCallback para máximo rendimiento en DroneDT */
  experimental: {
    reactCompiler: true,
  },

  /* 3. Configuración de Seguridad y Limpieza */
  poweredByHeader: false, // Oculta que la app corre con Next.js (Seguridad)
  reactStrictMode: true,  // Ayuda a detectar renderizados dobles en desarrollo

  /* 4. Alias de Rutas y Webpack (Opcional, Next lo maneja por defecto con el alias @/*) */


export default nextConfig;