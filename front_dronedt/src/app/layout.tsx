import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Fuentes más "Tesla-style"
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Fuente para cuerpo (Limpia y moderna)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Fuente para títulos (Elegante y tecnológica)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "DRONE DT | Tecnología Aérea Avanzada",
  description: "E-commerce líder en drones industriales, vigilancia y servicios de fotogrametría en Bogotá, Colombia. Desarrollado por Software DT.",
  keywords: ["Drones Bogotá", "Drone DT", "Venta de drones", "Software DT", "Drones Industriales"],
  authors: [{ name: "Manuel Nieto - NietoDeveloper" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        {/* Navbar fijo en la parte superior */}
        <Navbar />

        {/* Contenido principal con padding-top para no quedar oculto bajo el Navbar */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer al final de todas las páginas */}
        <Footer />
      </body>
    </html>
  );
}