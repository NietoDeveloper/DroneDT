import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Identidad Software DT
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        headingColor: "#000000",
        
        // Identidad DroneDT (Tesla Style)
        primary: '#007BFF',    
        secondary: '#212121',  
        accent: '#CC0000',     
        'neutral-light': '#FAFAFA',
        'neutral-dark': '#818181',
        'text-primary': '#FFFFFF',
        'text-secondary': '#000000',
      },
    },
  },
  plugins: [],
};

export default config;