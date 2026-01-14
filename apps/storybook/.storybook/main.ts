import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/addon-themes",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@educacross/ui": resolve(__dirname, "../../../packages/ui/src"),
        };
        
        // Configurar base path para GitHub Pages
        if (process.env.NODE_ENV === 'production') {
            config.base = '/Design_System_Educacross/';
        }
        
        return config;
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
};

export default config;
