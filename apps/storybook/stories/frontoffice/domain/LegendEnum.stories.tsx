import type { Meta, StoryObj } from "@storybook/react";

/**
 * **LegendEnum** - Enum visual de proficiência
 * 
 * Renderiza automaticamente badges baseado em um enum de proficiência.
 * Usado em tabelas e relatórios para mostrar níveis.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/legends/LegendEnum.vue`
 * 
 * @example
 * ```vue
 * <LegendEnum :enum="proficiency" :selected="2" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Domain/LegendEnum",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Renderiza badges de proficiência baseado em enum. Suporta seleção e highlight.",
      },
    },
  },
  argTypes: {
    enum: {
      description: "Array de opções do enum (proficiency, performance, etc.)",
    },
    selected: {
      control: "number",
      description: "ID do item selecionado",
    },
    showAll: {
      control: "boolean",
      description: "Mostrar todos os itens ou apenas o selecionado",
    },
  },
};

export default meta;
type Story = StoryObj;

const proficiencyEnum = [
  { id: 1, label: "Abaixo do Básico", variant: "legend-below-basic" },
  { id: 2, label: "Básico", variant: "legend-basic" },
  { id: 3, label: "Proficiente", variant: "legend-proficient" },
  { id: 4, label: "Avançado", variant: "legend-advanced" },
];

const variantColors: Record<string, { bg: string; text: string }> = {
  "legend-below-basic": { bg: "bg-legend-below-basic", text: "text-white" },
  "legend-basic": { bg: "bg-legend-basic", text: "text-white" },
  "legend-proficient": { bg: "bg-legend-proficient", text: "text-white" },
  "legend-advanced": { bg: "bg-legend-advanced", text: "text-white" },
  "legend-not-completed": { bg: "bg-legend-not-completed", text: "text-white" },
  "legend-in-progress": { bg: "bg-legend-in-progress", text: "text-white" },
};

// Mock do componente Vue
const LegendEnumMock = ({ 
  items, 
  selected,
  showAll = true,
  size = "md"
}: { 
  items: typeof proficiencyEnum; 
  selected?: number;
  showAll?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const displayItems = showAll ? items : items.filter(i => i.id === selected);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displayItems.map((item) => {
        const colors = variantColors[item.variant];
        const isSelected = selected === item.id;
        
        return (
          <span 
            key={item.id}
            className={`
              inline-flex items-center rounded-full font-medium
              ${sizeClasses[size]}
              ${colors.bg} ${colors.text}
              ${isSelected ? "ring-2 ring-offset-2 ring-primary" : "opacity-80"}
              transition-all
            `}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
};

export const Default: Story = {
  render: () => <LegendEnumMock items={proficiencyEnum} />,
};

export const WithSelected: Story = {
  render: () => <LegendEnumMock items={proficiencyEnum} selected={3} />,
};

export const OnlySelected: Story = {
  render: () => <LegendEnumMock items={proficiencyEnum} selected={2} showAll={false} />,
};

export const SmallSize: Story = {
  render: () => <LegendEnumMock items={proficiencyEnum} size="sm" />,
};

export const LargeSize: Story = {
  render: () => <LegendEnumMock items={proficiencyEnum} size="lg" />,
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Proficiência Padrão</h4>
        <LegendEnumMock items={proficiencyEnum} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Com Não Concluído</h4>
        <LegendEnumMock 
          items={[
            { id: 0, label: "Não Concluído", variant: "legend-not-completed" },
            ...proficiencyEnum
          ]} 
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Com Em Andamento</h4>
        <LegendEnumMock 
          items={[
            { id: 0, label: "Em Andamento", variant: "legend-in-progress" },
            ...proficiencyEnum
          ]} 
        />
      </div>
    </div>
  ),
};
