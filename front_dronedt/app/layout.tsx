import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer"; // Importamos tu nuevo footer profesional




export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-main text-textColor flex flex-col min-h-screen font-sans selection:bg-yellowColor selection:text-headingColor"
      >
        {/* Header fijo con z-index superior */}
        <Header />


        <main className="flex-grow w-full max-w-[1900px] min-w-[310px] mx-auto overflow-x-hidden">
          {children}
        </main>

        {/* Footer profesional que ajustamos anteriormente */}
        <Footer />
      </body>
    </html>
  );
}