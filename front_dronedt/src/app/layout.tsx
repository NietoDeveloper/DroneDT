import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// 🛡️ Solución Definitiva: Ruta relativa explícita para evitar fallos de alias en Windows/OneDrive
// Desde src/app/layout.tsx subimos un nivel a src/ y entramos a components/
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFD700", // Gold de Software DT
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
        className="font-sans antialiased bg-main text-textColor min-h-screen flex flex-col"
      >
        <Navbar />
        
        {/* El pt-20 asegura que el contenido no quede oculto bajo el Navbar fixed */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}