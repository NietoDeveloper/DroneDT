import type { Config } from "tailwindcss";

const config: Config = {
  // Escaneo profundo: cubrimos todas las capas de la arquitectura monorepo
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de Identidad: "High-Value Asset Management"
        "gainsboro": "#DCDCDC",
        "gold": "#FFD700",
        "yellow-color": "#FEB60D",
        "heading": "#000000",
        "main": "#DCDCDC", // Fondo base de la app
      },
      // Extensiones para el Look & Feel de SpaceX / Industrial
      backgroundImage: {
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Animaciones personalizadas para los dashboards de Digital Twin
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Configuraciones de sombra para los widgets tipo "Canvas"
      boxShadow: {
        'l5-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'gold-glow': '0 0 15px -3px rgba(255, 215, 0, 0.3)',
      }
    },
  },
  plugins: [
    // Aquí puedes añadir tailwind-animate si decides usar ShadcnUI más adelante
  ],
};

export default config;