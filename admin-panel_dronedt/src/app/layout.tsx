import type { Metadata } from "next";
import "./globals.css"; 
import Preloader from "@/components/ui/Preloader";
import Logo from "@/components/ui/Logo";

/**
 * Metadata - Drone DT Intelligence System
 * El archivo 'src/app/icon.svg' es detectado automáticamente por Next.js
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
    <html lang="es" className="scroll-smooth">
      <body 
        className="
          bg-main 
          antialiased 
          min-h-screen 
          selection:bg-gold 
          selection:text-black
        "
      >
        {/* Preloader con calibración de sistema (3.5s) */}
        <Preloader />

        <div className="relative flex min-h-screen flex-col">
          {/* Barra superior dorada Aeroespacial */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-yellowColor to-gold z-[9999]" />

          {/* Área de Contenido Principal */}
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>

          {/* Footer Técnico de Drone DT */}
          <footer className="py-8 px-6 md:px-12 border-t border-gainsboro bg-white/40 backdrop-blur-xl relative z-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Logo en el Footer linkeado a la página principal */}
                <div className="opacity-80 hover:opacity-100 transition-opacity filter brightness-0">
                  <Logo iconSize={24} className="scale-75 origin-left" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
                  <a 
                    href="https://softwaredt.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="opacity-80 hover:text-gold transition-colors cursor-pointer"
                  >
                    © 2026 <span className="font-bold">Software DT</span> — Industry Standard
                  </a>
                  
                  <div className="flex items-center gap-6">
                    {/* Indicador de Conexión en Tiempo Real */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600/80">Atlas-MERN: Connected</span>
                    </div>
                    
                    {/* Créditos del Desarrollador #1 Colombia con Link a GitHub */}
                    <span className="font-bold text-heading tracking-widest">
                      System by{" "}
                      <a 
                        href="https://github.com/NietoDeveloper" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-yellowColor transition-all underline underline-offset-4 decoration-gold/30"
                      >
                        NietoDeveloper
                      </a>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}