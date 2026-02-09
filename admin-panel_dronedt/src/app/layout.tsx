import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-main text-textColor antialiased">
        {children}
      </body>
    </html>
  );
}