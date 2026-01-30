import type { Meta, StoryObj } from "@storybook/react";

/**
 * **TabRouter** - Tabs com navegação por rota
 * 
 * Sistema de tabs que sincroniza com Vue Router.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/tab/TabRouter.vue`
 * 
 * @example
 * ```vue
 * <TabRouter :tabs="[
 *   { label: 'Visão Geral', route: '/dashboard' },
 *   { label: 'Detalhes', route: '/dashboard/details' }
 * ]" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Navigation/TabRouter",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs integradas com roteamento. Cada tab corresponde a uma rota.",
      },
    },
  },
  argTypes: {
    tabs: {
      description: "Array de tabs com label e route",
    },
    activeRoute: {
      control: "text",
      description: "Rota atual ativa",
    },
  },
};

export default meta;
type Story = StoryObj;

interface Tab {
  title: string;
  route: { name: string };
  icon?: string;
  variant?: string;
}

/**
 * Mock do componente TabRouter do Frontoffice
 * Replica exatamente os estilos de: educacross-frontoffice/src/components/tab/TabRouter.vue
 */
const TabRouterMock = ({ 
  tabs,
  activeTab = 0,
  tabTitle = "",
  tabTitleIcon = "",
  showContent = true,
}: { 
  tabs: Tab[];
  activeTab?: number;
  tabTitle?: string;
  tabTitleIcon?: string;
  showContent?: boolean;
}) => {
  const [currentTab, setCurrentTab] = React.useState(activeTab);

  return (
    <div className="min-vh-100">
      {/* Header row com tabs e título */}
      <div className="d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-between align-items-md-baseline flex-nowrap">
        {/* Tabs */}
        <div className={`tabs-row ${tabs.length > 1 ? 'd-flex' : 'd-none'} d-md-flex`}>
          {tabs.map((tab, index) => {
            const isActive = currentTab === index;
            const offset = -10;
            
            return (
              <a
                key={index}
                className={`tab-link d-flex align-items-center gap-1 ${isActive ? 'active' : ''} ${
                  tab.variant && !isActive ? `hover:bg-${tab.variant} text-${tab.variant}` : ''
                } ${tab.variant && isActive ? `bg-${tab.variant}` : ''}`}
                style={{
                  '--offset': `${offset}px`,
                  '--index': index,
                  zIndex: isActive ? tabs.length : tabs.length - index,
                  transform: `translateX(calc(${index} * ${offset}px))`,
                } as React.CSSProperties}
                onClick={() => setCurrentTab(index)}
              >
                {tab.icon && (
                  <span className="material-symbols-outlined tab-icon">
                    {tab.icon}
                  </span>
                )}
                {tab.title}
              </a>
            );
          })}
        </div>

        {/* Tab title (direita) */}
        {tabTitle && (
          <div className="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0 gap-1 text-primary font-bold text-uppercase">
            {tabTitleIcon && (
              <span className="material-symbols-outlined">{tabTitleIcon}</span>
            )}
            {tabTitle}
          </div>
        )}
      </div>

      {/* Linha divisória roxa */}
      <div className={`tab-line ${tabs.length > 1 ? 'd-block' : 'd-none d-md-block'}`} />

      {/* Conteúdo da tab */}
      {showContent && (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab {currentTab + 1}</h3>
          <p className="text-muted">
            Este é o conteúdo da aba "{tabs[currentTab]?.title}". 
            Em produção, aqui seria renderizado o slot default do Vue.
          </p>
        </div>
      )}
    </div>
  );
};

// Importar React para useState
import React from "react";

const defaultTabs: Tab[] = [
  { title: "Visão Geral", route: { name: "dashboard" } },
  { title: "Alunos", route: { name: "students" } },
  { title: "Turmas", route: { name: "classes" } },
  { title: "Relatórios", route: { name: "reports" } },
];

/**
 * Estilo padrão do TabRouter - tabs com cantos arredondados e sombra
 */
