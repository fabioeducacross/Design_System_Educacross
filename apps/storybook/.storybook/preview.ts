import type { Preview, Decorator } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";

/**
 * CSS Loading Order (Pixel Perfect Mode):
 * 1. storybook-globals.css → importa @fabioeducacross/ui/styles.css (tokens + Tailwind)
 * 2. custom-styles.css → estilos específicos do Storybook UI (não conflita com tokens)
 * 
 * ⚠️ bootstrap-vue-compat.css é opt-in via decorator, não global
 */

// 1. CSS oficial do DS via export público do pacote
import "../src/storybook-globals.css";

// 2. Estilos específicos do Storybook UI (sidebar, docs, etc.)
import "./custom-styles.css";

/**
 * Decorator para aplicar Bootstrap-Vue compat em stories específicas.
 * Uso: adicionar `parameters: { bootstrapCompat: true }` na story
 */
const withBootstrapCompat: Decorator = (Story, context) => {
    const useBootstrapCompat = context.parameters.bootstrapCompat === true;
    
    if (useBootstrapCompat) {
        // Carrega CSS de compatibilidade dinamicamente via link
        React.useEffect(() => {
            const linkId = "bootstrap-vue-compat-css";
            if (!document.getElementById(linkId)) {
                const link = document.createElement("link");
                link.id = linkId;
                link.rel = "stylesheet";
                link.href = "/bootstrap-vue-compat.css";
                document.head.appendChild(link);
            }
            return () => {
                const link = document.getElementById(linkId);
                if (link) link.remove();
            };
        }, []);
    }
    
    return React.createElement(Story);
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
    withBootstrapCompat, // Decorator opt-in para Bootstrap-Vue compat
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
