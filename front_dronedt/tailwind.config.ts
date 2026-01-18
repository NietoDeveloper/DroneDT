import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  // Soporte para la estructura de última generación en la carpeta src
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Paleta de colores Software DT + DroneDT
      colors: {
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        royalBlue: "#4169E1", // El nuevo Azul Rey para autoridad tecnológica
        headingColor: "#000000",
        textColor: "#000000",
      },

      // Sombras personalizadas para resaltar los drones
      boxShadow: {
        'drone-light': '0 4px 15px rgba(65, 105, 225, 0.1)',
        'drone-gold': '0 4px 15px rgba(255, 215, 0, 0.3)',
      },
      // Animaciones para efectos de vuelo en la UI
      animation: {
        'float': 'hoverFloat 3s ease-in-out infinite',
      },
      keyframes: {
        hoverFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;