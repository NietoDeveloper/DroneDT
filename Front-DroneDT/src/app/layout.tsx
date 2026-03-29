import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import React from "react";

// Configuración de fuentes con variables CSS para uso en Tailwind
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFD700",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dronedt.vercel.app"), // URL actualizada a tu despliegue
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas. Ingeniería de clase mundial desarrollada en Bogotá por Nieto Laboratory.",
  keywords: ["Drones industriales Colombia", "Drone DT", "Software DT", "Manuel Nieto Software", "Nieto Laboratory"],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Nieto Laboratory",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://dronedt.vercel.app",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    siteName: "DRONE DT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Drone DT Industrial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRONE DT | Ingeniería Aeroespacial",
    creator: "@NietoDeveloper",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`
          ${montserrat.className} 
          antialiased 
          bg-[#DCDCDC] 
          text-black 
          min-h-screen 
          overflow-x-hidden
          selection:bg-[#FFD700] selection:text-black
        `}
      >
        {/* Preloader con prioridad de renderizado */}
        <Preloader />

        {/* Capa de ruido visual (Texture Overlay) */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Contenedor principal: z-index ajustado para no tapar el Preloader pero estar sobre el ruido */}
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>

        {/* Estilos Globales Críticos (Inyectados de forma segura) */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            background-color: #DCDCDC !important;
            height: 100%;
          }

          /* Scrollbar Estilo Drone DT Gold & Black */
          ::-webkit-scrollbar {
            width: 10px !important;
            height: 10px !important;
          }

          ::-webkit-scrollbar-track {
            background: #000000 !important;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #FFD700 !important;
            border-radius: 0px !important; /* Estilo industrial cuadrado */
            border: 2px solid #000000 !important;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #FEB60D !important;
          }

          /* Optimización de Scroll para iOS */
          * {
            -webkit-overflow-scrolling: touch;
          }

          .no-scrollbar::-webkit-scrollbar { 
            display: none !important; 
          }
        `}} />
      </body>
    </html>
  );
}