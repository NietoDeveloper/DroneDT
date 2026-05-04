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

  },

};

export default nextConfig;