import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ConditionalValueDisplay
 * 
 * **Origem**: `educacross-frontoffice/src/components/badge/ConditionalValueDisplay.vue`
 * 
 * Componente que exibe um valor condicionalmente, mostrando um placeholder 
 * quando a condição não é atendida.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `any` | - | Valor a ser exibido |
 * | `condition` | `boolean` | true | Condição para exibir o valor |
 * | `placeholder` | `string` | '-' | Texto quando condição é falsa |
 * 
 * ## Casos de Uso
 * 
 * - Exibir nota apenas quando o aluno completou a atividade
 * - Mostrar porcentagem apenas quando há dados disponíveis
 * - Esconder informações sensíveis condicionalmente
 * 
 * @see Frontoffice: src/components/badge/ConditionalValueDisplay.vue
 */

interface ConditionalValueDisplayProps {
  value: React.ReactNode;
  condition?: boolean;
  placeholder?: string;
}

const ConditionalValueDisplay = ({ 
  value, 
  condition = true, 
  placeholder = "-" 
}: ConditionalValueDisplayProps) => {
  return (
    <span className="text-foreground">
      {condition ? value : placeholder}
    </span>
  );
};

const meta: Meta<typeof ConditionalValueDisplay> = {
  title: "Frontoffice/Badges/ConditionalValueDisplay",
  component: ConditionalValueDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Exibe valor condicionalmente com placeholder quando condição é falsa.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Valor a ser exibido",
    },
    condition: {
      control: "boolean",
      description: "Condição para exibir o valor",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando condição é falsa",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConditionalValueDisplay>;

export const WithValue: Story = {
  args: {
    value: "85%",
    condition: true,
    placeholder: "-",
  },
};

export const WithoutValue: Story = {
  args: {
    value: "85%",
    condition: false,
    placeholder: "-",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: "100 pontos",
    condition: false,
    placeholder: "Não disponível",
  },
};

/**
 * Exemplo de uso em tabela de notas
 */
export const InGradesTable: Story = {
  render: () => {
    const students = [
      { name: "João", math: 85, completed: true },
      { name: "Maria", math: 92, completed: true },
      { name: "Pedro", math: 0, completed: false },
      { name: "Ana", math: 78, completed: true },
    ];
    
    return (
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Aluno</th>
            <th className="border border-gray-300 px-4 py-2">Nota</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.name}>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <ConditionalValueDisplay 
                  value={`${student.math}%`}
                  condition={student.completed}
                  placeholder="Não fez"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Uso em tabela de notas, mostrando placeholder para alunos que não completaram.",
      },
    },
  },
};

/**
 * Com formatação de número
 */
export const WithFormattedNumber: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div>
        Pontuação: <ConditionalValueDisplay value="1.250" condition={true} />
      </div>
      <div>
        Pontuação: <ConditionalValueDisplay value="1.250" condition={false} placeholder="--" />
      </div>
    </div>
  ),
};
