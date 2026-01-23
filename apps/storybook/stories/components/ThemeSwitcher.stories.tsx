import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

const meta: Meta<typeof ThemeSwitcher> = {
    title: "Components/ThemeSwitcher",
    component: ThemeSwitcher,
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="light" disableStorage>
                <div className="flex items-center justify-center p-8">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **ThemeSwitcher** é um componente para alternar entre os modos Light e Dark do design system.

## Características
- ✅ 3 modos de exibição: icon, toggle, dropdown
- ✅ 3 tamanhos: sm, default, lg
- ✅ 3 variantes: icon, outline, filled
- ✅ Persiste preferência no localStorage
- ✅ Respeita preferência do sistema (prefers-color-scheme)
- ✅ Hook \`useTheme\` para acesso programático
- ✅ Tokens semânticos do Figma
- ✅ Totalmente acessível (ARIA)

## Uso

### ThemeProvider
Envolva sua aplicação com o \`ThemeProvider\`:

\`\`\`tsx
import { ThemeProvider } from "@fabioeducacross/ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
\`\`\`

### useTheme Hook
Acesse o tema programaticamente:

\`\`\`tsx
import { useTheme } from "@fabioeducacross/ui";

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  // ...
}
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        mode: {
            control: "select",
            options: ["icon", "toggle", "dropdown"],
            description: "Modo de exibição do switcher",
        },
        variant: {
            control: "select",
            options: ["icon", "outline", "filled"],
            description: "Variante visual (apenas para modo icon)",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Tamanho do componente",
        },
        showLabel: {
            control: "boolean",
            description: "Mostrar label de texto",
        },
        disabled: {
            control: "boolean",
            description: "Desabilitar o componente",
        },
    },
    args: {
        onClick: fn(),
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT STORIES
// =============================================================================

export const Default: Story = {
    args: {
        mode: "icon",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() {
    return { isDark: false };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Playground: Story = {
    args: {
        mode: "icon",
        variant: "icon",
        size: "default",
        showLabel: false,
        disabled: false,
    },
};

// =============================================================================
// MODE STORIES
// =============================================================================

export const ModeIcon: Story = {
    args: {
        mode: "icon",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo padrão com ícone que alterna entre sol (claro) e lua (escuro).",
            },
        },
    },
};

export const ModeToggle: Story = {
    args: {
        mode: "toggle",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo toggle estilo switch com transição suave entre os temas.",
            },
        },
    },
};

export const ModeDropdown: Story = {
    args: {
        mode: "dropdown",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo dropdown com 3 opções: Claro, Escuro e Sistema.",
            },
        },
    },
};

// =============================================================================
// VARIANT STORIES (modo icon)
// =============================================================================

export const VariantIcon: Story = {
    args: {
        mode: "icon",
        variant: "icon",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com apenas o ícone, sem borda ou background.",
            },
        },
    },
};

export const VariantOutline: Story = {
    args: {
        mode: "icon",
        variant: "outline",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com borda sutil.",
            },
        },
    },
};

export const VariantFilled: Story = {
    args: {
        mode: "icon",
        variant: "filled",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com background preenchido.",
            },
        },
    },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const SizeSmall: Story = {
    args: {
        mode: "icon",
        size: "sm",
    },
};

export const SizeDefault: Story = {
    args: {
        mode: "icon",
        size: "default",
    },
};

export const SizeLarge: Story = {
    args: {
        mode: "icon",
        size: "lg",
    },
};

export const ToggleSizes: Story = {
    render: () => (
        <ThemeProvider defaultTheme="light" disableStorage>
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="sm" />
                    <span className="text-xs text-[var(--text-secondary)]">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="default" />
                    <span className="text-xs text-[var(--text-secondary)]">default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="lg" />
                    <span className="text-xs text-[var(--text-secondary)]">lg</span>
                </div>
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comparação de tamanhos no modo toggle.",
            },
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const WithLabel: Story = {
    args: {
        mode: "icon",
        showLabel: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Exibe o label de texto ao lado do ícone.",
            },
        },
    },
};

export const DropdownWithLabel: Story = {
    args: {
        mode: "dropdown",
        showLabel: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

// =============================================================================
// SHOWCASE
// =============================================================================

export const AllModes: Story = {
    render: () => (
        <ThemeProvider defaultTheme="light" disableStorage>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Icon (variantes)
                    </span>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher mode="icon" variant="icon" />
                        <ThemeSwitcher mode="icon" variant="outline" />
                        <ThemeSwitcher mode="icon" variant="filled" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Toggle
                    </span>
                    <ThemeSwitcher mode="toggle" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Dropdown
                    </span>
                    <ThemeSwitcher mode="dropdown" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Com Label
                    </span>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher mode="icon" showLabel variant="outline" />
                        <ThemeSwitcher mode="dropdown" showLabel />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: "Showcase de todos os modos e variantes disponíveis.",
            },
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const InteractionTest: Story = {
    args: {
        mode: "icon",
    },
};

export const ToggleInteractionTest: Story = {
    args: {
        mode: "toggle",
    },
};
