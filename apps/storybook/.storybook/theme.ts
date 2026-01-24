import { create } from "storybook/theming/create";
import logoEducacross from "../public/logo-educacross.svg";

export default create({
    base: "light",
    
    // Branding
    brandTitle: "Educacross Design System",
    brandUrl: "https://educacross.com.br",
    brandImage: logoEducacross,
    brandTarget: "_blank",

    // UI Colors - Palette moderna e clean
    appBg: "#FAFAFA",                      // Fundo suave
    appContentBg: "#FFFFFF",               // Conteúdo limpo
    appBorderColor: "#E5E7EB",             // Bordas discretas
    appPreviewBg: "#FFFFFF",
    appBorderRadius: 12,

    // Typography - Hierarquia visual forte
    fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", Consolas, monospace',

    // Text colors - Contraste otimizado
    textColor: "#111827",                  // Texto principal (quase preto)
    textInverseColor: "#FFFFFF",
    textMutedColor: "#6B7280",             // Texto secundário

    // Toolbar - Minimalista e elegante
    barTextColor: "#374151",               
    barHoverColor: "#7367F0",              // Primary hover
    barSelectedColor: "#7367F0",           // Primary selected
    barBg: "#FFFFFF",

    // Buttons - Primary Educacross com destaque
    buttonBg: "#7367F0",                   
    buttonBorder: "#7367F0",
    booleanBg: "#F3F4F6",
    booleanSelectedBg: "#7367F0",

    // Colors - Palette vibrante
    colorPrimary: "#7367F0",               // Primary (roxo vibrante)
    colorSecondary: "#10B981",             // Success green

    // Form colors - Clean e acessível
    inputBg: "#FFFFFF",
    inputBorder: "#D1D5DB",                
    inputTextColor: "#111827",
    inputBorderRadius: 8,

    // Grid
    gridCellSize: 12,
});
