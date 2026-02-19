import type { Metadata } from "next";
// Usamos el alias @ que apunta a la carpeta /src definida en tsconfig.json
import "@/globals.css";

export const metadata: Metadata = {
  title: "Drone DT | Admin Control Panel",
  description: "World-class drone management system by NietoDeveloper",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Aplicamos la identidad de Drone DT: bg-main (#DCDCDC) y textColor (#000000) */}
      <body className="bg-main text-textColor antialiased">
        {children}
      </body>
    </html>
  );
}