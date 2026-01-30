import type { Meta, StoryObj } from "@storybook/react";

/**
 * # SelectInfinityScroll
 * 
 * **Origem**: `educacross-frontoffice/src/components/select/SelectInfinityScroll.vue`
 * 
 * Select com scroll infinito para grandes listas de dados.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `modelValue` | `any` | null | Valor selecionado |
 * | `options` | `Array` | [] | Opções iniciais |
 * | `fetchOptions` | `Function` | null | Função para buscar mais opções |
 * | `pageSize` | `number` | 20 | Itens por página |
 * | `placeholder` | `string` | 'Selecione' | Placeholder |
 * | `searchable` | `boolean` | true | Habilitar busca |
 * | `loading` | `boolean` | false | Estado de loading |
 * 
 * ## Eventos
 * 
 * - `@update:modelValue` - Valor alterado
 * - `@load-more` - Carregar mais opções
 * - `@search` - Busca realizada
 * 
 * @see Frontoffice: src/components/select/SelectInfinityScroll.vue
 */

const meta: Meta = {
  title: "Frontoffice/Forms/SelectInfinityScroll",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: SelectInfinityScroll

Select com carregamento infinito para grandes datasets.

### Arquivo Original
\`educacross-frontoffice/src/components/select/SelectInfinityScroll.vue\`

### Uso no Vue
\`\`\`vue
<SelectInfinityScroll
  v-model="selectedStudent"
  :fetch-options="fetchStudents"
  :page-size="20"
  placeholder="Buscar aluno..."
  searchable
/>

<script setup>
const fetchStudents = async (page, search) => {
  const response = await api.get('/students', {
    params: { page, search, limit: 20 }
  })
  return response.data
}
</script>
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
      <h2 className="text-xl font-bold mb-4">SelectInfinityScroll - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo Visual</h3>
      <div className="max-w-sm">
        <div className="border rounded-lg">
          <div className="p-3 border-b">
            <input 
              type="search" 
              placeholder="Buscar aluno..." 
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            <div className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">AB</div>
              <span>Ana Beatriz</span>
            </div>
            <div className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">CP</div>
              <span>Carlos Pereira</span>
            </div>
            <div className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">JS</div>
              <span>João Silva</span>
            </div>
            <div className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">ML</div>
              <span>Maria Lima</span>
            </div>
            <div className="p-2 text-center text-sm text-muted-foreground">
              <span className="animate-pulse">Carregando mais...</span>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Props Principais</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">fetchOptions</td><td className="border border-border p-2">Function</td><td className="border border-border p-2">Função async (page, search) =&gt; items[]</td></tr>
          <tr><td className="border border-border p-2">pageSize</td><td className="border border-border p-2">number</td><td className="border border-border p-2">Itens por requisição</td></tr>
          <tr><td className="border border-border p-2">searchable</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Habilitar campo de busca</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
