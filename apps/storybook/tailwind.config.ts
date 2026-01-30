import type { Config } from "tailwindcss";
import { educacrossPreset } from "@fabioeducacross/ui/tailwind-preset";

/**
 * Tailwind Config - Pixel Perfect Mode
 * 
 * ⚠️ IMPORTANTE:
 * - O styles.css do pacote @fabioeducacross/ui já inclui @tailwind base/components/utilities
 * - Este config é usado APENAS para o PostCSS processar classes usadas nos stories
 * - O content escaneia o dist (não src) para garantir consistência com consumo real
 */
const config: Config = {
    content: [
        // Stories e arquivos do Storybook
        "./stories/**/*.{ts,tsx,mdx}",
        "./.storybook/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx,css}",
        // Componentes compilados do pacote (não o src!)
        "../../packages/ui/dist/**/*.{js,mjs}",
        // Fallback para node_modules (quando consumido via pnpm link)
        "./node_modules/@fabioeducacross/ui/dist/**/*.{js,mjs}",
    ],
    presets: [educacrossPreset],
};

export default config;
