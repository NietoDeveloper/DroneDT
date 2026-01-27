import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// ⚠️ Usamos rutas relativas temporalmente para descartar fallos de configuración del alias @/
// Asegúrate de que los archivos se llamen Navbar.tsx y Footer.tsx (Mayúsculas)
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Configuración de fuentes optimizada para carga rápida
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

// Viewport: Nueva convención de Next.js 15
export const viewport: Viewport = {
  themeColor: "#FFD700", // Gold de Software DT
  width: "device-width",
  initialScale: 1,
};

// Metadata: SEO Clase Mundial
export const metadata: Metadata = {
  title: "DRONE DT | Tecnología Aérea Avanzada",
  description: "E-commerce líder en drones industriales en Bogotá. Desarrollado por Software DT.",
  keywords: ["Drones Bogotá", "Drone DT", "Software DT"],
  authors: [{ name: "Manuel Nieto - NietoDeveloper" }],
  robots: "index, follow",
};

      </body>
    </html>
  );
}