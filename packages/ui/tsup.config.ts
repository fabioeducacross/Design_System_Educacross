import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "tailwind-preset": "src/tailwind-preset.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: false, // Não limpar - o clean é feito no script build antes
    external: ["react", "react-dom"],
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        };
    },
    onSuccess: async () => {
        // CSS já foi compilado pelo script build:css (pnpm build:css)
        // Apenas copiar assets para o dist
        const fs = await import("fs");
        const path = await import("path");
        
        // Copy assets folder
        const assetsSrc = path.resolve("src/assets");
        const assetsDest = path.resolve("dist/assets");
        if (fs.existsSync(assetsSrc)) {
            fs.cpSync(assetsSrc, assetsDest, { recursive: true });
            console.log("✓ Copied assets to dist");
        }
    },
});
