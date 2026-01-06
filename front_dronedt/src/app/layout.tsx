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
