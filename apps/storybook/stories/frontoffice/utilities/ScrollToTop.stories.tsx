import type { Meta, StoryObj } from "@storybook/react";

/**
 * **ScrollToTop** - Botão de voltar ao topo
 * 
 * Botão flutuante para scroll rápido ao topo da página.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/ScrollToTop.vue`
 * 
 * @example
 * ```vue
 * <ScrollToTop :visible="showButton" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Utilities/ScrollToTop",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Botão flutuante que aparece após scroll para facilitar retorno ao topo.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const ScrollToTopMock = ({ 
  visible = true,
  position = "bottom-right"
}: { 
  visible?: boolean;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  if (!visible) return null;

  return (
    <button
      className={`
        fixed ${positionClasses[position]}
        w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg
        flex items-center justify-center
        hover:bg-primary/90 transition-all
        animate-in fade-in slide-in-from-bottom-4
      `}
      aria-label="Voltar ao topo"
    >
      <span className="material-symbols-outlined">keyboard_arrow_up</span>
    </button>
  );
};

// Wrapper para simular página com scroll
const PageWithScroll = ({ children, position }: { children?: React.ReactNode; position?: "bottom-right" | "bottom-left" | "bottom-center" }) => (
  <div className="relative h-96 overflow-auto border rounded-lg">
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Conteúdo da Página</h2>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="text-muted-foreground">
          Parágrafo {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      ))}
    </div>
    {children}
    <ScrollToTopMock position={position} />
  </div>
);

export const Default: Story = {
  render: () => <PageWithScroll />,
};

export const BottomLeft: Story = {
  name: "Posição Inferior Esquerda",
  render: () => <PageWithScroll position="bottom-left" />,
};

export const BottomCenter: Story = {
  name: "Posição Inferior Central",
  render: () => <PageWithScroll position="bottom-center" />,
};

export const Hidden: Story = {
  name: "Oculto (no topo)",
  render: () => (
    <div className="relative h-96 overflow-auto border rounded-lg">
      <div className="p-6 text-center text-muted-foreground">
        <p className="mb-4">O botão só aparece após rolar a página</p>
        <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
      </div>
      <ScrollToTopMock visible={false} />
    </div>
  ),
};

export const Isolated: Story = {
  name: "Botão Isolado",
  render: () => (
    <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
      <button
        className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
      >
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
    </div>
  ),
};

export const Variants: Story = {
  name: "Variações de Estilo",
  render: () => (
    <div className="p-8 flex gap-4">
      <button className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center">
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
      <button className="w-12 h-12 bg-card border text-foreground rounded-full shadow-lg flex items-center justify-center">
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
      <button className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
        <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center gap-1 text-sm">
        <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
        Topo
      </button>
    </div>
  ),
};
