import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ListTablePagination
 * 
 * **Origem**: `educacross-frontoffice/src/components/table/ListTablePagination.vue`
 * 
 * Extensão do ListTable com paginação integrada.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `items` | `Array` | [] | Dados da tabela |
 * | `fields` | `Array` | [] | Configuração das colunas |
 * | `perPage` | `number` | 10 | Itens por página |
 * | `currentPage` | `number` | 1 | Página atual |
 * | `totalRows` | `number` | 0 | Total de registros |
 * | `perPageOptions` | `Array` | [10,25,50,100] | Opções de itens por página |
 * 
 * ## Eventos
 * 
 * - `@page-change` - Emitido quando muda de página
 * - `@per-page-change` - Emitido quando muda itens por página
 * 
 * @see Frontoffice: src/components/table/ListTablePagination.vue
 */

const meta: Meta = {
  title: "Frontoffice/Tables/ListTablePagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ListTablePagination

Tabela com paginação integrada para grandes volumes de dados.

### Arquivo Original
\`educacross-frontoffice/src/components/table/ListTablePagination.vue\`

### Uso no Vue
\`\`\`vue
<ListTablePagination
  :items="paginatedStudents"
  :fields="tableFields"
  :per-page="perPage"
  :current-page="currentPage"
  :total-rows="totalStudents"
  @page-change="onPageChange"
  @per-page-change="onPerPageChange"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">ListTablePagination - Documentação</h2>
      <p className="text-muted-foreground mb-4">
        Componente Vue do Frontoffice com paginação server-side.
      </p>
      
      <h3 className="font-semibold mb-2">Props de Paginação</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">perPage</td><td className="border border-border p-2">number</td><td className="border border-border p-2">10</td></tr>
          <tr><td className="border border-border p-2">currentPage</td><td className="border border-border p-2">number</td><td className="border border-border p-2">1</td></tr>
          <tr><td className="border border-border p-2">totalRows</td><td className="border border-border p-2">number</td><td className="border border-border p-2">0</td></tr>
          <tr><td className="border border-border p-2">perPageOptions</td><td className="border border-border p-2">Array</td><td className="border border-border p-2">[10,25,50,100]</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
