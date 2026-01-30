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

// Simulação do enum de proficiência (igual ao Frontoffice)
const proficiencyEnum = [
  { id: 0, label: "Não fizeram", variant: "legend-not-completed" },
  { id: 1, label: "Abaixo do Básico", variant: "legend-below-basic" },
  { id: 2, label: "Básico", variant: "legend-basic" },
  { id: 3, label: "Proficiente", variant: "legend-proficient" },
  { id: 4, label: "Avançado", variant: "legend-advanced" },
];

/**
 * Mock do BadgeStatus Vue (estilo light com borda)
 * Replica: educacross-frontoffice/src/components/badge/BadgeStatus.vue
 */
const BadgeStatusMock = ({ 
  value, 
  pill = true 
}: { 
  value: number; 
  pill?: boolean;
}) => {
  const enumObject = proficiencyEnum.find(e => e.id === value) || proficiencyEnum[0];
  
  return (
    <span 
      className={`
        badge badge-pill 
        badge-light-${enumObject.variant} 
        border-${enumObject.variant}
        text-uppercase px-2 py-25 
        d-flex align-items-center justify-content-center gap-1
      `}
    >
      {!pill && (
        <span 
          className={`material-symbols-outlined text-${enumObject.variant}`}
          style={{ fontSize: '12px' }}
        >
          person_edit
        </span>
      )}
      {enumObject.label}
    </span>
  );
};

/**
 * Badge de status mostrando nível "Avançado" (valor 4)
 */
export const Advanced: Story = {
  render: () => <BadgeStatusMock value={4} />,
};

/**
 * Badge de status mostrando nível "Proficiente" (valor 3)
 */
export const Proficient: Story = {
  render: () => <BadgeStatusMock value={3} />,
};

/**
 * ⚠️ ATENÇÃO: Básico é LARANJA (#ff9f43), não amarelo!
 */
export const Basic: Story = {
  render: () => <BadgeStatusMock value={2} />,
};

/**
 * Badge de status mostrando nível "Abaixo do Básico" (valor 1)
 */
export const BelowBasic: Story = {
  render: () => <BadgeStatusMock value={1} />,
};

/**
 * Badge de status mostrando "Não fizeram" (valor 0)
 */
export const NotCompleted: Story = {
  render: () => <BadgeStatusMock value={0} />,
};

/**
 * Badge de status mostrando "Em Andamento" (valor especial)
 */
export const InProgress: Story = {
  render: () => (
    <span className="badge badge-pill badge-light-legend-in-progress border-legend-in-progress text-uppercase px-2 py-25 d-flex align-items-center justify-content-center">
      Em Andamento
    </span>
  ),
};

/**
 * Todos os níveis de proficiência lado a lado (estilo Frontoffice)
 */
export const AllProficiencyLevels: Story = {
  render: () => (
    <div className="d-flex flex-wrap gap-2">
      {proficiencyEnum.map((item) => (
        <BadgeStatusMock key={item.id} value={item.id} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exibe todos os níveis de proficiência com o estilo light + borda do Bootstrap-Vue.",
      },
    },
  },
};

/**
 * Variante sem pill (com ícone person_edit)
 */
export const WithIcons: Story = {
  render: () => (
    <div className="d-flex flex-wrap gap-2">
      {proficiencyEnum.map((item) => (
        <BadgeStatusMock key={item.id} value={item.id} pill={false} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Variante com ícone, usado quando pill=false no componente Vue original.",
      },
    },
  },

};
