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

      backgroundImage: {
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },


      boxShadow: {

      }
    },
  },
  plugins: [

  ],
};

export default config;