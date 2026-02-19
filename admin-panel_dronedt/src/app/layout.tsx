import type { Metadata } from "next";
import "@/globals.css";

// Definimos los metadatos con el branding de Drone DT
export const metadata: Metadata = {
  title: {
    template: '%s | Drone DT Global',
    default: 'Drone DT | Admin Control Panel',
  },
  description: "High-performance drone management system for e-commerce and logistics. Engineered by Manuel Nieto.",
  icons: {
    icon: '/favicon.ico', // Asegúrate de tener tu logo
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-main text-textColor antialiased min-h-screen selection:bg-gold selection:text-black">
        {/* Capa de seguridad visual: Un sutil ruido o malla futurista opcional puede ir aquí */}
        <div className="relative flex min-h-screen flex-col">
          
          {/* Overlay de Seguridad/Branding: 
              Podemos agregar una barra superior mínima que indique el estado del clúster 
              siempre visible o un borde de "seguridad" en los extremos.
          */}
          <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-yellowColor to-gold z-50" />

          {/* Contenedor Principal */}
          <div className="flex-1 flex flex-col">
            {children}
          </div>

          {/* Footer de integridad técnica */}
          <footer className="py-4 px-8 border-t border-gainsboro bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 font-mono">
              <span>© 2026 Drone DT | Secure Systems</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Cluster: Atlas-MERN-Live
              </span>
              <span>Dev by NietoDeveloper #1 COL</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}