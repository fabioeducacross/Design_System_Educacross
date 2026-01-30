import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ESelect
 * 
 * **Origem**: `educacross-frontoffice/src/components/selects/ESelect.vue`
 * 
 * Select customizado do Educacross com suporte a busca e múltipla seleção.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `options` | `Array` | [] | Opções do select |
 * | `modelValue` | `any` | null | Valor selecionado (v-model) |
 * | `label` | `string` | '' | Label do campo |
 * | `placeholder` | `string` | 'Selecione...' | Placeholder |
 * | `multiple` | `boolean` | false | Seleção múltipla |
 * | `searchable` | `boolean` | true | Habilita busca |
 * | `clearable` | `boolean` | true | Botão limpar |
 * | `disabled` | `boolean` | false | Estado desabilitado |
 * | `loading` | `boolean` | false | Estado de loading |
 * | `reduceLabel` | `string` | 'label' | Campo para label |
 * | `reduceValue` | `string` | 'value' | Campo para value |
 * 
 * @see Frontoffice: src/components/selects/ESelect.vue
 */

const meta: Meta = {
  title: "Frontoffice/Forms/ESelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ESelect

Select principal do Frontoffice, baseado no vue-select.

### Arquivo Original
\`educacross-frontoffice/src/components/selects/ESelect.vue\`

### Uso no Vue
\`\`\`vue
<ESelect
  v-model="selectedSchool"
  :options="schools"
  label="Escola"
  placeholder="Selecione uma escola"
  searchable
  clearable
/>

<!-- Seleção múltipla -->
<ESelect
  v-model="selectedClasses"
  :options="classes"
  label="Turmas"
  multiple
  :close-on-select="false"
/>
\`\`\`

### Opções
\`\`\`javascript
const options = [
  { label: 'Opção 1', value: 1 },
  { label: 'Opção 2', value: 2, disabled: true },
  { label: 'Opção 3', value: 3 }
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
      <h2 className="text-xl font-bold mb-4">ESelect - Documentação</h2>
      <p className="text-muted-foreground mb-4">
        Select customizado do Frontoffice com busca e seleção múltipla.
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
          <tr><td className="border border-border p-2">options</td><td className="border border-border p-2">Array</td><td className="border border-border p-2">Lista de opções</td></tr>
          <tr><td className="border border-border p-2">multiple</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Seleção múltipla</td></tr>
          <tr><td className="border border-border p-2">searchable</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Habilita busca</td></tr>
          <tr><td className="border border-border p-2">clearable</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Botão limpar</td></tr>
          <tr><td className="border border-border p-2">loading</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Estado loading</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
