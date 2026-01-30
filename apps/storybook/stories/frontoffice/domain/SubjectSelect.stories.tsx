import type { Meta, StoryObj } from "@storybook/react";

/**
 * # SubjectSelect
 * 
 * **Origem**: `educacross-frontoffice/src/components/subject/SubjectSelect.vue`
 * 
 * Select dropdown para seleção de disciplinas.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `modelValue` | `Object/Array` | null | Valor selecionado |
 * | `subjects` | `Array` | [] | Lista de disciplinas |
 * | `multiple` | `boolean` | false | Seleção múltipla |
 * | `showColors` | `boolean` | true | Mostrar cores |
 * | `placeholder` | `string` | 'Selecione' | Placeholder |
 * | `disabled` | `boolean` | false | Desabilitado |
 * 
 * ## Eventos
 * 
 * - `@update:modelValue` - Valor alterado
 * - `@change` - Seleção alterada
 * 
 * @see Frontoffice: src/components/subject/SubjectSelect.vue
 */

const meta: Meta = {
  title: "Frontoffice/Domain/SubjectSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: SubjectSelect

Select para escolha de disciplinas.

### Arquivo Original
\`educacross-frontoffice/src/components/subject/SubjectSelect.vue\`

### Uso no Vue
\`\`\`vue
<SubjectSelect
  v-model="selectedSubject"
  :subjects="availableSubjects"
  placeholder="Escolha a disciplina"
/>

<!-- Múltipla seleção -->
<SubjectSelect
  v-model="selectedSubjects"
  :subjects="availableSubjects"
  multiple
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
      <h2 className="text-xl font-bold mb-4">SubjectSelect - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo Visual</h3>
      <div className="mb-4">
        <div className="border rounded-lg p-3 flex items-center justify-between bg-background">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#4285F4'}}></div>
            <span>Matemática</span>
          </div>
          <span className="text-muted-foreground">▼</span>
        </div>
        
        <div className="border border-t-0 rounded-b-lg divide-y bg-background mt-0">
          <div className="p-2 flex items-center gap-2 hover:bg-muted cursor-pointer">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#4285F4'}}></div>
            <span>Matemática</span>
          </div>
          <div className="p-2 flex items-center gap-2 hover:bg-muted cursor-pointer">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#34A853'}}></div>
            <span>Português</span>
          </div>
          <div className="p-2 flex items-center gap-2 hover:bg-muted cursor-pointer">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#FBBC05'}}></div>
            <span>Ciências</span>
          </div>
          <div className="p-2 flex items-center gap-2 hover:bg-muted cursor-pointer">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#EA4335'}}></div>
            <span>História</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Props</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">modelValue</td><td className="border border-border p-2">Object/Array</td><td className="border border-border p-2">null</td></tr>
          <tr><td className="border border-border p-2">subjects</td><td className="border border-border p-2">Array</td><td className="border border-border p-2">[]</td></tr>
          <tr><td className="border border-border p-2">multiple</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">false</td></tr>
          <tr><td className="border border-border p-2">showColors</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">true</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
