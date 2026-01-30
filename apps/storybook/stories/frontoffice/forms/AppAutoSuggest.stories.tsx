import type { Meta, StoryObj } from "@storybook/react";

/**
 * # AppAutoSuggest
 * 
 * **Origem**: `educacross-frontoffice/src/components/autoSuggest/AppAutoSuggest.vue`
 * 
 * Campo de texto com auto-sugestão/autocomplete.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `modelValue` | `string` | '' | Valor do input |
 * | `suggestions` | `Array` | [] | Lista de sugestões |
 * | `fetchSuggestions` | `Function` | null | Função de busca |
 * | `minChars` | `number` | 2 | Mínimo de caracteres |
 * | `debounce` | `number` | 300 | Debounce em ms |
 * | `placeholder` | `string` | '' | Placeholder |
 * | `loading` | `boolean` | false | Estado de loading |
 * 
 * ## Eventos
 * 
 * - `@update:modelValue` - Texto alterado
 * - `@select` - Item selecionado
 * - `@search` - Busca disparada
 * 
 * @see Frontoffice: src/components/autoSuggest/AppAutoSuggest.vue
 */

const meta: Meta = {
  title: "Frontoffice/Forms/AppAutoSuggest",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppAutoSuggest

Campo de autocomplete/auto-sugestão.

### Arquivo Original
\`educacross-frontoffice/src/components/autoSuggest/AppAutoSuggest.vue\`

### Uso no Vue
\`\`\`vue
<AppAutoSuggest
  v-model="searchText"
  :fetch-suggestions="fetchSchools"
  :min-chars="2"
  :debounce="300"
  placeholder="Digite o nome da escola..."
  @select="onSchoolSelected"
/>

<script setup>
const fetchSchools = async (query) => {
  const response = await api.get('/schools', { params: { q: query } })
  return response.data.map(s => ({ id: s.id, label: s.name }))
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
      <h2 className="text-xl font-bold mb-4">AppAutoSuggest - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo Visual</h3>
      <div className="max-w-sm relative">
        <input 
          type="text" 
          defaultValue="Esc"
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Digite o nome da escola..."
        />
        
        <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg bg-card shadow-lg z-10">
          <div className="p-2 hover:bg-muted cursor-pointer">
            <span className="font-medium">Esc</span>ola Municipal São Paulo
          </div>
          <div className="p-2 hover:bg-muted cursor-pointer">
            <span className="font-medium">Esc</span>ola Estadual Rio Branco
          </div>
          <div className="p-2 hover:bg-muted cursor-pointer">
            <span className="font-medium">Esc</span>ola Técnica Federal
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mt-8 mb-2">Estados</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Digitando...</p>
          <input 
            type="text" 
            defaultValue="Esc"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Carregando</p>
          <div className="relative">
            <input 
              type="text" 
              defaultValue="Escola"
              className="w-full border rounded px-3 py-2 text-sm pr-8"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin">⟳</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Sem resultados</p>
          <input 
            type="text" 
            defaultValue="xyzabc"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Props</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Default</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">minChars</td><td className="border border-border p-2">2</td><td className="border border-border p-2">Caracteres mínimos para buscar</td></tr>
          <tr><td className="border border-border p-2">debounce</td><td className="border border-border p-2">300</td><td className="border border-border p-2">Delay em ms</td></tr>
          <tr><td className="border border-border p-2">fetchSuggestions</td><td className="border border-border p-2">null</td><td className="border border-border p-2">Função async de busca</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
