import type { Metadata } from "next";
import "./globals.css"; 

export const metadata: Metadata = {
  title: {
    template: '%s | Drone DT',
    default: 'Drone DT | Drones Profesionales Colombia',
  },
  description: "Fabricación, personalización y venta de drones de alto rendimiento en Colombia. Soluciones para logística, inspección y más.",
  icons: {
    icon: '/favicon.ico',
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
          text-text 
          antialiased 
          min-h-screen 
          selection:bg-gold 
          selection:text-black
        "
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Barra superior dorada – Identidad Drone DT */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-color to-gold z-[9999]" />

          {/* Contenido principal con padding para no quedar debajo de la barra fija si fuera necesario */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {/* Footer Técnico - Estilo Committer #1 */}
          <footer className="py-6 px-6 md:px-12 border-t border-gainsboro bg-white/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono">
              <span>© 2026 Drone DT – Bogotá, Colombia</span>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Atlas-MERN Cluster Online</span>
                </div>
                <span className="font-bold text-heading">Engineered by NietoDeveloper</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}