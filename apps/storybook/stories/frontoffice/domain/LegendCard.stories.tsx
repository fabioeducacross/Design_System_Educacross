import type { Meta, StoryObj } from "@storybook/react";

/**
 * **LegendCard** - Card de legenda de proficiência
 * 
 * Exibe uma lista de itens de legenda com cores e ícones.
 * Usado para explicar o significado das cores de proficiência.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/legends/LegendCard.vue`
 * 
 * @example
 * ```vue
 * <LegendCard :items="proficiencyItems" :active="2" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Domain/LegendCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Card que exibe a legenda de proficiência com cores e ícones Material.",
      },
    },
  },
  argTypes: {
    items: {
      description: "Array de itens da legenda",
    },
    active: {
      control: "number",
      description: "ID do item ativo (destacado)",
    },
    tooltipActiveText: {
      control: "text",
      description: "Texto do tooltip para o item ativo",
    },
  },
};

export default meta;
type Story = StoryObj;

const proficiencyItems = [
  { id: 1, label: "Abaixo do Básico", variant: "legend-below-basic", icon: "sentiment_dissatisfied" },
  { id: 2, label: "Básico", variant: "legend-basic", icon: "sentiment_neutral" },
  { id: 3, label: "Proficiente", variant: "legend-proficient", icon: "sentiment_satisfied" },
  { id: 4, label: "Avançado", variant: "legend-advanced", icon: "sentiment_very_satisfied" },
];

const variantColors: Record<string, string> = {
  "legend-below-basic": "bg-legend-below-basic",
  "legend-basic": "bg-legend-basic",
  "legend-proficient": "bg-legend-proficient",
  "legend-advanced": "bg-legend-advanced",
  "legend-not-completed": "bg-legend-not-completed",
  "legend-in-progress": "bg-legend-in-progress",
};

// Mock do componente Vue
const LegendCardMock = ({ 
  items, 
  active,
  horizontal = false 
}: { 
  items: typeof proficiencyItems; 
  active?: number;
  horizontal?: boolean;
}) => (
  <div className={`
    bg-card border border-border rounded-lg p-4
    ${horizontal ? "flex items-center gap-6" : "space-y-3"}
  `}>
    {items.map((item) => (
      <div 
        key={item.id}
        className={`
          flex items-center gap-3 p-2 rounded-md transition-colors
          ${active === item.id ? "bg-accent ring-2 ring-primary" : "hover:bg-accent/50"}
        `}
      >
        <div className={`
          w-4 h-4 rounded-full
          ${variantColors[item.variant]}
        `} />
        <span className="material-symbols-outlined text-lg text-muted-foreground">
          {item.icon}
        </span>
        <span className={`
          text-sm
          ${active === item.id ? "font-semibold text-foreground" : "text-muted-foreground"}
        `}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => <LegendCardMock items={proficiencyItems} />,
};

export const WithActiveItem: Story = {
  render: () => <LegendCardMock items={proficiencyItems} active={3} />,
};

export const Horizontal: Story = {
  render: () => <LegendCardMock items={proficiencyItems} horizontal />,
};

export const WithNotCompleted: Story = {
  render: () => (
    <LegendCardMock 
      items={[
        { id: 0, label: "Não fizeram", variant: "legend-not-completed", icon: "no_accounts" },
        ...proficiencyItems
      ]} 
    />
  ),
};

export const WithInProgress: Story = {
  render: () => (
    <LegendCardMock 
      items={[
        { id: 0, label: "Em Andamento", variant: "legend-in-progress", icon: "directions_walk" },
        ...proficiencyItems
      ]} 
    />
  ),
};
