import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

// Import Tailwind CSS and design tokens
import "../src/styles.css";

// Import Bootstrap-Vue compatibility layer (for Frontoffice visual fidelity)
import "../src/bootstrap-vue-compat.css";

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

      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (375px)",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet (768px)",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1440px)",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
        wide: {
          name: "Wide (1920px)",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
      defaultViewport: "desktop",
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
