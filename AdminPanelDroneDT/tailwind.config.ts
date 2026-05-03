import type { Config } from "tailwindcss";

const config: Config = {
  // El escaneo ahora incluye la raíz para no perder ningún archivo de configuración
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Sincronización exacta con globals.css v4
      colors: {
        "gainsboro": "var(--color-gainsboro)",
        "gold": "var(--color-gold)",
        "yellow-color": "var(--color-yellow-color)",
        "heading": "var(--color-heading)",
        "main": "var(--color-main)",
        "true-black": "var(--color-true-black)",
        "emerald-glow": "var(--color-emerald-glow)",
      },
      // Breakpoints personalizados para el rango 310px - 1900px
      screens: {
        "xs": "310px",
        "uw": "1900px",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'in-fade': 'fadeIn 0.5s ease-out',
      },
      boxShadow: {
        'premium': "var(--shadow-premium)",
        'gold-glow': "var(--shadow-gold-glow)",
        'l5-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      // Soporte para gradientes tipo SpaceX
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }
    },
  },
  plugins: [],
};

export default config;