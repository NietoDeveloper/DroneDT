import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

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
  metadataBase: new URL("https://drone-dt.vercel.app"),
  title: {
    default: "DRONE DT | Ingeniería Aeroespacial & Tecnología Autónoma",
    template: "%s | DRONE DT"
  },
  description: "Líderes en tecnología de drones industriales y soluciones autónomas. Ingeniería de clase mundial desarrollada en Bogotá por Software DT.",
  keywords: ["Drones industriales Colombia", "Drone DT", "Software DT", "Manuel Nieto Software"],
  authors: [{ name: "Manuel Nieto", url: "https://github.com/NietoDeveloper" }],
  creator: "NietoDeveloper",
  publisher: "Software DT",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://drone-dt.vercel.app",
    title: "DRONE DT | Tecnología Aérea Avanzada",
    siteName: "DRONE DT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Drone DT Industrial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRONE DT | Ingeniería Aeroespacial",
    creator: "@NietoDeveloper",
    images: ["/og-image.png"],
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
          overflow-hidden
          selection:bg-[#FFD700] selection:text-black
        `}
      >
        {/* SISTEMA DE CARGA AEROESPACIAL */}
        <Preloader />

        {/* TEXTURA DE RUIDO INDUSTRIAL */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* REMOVIDO: flex-col para no romper el snap scroll del page.tsx */}
        <main className="w-full relative z-10">
          {children}
        </main>

        {/* ESTILOS GLOBALES DE UTILIDAD */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          ::selection { background: #FFD700; color: #000000; }
        `}} />
      </body>
    </html>
  );
}