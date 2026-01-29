import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google"; // Montserrat es la más cercana a Tesla
import "./globals.css";

// Rutas relativas explícitas para evitar conflictos de alias
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Fuente para cuerpo de texto (Limpia y moderna)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Fuente para Títulos (Estilo Tesla/Gotham)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFD700",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DRONE DT | Tecnología Aérea Avanzada",
  description: "E-commerce líder en drones industriales en Bogotá. Desarrollado por Software DT.",
  keywords: ["Drones Bogotá", "Drone DT", "Software DT"],
  authors: [{ name: "Manuel Nieto - NietoDeveloper" }],
  robots: "index, follow",
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
        className="font-montserrat antialiased bg-black text-textColor min-h-screen flex flex-col"
      >
        {/* Navbar fixed para que flote sobre el video de Monserrate */}
        <Navbar />
        
        {/* Sin padding superior para que el Banner ocupe toda la pantalla */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}