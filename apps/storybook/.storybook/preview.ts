import type { Preview, StoryContext } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { ReactRenderer } from "@storybook/react";

// Import Storybook globals (tokens e utilitários do Design System)
import "../src/storybook-globals.css";

// Import custom Storybook styles
import "./custom-styles.css";

/**
 * Decorator para carregar Bootstrap-Vue compat de forma opt-in
 * Use nas stories que precisarem: parameters.bootstrapCompat = true
 */
const withBootstrapCompat = (
  StoryFn: any,
  context: StoryContext<ReactRenderer>
) => {
  if (context.parameters?.bootstrapCompat) {
    // Carrega dinamicamente o CSS de compatibilidade Bootstrap-Vue
    const link = document.getElementById("bootstrap-compat") as HTMLLinkElement;
    if (!link) {
      const newLink = document.createElement("link");
      newLink.id = "bootstrap-compat";
      newLink.rel = "stylesheet";
      newLink.href = "/bootstrap-vue-compat.css";
      document.head.appendChild(newLink);
    }
  }
  return StoryFn();
};

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
    withBootstrapCompat,
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
