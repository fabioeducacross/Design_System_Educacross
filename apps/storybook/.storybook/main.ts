// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],

    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-themes"),
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("@storybook/addon-coverage")
    ],

    managerEntries: [
        resolve(__dirname, "./addons/multi-framework-code/register.tsx"),
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },

    // Desabilitar documentação default do Storybook
    docs: {
        defaultName: 'Docs',
        autodocs: false, // Desabilita guias automáticos do Storybook
    },

    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@educacross/ui": resolve(__dirname, "../../../packages/ui/src"),
        };

        // Desabilitar minificação que está causando erro
        config.build = config.build || {};
        config.build.minify = false;

        // Configurar pasta public para assets
        config.publicDir = resolve(__dirname, "../public");
        
        return config;
    },

    typescript: {
        reactDocgen: "react-docgen-typescript",
    }
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
