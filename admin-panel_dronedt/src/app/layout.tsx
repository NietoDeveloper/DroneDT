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
