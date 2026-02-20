import type { Metadata } from "next";
import "./globals.css"; 
import Preloader from "@/components/ui/Preloader";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: {
    template: '%s | Drone DT',
    default: 'Drone DT | Drones Profesionales Colombia',
  },
  description: "Fabricación, personalización y venta de drones de alto rendimiento en Colombia. Soluciones para logística, inspección y más.",
  icons: {
    // Usamos icon.svg para que el navegador use el mismo logo vectorial
    icon: '/icon.svg', 
    apple: '/icon.svg',
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
          bg-main 
          antialiased 
          min-h-screen 
          selection:bg-gold 
          selection:text-black
        "
      >
        {/* Capa de Pre-carga */}
        <Preloader />

        <div className="relative flex min-h-screen flex-col">
          {/* Barra superior dorada – Vibe Aeroespacial */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-yellowColor to-gold z-[9999]" />

          {/* Contenedor Principal */}
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>

          {/* Footer de Integridad Técnica */}
          <footer className="py-8 px-6 md:px-12 border-t border-gainsboro bg-white/40 backdrop-blur-xl relative z-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Logo en Footer - Invertimos colores si el fondo es claro */}
                <div className="opacity-80 hover:opacity-100 transition-opacity filter brightness-0">
                  <Logo iconSize={24} className="scale-75 origin-left" hideText={false} />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
                  <span className="opacity-80">© 2026 Drone DT — Industry Standard</span>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600/80">Atlas-MERN: Connected</span>
                    </div>
                    <span className="font-bold text-heading tracking-widest">
                      System by <span className="text-gold">NietoDeveloper</span>
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