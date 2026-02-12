import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

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
  themeColor: "#FFD700", // Color Gold DT en la barra del navegador
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://drone-dt.vercel.app"),
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas. Ingeniería de clase mundial desarrollada en Bogotá por Software DT.",
  keywords: ["Drones industriales Colombia", "Drone DT", "Software DT", "Manuel Nieto Software"],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://drone-dt.vercel.app",
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
        style={{ overscrollBehaviorY: 'none' }} // Evita el rebote de scroll "duro" en browsers modernos
      >
        {/* SISTEMA DE CARGA AEROESPACIAL */}
        <Preloader />

        {/* TEXTURA DE RUIDO INDUSTRIAL - Z-0 */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Contenedor principal con el flujo 80/20 respetado */}
        <main className="relative z-10 w-full min-h-screen flex flex-col">
          {children}
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          /* Solución definitiva al scroll pegajoso */
          html, body {
            scrollbar-gutter: stable; /* Evita el salto de layout al aparecer el scroll ancho */
          }

          /* Animación de la barra de scroll Gold DT al cargar */
          ::-webkit-scrollbar-thumb {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
          }

          /* Suavizado de hardware para componentes pesados */
          * {
            -webkit-overflow-scrolling: touch;
          }
        `}} />
      </body>
    </html>
  );
}