import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ListTable
 * 
 * **Origem**: `educacross-frontoffice/src/components/table/ListTable.vue`
 * 
 * Tabela base para listagem de dados com suporte a slots customizáveis.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `items` | `Array` | [] | Dados da tabela |
 * | `fields` | `Array` | [] | Configuração das colunas |
 * | `busy` | `boolean` | false | Estado de carregamento |
 * | `showEmpty` | `boolean` | true | Mostrar mensagem quando vazio |
 * | `emptyText` | `string` | 'Nenhum registro' | Texto quando vazio |
 * | `responsive` | `boolean` | true | Tabela responsiva |
 * | `striped` | `boolean` | false | Linhas alternadas |
 * | `hover` | `boolean` | true | Destaque ao passar mouse |
 * | `small` | `boolean` | false | Tamanho compacto |
 * 
 * ## Slots
 * 
 * - `cell(fieldKey)` - Customiza célula específica
 * - `head(fieldKey)` - Customiza header específico
 * - `empty` - Conteúdo quando tabela vazia
 * - `table-busy` - Loading state
 * 
 * @see Frontoffice: src/components/table/ListTable.vue
 */

const meta: Meta = {
  title: "Frontoffice/Tables/ListTable",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ListTable

Tabela base do Frontoffice para listagem de dados.

### Arquivo Original
\`educacross-frontoffice/src/components/table/ListTable.vue\`

### Uso no Vue
\`\`\`vue
<ListTable
  :items="students"
  :fields="tableFields"
  :busy="loading"
  hover
  striped
>
  <template #cell(status)="{ item }">
    <BadgeStatus :value="item.proficiency" />
  </template>
</ListTable>
\`\`\`

### Configuração de Fields
\`\`\`javascript
const tableFields = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status', tdClass: 'text-center' },
  { key: 'actions', label: 'Ações', thClass: 'text-right' }
]
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
      <h2 className="text-xl font-bold mb-4">ListTable - Documentação</h2>
      <p className="text-muted-foreground mb-4">
        Este é um componente Vue do Frontoffice. Veja a documentação acima para detalhes de implementação.
      </p>
      
      <h3 className="font-semibold mb-2">Props Principais</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">items</td><td className="border border-border p-2">Array</td><td className="border border-border p-2">Dados da tabela</td></tr>
          <tr><td className="border border-border p-2">fields</td><td className="border border-border p-2">Array</td><td className="border border-border p-2">Configuração das colunas</td></tr>
          <tr><td className="border border-border p-2">busy</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Estado de loading</td></tr>
          <tr><td className="border border-border p-2">striped</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Linhas alternadas</td></tr>
          <tr><td className="border border-border p-2">hover</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Highlight on hover</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
