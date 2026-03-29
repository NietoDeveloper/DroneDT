/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Usamos el motor de la v3 estable que tenemos en el package.json
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;