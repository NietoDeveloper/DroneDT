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
  themeColor: "#FFD700",
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
          bg-black 
          text-white 
          min-h-screen 
          overflow-x-hidden
          selection:bg-[#FFD700] selection:text-black
        `}
      >
        <Preloader />

        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          /* FORZAR SCROLLBAR GOLD DRONE DT */
          
          /* 1. Reset y visibilidad */
          html {
            scrollbar-color: #FFD700 #000000 !important; /* Para Firefox */
            scrollbar-width: auto !important;
          }

          /* 2. Ancho Maestro de 18px */
          ::-webkit-scrollbar {
            width: 18px !important;
            height: 18px !important;
            display: block !important;
          }

          /* 3. Carril Negro Puro */
          ::-webkit-scrollbar-track {
            background: #000000 !important;
          }

          /* 4. El Oro DT (Thumb) Flotante */
          ::-webkit-scrollbar-thumb {
            background-color: #FFD700 !important;
            border-radius: 6px !important;
            /* El borde negro de 4px hace que el oro se vea de 10px y flotando en el carril de 18px */
            border: 4px solid #000000 !important;
            transition: all 0.2s ease-in-out !important;
          }

          /* 5. Hover Gold Flotante Brillante */
          ::-webkit-scrollbar-thumb:hover {
            background-color: #FEB60D !important; /* YellowColor DT */
            border: 2px solid #000000 !important; /* Se ensancha visualmente */
            box-shadow: 0 0 15px #FFD700 !important;
            cursor: pointer !important;
          }

          /* Eliminar el scroll pegajoso y saltos de layout */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            scrollbar-gutter: stable; /* Evita que el contenido salte con la barra de 18px */
          }

          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}} />
      </body>
    </html>
  );
}