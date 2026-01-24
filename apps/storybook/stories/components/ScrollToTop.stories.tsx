import type { Meta, StoryObj } from "@storybook/react";
import { ScrollToTop } from "@fabioeducacross/ui";
import { ArrowUp, ChevronUp, ChevronsUp } from "lucide-react";

const meta = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Botão para retornar ao topo da página. Suporta 3 variantes: fixed (aparece após scroll), floating (sempre visível) e inline (dentro do conteúdo). Ideal para páginas longas, documentação e blogs.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["fixed", "floating", "inline"],
      description: "Tipo de posicionamento do botão",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Tamanho do botão",
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center", "top-right", "top-left"],
      description: "Posição na tela (apenas para variant='fixed')",
    },
    threshold: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Pixels de scroll para mostrar o botão (apenas variant='fixed')",
    },
    smooth: {
      control: "boolean",
      description: "Scroll suave (CSS scroll-behavior)",
    },
  },
} satisfies Meta<typeof ScrollToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to create scrollable content
const ScrollableContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <h1 className="text-4xl font-bold">Demonstração ScrollToTop</h1>
      <p className="text-lg text-muted-foreground">
        Role a página para baixo para ver o botão aparecer.
      </p>

      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="rounded-lg border p-6">
          <h2 className="mb-2 text-2xl font-semibold">Seção {i + 1}</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mt-2 text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      ))}

      {children}
    </div>
  </div>
);

/**
 * Botão fixed que aparece após 300px de scroll (padrão).
 * Posição bottom-right.
 */
export const Fixed: Story = {
  args: {
    variant: "fixed",
    size: "default",
    position: "bottom-right",
    threshold: 300,
    smooth: true,
  },
  render: (args) => (
    <ScrollableContent>
      <ScrollToTop {...args} />
    </ScrollableContent>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { ScrollToTop } from "@fabioeducacross/ui";

function App() {
  return (
    <div>
      {/* Conteúdo longo da página */}
      <ScrollToTop variant="fixed" threshold={300} />
    </div>
  );
}`,
      vue2: `<!-- Bootstrap Scroll to Top -->
<template>
  <div>
    <!-- Conteúdo longo -->
    <button 
      v-show="showButton"
      @click="scrollToTop"
      class="btn btn-primary rounded-circle position-fixed"
      style="bottom: 1.5rem; right: 1.5rem; width: 3rem; height: 3rem; z-index: 1050;"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdScrollToTop } from "@fabioeducacross/ui-vue3";
</script>

<template>
  <div>
    <!-- Conteúdo longo -->
    <EdScrollToTop variant="fixed" :threshold="300" />
  </div>
</template>`,
    },
  },
};

/**
 * Botão fixed em diferentes posições da tela.
 */
export const Positions: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop variant="fixed" position="bottom-right" threshold={100} />
      <ScrollToTop variant="fixed" position="bottom-left" threshold={100} />
    </ScrollableContent>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<ScrollToTop variant="fixed" position="bottom-right" />
<ScrollToTop variant="fixed" position="bottom-left" />
<ScrollToTop variant="fixed" position="bottom-center" />`,
      vue2: `<!-- Ajustar posição via CSS inline -->
<button style="bottom: 1.5rem; right: 1.5rem;">↑</button>
<button style="bottom: 1.5rem; left: 1.5rem;">↑</button>`,
      vue3: `<EdScrollToTop position="bottom-right" />
<EdScrollToTop position="bottom-left" />`,
    },
  },
};

/**
 * Botão floating - sempre visível, não depende de scroll.
 */
