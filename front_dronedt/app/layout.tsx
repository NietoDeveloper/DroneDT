import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; 
// Ruta corregida: El archivo está en sections, no en layout
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
lay: "swap",
});


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {


        {/* Footer Profesional de DroneDT */}
        <Footer />
      </body>
    </html>
  );
}