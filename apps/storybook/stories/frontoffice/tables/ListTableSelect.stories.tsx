import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ListTableSelect
 * 
 * **Origem**: `educacross-frontoffice/src/components/table/ListTableSelect.vue`
 * 
 * Tabela com seleção de linhas (checkbox).
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `items` | `Array` | [] | Dados da tabela |
 * | `fields` | `Array` | [] | Configuração das colunas |
 * | `selectable` | `boolean` | true | Habilita seleção |
 * | `selectMode` | `string` | 'multi' | 'single' ou 'multi' |
 * | `selectedItems` | `Array` | [] | Itens selecionados (v-model) |
 * 
 * ## Eventos
 * 
 * - `@row-selected` - Emitido quando linha é selecionada
 * - `@select-all` - Emitido quando seleciona todos
 * 
 * @see Frontoffice: src/components/table/ListTableSelect.vue
 */

const meta: Meta = {
  title: "Frontoffice/Tables/ListTableSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ListTableSelect

Tabela com checkboxes para seleção múltipla de linhas.

### Arquivo Original
\`educacross-frontoffice/src/components/table/ListTableSelect.vue\`

### Uso no Vue
\`\`\`vue
<ListTableSelect
  :items="students"
  :fields="tableFields"
  v-model:selected-items="selectedStudents"
  select-mode="multi"
  @row-selected="onStudentSelected"
>
  <template #cell(actions)="{ item }">
    <button @click="editStudent(item)">Editar</button>
  </template>
</ListTableSelect>
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
      <h2 className="text-xl font-bold mb-4">ListTableSelect - Documentação</h2>
      <p className="text-muted-foreground mb-4">
        Componente Vue do Frontoffice com seleção de linhas.
      </p>
      
      <h3 className="font-semibold mb-2">Modos de Seleção</h3>
      <ul className="list-disc list-inside mb-4 text-sm">
        <li><code>single</code> - Apenas uma linha por vez</li>
        <li><code>multi</code> - Múltiplas linhas com checkbox</li>
      </ul>
      
      <h3 className="font-semibold mb-2">Eventos</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Evento</th>
            <th className="border border-border p-2 text-left">Payload</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">row-selected</td><td className="border border-border p-2">Array de itens selecionados</td></tr>
          <tr><td className="border border-border p-2">select-all</td><td className="border border-border p-2">Boolean (todos selecionados)</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
