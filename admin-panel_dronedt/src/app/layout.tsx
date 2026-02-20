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

        <div className="relative flex min-h-screen flex-col">
          {/* Barra superior dorada – vibe Tesla / high-tech */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold z-[9999]" />

          {/* Contenido principal */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>


        </div>
      </body>
    </html>
  );
}