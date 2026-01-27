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
- ✅ Suporte a asChild para composição
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
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        
        // 1. Verificar que o botão foi renderizado
        const button = canvas.getByRole('button', { name: /button/i });
        await expect(button).toBeInTheDocument();
        
        // 2. Verificar classes CSS do variant default
        await expect(button).toHaveClass('bg-primary');
        
        // 3. Testar interação de clique
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalledOnce();
        
        // 4. Verificar estado de foco
        await userEvent.tab();
        await expect(button).toHaveFocus();
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button>Button</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary">Button</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton>Button</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="default" size="default">
  Playground Button
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary btn-md">
    Playground Button
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="default" size="default">
    Playground Button
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="default">Primary</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary">Primary</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="primary">Primary</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete",
        variant: "destructive",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        
        // Verificar variante destrutiva
        const button = canvas.getByRole('button', { name: /delete/i });
        await expect(button).toHaveClass('bg-destructive');
        
        // Testar clique
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalled();
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações destrutivas como deletar ou remover.",
            },
        },
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="destructive">Delete</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-danger">Delete</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="destructive">Delete</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Outline: Story = {
    args: {
        children: "Outline",
        variant: "outline",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="outline">Outline</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-outline-primary">Outline</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="outline">Outline</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="secondary">Secondary</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-outline-secondary">Secondary</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="secondary">Secondary</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost",
        variant: "ghost",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="ghost">Ghost</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link">Ghost</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="ghost">Ghost</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Link: Story = {
    args: {
        children: "Link Button",
        variant: "link",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="link">Link Button</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <a href="#" class="btn btn-link">Link Button</a>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="link">Link Button</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="success">Sucesso</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-success">Sucesso</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="success">Sucesso</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="warning">Atenção</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-warning">Atenção</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="warning">Atenção</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="info">Informação</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-info">Informação</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="info">Informação</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="secondary">Acessar aplicativo</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-outline-secondary">Acessar aplicativo</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="secondary">Acessar aplicativo</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="attention">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
  Sugerir missão
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-warning">
    <i class="bi bi-exclamation-circle"></i>
    Sugerir missão
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="attention">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
    Sugerir missão
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button variant="negative">
  <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
    {/* WhatsApp icon path */}
  </svg>
  WhatsApp
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-outline-dark">
    <i class="bi bi-whatsapp"></i>
    WhatsApp
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton variant="negative">
    <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
      <!-- WhatsApp icon path -->
    </svg>
    WhatsApp
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button size="sm">Small</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary btn-sm">Small</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton size="sm">Small</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Large: Story = {
    args: {
        children: "Large",
        size: "lg",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button size="lg">Large</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary btn-lg">Large</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton size="lg">Large</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button size="icon" aria-label="Add item">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary btn-icon" aria-label="Add item">
    <i class="bi bi-plus"></i>
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton size="icon" aria-label="Add item">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        
        // Verificar que o botão está desabilitado
        const button = canvas.getByRole('button', { name: /disabled/i });
        await expect(button).toBeDisabled();
        
        // Tentar clicar (não deve chamar onClick)
        await userEvent.click(button);
        await expect(args.onClick).not.toHaveBeenCalled();
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button disabled>Disabled</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" disabled>Disabled</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton disabled>Disabled</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Loading: Story = {
    args: {
        children: "Loading...",
        loading: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        
        // Verificar que o botão está desabilitado durante loading
        const button = canvas.getByRole('button');
        await expect(button).toBeDisabled();
        
        // Verificar presença do spinner (via aria-label ou data-testid)
        await expect(button).toHaveAttribute('aria-busy', 'true');
    },
    parameters: {
        docs: {
            description: {
                story: "O estado de loading mostra um spinner e desabilita o botão automaticamente.",
            },
        },
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button loading>Loading...</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" disabled>
    <span class="spinner-border spinner-border-sm me-2"></span>
    Loading...
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton loading>Loading...</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

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
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-wrap gap-3">
    <button class="btn btn-primary">Default</button>
    <button class="btn btn-outline-secondary">Secundário</button>
    <button class="btn btn-warning">Atenção</button>
    <button class="btn btn-outline-dark">Negativo</button>
    <button class="btn btn-danger">Destrutivo</button>
    <button class="btn btn-outline-primary">Outline</button>
    <button class="btn btn-link">Ghost</button>
    <a href="#" class="btn btn-link">Link</a>
    <button class="btn btn-success">Sucesso</button>
    <button class="btn btn-warning">Aviso</button>
    <button class="btn btn-info">Info</button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-wrap gap-4">
    <EdButton variant="default">Default</EdButton>
    <EdButton variant="secondary">Secundário</EdButton>
    <EdButton variant="attention">Atenção</EdButton>
    <EdButton variant="negative">Negativo</EdButton>
    <EdButton variant="destructive">Destrutivo</EdButton>
    <EdButton variant="outline">Outline</EdButton>
    <EdButton variant="ghost">Ghost</EdButton>
    <EdButton variant="link">Link</EdButton>
    <EdButton variant="success">Sucesso</EdButton>
    <EdButton variant="warning">Aviso</EdButton>
    <EdButton variant="info">Info</EdButton>
  </div>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon" aria-label="Add">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  </Button>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <button class="btn btn-primary btn-sm">Small</button>
    <button class="btn btn-primary">Default</button>
    <button class="btn btn-primary btn-lg">Large</button>
    <button class="btn btn-primary btn-icon" aria-label="Add">
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-4">
    <EdButton size="sm">Small</EdButton>
    <EdButton size="default">Default</EdButton>
    <EdButton size="lg">Large</EdButton>
    <EdButton size="icon" aria-label="Add">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </EdButton>
  </div>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<div className="flex flex-wrap gap-4">
  <Button>Normal</Button>
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-wrap gap-3">
    <button class="btn btn-primary">Normal</button>
    <button class="btn btn-primary" disabled>Disabled</button>
    <button class="btn btn-primary" disabled>
      <span class="spinner-border spinner-border-sm me-2"></span>
      Loading
    </button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-wrap gap-4">
    <EdButton>Normal</EdButton>
    <EdButton disabled>Disabled</EdButton>
    <EdButton loading>Loading</EdButton>
  </div>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

const handleClick = () => {
  console.log("Button clicked!");
};

<Button onClick={handleClick}>Click me</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" @click="handleClick">Click me</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log("Button clicked!");
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton @click="handleClick">Click me</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button disabled>Cannot click</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" disabled>Cannot click</button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton disabled>Cannot click</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button loading>Loading</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" disabled aria-busy="true">
    <span class="spinner-border spinner-border-sm me-2"></span>
    Loading
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton loading>Loading</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button>Focus me</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary" @keydown.enter="handleEnter">Focus me</button>
</template>

<script>
export default {
  methods: {
    handleEnter() {
      console.log("Enter pressed");
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton @keydown.enter="handleEnter">Focus me</EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";

const handleEnter = () => {
  console.log("Enter pressed");
};
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
  Exportar em Excel
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary">
    <i class="bi bi-download me-2"></i>
    Exportar em Excel
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
    Exportar em Excel
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button } from "@fabioeducacross/ui";

<Button>
  Próximo
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
</Button>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-primary">
    Próximo
    <i class="bi bi-chevron-right ms-2"></i>
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdButton>
    Próximo
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </EdButton>
</template>

<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};