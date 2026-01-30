import type { Meta, StoryObj } from "@storybook/react";

/**
 * # CellStatus
 * 
 * **Origem**: `educacross-frontoffice/src/components/badge/CellStatus.vue`
 * 
 * Célula de status para uso em tabelas, mostrando o nível de proficiência com cor de fundo.
 * Similar ao BadgeStatus mas otimizado para uso em células de tabela.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `number` | - | ID do nível de proficiência (1-4) |
 * | `enum` | `Array` | proficiency | Array de enum para mapeamento |
 * 
 * ## Diferença do BadgeStatus
 * 
 * - CellStatus: Usado em células de tabela, preenche toda a célula
 * - BadgeStatus: Usado standalone, tem formato pill
 * 
 * @see Frontoffice: src/components/badge/CellStatus.vue
 */

interface CellStatusProps {
  value: number;
  showLabel?: boolean;
}

const proficiencyEnum = [
  { id: 0, label: "Não fizeram", variant: "legend-not-completed" },
  { id: 1, label: "Abaixo do Básico", variant: "legend-below-basic" },
  { id: 2, label: "Básico", variant: "legend-basic" },
  { id: 3, label: "Proficiente", variant: "legend-proficient" },
  { id: 4, label: "Avançado", variant: "legend-advanced" },
];

const CellStatus = ({ value, showLabel = true }: CellStatusProps) => {
  const item = proficiencyEnum.find((p) => p.id === value) || proficiencyEnum[0];
  
  return (
    <div className={`bg-${item.variant} text-white px-3 py-2 text-center font-medium`}>
      {showLabel ? item.label : value}
    </div>
  );
};

const meta: Meta<typeof CellStatus> = {
  title: "Frontoffice/Badges/CellStatus",
  component: CellStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Célula de status para tabelas com cores de proficiência Legend.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 4, step: 1 },
      description: "ID do nível de proficiência (0-4)",
    },
    showLabel: {
      control: "boolean",
      description: "Mostrar label ou apenas o valor numérico",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CellStatus>;

export const Default: Story = {
  args: {
    value: 3,
    showLabel: true,
  },
};

export const Advanced: Story = {
  args: {
    value: 4,
    showLabel: true,
  },
};

export const Basic: Story = {
  args: {
    value: 2,
    showLabel: true,
  },
};

export const BelowBasic: Story = {
  args: {
    value: 1,
    showLabel: true,
  },
};

export const NotCompleted: Story = {
  args: {
    value: 0,
    showLabel: true,
  },
};

/**
 * Exemplo de uso em uma tabela
 */
export const InTableContext: Story = {
  render: () => (
    <table className="border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Aluno</th>
          <th className="border border-gray-300 px-4 py-2">Matemática</th>
          <th className="border border-gray-300 px-4 py-2">Português</th>
          <th className="border border-gray-300 px-4 py-2">Ciências</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">João Silva</td>
          <td className="border border-gray-300 p-0"><CellStatus value={4} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={3} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={2} /></td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Maria Santos</td>
          <td className="border border-gray-300 p-0"><CellStatus value={3} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={4} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={3} /></td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Pedro Costa</td>
          <td className="border border-gray-300 p-0"><CellStatus value={1} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={2} /></td>
          <td className="border border-gray-300 p-0"><CellStatus value={0} /></td>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstração do CellStatus usado em contexto de tabela de desempenho.",
      },
    },
  },
};
