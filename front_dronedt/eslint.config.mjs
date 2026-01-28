import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
});

const eslintConfig = [
  // 1. Heredamos las reglas de Next de forma compatible
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // 2. Definimos los archivos a ignorar (Equivalente a globalIgnores)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**"
    ],
  },
];

export default eslintConfig;