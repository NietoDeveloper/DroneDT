import type { Metadata } from "next";
import "./globals.css"; 
// CORRECCIÓN: Importación nombrada usando llaves para machacar el error de Turbopack
import { Preloader } from "@/components/ui/Preloader";

/**
 * Metadata - Drone DT Intelligence System
 * World-Class Engineering by NietoDeveloper
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Panel Control Empresa Drone DT',
    default: 'Panel Control Empresa DroneDT',
  },
  description: "Sistema de Inteligencia y Gestión Drone DT. Ingeniería de alto rendimiento por NietoDeveloper.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

  );
}