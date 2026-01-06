import type { Metadata } from "next";
import { GeistSans, GeistMono } from "next/font/google";
import "@/styles/globals.css"; // Ruta ajustada a src/styles/

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DroneDT",
  description: "E-commerce platform for manufacturing and selling drones in Colombia, inspired by Tesla.com",
};

export default function RootLayout({
  children,
}: Readonly<{
