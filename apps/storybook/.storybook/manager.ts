import { addons } from "storybook/manager-api";
import themeLight from "./theme";

// FORÇAR TEMA LIGHT SEMPRE
addons.setConfig({
    theme: themeLight,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
    // Configuração de idioma para Português (Brasil)
    options: {
        locale: "pt-BR",
    },
    // Desabilitar abas padrão (About, Guide, etc)
    enableShortcuts: false,
});