export const Floating: Story = {
  args: {
    variant: "floating",
    size: "default",
  },
  render: (args) => (
    <ScrollableContent>
      <ScrollToTop {...args} className="fixed bottom-6 right-6" />
    </ScrollableContent>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<ScrollToTop variant="floating" className="fixed bottom-6 right-6" />`,
      vue2: `<button class="btn btn-outline-primary rounded-circle position-fixed" 
        style="bottom: 1.5rem; right: 1.5rem;">
  <i class="bi bi-arrow-up"></i>
</button>`,
      vue3: `<EdScrollToTop variant="floating" class="fixed bottom-6 right-6" />`,
    },
  },
};

/**
 * Botão inline - integrado ao conteúdo, sem posicionamento fixo.
 */
export const Inline: Story = {
  args: {
    variant: "inline",
    size: "default",
  },
  render: (args) => (
    <div className="container mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-4xl font-bold">Artigo Longo</h1>

      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-2xl font-semibold">Seção {i + 1}</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ))}

      <div className="flex justify-center border-t pt-8">
        <ScrollToTop {...args} />
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="flex justify-center">
  <ScrollToTop variant="inline" />
</div>`,
      vue2: `<div class="d-flex justify-content-center">
  <button class="btn btn-secondary rounded-circle" @click="scrollToTop">
    <i class="bi bi-arrow-up"></i>
  </button>
</div>`,
      vue3: `<div class="flex justify-center">
  <EdScrollToTop variant="inline" />
</div>`,
    },
  },
};

/**
 * Tamanhos diferentes (sm, default, lg).
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-6 p-12">
      <div className="flex flex-col items-center gap-2">
        <ScrollToTop variant="floating" size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ScrollToTop variant="floating" size="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ScrollToTop variant="floating" size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<ScrollToTop size="sm" />
<ScrollToTop size="default" />
<ScrollToTop size="lg" />`,
      vue2: `<button style="width: 2.5rem; height: 2.5rem;">↑</button>
<button style="width: 3rem; height: 3rem;">↑</button>
<button style="width: 3.5rem; height: 3.5rem;">↑</button>`,
      vue3: `<EdScrollToTop size="sm" />
<EdScrollToTop size="default" />
<EdScrollToTop size="lg" />`,
    },
  },
};

/**
 * Ícones customizados usando lucide-react.
 */
export const CustomIcons: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-6 p-12">
      <ScrollToTop variant="floating" icon={<ArrowUp className="h-5 w-5" />} />
      <ScrollToTop variant="floating" icon={<ChevronUp className="h-5 w-5" />} />
      <ScrollToTop variant="floating" icon={<ChevronsUp className="h-5 w-5" />} />
      <ScrollToTop variant="floating" icon={<span className="text-xl">↑</span>} />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { ArrowUp, ChevronUp, ChevronsUp } from "lucide-react";

<ScrollToTop icon={<ArrowUp />} />
<ScrollToTop icon={<ChevronUp />} />
<ScrollToTop icon={<ChevronsUp />} />`,
      vue2: `<button><i class="bi bi-arrow-up"></i></button>
<button><i class="bi bi-chevron-up"></i></button>
<button><i class="bi bi-chevron-double-up"></i></button>`,
      vue3: `<script setup>
import { ArrowUp, ChevronUp } from "lucide-vue-next";
</script>

<EdScrollToTop :icon="h(ArrowUp)" />
<EdScrollToTop :icon="h(ChevronUp)" />`,
    },
  },
};

/**
 * Threshold customizado - aparece após 100px vs 500px.
 */
export const CustomThreshold: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop variant="fixed" position="bottom-right" threshold={100} />
      <div className="fixed bottom-6 left-6 rounded-lg bg-muted p-4 text-sm">
        <p className="font-semibold">Threshold: 100px</p>
        <p className="text-muted-foreground">Aparece rapidamente</p>
      </div>
    </ScrollableContent>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `// Aparece após 100px de scroll
<ScrollToTop threshold={100} />

// Aparece após 500px de scroll
<ScrollToTop threshold={500} />`,
      vue2: `data() {
  return { threshold: 100 };
},
methods: {
  handleScroll() {
    this.showButton = window.scrollY > this.threshold;
  }
}`,
      vue3: `<EdScrollToTop :threshold="100" />
