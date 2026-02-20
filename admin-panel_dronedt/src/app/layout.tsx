import type { Metadata } from "next";
import "./globals.css";           // ← Cambio clave #1: ruta relativa correcta (si globals.css está en app/)

export const metadata: Metadata = {
  title: {
    template: '%s | Drone DT',
    default: 'Drone DT | Drones Profesionales Colombia',
  },
  description: "Fabricación, personalización y venta de drones de alto rendimiento en Colombia. Soluciones para logística, inspección y más.",
  icons: {
    icon: '/favicon.ico',       // pon tu logo real aquí después
    // apple: '/apple-icon.png', // opcional
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body 
        className="
          bg-main           // ← asegúrate que estos custom colors estén en tailwind.config
          text-textColor 
          antialiased 
          min-h-screen 
          selection:bg-gold 
          selection:text-black
        "
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Barra superior dorada – vibe Tesla / high-tech */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold z-[9999]" />

          {/* Contenido principal */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {/* Footer minimalista y técnico – buen toque DroneDT */}
          <footer className="py-4 px-6 md:px-12 border-t border-gray-800/50 bg-black/40 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-wider text-gray-500 font-mono">
              <span>© 2026 Drone DT – Bogotá, Colombia</span>
              
             
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}