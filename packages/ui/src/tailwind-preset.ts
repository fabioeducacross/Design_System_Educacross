import type { Config } from "tailwindcss";

/**
 * Educacross Design System - Tailwind Preset
 *
 * This preset extends Tailwind CSS with design tokens from the Educacross Design System.
 * All values reference CSS custom properties defined in styles.css.
 *
 * Usage in consumer apps:
 * ```ts
 * // tailwind.config.ts
 * import { educacrossPreset } from "@educacross/ui/tailwind-preset";
 *
 * export default {
 *   presets: [educacrossPreset],
 *   content: [
 *     "./src/** /*.{ts,tsx}",
 *     "./node_modules/@educacross/ui/dist/** /*.js",
 *   ],
 * };
 * ```
 */
export const educacrossPreset: Config = {
    darkMode: ["class"],
    content: [],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // Spacing usando primitivas do Figma
            spacing: {
                "px-1": "var(--padding-1)",
                "px-2": "var(--padding-2)",
                "px-3": "var(--padding-3)",
                "px-4": "var(--padding-4)",
                "px-5": "var(--padding-5)",
                "px-6": "var(--padding-6)",
                "px-7": "var(--padding-7)",
                "px-8": "var(--padding-8)",
                "px-9": "var(--padding-9)",
                "px-10": "var(--padding-10)",
                "px-11": "var(--padding-11)",
                "px-12": "var(--padding-12)",
                "px-13": "var(--padding-13)",
                "px-14": "var(--padding-14)",
                "px-15": "var(--padding-15)",
                "px-16": "var(--padding-16)",
                "px-25": "var(--padding-25)",
            },
            gap: {
                1: "var(--gap-1)",
                2: "var(--gap-2)",
                3: "var(--gap-3)",
                4: "var(--gap-4)",
                5: "var(--gap-5)",
                6: "var(--gap-6)",
                7: "var(--gap-7)",
                8: "var(--gap-8)",
                9: "var(--gap-9)",
                10: "var(--gap-10)",
                11: "var(--gap-11)",
                12: "var(--gap-12)",
                13: "var(--gap-13)",
                14: "var(--gap-14)",
                15: "var(--gap-15)",
                16: "var(--gap-16)",
                25: "var(--gap-25)",
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                // Cores semânticas
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    // Escala de cores (primitivas)
                    100: "var(--color-primary-100)",
                    200: "var(--color-primary-200)",
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                    500: "var(--color-primary-500)",
                    600: "var(--color-primary-600)",
                    700: "var(--color-primary-700)",
                    800: "var(--color-primary-800)",
                    900: "var(--color-primary-900)",
                    // Opacidade
                    "opacity-8": "var(--color-primary-8)",
                    "opacity-16": "var(--color-primary-16)",
                    "opacity-24": "var(--color-primary-24)",
                    "opacity-32": "var(--color-primary-32)",
                    "opacity-38": "var(--color-primary-38)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    // Escala de cores (primitivas)
                    100: "var(--color-secondary-100)",
                    200: "var(--color-secondary-200)",
                    300: "var(--color-secondary-300)",
                    400: "var(--color-secondary-400)",
                    500: "var(--color-secondary-500)",
                    600: "var(--color-secondary-600)",
                    700: "var(--color-secondary-700)",
                    800: "var(--color-secondary-800)",
                    900: "var(--color-secondary-900)",
                    // Opacidade
                    "opacity-8": "var(--color-secondary-8)",
                    "opacity-16": "var(--color-secondary-16)",
                    "opacity-24": "var(--color-secondary-24)",
                    "opacity-32": "var(--color-secondary-32)",
                    "opacity-38": "var(--color-secondary-38)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                // Cores de status (primitivas)
                info: {
                    DEFAULT: "hsl(var(--info))",
                    foreground: "hsl(var(--info-foreground))",
                    100: "var(--color-info-100)",
                    200: "var(--color-info-200)",
                    300: "var(--color-info-300)",
                    400: "var(--color-info-400)",
                    500: "var(--color-info-500)",
                    600: "var(--color-info-600)",
                    700: "var(--color-info-700)",
                    800: "var(--color-info-800)",
                    900: "var(--color-info-900)",
                    "opacity-8": "var(--color-info-8)",
                    "opacity-16": "var(--color-info-16)",
                    "opacity-24": "var(--color-info-24)",
                    "opacity-32": "var(--color-info-32)",
                    "opacity-38": "var(--color-info-38)",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                    100: "var(--color-success-100)",
                    200: "var(--color-success-200)",
                    300: "var(--color-success-300)",
                    400: "var(--color-success-400)",
                    500: "var(--color-success-500)",
                    600: "var(--color-success-600)",
                    700: "var(--color-success-700)",
                    800: "var(--color-success-800)",
                    900: "var(--color-success-900)",
                    "opacity-8": "var(--color-success-8)",
                    "opacity-16": "var(--color-success-16)",
                    "opacity-24": "var(--color-success-24)",
                    "opacity-32": "var(--color-success-32)",
                    "opacity-38": "var(--color-success-38)",
                },
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    foreground: "hsl(var(--warning-foreground))",
                    100: "var(--color-warning-100)",
                    200: "var(--color-warning-200)",
                    300: "var(--color-warning-300)",
                    400: "var(--color-warning-400)",
                    500: "var(--color-warning-500)",
                    600: "var(--color-warning-600)",
                    700: "var(--color-warning-700)",
                    800: "var(--color-warning-800)",
                    900: "var(--color-warning-900)",
                    "opacity-8": "var(--color-warning-8)",
                    "opacity-16": "var(--color-warning-16)",
                    "opacity-24": "var(--color-warning-24)",
                    "opacity-32": "var(--color-warning-32)",
                    "opacity-38": "var(--color-warning-38)",
                },
                error: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                    100: "var(--color-error-100)",
                    200: "var(--color-error-200)",
                    300: "var(--color-error-300)",
                    400: "var(--color-error-400)",
                    500: "var(--color-error-500)",
                    600: "var(--color-error-600)",
                    700: "var(--color-error-700)",
                    800: "var(--color-error-800)",
                    900: "var(--color-error-900)",
                    "opacity-8": "var(--color-error-8)",
                    "opacity-16": "var(--color-error-16)",
                    "opacity-24": "var(--color-error-24)",
                    "opacity-32": "var(--color-error-32)",
                    "opacity-38": "var(--color-error-38)",
                },
                gray: {
                    100: "var(--color-gray-100)",
                    200: "var(--color-gray-200)",
                    300: "var(--color-gray-300)",
                    400: "var(--color-gray-400)",
                    500: "var(--color-gray-500)",
                    600: "var(--color-gray-600)",
                    700: "var(--color-gray-700)",
                    800: "var(--color-gray-800)",
                    900: "var(--color-gray-900)",
                    "opacity-8": "var(--color-gray-8)",
                    "opacity-16": "var(--color-gray-16)",
                    "opacity-24": "var(--color-gray-24)",
                    "opacity-32": "var(--color-gray-32)",
                    "opacity-38": "var(--color-gray-38)",
                },

                // ========================================
                // LEGEND COLORS - Sistema de Proficiência Educacross
                // ⚠️ ATENÇÃO: legend-basic é LARANJA, NÃO é warning (amarelo)!
                // ========================================
                "legend-advanced": {
                    DEFAULT: "rgb(var(--color-legend-advanced) / <alpha-value>)",
                    solid: "var(--legend-advanced)",
                    "opacity-8": "var(--color-legend-advanced-8)",
                    "opacity-16": "var(--color-legend-advanced-16)",
                },
                "legend-proficient": {
                    DEFAULT: "rgb(var(--color-legend-proficient) / <alpha-value>)",
                    solid: "var(--legend-proficient)",
                    "opacity-8": "var(--color-legend-proficient-8)",
                    "opacity-16": "var(--color-legend-proficient-16)",
                },
                "legend-basic": {
                    DEFAULT: "rgb(var(--color-legend-basic) / <alpha-value>)",
                    solid: "var(--legend-basic)",
                    "opacity-8": "var(--color-legend-basic-8)",
                    "opacity-16": "var(--color-legend-basic-16)",
                },
                "legend-below-basic": {
                    DEFAULT: "rgb(var(--color-legend-below-basic) / <alpha-value>)",
                    solid: "var(--legend-below-basic)",
                    "opacity-8": "var(--color-legend-below-basic-8)",
                    "opacity-16": "var(--color-legend-below-basic-16)",
                },
                "legend-not-completed": {
                    DEFAULT: "rgb(var(--color-legend-not-completed) / <alpha-value>)",
                    solid: "var(--legend-not-completed)",
                    "opacity-8": "var(--color-legend-not-completed-8)",
                    "opacity-16": "var(--color-legend-not-completed-16)",
                },
                "legend-in-progress": {
                    DEFAULT: "rgb(var(--color-legend-in-progress) / <alpha-value>)",
                    solid: "var(--legend-in-progress)",
                    "opacity-8": "var(--color-legend-in-progress-8)",
                    "opacity-16": "var(--color-legend-in-progress-16)",
                },

                // Cores semânticas de tema (variáveis do Figma)
                theme: {
                    // Textos
                    "text-primary": "var(--text-primary)",
                    "text-secondary": "var(--text-secondary)",
                    "text-subtitle": "var(--text-subtitle)",
                    "text-disabled": "var(--text-disabled)",

                    // Ações
                    "action-active": "var(--action-active)",
                    "action-hover": "var(--action-hover)",
                    "action-selected": "var(--action-selected)",
                    "action-disabled": "var(--action-disabled)",
                    "action-disabled-bg": "var(--action-disabled-bg)",
                    "action-focus": "var(--action-focus)",

                    // Bordas e Divisores
                    divider: "var(--divider)",
                    "outline-border": "var(--outline-border)",
                    "input-border": "var(--input-border)",

                    // Backgrounds
                    "backdrop-overlay": "var(--backdrop-overlay)",
                    "filled-input-bg": "var(--filled-input-bg)",
                    "chip-background": "var(--chip-background)",
                },

                // Cores de layout (misc)
                layout: {
                    "body-bg": "var(--body-bg)",
                    paper: "var(--paper)",
                    "grey-light": "var(--grey-light)",
                    "chat-bg": "var(--chat-bg)",
                    "track-bg": "var(--track-bg)",
                    "table-header": "var(--table-header)",
                    "avatar-bg": "var(--avatar-bg)",
                    snackbar: "var(--snackbar)",
                },

                // Social
                social: {
                    facebook: "var(--bg-facebook)",
                    twitter: "var(--bg-twitter)",
                    linkedin: "var(--bg-linkedin)",
                },
            },

            // Text colors (usando variáveis semânticas)
            textColor: {
                primary: "var(--text-primary)",
                secondary: "var(--text-secondary)",
                subtitle: "var(--text-subtitle)",
                disabled: "var(--text-disabled)",
            },

            // Background colors
            backgroundColor: {
                body: "var(--body-bg)",
                paper: "var(--paper)",
                "grey-light": "var(--grey-light)",
                "filled-input": "var(--filled-input-bg)",
                chip: "var(--chip-background)",
                avatar: "var(--avatar-bg)",
                snackbar: "var(--snackbar)",
                backdrop: "var(--backdrop-overlay)",
            },

            // Border colors
            borderColor: {
                divider: "var(--divider)",
                outline: "var(--outline-border)",
                "input-border": "var(--input-border)",
            },
            borderRadius: {
                xs: "var(--radius-xs)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                round: "var(--radius-round)",
            },
            fontFamily: {
                sans: [
                    "Montserrat",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem", { lineHeight: "1.5rem" }],
                lg: ["1.125rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                spin: {
                    to: { transform: "rotate(360deg)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                spin: "spin 1s linear infinite",
            },
        },
    },
    plugins: [],
};

export default educacrossPreset;
