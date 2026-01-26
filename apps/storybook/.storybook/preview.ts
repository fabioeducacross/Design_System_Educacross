import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

// Import Tailwind CSS and design tokens
import "../src/styles.css";

// Import custom Storybook styles
import "./custom-styles.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            toc: true,
        },
        a11y: {
            // Axe-core configuration
            config: {
                rules: [
                    {
                        // Ensure color contrast checks are enabled
                        id: "color-contrast",
                        enabled: true,
                    },
                ],
            },
        },
        viewport: {
            options: {
                mobile: {
                    name: "Mobile",
                    styles: { width: "375px", height: "667px" },
                },
                tablet: {
                    name: "Tablet",
                    styles: { width: "768px", height: "1024px" },
                },
                desktop: {
                    name: "Desktop",
                    styles: { width: "1280px", height: "800px" },
                },
            },
        },
    },
    decorators: [
        withThemeByClassName({
            themes: {
                light: "",
            },
            defaultTheme: "light",
        }),
    ],
    tags: ["autodocs"],
};

export default preview;
