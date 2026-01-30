import type { Config } from "tailwindcss";
import { educacrossPreset } from "@fabioeducacross/ui/tailwind-preset";

const config: Config = {
    content: [
        "./stories/**/*.{ts,tsx,mdx}",
        "../../packages/ui/dist/**/*.{js,mjs}",
    ],
    presets: [educacrossPreset],
};

export default config;
