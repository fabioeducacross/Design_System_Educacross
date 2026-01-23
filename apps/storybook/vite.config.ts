import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    base: "./", // Usa caminhos relativos para assets
    resolve: {
        alias: {
            "@educacross/ui": resolve(__dirname, "../../packages/ui/src"),
        },
    },
});
