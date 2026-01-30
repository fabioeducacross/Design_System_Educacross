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
        // Note: multi-framework-code addon requer configuração específica para Storybook v10
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {
            builder: {
                viteConfigPath: resolve(__dirname, "../vite.config.ts"),
            },
        },
    },

    // Otimizações de performance
    core: {
        disableTelemetry: true,
        enableCrashReports: false,
    },

    // Desabilitar documentação default do Storybook
    docs: {
        defaultName: 'Docs',
        // Note: autodocs é configurado por story via tags: ['autodocs']
    },

    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@educacross/ui": resolve(__dirname, "../../../packages/ui/dist"),
        };

        // Otimizações de build e performance
        config.build = config.build || {};
        config.build.minify = false; // Temporariamente desabilitado (bug ESM ts-dedent)
        config.build.sourcemap = false; // Desabilita sourcemaps para acelerar
        config.build.chunkSizeWarningLimit = 1000;

        // Otimizações de cache e dependencies
        config.optimizeDeps = config.optimizeDeps || {};
        config.optimizeDeps.include = [
            "react",
            "react-dom",
            "lucide-react",
        ];
        
        // Cache de servidor mais agressivo
        config.server = config.server || {};
        config.server.fs = {
            strict: false,
            allow: ["../.."],
        };
        
        // Otimizações de watcher para Windows
        config.server.watch = {
            usePolling: true, // Necessário no Windows para detectar mudanças
            interval: 100,    // Polling a cada 100ms
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/dist/**',
                '**/storybook-static/**',
                '**/.vite/**',
            ],
        };
        
        // HMR otimizado
        config.server.hmr = {
            timeout: 60000,      // 60s timeout (aumentado para ambientes lentos)
            overlay: true,       // Mostrar errors no browser
            clientPort: 6006,    // Porta do cliente (mesma do dev server)
        };

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
