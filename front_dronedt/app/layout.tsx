import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
// Ruta corregida: El archivo está en sections, no en layout
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
lay: "swap",
});


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-main text-textColor flex flex-col min-h-screen font-sans selection:bg-yellowColor selection:text-headingColor"
      >
        {/* Header de DroneDT - Ubicado en components/sections */}
        <Header />

        {/* Contenedor Principal:
            - pt-16 o pt-20: Ajuste necesario para que el contenido no quede oculto bajo el Header fijo.
            - max-w-[1900px]: Límite para pantallas Ultra-Wide.
            - min-w-[310px]: Garantía para dispositivos móviles pequeños.
            - mx-auto: Centrado horizontal en pantallas grandes.
        */}
        <main className="flex-grow w-full max-w-[1900px] min-w-[310px] mx-auto overflow-x-hidden pt-16">
          {children}
        </main>

        {/* Footer Profesional de DroneDT */}
        <Footer />
      </body>
    </html>
  );
}