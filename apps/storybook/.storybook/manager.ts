import { addons } from "storybook/manager-api";
import themeLight from "./theme";

// FORÇAR TEMA LIGHT SEMPRE
addons.setConfig({
    theme: themeLight,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
});
