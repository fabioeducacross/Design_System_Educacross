import type { Meta, StoryObj } from "@storybook/react";

/**
 * **SimpleTab** - Tabs simples sem roteamento
 * 
 * Sistema de tabs básico para conteúdo local.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/tab/SimpleTab.vue`
 * 
 * @example
 * ```vue
 * <SimpleTab :tabs="['Tab 1', 'Tab 2', 'Tab 3']" v-model="activeTab" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Navigation/SimpleTab",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs simples para alternar entre conteúdos sem navegação de rota.",
      },
    },
  },
  argTypes: {
    tabs: {
      description: "Array de labels das tabs",
    },
    activeIndex: {
      control: "number",
      description: "Índice da tab ativa",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const SimpleTabMock = ({ 
  tabs,
  activeIndex = 0,
  fullWidth = false
}: { 
  tabs: string[];
  activeIndex?: number;
  fullWidth?: boolean;
}) => (
  <div className={`
    inline-flex border-b border-border
    ${fullWidth ? "w-full" : ""}
  `}>
    {tabs.map((tab, index) => {
      const isActive = index === activeIndex;
      
      return (
        <button
          key={index}
          className={`
            px-4 py-2 text-sm font-medium -mb-px transition-colors
            ${fullWidth ? "flex-1 text-center" : ""}
            ${isActive 
              ? "border-b-2 border-primary text-primary" 
              : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

export const Default: Story = {
  render: () => <SimpleTabMock tabs={["Tab 1", "Tab 2", "Tab 3"]} />,
};

export const SecondActive: Story = {
  render: () => <SimpleTabMock tabs={["Primeira", "Segunda", "Terceira"]} activeIndex={1} />,
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <SimpleTabMock tabs={["Opção A", "Opção B", "Opção C"]} fullWidth />
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <SimpleTabMock 
      tabs={["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"]} 
      activeIndex={2}
    />
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="max-w-md">
      <SimpleTabMock tabs={["Informações", "Configurações", "Histórico"]} activeIndex={0} />
      <div className="p-4 bg-card border border-t-0 rounded-b-lg">
        <h4 className="font-medium mb-2">Informações do Usuário</h4>
        <p className="text-sm text-muted-foreground">
          Aqui seriam exibidas as informações do usuário selecionado.
        </p>
      </div>
    </div>
  ),
};
