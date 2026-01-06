import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "tailwind-preset": "src/tailwind-preset.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        };
    },
    onSuccess: async () => {
        // Copy CSS and assets to dist
        const fs = await import("fs");
        const path = await import("path");
        
        // Copy styles.css
        const cssSrc = path.resolve("src/styles.css");
        const cssDest = path.resolve("dist/styles.css");
        fs.copyFileSync(cssSrc, cssDest);
        console.log("✓ Copied styles.css to dist");
        
        // Copy assets folder
        const assetsSrc = path.resolve("src/assets");
        const assetsDest = path.resolve("dist/assets");
        if (fs.existsSync(assetsSrc)) {
            fs.cpSync(assetsSrc, assetsDest, { recursive: true });
            console.log("✓ Copied assets to dist");
        }
    },
});
