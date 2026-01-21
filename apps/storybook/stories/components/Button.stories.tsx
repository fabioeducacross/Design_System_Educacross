import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { Button } from "@fabioeducacross/ui";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **Button** é o componente principal para ações e interações do usuário.

## Características
- ✅ 11 variantes visuais (incluindo as do Design System Figma)
- ✅ 4 tamanhos
- ✅ Estado de loading com spinner
- ✅ Suporte a \`asChild\` para composição
- ✅ Acessível: navegação por teclado, foco visível, aria-attributes
- ✅ Tokens semânticos do Figma

## Variantes do Design System
- **default**: Botão primário roxo (ações principais)
- **secondary**: Botão-secundário outline roxo (ações secundárias)
- **attention**: Botão-de-atenção amarelo (alertas e sugestões)
- **negative**: Botão-negativo outline (ações neutras/saída)
- **destructive**: Vermelho para ações destrutivas
- **success**: Verde para confirmações
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "attention", "negative", "destructive", "outline", "ghost", "link", "success", "warning", "info"],
            description: "Visual variant of the button",
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
            description: "Size of the button",
        },
        loading: {
            control: "boolean",
            description: "Shows loading spinner and disables button",
        },
        disabled: {
            control: "boolean",
            description: "Disables the button",
        },
        asChild: {
            control: "boolean",
            description: "Render as child element (for composition)",
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
        children: "Button",
        variant: "default",
        size: "default",
    },
};

export const Playground: Story = {
    args: {
        children: "Playground Button",
        variant: "default",
        size: "default",
        loading: false,
        disabled: false,
    },
};

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Primary: Story = {
    args: {
        children: "Primary",
        variant: "default",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete",
        variant: "destructive",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações destrutivas como deletar ou remover.",
            },
        },
    },
};

export const Outline: Story = {
    args: {
        children: "Outline",
        variant: "outline",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost",
        variant: "ghost",
    },
};

export const Link: Story = {
    args: {
        children: "Link Button",
        variant: "link",
    },
};

export const Success: Story = {
    args: {
        children: "Sucesso",
        variant: "success",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações de confirmação ou sucesso.",
            },
        },
    },
};

export const Warning: Story = {
    args: {
        children: "Atenção",
        variant: "warning",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações que requerem atenção do usuário.",
            },
        },
    },
};

export const Info: Story = {
    args: {
        children: "Informação",
        variant: "info",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações informativas ou neutras.",
            },
        },
    },
};

// =============================================================================
// DESIGN SYSTEM FIGMA VARIANTS
// =============================================================================

export const BotaoSecundario: Story = {
    args: {
        children: "Acessar aplicativo",
        variant: "secondary",
    },
    parameters: {
        docs: {
            description: {
                story: "Botão-secundário: outline roxo para ações secundárias.",
            },
        },
    },
};

export const BotaoDeAtencao: Story = {
    args: {
        children: (
            <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                </svg>
                Sugerir missão
            </>
        ),
        variant: "attention",
    },
    parameters: {
        docs: {
            description: {
                story: "Botão-de-atenção: amarelo filled para alertas e sugestões importantes.",
            },
        },
    },
};

export const BotaoNegativo: Story = {
    args: {
        children: (
            <>
                <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                WhatsApp
            </>
        ),
        variant: "negative",
    },
    parameters: {
        docs: {
            description: {
                story: "Botão-negativo: outline para ações neutras ou de saída.",
            },
        },
    },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Small: Story = {
    args: {
        children: "Small",
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        children: "Large",
        size: "lg",
    },
};

export const IconSize: Story = {
    args: {
        size: "icon",
        children: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        ),
        "aria-label": "Add item",
    },
    parameters: {
        docs: {
            description: {
                story: "Use `size='icon'` para botões que contém apenas um ícone. Sempre adicione `aria-label` para acessibilidade.",
            },
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};

export const Loading: Story = {
    args: {
        children: "Loading...",
        loading: true,
    },
    parameters: {
        docs: {
            description: {
                story: "O estado de loading mostra um spinner e desabilita o botão automaticamente.",
            },
        },
    },
};

// =============================================================================
// ALL VARIANTS SHOWCASE
// =============================================================================

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="attention">Atenção</Button>
            <Button variant="negative">Negativo</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="success">Sucesso</Button>
            <Button variant="warning">Aviso</Button>
            <Button variant="info">Info</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Todas as variantes disponíveis lado a lado.",
            },
        },
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Todos os tamanhos disponíveis lado a lado.",
            },
        },
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Estados: normal, disabled e loading.",
            },
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const ClickInteraction: Story = {
    args: {
        children: "Click me",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /click me/i });

        // Verify button is visible and enabled
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();

        // Click the button
        await userEvent.click(button);

        // Verify onClick was called
        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const DisabledInteraction: Story = {
    args: {
        children: "Cannot click",
        disabled: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /cannot click/i });

        // Verify button is disabled
        await expect(button).toBeDisabled();
    },
};

export const LoadingInteraction: Story = {
    args: {
        children: "Loading",
        loading: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /loading/i });

        // Verify button is disabled when loading
        await expect(button).toBeDisabled();
        await expect(button).toHaveAttribute("aria-busy", "true");
    },
};

export const KeyboardNavigation: Story = {
    args: {
        children: "Focus me",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /focus me/i });

        // Focus via keyboard (tab)
        await userEvent.tab();
        await expect(button).toHaveFocus();

        // Activate via keyboard (Enter)
        await userEvent.keyboard("{Enter}");
        await expect(args.onClick).toHaveBeenCalled();
    },
};
/**
 * Botão com ícone à esquerda (padrão Figma).
 * Exemplo: botão "Exportar em Excel" com ícone de controller.
 */
export const WithIcon: Story = {
    args: {
        variant: "default",
        size: "default",
        children: (
            <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Exportar em Excel
            </>
        ),
    },
};

/**
 * Botão com ícone à direita.
 */
export const WithIconRight: Story = {
    args: {
        variant: "default",
        size: "default",
        children: (
            <>
                Próximo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </>
        ),
    },
};