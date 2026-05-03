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
      },



      boxShadow: {

      }
    },
  },
  plugins: [

  ],
};

export default config;