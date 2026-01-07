import type { Metadata } from "next";
// Next.js 16 usa estos nombres para Google Fonts
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
// Ajustado a tu esqueleto: components/layout/Header.tsx
import Header from "@/components/layout/Header";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DroneDT | Elite Drone Solutions",
  description: "E-commerce platform for manufacturing and selling drones in Colombia, inspired by Tesla.com",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-main text-textColor flex flex-col min-h-screen font-sans"
      >
        {/* Usamos el componente Header según tu estructura profesional */}
        <Header />

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {children}
        </main>

        <footer className="py-8 text-center text-xs border-t border-gainsboro bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-headingColor">Software DT</p>
            <p className="opacity-60">
              © {new Date().getFullYear()} DroneDT. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}