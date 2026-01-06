// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "next/font/google"; // Corrected import names
import "./globals.css";
import Navbar from "../components/Navbar"; // Import the Navbar component (adjust path if needed)






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar /> {/* Integrated Navbar here for global header across all pages */}
        {children}
      </body>
    </html>
  );
}