import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// Fuentes optimizadas: Montserrat para headings y Inter para lectura técnica
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Permitimos zoom para accesibilidad, pero mantenemos control
  viewportFit: "cover", // Vital para dispositivos con notch (iPhone/Android modernos)
};

export const metadata: Metadata = {
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas. Ingeniería de clase mundial desarrollada en Bogotá por Software DT para el mercado global.",
  keywords: [
    "Drones industriales Colombia", 
    "Drone DT", 
    "Software DT", 
    "Drones Bogotá", 
    "Tecnología Aeroespacial", 
    "Manuel Nieto Software",
    "Drones de carga",
    "Inspección técnica drones"
  ],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://drone-dt.vercel.app", 
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://drone-dt.vercel.app",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    description: "La nueva era de drones industriales en Colombia. Potencia, precisión y autonomía.",
    siteName: "DRONE DT",
    images: [
      {
        url: "/og-image.png", // Asegúrate de tener esta imagen en /public para redes sociales
        width: 1200,
        height: 630,
        alt: "Drone DT Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRONE DT | Ingeniería Aeroespacial",
    description: "Drones industriales de alto rendimiento.",
    creator: "@NietoDeveloper",
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
          selection:bg-[#FFD700] selection:text-black
        `}
      >
        {/* Capa de ruido sutil global para textura premium */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <main className="flex-grow w-full relative flex flex-col">
          {children}
        </main>

        {/* Estilo para ocultar barras de scroll en elementos específicos si es necesario */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </body>
    </html>
  );
}