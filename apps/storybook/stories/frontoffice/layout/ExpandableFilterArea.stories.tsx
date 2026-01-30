import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ExpandableFilterArea
 * 
 * **Origem**: `educacross-frontoffice/src/components/filter/ExpandableFilterArea.vue`
 * 
 * Área de filtros expansível/colapsável para telas de listagem.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `expanded` | `boolean` | false | Estado expandido inicial |
 * | `title` | `string` | 'Filtros' | Título da área |
 * | `showClear` | `boolean` | true | Mostrar botão limpar |
 * | `showApply` | `boolean` | true | Mostrar botão aplicar |
 * | `loading` | `boolean` | false | Estado de loading |
 * 
 * ## Slots
 * 
 * - `default` - Conteúdo dos filtros
 * - `header` - Customizar header
 * - `footer` - Customizar footer/ações
 * 
 * ## Eventos
 * 
 * - `@toggle` - Emitido ao expandir/colapsar
 * - `@apply` - Emitido ao aplicar filtros
 * - `@clear` - Emitido ao limpar filtros
 * 
 * @see Frontoffice: src/components/filter/ExpandableFilterArea.vue
 */

const meta: Meta = {
  title: "Frontoffice/Layout/ExpandableFilterArea",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ExpandableFilterArea

Área de filtros colapsável para telas de listagem.

### Arquivo Original
\`educacross-frontoffice/src/components/filter/ExpandableFilterArea.vue\`

### Uso no Vue
\`\`\`vue
<ExpandableFilterArea
  v-model:expanded="filtersExpanded"
  title="Filtros Avançados"
  @apply="applyFilters"
  @clear="clearFilters"
>
  <div class="row">
    <div class="col-md-4">
      <ESelect v-model="filters.school" :options="schools" label="Escola" />
    </div>
    <div class="col-md-4">
      <ESelect v-model="filters.class" :options="classes" label="Turma" />
    </div>
    <div class="col-md-4">
      <ESelect v-model="filters.status" :options="statuses" label="Status" />
    </div>
  </div>
</ExpandableFilterArea>
\`\`\`

### Padrão de Uso
Geralmente posicionado acima de uma ListTable para filtrar os dados.
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">ExpandableFilterArea - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura</h3>
      <div className="border rounded mb-4">
        <div className="flex justify-between items-center p-3 bg-muted border-b">
          <span className="font-medium">Filtros ▼</span>
          <span className="text-sm text-muted-foreground">Clique para expandir</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-2 text-sm text-center bg-background">Escola</div>
            <div className="border rounded p-2 text-sm text-center bg-background">Turma</div>
            <div className="border rounded p-2 text-sm text-center bg-background">Status</div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-3 py-1 border rounded text-sm">Limpar</button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">Aplicar</button>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Eventos</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Evento</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">@toggle</td><td className="border border-border p-2">Ao expandir/colapsar</td></tr>
          <tr><td className="border border-border p-2">@apply</td><td className="border border-border p-2">Ao clicar em Aplicar</td></tr>
          <tr><td className="border border-border p-2">@clear</td><td className="border border-border p-2">Ao clicar em Limpar</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
