import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "@fabioeducacross/ui";

const meta = {
    title: "Components/Logo",
    component: Logo,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Tamanho da logo",
            table: {
                type: { summary: "'sm' | 'default' | 'lg'" },
                defaultValue: { summary: "default" },
            },
        },
        className: {
            control: "text",
            description: "Classes CSS adicionais",
        },
    },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Logo padrão da Educacross com tamanho default (h-7).
 */
export const Default: Story = {
    args: {},
    parameters: {
        multiFrameworkCode: {
            react: `import { Logo } from "@fabioeducacross/ui";

<Logo />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/educacross-logo.svg" alt="Educacross" height="28" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLogo />
</template>

<script setup lang="ts">
import { EdLogo } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Logo em tamanho pequeno (h-5), ideal para uso em componentes compactos.
 */
export const Small: Story = {
    args: {
        size: "sm",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Logo } from "@fabioeducacross/ui";

<Logo size="sm" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/educacross-logo.svg" alt="Educacross" height="20" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLogo size="sm" />
</template>

<script setup lang="ts">
import { EdLogo } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Logo em tamanho grande (h-9), ideal para uso em headers de destaque.
 */
export const Large: Story = {
    args: {
        size: "lg",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Logo } from "@fabioeducacross/ui";

<Logo size="lg" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/educacross-logo.svg" alt="Educacross" height="36" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLogo size="lg" />
</template>

<script setup lang="ts">
import { EdLogo } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Comparação dos três tamanhos disponíveis lado a lado.
 */
export const SizeComparison: Story = {
    render: () => (
        <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <Logo size="sm" />
                <p className="text-xs text-muted-foreground">Small</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Logo size="default" />
                <p className="text-xs text-muted-foreground">Default</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Logo size="lg" />
                <p className="text-xs text-muted-foreground">Large</p>
            </div>
        </div>
    ),
};

/**
 * Logo com espaçamento em diferentes fundos para verificar contraste.
 */
export const OnDifferentBackgrounds: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="bg-white p-6 rounded-lg border border-border">
                <Logo />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
                <Logo />
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
                <Logo />
            </div>
        </div>
    ),
};

/**
 * Logo com classe customizada para demonstrar extensibilidade.
 */
export const CustomClassName: Story = {
    args: {
        className: "opacity-60 hover:opacity-100 transition-opacity cursor-pointer",
    },
};
