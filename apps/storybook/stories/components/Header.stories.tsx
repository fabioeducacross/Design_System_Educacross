import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "@fabioeducacross/ui";

const meta = {
    title: "Layout/Header",
    component: Header,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        userName: {
            control: "text",
            description: "Nome do usuário exibido no header",
        },
        userRole: {
            control: "text",
            description: "Role/cargo do usuário",
        },
        avatarSrc: {
            control: "text",
            description: "URL da imagem do avatar",
        },
        shadow: {
            control: "boolean",
            description: "Se o header tem sombra",
        },
        onMenuClick: { action: "menu clicked" },
        onProfileClick: { action: "profile clicked" },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Header padrão com perfil de Gestor de Redes e ícone Educacross no avatar.
 */
export const Default: Story = {
    args: {
        userName: "Afonso",
        userRole: "Gestor de Redes",
        shadow: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Header } from "@fabioeducacross/ui";

<Header userName="Afonso" userRole="Gestor de Redes" shadow />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <header class="d-flex justify-content-between align-items-center p-3 bg-white shadow">
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-link"><i class="bi bi-list"></i></button>
      <img src="/logo.svg" alt="Logo" height="32" />
    </div>
    <div class="d-flex align-items-center gap-2">
      <div class="text-end">
        <div class="fw-semibold">Afonso</div>
        <div class="text-muted small">Gestor de Redes</div>
      </div>
      <img src="/avatar.svg" class="rounded-circle" width="40" height="40" />
    </div>
  </header>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdHeader user-name="Afonso" user-role="Gestor de Redes" :shadow="true" />
</template>

<script setup lang="ts">
import { EdHeader } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Header com avatar personalizado (foto).
 */
export const WithAvatar: Story = {
    args: {
        userName: "Maria Silva",
        userRole: "Coordenadora Pedagógica",
        avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        shadow: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Header } from "@fabioeducacross/ui";

<Header 
  userName="Maria Silva" 
  userRole="Coordenadora Pedagógica" 
  avatarSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  shadow 
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <header class="d-flex justify-content-between align-items-center p-3 bg-white shadow">
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-link"><i class="bi bi-list"></i></button>
      <img src="/logo.svg" alt="Logo" height="32" />
    </div>
    <div class="d-flex align-items-center gap-2">
      <div class="text-end">
        <div class="fw-semibold">Maria Silva</div>
        <div class="text-muted small">Coordenadora Pedagógica</div>
      </div>
      <img :src="avatarSrc" class="rounded-circle" width="40" height="40" />
    </div>
  </header>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdHeader 
    user-name="Maria Silva" 
    user-role="Coordenadora Pedagógica" 
    avatar-src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    :shadow="true" 
  />
</template>

<script setup lang="ts">
import { EdHeader } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Header com nome longo para testar truncamento.
 */
export const WithLongName: Story = {
    args: {
        userName: "João Pedro da Silva Santos",
        userRole: "Diretor Regional de Educação",
        shadow: true,
    },
};

/**
 * Header sem sombra.
 */
export const NoShadow: Story = {
    args: {
        userName: "Carlos",
        userRole: "Administrador",
        shadow: false,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Header } from "@fabioeducacross/ui";

<Header userName="Carlos" userRole="Administrador" shadow={false} />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <header class="d-flex justify-content-between align-items-center p-3 bg-white">
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-link"><i class="bi bi-list"></i></button>
      <img src="/logo.svg" alt="Logo" height="32" />
    </div>
    <div class="d-flex align-items-center gap-2">
      <div class="text-end">
        <div class="fw-semibold">Carlos</div>
        <div class="text-muted small">Administrador</div>
      </div>
      <img src="/avatar.svg" class="rounded-circle" width="40" height="40" />
    </div>
  </header>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdHeader user-name="Carlos" user-role="Administrador" :shadow="false" />
</template>

<script setup lang="ts">
import { EdHeader } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Header em contexto de aplicação completa.
 */
export const InContext: Story = {
    args: {
        userName: "Ana Paula",
        userRole: "Gestor de Redes",
    },
    render: (args) => (
        <div className="min-h-screen bg-background">
            <Header {...args} />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-muted-foreground">
                    Conteúdo da aplicação aqui...
                </p>
            </main>
        </div>
    ),
};

/**
 * Variações de roles com ícone Educacross no avatar.
 */
export const DifferentRoles: Story = {
    render: () => (
        <div className="space-y-px">
            <Header
                userName="Afonso"
                userRole="Gestor de Redes"
            />
            <Header
                userName="Beatriz"
                userRole="Coordenadora Pedagógica"
            />
            <Header
                userName="Carlos"
                userRole="Professor"
            />
            <Header
                userName="Diana"
                userRole="Administrador do Sistema"
            />
        </div>
    ),
};
