import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { Input } from "@fabioeducacross/ui";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **Input** é o componente para entrada de dados do usuário.

## Características
- ✅ 3 variantes: default, filled, error
- ✅ 3 tamanhos
- ✅ Estados: focus, disabled, error
- ✅ Suporte a todos os tipos de input HTML
- ✅ Acessível: foco visível, aria-invalid
- ✅ Tokens semânticos do Figma
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "filled", "error"],
            description: "Visual variant of the input",
        },
        inputSize: {
            control: "select",
            options: ["default", "sm", "lg"],
            description: "Size of the input",
        },
        error: {
            control: "boolean",
            description: "Applies error styling",
        },
        disabled: {
            control: "boolean",
            description: "Disables the input",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text",
        },
        type: {
            control: "select",
            options: ["text", "email", "password", "number", "tel", "url", "search"],
            description: "Input type",
        },
    },
    args: {
        onChange: fn(),
        onFocus: fn(),
        onBlur: fn(),
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
        placeholder: "Digite aqui...",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input placeholder="Digite aqui..." />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Digite aqui..."
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput placeholder="Digite aqui..." />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Playground: Story = {
    args: {
        placeholder: "Playground Input",
        variant: "default",
        inputSize: "default",
        error: false,
        disabled: false,
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

// =============================================================================
// TYPE STORIES
// =============================================================================

export const Email: Story = {
    args: {
        type: "email",
        placeholder: "email@exemplo.com",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input type="email" placeholder="email@exemplo.com" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="email" 
    class="form-control" 
    placeholder="email@exemplo.com"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput type="email" placeholder="email@exemplo.com" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Sua senha",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Search: Story = {
    args: {
        type: "search",
        placeholder: "Buscar...",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Number: Story = {
    args: {
        type: "number",
        placeholder: "0",
        min: 0,
        max: 100,
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Small: Story = {
    args: {
        inputSize: "sm",
        placeholder: "Small input",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Large: Story = {
    args: {
        inputSize: "lg",
        placeholder: "Large input",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Filled: Story = {
    args: {
        variant: "filled",
        placeholder: "Filled input",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com background preenchido, ideal para formulários em fundos claros.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: "Disabled input",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const WithValue: Story = {
    args: {
        defaultValue: "Valor preenchido",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

export const Error: Story = {
    args: {
        error: true,
        placeholder: "Campo com erro",
    },
    parameters: {
        docs: {
            description: {
                story: "Use `error={true}` para indicar um campo inválido. Automaticamente aplica `aria-invalid`.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};

// =============================================================================
// ALL SHOWCASE
// =============================================================================

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-80">
            <Input inputSize="sm" placeholder="Small" />
            <Input inputSize="default" placeholder="Default" />
            <Input inputSize="lg" placeholder="Large" />
        </div>
    ),
};

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-80">
            <Input placeholder="Normal" />
            <Input disabled placeholder="Disabled" />
            <Input error placeholder="Error" />
            <Input defaultValue="With value" />
        </div>
    ),
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const TypeInteraction: Story = {
    args: {
        placeholder: "Type here",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Type here");

        // Verify input is visible and enabled
        await expect(input).toBeVisible();
        await expect(input).toBeEnabled();

        // Type in the input
        await userEvent.type(input, "Hello World");

        // Verify the value
        await expect(input).toHaveValue("Hello World");
    },
};

export const FocusInteraction: Story = {
    args: {
        placeholder: "Focus me",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Focus me");

        // Focus the input
        await userEvent.click(input);
        await expect(input).toHaveFocus();
        await expect(args.onFocus).toHaveBeenCalled();

        // Blur the input
        await userEvent.tab();
        await expect(args.onBlur).toHaveBeenCalled();
    },
};

export const DisabledInteraction: Story = {
    args: {
        placeholder: "Cannot type",
        disabled: true,
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Cannot type");

        // Verify input is disabled
        await expect(input).toBeDisabled();
    },
};

export const ErrorStateInteraction: Story = {
    args: {
        placeholder: "Invalid field",
        error: true,
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Invalid field");

        // Verify aria-invalid is set
        await expect(input).toHaveAttribute("aria-invalid", "true");
    },
};

export const KeyboardNavigation: Story = {
    args: {
        placeholder: "Tab to focus",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Tab to focus");

        // Focus via keyboard
        await userEvent.tab();
        await expect(input).toHaveFocus();

        // Type via keyboard
        await userEvent.keyboard("Test input");
        await expect(input).toHaveValue("Test input");
    },
};
