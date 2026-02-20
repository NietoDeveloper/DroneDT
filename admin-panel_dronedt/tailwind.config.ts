import type { Config } from "tailwindcss";

const config: Config = {
  // Escaneo profundo de src incluyendo rutas dinámicas y grupos (auth/dashboard)
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de identidad Drone DT
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        headingColor: "#000000",
        textColor: "#000000",
      },
      // Clases personalizadas de fondo
      backgroundColor: {
        'main': '#DCDCDC',
        'card': '#FFFFFF',
      },
    },
  },
  plugins: [],
};

export default config;