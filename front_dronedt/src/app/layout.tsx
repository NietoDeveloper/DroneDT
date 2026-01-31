import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// Fuentes optimizadas para el ecosistema DT
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000", // Fusión total con el hardware del móvil
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas en Bogotá. Ingeniería de clase mundial desarrollada por Software DT.",
  keywords: ["Drones industriales", "Drone DT", "Software DT", "Drones Bogotá", "Tecnología Aeroespacial"],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  robots: "index, follow",
  alternates: {
    // Actualizar cuando tengas el dominio de producción
    canonical: "https://drone-dt.vercel.app", 
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://drone-dt.vercel.app",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    description: "La nueva era de drones industriales en Colombia.",
    siteName: "DRONE DT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`
          ${montserrat.className} 
          antialiased 
          bg-black 
          text-white 
          min-h-screen 
          flex 
          flex-col 
          selection:bg-gold selection:text-black
        `}
      >
        {/* NOTA: Navbar y Footer se manejan en page.tsx con 'dynamic' 
          para optimizar el LCP y evitar duplicados. 
        */}
        
        <main className="flex-grow w-full relative">
          {children}
        </main>

      </body>
    </html>
  );
}