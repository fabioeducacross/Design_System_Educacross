import type { Meta, StoryObj } from "@storybook/react";

/**
 * **ListTableLocalSorting** - Tabela com ordenação local
 * 
 * Tabela que ordena dados localmente sem requisição ao servidor.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/table/ListTableLocalSorting.vue`
 * 
 * @example
 * ```vue
 * <ListTableLocalSorting 
 *   :items="students"
 *   :fields="['nome', 'turma', 'desempenho']"
 *   sortBy="desempenho"
 * />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Tables/ListTableLocalSorting",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabela com ordenação client-side. Ideal para conjuntos pequenos de dados.",
      },
    },
  },
  argTypes: {
    items: {
      description: "Array de objetos a serem exibidos",
    },
    fields: {
      description: "Colunas da tabela",
    },
    sortBy: {
      control: "text",
      description: "Campo para ordenação inicial",
    },
    sortDesc: {
      control: "boolean",
      description: "Ordenar em ordem decrescente",
    },
  },
};

export default meta;
type Story = StoryObj;

interface Field {
  key: string;
  label: string;
  sortable?: boolean;
}

interface Student {
  id: number;
  nome: string;
  turma: string;
  desempenho: number;
  status: string;
}

// Mock do componente Vue
const ListTableLocalSortingMock = ({ 
  items,
  fields,
  sortBy = "",
  sortDesc = false
}: { 
  items: Student[];
  fields: Field[];
  sortBy?: string;
  sortDesc?: boolean;
}) => {
  // Simular ordenação
  const sortedItems = [...items].sort((a, b) => {
    if (!sortBy) return 0;
    const aVal = a[sortBy as keyof Student];
    const bVal = b[sortBy as keyof Student];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDesc ? bVal - aVal : aVal - bVal;
    }
    return sortDesc 
      ? String(bVal).localeCompare(String(aVal))
      : String(aVal).localeCompare(String(bVal));
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            {fields.map((field) => (
              <th 
                key={field.key}
                className={`
                  px-4 py-3 text-left text-sm font-medium text-muted-foreground
                  ${field.sortable ? "cursor-pointer hover:bg-accent/50" : ""}
                `}
              >
                <div className="flex items-center gap-2">
                  {field.label}
                  {field.sortable && (
                    <span className="material-symbols-outlined text-sm">
                      {sortBy === field.key 
                        ? (sortDesc ? "arrow_downward" : "arrow_upward")
                        : "unfold_more"
                      }
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedItems.map((item) => (
            <tr key={item.id} className="hover:bg-accent/30">
              {fields.map((field) => (
                <td key={field.key} className="px-4 py-3 text-sm">
                  {field.key === "desempenho" ? (
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${item.desempenho >= 70 ? "bg-success/10 text-success" : ""}
                      ${item.desempenho >= 50 && item.desempenho < 70 ? "bg-legend-proficient/10 text-legend-proficient" : ""}
                      ${item.desempenho >= 25 && item.desempenho < 50 ? "bg-legend-basic/10 text-legend-basic" : ""}
                      ${item.desempenho < 25 ? "bg-destructive/10 text-destructive" : ""}
                    `}>
                      {item.desempenho}%
                    </span>
                  ) : field.key === "status" ? (
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${item.status === "Ativo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
                    `}>
                      {item.status}
                    </span>
                  ) : (
                    item[field.key as keyof Student]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const fields: Field[] = [
  { key: "nome", label: "Nome", sortable: true },
  { key: "turma", label: "Turma", sortable: true },
  { key: "desempenho", label: "Desempenho", sortable: true },
  { key: "status", label: "Status", sortable: false },
];

const students: Student[] = [
  { id: 1, nome: "Ana Silva", turma: "5º Ano A", desempenho: 85, status: "Ativo" },
  { id: 2, nome: "Bruno Santos", turma: "5º Ano A", desempenho: 72, status: "Ativo" },
  { id: 3, nome: "Carla Oliveira", turma: "5º Ano B", desempenho: 45, status: "Ativo" },
  { id: 4, nome: "Daniel Costa", turma: "5º Ano A", desempenho: 58, status: "Ativo" },
  { id: 5, nome: "Elena Ferreira", turma: "5º Ano B", desempenho: 92, status: "Ativo" },
  { id: 6, nome: "Felipe Lima", turma: "5º Ano A", desempenho: 33, status: "Inativo" },
  { id: 7, nome: "Gabriela Souza", turma: "5º Ano B", desempenho: 67, status: "Ativo" },
  { id: 8, nome: "Henrique Alves", turma: "5º Ano A", desempenho: 78, status: "Ativo" },
];

export const Default: Story = {
  render: () => <ListTableLocalSortingMock items={students} fields={fields} />,
};

export const SortedByName: Story = {
  render: () => <ListTableLocalSortingMock items={students} fields={fields} sortBy="nome" />,
};

export const SortedByPerformanceDesc: Story = {
  name: "Ordenado por Desempenho (Decrescente)",
  render: () => (
    <ListTableLocalSortingMock 
      items={students} 
      fields={fields} 
      sortBy="desempenho" 
      sortDesc 
    />
  ),
};

export const SortedByClass: Story = {
  name: "Ordenado por Turma",
  render: () => (
    <ListTableLocalSortingMock 
      items={students} 
      fields={fields} 
      sortBy="turma" 
    />
  ),
};

export const WithInstructions: Story = {
  name: "Com Instruções",
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="material-symbols-outlined text-lg">info</span>
        Clique no cabeçalho de uma coluna para ordenar
      </div>
      <ListTableLocalSortingMock items={students} fields={fields} />
    </div>
  ),
};
