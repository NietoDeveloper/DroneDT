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

        {/* TEXTURA DE RUIDO INDUSTRIAL */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          /* RESET PARA ELIMINAR ESPACIOS SOBRANTES AL COSTADO DEL SCROLL */
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            scroll-behavior: smooth;
            background-color: #000000;
          }

          /* SCROLLBAR DRONE DT - ANCHO 18PX */
          ::-webkit-scrollbar {
            width: 18px;
          }

          ::-webkit-scrollbar-track {
            background: #000000;
          }

          ::-webkit-scrollbar-thumb {
            background: #FFD700;
            border-radius: 4px;
            /* El border negro genera el efecto visual de "flotado" dentro del carril */
            border: 3px solid #000000;
            transition: all 0.3s ease;
          }

          /* HOVER GOLD FLOTANTE CON BRILLO DT */
          ::-webkit-scrollbar-thumb:hover {
            background: #FEB60D;
            /* Box shadow interno y externo para potenciar el efecto flotante */
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2), 0 0 20px #FFD700;
            cursor: pointer;
            border-width: 2px; /* Se expande ligeramente al reducir el borde */
          }

          /* Utility clases */
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          ::selection { 
            background: #FFD700 !important; 
            color: #000000 !important; 
          }
        `}} />
      </body>
    </html>
  );
}