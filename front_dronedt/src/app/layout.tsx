import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// Usamos alias @/ para limpieza si está configurado, o mantenemos rutas relativas
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Fuente para cuerpo (Inter es el estándar de la industria tech)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fuente para Títulos (Montserrat con pesos específicos para el estilo Tesla)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000", // Cambiado a negro para que la barra del móvil se fusione con el header
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Evita zoom accidental en inputs en móviles
};

export const metadata: Metadata = {
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas en Bogotá. Ingeniería de clase mundial desarrollada por Software DT.",
  keywords: ["Drones industriales", "Drone DT", "Software DT", "Drones Bogotá", "Tecnología Aeroespacial"],
  authors: [{ name: "Manuel Nieto", url: "https://nietodeveloper.netlify.app/" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  robots: "index, follow",
  alternates: {
    canonical: "https://dronedt.com", // Ajusta a tu dominio final
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://dronedt.com",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    description: "La nueva era de drones industriales en Colombia.",
    siteName: "DRONE DT",
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
          bg-black 
          text-white 
          min-h-screen 
          flex 
          flex-col 
          selection:bg-gold selection:text-black
        `}
      >
        {/* Navbar con z-index alto para estar sobre el video */}
        <Navbar />
        
        {/* El main NO lleva padding-top para permitir que el video sea Hero Full Screen */}
        <main className="flex-grow w-full relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}