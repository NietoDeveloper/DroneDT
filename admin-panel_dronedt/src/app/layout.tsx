import type { Metadata } from "next";
// Al estar en src/app/layout.tsx, "../" sube a src/ para encontrar globals.css
import "../globals.css";

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
      {/* Usamos bg-main y text-textColor definidos en tu tailwind.config.ts */}
      <body className="bg-main text-textColor antialiased">
        {children}
      </body>
    </html>
  );
}