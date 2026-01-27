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
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        // 1. Verificar renderização
        const input = canvas.getByPlaceholderText(/digite aqui/i);
        await expect(input).toBeInTheDocument();
        // 2. Foco
        await userEvent.click(input);
        await expect(input).toHaveFocus();
        await expect(args.onFocus).toHaveBeenCalled();
        // 3. Digitação
        await userEvent.type(input, "educacross");
        await expect(input).toHaveValue("educacross");
        await expect(args.onChange).toHaveBeenCalled();
        // 4. Blur
        await userEvent.tab();
        await expect(input).not.toHaveFocus();
        await expect(args.onBlur).toHaveBeenCalled();
        // 5. Limpar
        await userEvent.clear(input);
        await expect(input).toHaveValue("");
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<div className="w-80">
  <Input 
    placeholder="Playground Input" 
    variant="default" 
    inputSize="default" 
  />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div style="width: 20rem;">
    <input type="text" 
           class="form-control" 
           placeholder="Playground Input">
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="w-80">
    <EdInput 
      placeholder="Playground Input" 
      variant="default" 
      input-size="default" 
    />
  </div>
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Sua senha",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input type="password" placeholder="Sua senha" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="password" 
    class="form-control" 
    placeholder="Sua senha"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput type="password" placeholder="Sua senha" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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

export const Search: Story = {
    args: {
        type: "search",
        placeholder: "Buscar...",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input type="search" placeholder="Buscar..." />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="search" 
    class="form-control" 
    placeholder="Buscar..."
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput type="search" placeholder="Buscar..." />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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

export const Number: Story = {
    args: {
        type: "number",
        placeholder: "0",
        min: 0,
        max: 100,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input 
  type="number" 
  placeholder="0"
  min={0}
  max={100}
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="number" 
    class="form-control" 
    placeholder="0"
    min="0"
    max="100"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput 
    type="number" 
    placeholder="0"
    :min="0"
    :max="100"
  />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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
// SIZE STORIES
// =============================================================================

export const Small: Story = {
    args: {
        inputSize: "sm",
        placeholder: "Small input",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input inputSize="sm" placeholder="Small input" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control form-control-sm" 
    placeholder="Small input"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput input-size="sm" placeholder="Small input" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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

export const Large: Story = {
    args: {
        inputSize: "lg",
        placeholder: "Large input",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input inputSize="lg" placeholder="Large input" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control form-control-lg" 
    placeholder="Large input"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput input-size="lg" placeholder="Large input" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input variant="filled" placeholder="Filled input" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control bg-light" 
    placeholder="Filled input"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput variant="filled" placeholder="Filled input" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input disabled placeholder="Disabled input" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Disabled input"
    disabled
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput disabled placeholder="Disabled input" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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

export const WithValue: Story = {
    args: {
        defaultValue: "Valor preenchido",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input defaultValue="Valor preenchido" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    value="Valor preenchido"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput model-value="Valor preenchido" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input error placeholder="Campo com erro" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control is-invalid" 
    placeholder="Campo com erro"
    aria-invalid="true"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput :error="true" placeholder="Campo com erro" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-4">
  <Input inputSize="sm" placeholder="Small" />
  <Input inputSize="default" placeholder="Default" />
  <Input inputSize="lg" placeholder="Large" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <input type="text" class="form-control form-control-sm" placeholder="Small" />
    <input type="text" class="form-control" placeholder="Default" />
    <input type="text" class="form-control form-control-lg" placeholder="Large" />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdInput input-size="sm" placeholder="Small" />
    <EdInput input-size="default" placeholder="Default" />
    <EdInput input-size="lg" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-4">
  <Input placeholder="Normal" />
  <Input disabled placeholder="Disabled" />
  <Input error placeholder="Error" />
  <Input defaultValue="With value" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <input type="text" class="form-control" placeholder="Normal" />
    <input type="text" class="form-control" placeholder="Disabled" disabled />
    <input type="text" class="form-control is-invalid" placeholder="Error" />
    <input type="text" class="form-control" value="With value" />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdInput placeholder="Normal" />
    <EdInput disabled placeholder="Disabled" />
    <EdInput :error="true" placeholder="Error" />
    <EdInput model-value="With value" />
  </div>
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const TypeInteraction: Story = {
    args: {
        placeholder: "Type here",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";
import { useState } from "react";

function InputDemo() {
  const [value, setValue] = useState("");
  
  return (
    <div>
      <Input 
        placeholder="Type here" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Value: {value}</p>
    </div>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <input 
      type="text" 
      class="form-control" 
      placeholder="Type here"
      v-model="value"
    />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
export default {
  data() { return { value: "" }; },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div>
    <EdInput 
      placeholder="Type here" 
      v-model="value"
    />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdInput } from "@fabioeducacross/ui-vue3";
const value = ref("");
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

function InputDemo() {
  const handleFocus = () => console.log("Input focused");
  const handleBlur = () => console.log("Input blurred");
  
  return (
    <Input 
      placeholder="Focus me" 
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Focus me"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  methods: {
    handleFocus() { console.log("Input focused"); },
    handleBlur() { console.log("Input blurred"); },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput 
    placeholder="Focus me" 
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";

const handleFocus = () => console.log("Input focused");
const handleBlur = () => console.log("Input blurred");
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input disabled placeholder="Cannot type" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Cannot type"
    disabled
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput disabled placeholder="Cannot type" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input error placeholder="Invalid field" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control is-invalid" 
    placeholder="Invalid field"
    aria-invalid="true"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput :error="true" placeholder="Invalid field" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Input } from "@fabioeducacross/ui";

<Input placeholder="Tab to focus" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Tab to focus"
  />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdInput placeholder="Tab to focus" />
</template>

<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
