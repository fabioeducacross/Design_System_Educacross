import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarIcon, Avatar, AvatarFallback } from "@fabioeducacross/ui";

const meta = {
    title: "Components/AvatarIcon",
    component: AvatarIcon,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Tamanho do ícone",
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
} satisfies Meta<typeof AvatarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Ícone padrão Educacross para usar como avatar.
 */
export const Default: Story = {
    args: {},
    parameters: {
        multiFrameworkCode: {
            react: `import { AvatarIcon } from "@fabioeducacross/ui";

<AvatarIcon />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/logo-educacross.svg" alt="Educacross" class="rounded-circle" style="width: 40px; height: 40px;" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatarIcon />
</template>

<script setup lang="ts">
import { EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Ícone em tamanho pequeno (sm).
 */
export const Small: Story = {
    args: {
        size: "sm",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { AvatarIcon } from "@fabioeducacross/ui";

<AvatarIcon size="sm" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/logo-educacross.svg" alt="Educacross" class="rounded-circle" style="width: 24px; height: 24px;" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatarIcon size="sm" />
</template>

<script setup lang="ts">
import { EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Ícone em tamanho grande (lg).
 */
export const Large: Story = {
    args: {
        size: "lg",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { AvatarIcon } from "@fabioeducacross/ui";

<AvatarIcon size="lg" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <img src="/logo-educacross.svg" alt="Educacross" class="rounded-circle" style="width: 64px; height: 64px;" />
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatarIcon size="lg" />
</template>

<script setup lang="ts">
import { EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Comparação dos três tamanhos disponíveis.
 */
export const SizeComparison: Story = {
    render: () => (
        <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <AvatarIcon size="sm" />
                <p className="text-xs text-muted-foreground">Small</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <AvatarIcon size="default" />
                <p className="text-xs text-muted-foreground">Default</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <AvatarIcon size="lg" />
                <p className="text-xs text-muted-foreground">Large</p>
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { AvatarIcon } from "@fabioeducacross/ui";

<div className="flex items-center gap-8">
  <div className="flex flex-col items-center gap-2">
    <AvatarIcon size="sm" />
    <p className="text-xs text-muted-foreground">Small</p>
  </div>
  <div className="flex flex-col items-center gap-2">
    <AvatarIcon size="default" />
    <p className="text-xs text-muted-foreground">Default</p>
  </div>
  <div className="flex flex-col items-center gap-2">
    <AvatarIcon size="lg" />
    <p className="text-xs text-muted-foreground">Large</p>
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-4">
    <div class="d-flex flex-column align-items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
      <small class="text-muted">Small</small>
    </div>
    <div class="d-flex flex-column align-items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
      <small class="text-muted">Default</small>
    </div>
    <div class="d-flex flex-column align-items-center gap-2">
      <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
      <small class="text-muted">Large</small>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-8">
    <div class="flex flex-col items-center gap-2">
      <EdAvatarIcon size="sm" />
      <p class="text-xs text-muted-foreground">Small</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <EdAvatarIcon size="default" />
      <p class="text-xs text-muted-foreground">Default</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <EdAvatarIcon size="lg" />
      <p class="text-xs text-muted-foreground">Large</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Ícone usado dentro de um Avatar com fundo transparente (o SVG já tem fundo ciano).
 */
export const InAvatar: Story = {
    render: () => (
        <Avatar size="lg" className="border-2 border-[#06B6D4]">
            <AvatarFallback className="bg-transparent flex items-center justify-center">
                <AvatarIcon size="lg" />
            </AvatarFallback>
        </Avatar>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarFallback, AvatarIcon } from "@fabioeducacross/ui";

<Avatar size="lg" className="border-2 border-[#06B6D4]">
  <AvatarFallback className="bg-transparent flex items-center justify-center">
    <AvatarIcon size="lg" />
  </AvatarFallback>
</Avatar>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center justify-content-center rounded-circle border border-2" 
       style="width: 80px; height: 80px; border-color: #06B6D4 !important; background-color: transparent;">
    <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Conteúdo do AvatarIcon SVG -->
    </svg>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatar size="lg" class="border-2 border-[#06B6D4]">
    <EdAvatarFallback class="bg-transparent flex items-center justify-center">
      <EdAvatarIcon size="lg" />
    </EdAvatarFallback>
  </EdAvatar>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarFallback, EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Múltiplos avatares com o ícone em diferentes tamanhos.
 */
export const InMultipleAvatars: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar size="sm" className="border-2 border-[#06B6D4]">
                <AvatarFallback className="bg-transparent flex items-center justify-center">
                    <AvatarIcon size="sm" />
                </AvatarFallback>
            </Avatar>
            <Avatar size="default" className="border-2 border-[#06B6D4]">
                <AvatarFallback className="bg-transparent flex items-center justify-center">
                    <AvatarIcon size="default" />
                </AvatarFallback>
            </Avatar>
            <Avatar size="lg" className="border-2 border-[#06B6D4]">
                <AvatarFallback className="bg-transparent flex items-center justify-center">
                    <AvatarIcon size="lg" />
                </AvatarFallback>
            </Avatar>
            <Avatar size="xl" className="border-2 border-[#06B6D4]">
                <AvatarFallback className="bg-transparent flex items-center justify-center">
                    <AvatarIcon size="lg" />
                </AvatarFallback>
            </Avatar>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarFallback, AvatarIcon } from "@fabioeducacross/ui";

<div className="flex items-center gap-4">
  <Avatar size="sm" className="border-2 border-[#06B6D4]">
    <AvatarFallback className="bg-transparent flex items-center justify-center">
      <AvatarIcon size="sm" />
    </AvatarFallback>
  </Avatar>
  
  <Avatar size="default" className="border-2 border-[#06B6D4]">
    <AvatarFallback className="bg-transparent flex items-center justify-center">
      <AvatarIcon size="default" />
    </AvatarFallback>
  </Avatar>
  
  <Avatar size="lg" className="border-2 border-[#06B6D4]">
    <AvatarFallback className="bg-transparent flex items-center justify-center">
      <AvatarIcon size="lg" />
    </AvatarFallback>
  </Avatar>
  
  <Avatar size="xl" className="border-2 border-[#06B6D4]">
    <AvatarFallback className="bg-transparent flex items-center justify-center">
      <AvatarIcon size="lg" />
    </AvatarFallback>
  </Avatar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <div class="d-flex align-items-center justify-content-center rounded-circle border border-2" 
         style="width: 40px; height: 40px; border-color: #06B6D4 !important; background-color: transparent;">
      <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
    </div>
    
    <div class="d-flex align-items-center justify-content-center rounded-circle border border-2" 
         style="width: 48px; height: 48px; border-color: #06B6D4 !important; background-color: transparent;">
      <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
    </div>
    
    <div class="d-flex align-items-center justify-content-center rounded-circle border border-2" 
         style="width: 80px; height: 80px; border-color: #06B6D4 !important; background-color: transparent;">
      <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
    </div>
    
    <div class="d-flex align-items-center justify-content-center rounded-circle border border-2" 
         style="width: 96px; height: 96px; border-color: #06B6D4 !important; background-color: transparent;">
      <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content -->
      </svg>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-4">
    <EdAvatar size="sm" class="border-2 border-[#06B6D4]">
      <EdAvatarFallback class="bg-transparent flex items-center justify-center">
        <EdAvatarIcon size="sm" />
      </EdAvatarFallback>
    </EdAvatar>
    
    <EdAvatar size="default" class="border-2 border-[#06B6D4]">
      <EdAvatarFallback class="bg-transparent flex items-center justify-center">
        <EdAvatarIcon size="default" />
      </EdAvatarFallback>
    </EdAvatar>
    
    <EdAvatar size="lg" class="border-2 border-[#06B6D4]">
      <EdAvatarFallback class="bg-transparent flex items-center justify-center">
        <EdAvatarIcon size="lg" />
      </EdAvatarFallback>
    </EdAvatar>
    
    <EdAvatar size="xl" class="border-2 border-[#06B6D4]">
      <EdAvatarFallback class="bg-transparent flex items-center justify-center">
        <EdAvatarIcon size="lg" />
      </EdAvatarFallback>
    </EdAvatar>
  </div>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarFallback, EdAvatarIcon } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
