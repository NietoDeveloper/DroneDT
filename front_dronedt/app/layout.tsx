import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer"; // Importamos tu nuevo footer profesional


const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DroneDT | Elite Drone Solutions",
  description: "Plataforma e-commerce de manufactura y servicios de drones en Colombia. Ingeniería de clase mundial.",
};

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
        {/* Header fijo con z-index superior */}
        <Header />

        {/* Contenedor Principal:
            - pt-16 para compensar el header fixed.
            - max-w-[1900px] para monitores ultra-wide.
            - min-w-[310px] para móviles antiguos.
            - w-full para fluidez total.
        */}
        <main className="flex-grow w-full max-w-[1900px] min-w-[310px] mx-auto overflow-x-hidden">
          {children}
        </main>

        {/* Footer profesional que ajustamos anteriormente */}
        <Footer />
      </body>
    </html>
  );
}