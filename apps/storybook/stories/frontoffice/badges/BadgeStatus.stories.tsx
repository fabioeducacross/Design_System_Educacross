import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@fabioeducacross/ui";

/**
 * # BadgeStatus
 * 
 * **Origem**: `educacross-frontoffice/src/components/badge/BadgeStatus.vue`
 * 
 * Badge de status que exibe o nível de proficiência do aluno usando as cores Legend.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `number` | - | ID do nível de proficiência (1-4) |
 * | `enum` | `Array` | proficiency | Array de enum para mapeamento |
 * | `pill` | `boolean` | true | Se deve ter bordas arredondadas |
 * | `badgeClass` | `string` | '' | Classes CSS adicionais |
 * 
 * ## Mapeamento de Cores
 * 
 * | Value | Label | Cor |
 * |-------|-------|-----|
 * | 0 | Não fizeram | legend-not-completed (cinza) |
 * | 1 | Abaixo do Básico | legend-below-basic (vermelho) |
 * | 2 | Básico | legend-basic (LARANJA!) |
 * | 3 | Proficiente | legend-proficient (verde) |
 * | 4 | Avançado | legend-advanced (roxo) |
 * 
 * @see Frontoffice: src/components/badge/BadgeStatus.vue
 */
const meta: Meta = {
  title: "Frontoffice/Badges/BadgeStatus",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Badge de status com cores de proficiência do sistema Legend Colors.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["legend-advanced", "legend-proficient", "legend-basic", "legend-below-basic", "legend-not-completed", "legend-in-progress"],
      description: "Variante de cor Legend",
    },
    children: {
      control: "text",
      description: "Texto do badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Simulação do enum de proficiência
const proficiencyEnum = [
  { id: 0, label: "Não fizeram", variant: "legend-not-completed" },
  { id: 1, label: "Abaixo do Básico", variant: "legend-below-basic" },
  { id: 2, label: "Básico", variant: "legend-basic" },
  { id: 3, label: "Proficiente", variant: "legend-proficient" },
  { id: 4, label: "Avançado", variant: "legend-advanced" },
];

/**
 * Badge de status mostrando nível "Avançado" (valor 4)
 */
export const Advanced: Story = {
  args: {
    children: "Avançado",
    className: "bg-legend-advanced text-white",
  },
};

/**
 * Badge de status mostrando nível "Proficiente" (valor 3)
 */
export const Proficient: Story = {
  args: {
    children: "Proficiente",
    className: "bg-legend-proficient text-white",
  },
};

/**
 * ⚠️ ATENÇÃO: Básico é LARANJA, não amarelo!
 */
export const Basic: Story = {
  args: {
    children: "Básico",
    className: "bg-legend-basic text-white",
  },
};

/**
 * Badge de status mostrando nível "Abaixo do Básico" (valor 1)
 */
export const BelowBasic: Story = {
  args: {
    children: "Abaixo do Básico",
    className: "bg-legend-below-basic text-white",
  },
};

/**
 * Badge de status mostrando "Não fizeram" (valor 0)
 */
export const NotCompleted: Story = {
  args: {
    children: "Não fizeram",
    className: "bg-legend-not-completed text-white",
  },
};

/**
 * Badge de status mostrando "Em Andamento"
 */
export const InProgress: Story = {
  args: {
    children: "Em Andamento",
    className: "bg-legend-in-progress text-white",
  },
};

/**
 * Todos os níveis de proficiência lado a lado
 */
export const AllProficiencyLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {proficiencyEnum.map((item) => (
        <Badge key={item.id} className={`bg-${item.variant} text-white`}>
          {item.label}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exibe todos os níveis de proficiência com suas respectivas cores Legend.",
      },
    },
  },
};

/**
 * Uso com ícones (como no Frontoffice)
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-legend-advanced text-white flex items-center gap-1">
        <span>⭐</span> Avançado
      </Badge>
      <Badge className="bg-legend-proficient text-white flex items-center gap-1">
        <span>😊</span> Proficiente
      </Badge>
      <Badge className="bg-legend-basic text-white flex items-center gap-1">
        <span>😐</span> Básico
      </Badge>
      <Badge className="bg-legend-below-basic text-white flex items-center gap-1">
        <span>😟</span> Abaixo do Básico
      </Badge>
    </div>
  ),
};
