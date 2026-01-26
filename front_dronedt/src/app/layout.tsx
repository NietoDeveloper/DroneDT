import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configuración de fuentes
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: 'swap',
});

// Configuración de Viewport (Separada en Next.js 15)
export const viewport: Viewport = {
  themeColor: "#FFD700", // Color Gold de Software DT
  width: "device-width",
  initialScale: 1,
};

// Metadata optimizada para SEO y marca
export const metadata: Metadata = {
  title: "DRONE DT | Tecnología Aérea Avanzada",
  description: "E-commerce líder en drones industriales, vigilancia y servicios de fotogrametría en Bogotá, Colombia. Desarrollado por Software DT.",
  keywords: ["Drones Bogotá", "Drone DT", "Venta de drones", "Software DT", "Drones Industriales"],
  authors: [{ name: "Manuel Nieto - NietoDeveloper" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-main text-textColor min-h-screen flex flex-col`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Contenido principal con espaciado para el Navbar */}
        <main className="flex-grow pt-20"> 
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}