import type { Config } from "tailwindcss";

const config: Config = {
  // Simplificamos a un solo patrón para que no se le escape nada a Turbopack
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        headingColor: "#000000",
        textColor: "#000000",
      },
      // Definimos backgroundColors explícitos para tus clases bg-main y bg-card
      backgroundColor: {
        'main': '#DCDCDC',
        'card': '#FFFFFF',
      }
    },
  },
  plugins: [],
};
export default config;