<EdScrollToTop :threshold="500" />`,
    },
  },
};

/**
 * Caso de uso: Blog com botão inline no footer.
 */
export const BlogPost: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto max-w-3xl space-y-6 p-8">
        <header className="space-y-4 border-b pb-6">
          <h1 className="text-4xl font-bold">Como Criar um Design System Escalável</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time>24 de Janeiro, 2026</time>
            <span>•</span>
            <span>10 min de leitura</span>
          </div>
        </header>

        <div className="prose prose-gray max-w-none space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <h2 className="mb-2 text-2xl font-semibold">{i + 1}. Tópico Importante</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          ))}
        </div>

        <footer className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            Gostou do artigo? Compartilhe com sua equipe!
          </div>
          <ScrollToTop variant="inline" size="default" />
        </footer>
      </article>

      <ScrollToTop variant="fixed" threshold={400} />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `function BlogPost() {
  return (
    <article>
      {/* Conteúdo do artigo */}
      
      <footer className="flex justify-between items-center">
        <p>Compartilhe!</p>
        <ScrollToTop variant="inline" />
      </footer>
      
      {/* Botão fixed também */}
      <ScrollToTop variant="fixed" threshold={400} />
    </article>
  );
}`,
      vue2: `<template>
  <article>
    <!-- Conteúdo -->
    <footer class="d-flex justify-content-between align-items-center">
      <p>Compartilhe!</p>
      <button class="btn btn-secondary rounded-circle" @click="scrollToTop">
        <i class="bi bi-arrow-up"></i>
      </button>
    </footer>
    
    <button v-show="showFixed" class="btn btn-primary position-fixed" @click="scrollToTop">
      ↑
    </button>
  </article>
</template>`,
      vue3: `<template>
  <article>
    <footer class="flex justify-between items-center">
      <p>Compartilhe!</p>
      <EdScrollToTop variant="inline" />
    </footer>
    
    <EdScrollToTop variant="fixed" :threshold="400" />
  </article>
</template>`,
    },
  },
};

/**
 * Caso de uso: Documentação com múltiplas seções.
 */
export const Documentation: Story = {
  render: () => (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6">
        <nav className="space-y-2">
          <a href="#intro" className="block text-sm hover:text-primary">
            Introdução
          </a>
          <a href="#install" className="block text-sm hover:text-primary">
            Instalação
          </a>
          <a href="#usage" className="block text-sm hover:text-primary">
            Uso Básico
          </a>
          <a href="#api" className="block text-sm hover:text-primary">
            Referência API
          </a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {Array.from({ length: 8 }, (_, i) => (
            <section key={i} id={`section-${i}`} className="space-y-4">
              <h2 className="text-3xl font-bold">Seção {i + 1}</h2>
              <p className="text-muted-foreground">
                Conteúdo detalhado da documentação com exemplos de código, explicações técnicas
                e melhores práticas.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <code className="text-sm">npm install @fabioeducacross/ui</code>
              </div>
            </section>
          ))}
        </div>
      </main>

      <ScrollToTop variant="fixed" position="bottom-right" threshold={200} />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `function Documentation() {
  return (
    <div className="flex">
      <aside>{/* Sidebar nav */}</aside>
      <main>{/* Conteúdo longo */}</main>
      <ScrollToTop variant="fixed" threshold={200} />
    </div>
  );
}`,
      vue2: `<template>
  <div class="d-flex">
    <aside><!-- Sidebar --></aside>
    <main><!-- Conteúdo --></main>
    <button v-show="showButton" class="position-fixed" @click="scrollToTop">↑</button>
  </div>
</template>`,
      vue3: `<template>
  <div class="flex">
    <aside><!-- Sidebar --></aside>
    <main><!-- Conteúdo --></main>
    <EdScrollToTop variant="fixed" :threshold="200" />
  </div>
</template>`,
    },
  },
};
