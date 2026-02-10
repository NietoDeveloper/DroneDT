import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader"; // <--- Asegúrate de crear este archivo

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
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://drone-dt.vercel.app"), // FIX: Elimina el warning de Vercel
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas. Ingeniería de clase mundial desarrollada en Bogotá por Software DT.",
  keywords: ["Drones industriales Colombia", "Drone DT", "Software DT", "Manuel Nieto Software"],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://drone-dt.vercel.app",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    siteName: "DRONE DT",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRONE DT | Ingeniería Aeroespacial",
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
        {/* SISTEMA DE CARGA AEROESPACIAL */}
        <Preloader />

        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <main className="flex-grow w-full relative flex flex-col">
          {children}
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </body>
    </html>
  );
}