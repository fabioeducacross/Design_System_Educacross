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
  label: string;
  route: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

// Mock do componente Vue
const TabRouterMock = ({ 
  tabs,
  activeRoute = "",
  variant = "underline"
}: { 
  tabs: Tab[];
  activeRoute?: string;
  variant?: "underline" | "pills" | "cards";
}) => {
  const variantClasses = {
    underline: {
      container: "border-b border-border",
      tab: "px-4 py-2 -mb-px",
      active: "border-b-2 border-primary text-primary",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    pills: {
      container: "bg-muted rounded-lg p-1 inline-flex",
      tab: "px-4 py-2 rounded-md",
      active: "bg-background text-foreground shadow-sm",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    cards: {
      container: "flex gap-2",
      tab: "px-4 py-2 rounded-t-lg border border-b-0",
      active: "bg-card text-foreground border-border",
      inactive: "bg-muted/50 text-muted-foreground hover:bg-muted border-transparent",
    },
  };

  const styles = variantClasses[variant];

  return (
    <div className={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.route === activeRoute;
        
        return (
          <button
            key={tab.route}
            className={`
              inline-flex items-center gap-2 font-medium text-sm transition-colors
              ${styles.tab}
              ${isActive ? styles.active : styles.inactive}
              ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            disabled={tab.disabled}
          >
            {tab.icon && (
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            )}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const defaultTabs: Tab[] = [
  { label: "Visão Geral", route: "/dashboard" },
  { label: "Alunos", route: "/dashboard/students" },
  { label: "Turmas", route: "/dashboard/classes" },
  { label: "Relatórios", route: "/dashboard/reports" },
];

export const Underline: Story = {
  render: () => <TabRouterMock tabs={defaultTabs} activeRoute="/dashboard" variant="underline" />,
};

export const Pills: Story = {
  render: () => <TabRouterMock tabs={defaultTabs} activeRoute="/dashboard/students" variant="pills" />,
};

export const Cards: Story = {
  render: () => <TabRouterMock tabs={defaultTabs} activeRoute="/dashboard/classes" variant="cards" />,
};

export const WithIcons: Story = {
  render: () => (
    <TabRouterMock 
      tabs={[
        { label: "Visão Geral", route: "/dashboard", icon: "dashboard" },
        { label: "Alunos", route: "/dashboard/students", icon: "people" },
        { label: "Turmas", route: "/dashboard/classes", icon: "school" },
        { label: "Relatórios", route: "/dashboard/reports", icon: "assessment" },
      ]}
      activeRoute="/dashboard"
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <TabRouterMock 
      tabs={[
        { label: "Todas", route: "/tasks", badge: 24 },
        { label: "Pendentes", route: "/tasks/pending", badge: 5 },
        { label: "Concluídas", route: "/tasks/done", badge: 19 },
        { label: "Arquivadas", route: "/tasks/archived", badge: 0 },
      ]}
      activeRoute="/tasks/pending"
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <TabRouterMock 
      tabs={[
        { label: "Ativo", route: "/page1" },
        { label: "Habilitado", route: "/page2" },
        { label: "Desabilitado", route: "/page3", disabled: true },
        { label: "Também Desabilitado", route: "/page4", disabled: true },
      ]}
      activeRoute="/page1"
    />
  ),
};

export const ReportTabs: Story = {
  name: "Exemplo: Abas de Relatório",
  render: () => (
    <div className="space-y-4">
      <TabRouterMock 
        tabs={[
          { label: "Desempenho Geral", route: "/reports/overview", icon: "bar_chart" },
          { label: "Por Habilidade", route: "/reports/skills", icon: "psychology" },
          { label: "Por Aluno", route: "/reports/students", icon: "person" },
          { label: "Comparativo", route: "/reports/compare", icon: "compare" },
        ]}
        activeRoute="/reports/overview"
      />
      
      <div className="p-6 bg-card border rounded-lg">
        <p className="text-muted-foreground text-center">
          Conteúdo da aba "Desempenho Geral" seria exibido aqui
        </p>
      </div>
    </div>
  ),
};
