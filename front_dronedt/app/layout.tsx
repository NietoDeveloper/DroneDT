import type { Metadata } from "next";
import { GeistSans, GeistMono } from "next/font/google";
import "@/styles/globals.css"; 
import { Navbar } from "@/components/layout/navbar/Navbar";

// Configuramos las fuentes fuera del componente para evitar re-renders innecesarios
const geistSans = GeistSans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = GeistMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DroneDT | Elite Drone Solutions",
  description: "E-commerce platform for manufacturing and selling drones in Colombia, inspired by Tesla.com",
};

// Usamos una interfaz limpia para los Props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning // Previene errores de hidratación comunes en Next 15/16
    >
      <body
        className="antialiased bg-main text-textColor flex flex-col min-h-screen font-sans"
      >
        {/* Header/Navbar: Punto de inicio del flujo de DroneDT */}
        <Navbar />

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer con estilo Software DT */}
        <footer className="py-8 text-center text-xs border-t border-gainsboro bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-headingColor">Software DT</p>
            <p className="opacity-60">
              © {new Date().getFullYear()} DroneDT. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}