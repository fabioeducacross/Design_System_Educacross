import { create } from "storybook/theming/create";
import logoEducacross from "../public/logo-educacross.svg";

export default create({
    base: "dark",
    
    // Branding
    brandTitle: "Educacross Design System",
    brandUrl: "https://educacross.com.br",
    brandImage: logoEducacross,
    brandTarget: "_blank",

    // UI Colors - Dark mode elegante
    appBg: "#0B0F19",                      // Fundo escuro profundo
    appContentBg: "#1A1F2E",               // Conteúdo com contraste
    appBorderColor: "#2D3548",             // Bordas sutis
    appPreviewBg: "#1A1F2E",
    appBorderRadius: 12,

    // Typography
    fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", Consolas, monospace',

    // Text colors - Contraste otimizado
    textColor: "#F3F4F6",                  // Branco suave
    textInverseColor: "#0B0F19",           
    textMutedColor: "#9CA3AF",             // Cinza legível

    // Toolbar - Modern dark
    barTextColor: "#D1D5DB",               
    barHoverColor: "#9388F7",              // Primary light hover
    barSelectedColor: "#9388F7",           
    barBg: "#1A1F2E",                      

    // Buttons - Primary vibrante
    buttonBg: "#8F85F3",                   
    buttonBorder: "#8F85F3",
    booleanBg: "#2D3548",
    booleanSelectedBg: "#8F85F3",

    // Colors - Palette vibrante para dark
    colorPrimary: "#9388F7",               // Primary lighter
    colorSecondary: "#34D399",             // Success green

    // Form colors
    inputBg: "#1A1F2E",                    
    inputBorder: "#3D4556",                
    inputTextColor: "#F3F4F6",             
    inputBorderRadius: 8,

    // Grid
    gridCellSize: 12,
});
