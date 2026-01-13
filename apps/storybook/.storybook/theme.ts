import { create } from "@storybook/theming/create";

export default create({
    base: "light",
    brandTitle: "Educacross Design System",
    brandUrl: "https://educacross.com",
    brandImage: "/logo-educacross.svg",
    brandTarget: "_self",

    // UI
    appBg: "#ffffff",
    appContentBg: "#ffffff",
    appBorderColor: "#e5e7eb",
    appBorderRadius: 8,

    // Typography
    fontBase: '"Montserrat", sans-serif',
    fontCode: "monospace",

    // Text colors
    textColor: "#111827",
    textInverseColor: "#ffffff",

    // Toolbar default and active colors
    barTextColor: "#6b7280",
    barSelectedColor: "#2563eb",
    barBg: "#ffffff",

    // Form colors
    inputBg: "#ffffff",
    inputBorder: "#d1d5db",
    inputTextColor: "#111827",
    inputBorderRadius: 6,
});
