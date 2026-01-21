import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Label, Input } from "@fabioeducacross/ui";

const meta: Meta<typeof Label> = {
    title: "Components/Label",
    component: Label,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **Label** é o componente para rotular campos de formulário.

## Características
- ✅ 3 variantes visuais
- ✅ Indicador de campo obrigatório
- ✅ Integração com inputs via \`htmlFor\`
- ✅ Acessível: associação correta com campos
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "error", "muted"],
            description: "Visual variant of the label",
        },
        required: {
            control: "boolean",
            description: "Shows required indicator (*)",
        },
        htmlFor: {
            control: "text",
            description: "ID of the associated input element",
        },
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
        children: "Label",
    },
};

export const Playground: Story = {
    args: {
        children: "Playground Label",
        variant: "default",
        required: false,
    },
};

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const ErrorVariant: Story = {
    args: {
        children: "Campo inválido",
        variant: "error",
    },
    parameters: {
        docs: {
            description: {
                story: "Use a variante `error` para indicar campos com erro de validação.",
            },
        },
    },
};

export const MutedVariant: Story = {
    args: {
        children: "Campo opcional",
        variant: "muted",
    },
    parameters: {
        docs: {
            description: {
                story: "Use a variante `muted` para labels de campos opcionais ou menos importantes.",
            },
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Required: Story = {
    args: {
        children: "Campo obrigatório",
        required: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Use `required={true}` para mostrar o indicador (*) em campos obrigatórios.",
            },
        },
    },
};

// =============================================================================
// ALL SHOWCASE
// =============================================================================

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Label variant="default">Default Label</Label>
            <Label variant="error">Error Label</Label>
            <Label variant="muted">Muted Label</Label>
        </div>
    ),
};

export const WithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="email-example">Email</Label>
            <Input id="email-example" type="email" placeholder="seu@email.com" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Sempre associe o Label ao Input usando `htmlFor` e `id` correspondentes.",
            },
        },
    },
};

export const RequiredWithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="password-example" required>
                Senha
            </Label>
            <Input id="password-example" type="password" placeholder="••••••••" />
        </div>
    ),
};

export const ErrorWithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="error-example" variant="error">
                Email inválido
            </Label>
            <Input id="error-example" type="email" error defaultValue="invalido" />
            <span className="text-sm text-destructive">Por favor, insira um email válido.</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Combine `Label variant='error'` com `Input error={true}` para estados de erro.",
            },
        },
    },
};

// =============================================================================
// PATTERNS
// =============================================================================

export const FormFieldPattern: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-80">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name" required>
                    Nome completo
                </Label>
                <Input id="name" placeholder="Jane Doe" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" required>
                    Email
                </Label>
                <Input id="email" type="email" placeholder="jane@exemplo.com" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="bio" variant="muted">
                    Bio (opcional)
                </Label>
                <Input id="bio" placeholder="Conte um pouco sobre você" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Padrão recomendado para campos de formulário: Label + Input com associação via htmlFor/id.",
            },
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const LabelClickInteraction: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="click-test">Click this label</Label>
            <Input id="click-test" placeholder="Input will focus" />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const label = canvas.getByText("Click this label");
        const input = canvas.getByPlaceholderText("Input will focus");

        // Verify label has correct htmlFor
        await expect(label).toHaveAttribute("for", "click-test");

        // Click the label
        await label.click();

        // Verify input is focused
        await expect(input).toHaveFocus();
    },
};

export const RequiredIndicatorInteraction: Story = {
    args: {
        children: "Required field",
        required: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const asterisk = canvas.getByText("*");

        // Verify asterisk is present and hidden from screen readers
        await expect(asterisk).toBeVisible();
        await expect(asterisk).toHaveAttribute("aria-hidden", "true");
    },
};

export const AccessibilityTest: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="a11y-test" required>
                Accessible Label
            </Label>
            <Input id="a11y-test" placeholder="Accessible input" />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Accessible input");
        const label = canvas.getByText("Accessible Label");

        // Verify proper association
        await expect(label).toHaveAttribute("for", "a11y-test");
        await expect(input).toHaveAttribute("id", "a11y-test");
    },
};
