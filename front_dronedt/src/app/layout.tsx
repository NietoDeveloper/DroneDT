import type { Metadata } from "next";
import { GeistSans, GeistMono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Usando el alias @/ definido en tu identidad técnica
import Footer from "@/components/Footer";

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
ssName={`${geistSans.variable} ${geistMono.variable} antialiased bg-main text-textColor flex flex-col min-h-screen`}
      >