export const Default: Story = {
  render: () => <TabRouterMock tabs={defaultTabs} activeTab={0} />,
};

/**
 * TabRouter com título no lado direito
 */
export const WithTitle: Story = {
  name: "Com Título",
  render: () => (
    <TabRouterMock 
      tabs={defaultTabs} 
      activeTab={1} 
      tabTitle="DASHBOARD" 
      tabTitleIcon="dashboard"
    />
  ),
};

/**
 * Tabs com ícones Material Symbols
 */
export const WithIcons: Story = {
  name: "Com Ícones",
  render: () => (
    <TabRouterMock 
      tabs={[
        { title: "Visão Geral", route: { name: "dashboard" }, icon: "dashboard" },
        { title: "Alunos", route: { name: "students" }, icon: "people" },
        { title: "Turmas", route: { name: "classes" }, icon: "school" },
        { title: "Relatórios", route: { name: "reports" }, icon: "assessment" },
      ]}
      activeTab={0}
      tabTitle="PAINEL"
    />
  ),
};

/**
 * Tabs com variantes de cor
 */
export const ColorVariants: Story = {
  name: "Variantes de Cor",
  render: () => (
    <TabRouterMock 
      tabs={[
        { title: "Padrão", route: { name: "default" } },
        { title: "Sucesso", route: { name: "success" }, variant: "success" },
        { title: "Perigo", route: { name: "danger" }, variant: "danger" },
        { title: "Aviso", route: { name: "warning" }, variant: "warning" },
        { title: "Info", route: { name: "info" }, variant: "info" },
      ]}
      activeTab={0}
    />
  ),
};

/**
 * Tab única (exibida apenas em desktop)
 */
export const SingleTab: Story = {
  name: "Tab Única",
  render: () => (
    <TabRouterMock 
      tabs={[{ title: "Única Aba", route: { name: "single" } }]}
      activeTab={0}
      tabTitle="MODO SIMPLES"
    />
  ),
};

/**
 * Muitas tabs com scroll horizontal
 */
export const ManyTabs: Story = {
  name: "Muitas Tabs (Scroll)",
  render: () => (
    <TabRouterMock 
      tabs={[
        { title: "Tab 1", route: { name: "tab1" } },
        { title: "Tab 2", route: { name: "tab2" } },
        { title: "Tab 3", route: { name: "tab3" } },
        { title: "Tab 4", route: { name: "tab4" } },
        { title: "Tab 5", route: { name: "tab5" } },
        { title: "Tab 6", route: { name: "tab6" } },
        { title: "Tab 7", route: { name: "tab7" } },
        { title: "Tab 8", route: { name: "tab8" } },
      ]}
      activeTab={2}
    />
  ),
};

/**
 * Exemplo real: Relatório de Eventos
 */
export const EventsReport: Story = {
  name: "Exemplo: Relatório de Eventos",
  render: () => (
    <TabRouterMock 
      tabs={[
        { title: "Instituições", route: { name: "institutions" }, icon: "business" },
        { title: "Turmas", route: { name: "classes" }, icon: "groups" },
        { title: "Alunos", route: { name: "students" }, icon: "person" },
      ]}
      activeTab={0}
      tabTitle="RESULTADOS DO EVENTO"
      tabTitleIcon="emoji_events"
    />
  ),
};

/**
 * Exemplo real: Dashboard de Escolas
 */
export const SchoolsDashboard: Story = {
  name: "Exemplo: Dashboard Escolas",
  render: () => (
    <TabRouterMock 
      tabs={[
        { title: "Visão Geral", route: { name: "overview" } },
        { title: "Por Habilidade", route: { name: "skills" } },
        { title: "Por Aluno", route: { name: "by-student" } },
        { title: "Evolução", route: { name: "evolution" } },
      ]}
      activeTab={0}
      tabTitle="DASHBOARD ESCOLAS"
    />

  ),
};
