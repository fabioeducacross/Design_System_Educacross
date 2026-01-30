import type { Meta, StoryObj } from "@storybook/react";

/**
 * **TabCards** - Cards em abas
 * 
 * Componente para exibição de conteúdo em cards com sistema de abas.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/TabCards.vue`
 * 
 * @example
 * ```vue
 * <TabCards :tabs="tabsData" v-model="activeTab" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Navigation/TabCards",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Sistema de abas onde cada aba é apresentada como um card selecionável.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface TabCard {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  value?: string | number;
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

// Mock do componente Vue
const TabCardsMock = ({ 
  tabs,
  activeTab,
  orientation = "horizontal"
}: { 
  tabs: TabCard[];
  activeTab?: string;
  orientation?: "horizontal" | "vertical";
}) => {
  const active = activeTab || tabs[0]?.id;
  
  const variantStyles = {
    default: { active: "border-primary bg-primary/5", inactive: "hover:bg-accent/50" },
    primary: { active: "border-primary bg-primary/10", inactive: "hover:bg-primary/5" },
    success: { active: "border-success bg-success/10", inactive: "hover:bg-success/5" },
    warning: { active: "border-warning bg-warning/10", inactive: "hover:bg-warning/5" },
    error: { active: "border-destructive bg-destructive/10", inactive: "hover:bg-destructive/5" },
  };

  return (
    <div className={`
      flex gap-3
      ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}
    `}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const styles = variantStyles[tab.variant || "default"];
        
        return (
          <button
            key={tab.id}
            className={`
              flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left
              ${orientation === "horizontal" ? "flex-1 min-w-[150px]" : ""}
              ${isActive ? styles.active : `border-transparent ${styles.inactive}`}
            `}
          >
            {tab.icon && (
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
              `}>
                <span className="material-symbols-outlined">{tab.icon}</span>
              </div>
            )}
            <div className="flex-1">
              <p className={`font-medium ${isActive ? "" : "text-muted-foreground"}`}>
                {tab.title}
              </p>
              {tab.subtitle && (
                <p className="text-xs text-muted-foreground">{tab.subtitle}</p>
              )}
            </div>
            {tab.value !== undefined && (
              <span className={`
                text-xl font-bold
                ${isActive ? "text-primary" : "text-muted-foreground"}
              `}>
                {tab.value}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const statsTabs: TabCard[] = [
  { id: "students", title: "Alunos", subtitle: "Ativos", icon: "group", value: 127 },
  { id: "missions", title: "Missões", subtitle: "Este mês", icon: "flag", value: 45 },
  { id: "games", title: "Jogos", subtitle: "Jogados", icon: "sports_esports", value: 892 },
  { id: "reports", title: "Relatórios", subtitle: "Gerados", icon: "assessment", value: 23 },
];

export const Default: Story = {
  render: () => <TabCardsMock tabs={statsTabs} />,
};

export const SecondActive: Story = {
  name: "Segunda Aba Ativa",
  render: () => <TabCardsMock tabs={statsTabs} activeTab="missions" />,
};

export const Vertical: Story = {
  name: "Orientação Vertical",
  render: () => (
    <div className="max-w-xs">
      <TabCardsMock tabs={statsTabs} orientation="vertical" />
    </div>
  ),
};

export const WithVariants: Story = {
  name: "Com Variantes de Cor",
  render: () => (
    <TabCardsMock 
      tabs={[
        { id: "total", title: "Total", icon: "group", value: 27, variant: "primary" },
        { id: "advanced", title: "Avançado", icon: "star", value: 8, variant: "success" },
        { id: "basic", title: "Básico", icon: "warning", value: 12, variant: "warning" },
        { id: "below", title: "Abaixo", icon: "error", value: 7, variant: "error" },
      ]}
      activeTab="advanced"
    />
  ),
};

export const SimpleText: Story = {
  name: "Apenas Texto",
  render: () => (
    <TabCardsMock 
      tabs={[
        { id: "overview", title: "Visão Geral" },
        { id: "details", title: "Detalhes" },
        { id: "history", title: "Histórico" },
        { id: "settings", title: "Configurações" },
      ]}
    />
  ),
};

export const TwoTabs: Story = {
  name: "Duas Abas",
  render: () => (
    <TabCardsMock 
      tabs={[
        { id: "students", title: "Por Aluno", icon: "person", subtitle: "Visão individual" },
        { id: "class", title: "Por Turma", icon: "groups", subtitle: "Visão geral" },
      ]}
    />
  ),
};
