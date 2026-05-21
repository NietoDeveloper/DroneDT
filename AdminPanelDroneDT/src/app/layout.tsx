import type { Metadata } from "next";
import "./globals.css"; 
// CORRECCIÓN: Importación nombrada usando llaves para machacar el error de Turbopack
import { Preloader } from "@/components/ui/Preloader";

/**
 * Metadata - Drone DT Intelligence System
 * World-Class Engineering by NietoDeveloper
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Panel Control Empresa Drone DT',
    default: 'Panel Control Empresa DroneDT',
  },
  description: "Sistema de Inteligencia y Gestión Drone DT. Ingeniería de alto rendimiento por NietoDeveloper.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="selection:bg-gold selection:text-black">
      <body 
        className="
          bg-main 
          antialiased 
          h-screen 
          w-screen
          overflow-hidden
          fixed
          inset-0
          flex
          flex-col
        "
      >
        {/* Preloader con calibración de sistema (3.5s) */}
        <Preloader />

        {/* Barra superior dorada Aeroespacial - Línea de identidad Drone DT */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-yellow-color to-gold z-[9999]" />

        <main className="flex-1 relative z-10 h-full w-full overflow-hidden">
          {children}
        </main>

      </body>
    </html>
  );
}