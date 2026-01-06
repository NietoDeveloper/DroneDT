import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
import { Navbar } from "@/components/shared/navbar/Navbar";

// Configuración de fuentes con nombres de variables estándar de Next.js
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "DroneDT | Elite Drone Solutions",
  description: "E-commerce platform for manufacturing and selling drones in Colombia, inspired by Tesla.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased bg-main text-textColor flex flex-col min-h-screen font-sans"
      >
        {/* Navbar global: Software DT Identity */}
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <footer className="py-6 text-center text-xs opacity-60 border-t border-gainsboro bg-white/50 backdrop-blur-md">
          <p>© {new Date().getFullYear()} Software DT. Inspirado en la excelencia tecnológica.</p>
        </footer>
      </body>
    </html>
  );
}