import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler: Desactivado para estabilidad absoluta del MVP */
  experimental: {
    reactCompiler: false,
  },


  /* Output optimizado para Vercel y Docker */
  output: 'standalone',

  /* Optimización de seguridad y rendimiento */
  poweredByHeader: false,
  compress: true,

  /* Nota: Se eliminó devIndicators.appIsrStatus ya que está 
     depreciado en Next.js 15 y causaba errores en tu build log.
  */
};

export default nextConfig;