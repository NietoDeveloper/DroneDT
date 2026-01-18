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

      // Sombras personalizadas para resaltar los drones
      boxShadow: {
        'drone-light': '0 4px 15px rgba(65, 105, 225, 0.1)',
        'drone-gold': '0 4px 15px rgba(255, 215, 0, 0.3)',
      },
      // Animaciones para efectos de vuelo en la UI
      animation: {
        'float': 'hoverFloat 3s ease-in-out infinite',
      },

      }
    },
  },
  plugins: [],
};

export default config;