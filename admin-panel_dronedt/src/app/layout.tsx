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
       
                <span className="font-bold text-heading">Engineered by NietoDeveloper</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}