import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // tener en cuenta que agregar más archivos a la configuración de content puede aumentar el tiempo de compilación, ya que Tailwind tendrá que analizar más archivos. Por lo tanto, si notas que la compilación se vuelve significativamente más lenta, puedes considerar limitar los archivos incluidos en content a aquellos que realmente utilizan las clases de Tailwind.
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
     './src/pokemons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shopping-cart/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
