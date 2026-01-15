import type { Config } from "tailwindcss";
import { educacrossPreset } from "@educacross/ui/tailwind-preset";

const config: Config = {
  presets: [educacrossPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/dist/**/*.{js,mjs}",
  ],
};

export default config;
