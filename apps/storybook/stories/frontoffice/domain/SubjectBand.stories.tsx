import type { Meta, StoryObj } from "@storybook/react";

/**
 * # SubjectBand
 * 
 * **Origem**: `educacross-frontoffice/src/components/subject/SubjectBand.vue`
 * 
 * Faixa colorida que representa uma disciplina/matéria.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `subject` | `Object` | - | Dados da disciplina |
 * | `color` | `string` | null | Cor override |
 * | `showIcon` | `boolean` | true | Mostrar ícone |
 * | `showName` | `boolean` | true | Mostrar nome |
 * | `size` | `string` | 'md' | Tamanho |
 * 
 * ## Cores por Disciplina
 * 
 * - Matemática: Azul (#4285F4)
 * - Português: Verde (#34A853)
 * - Ciências: Laranja (#FBBC05)
 * - História: Vermelho (#EA4335)
 * - Geografia: Roxo (#9C27B0)
 * 
 * @see Frontoffice: src/components/subject/SubjectBand.vue
 */

const meta: Meta = {
  title: "Frontoffice/Domain/SubjectBand",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: SubjectBand

Faixa colorida identificando disciplina.

### Arquivo Original
\`educacross-frontoffice/src/components/subject/SubjectBand.vue\`

### Uso no Vue
\`\`\`vue
<SubjectBand
  :subject="{ id: 1, name: 'Matemática', icon: 'calculator' }"
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
      <h2 className="text-xl font-bold mb-4">SubjectBand - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Disciplinas</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-2 rounded" style={{backgroundColor: 'rgba(66, 133, 244, 0.1)', borderLeft: '4px solid #4285F4'}}>
          <span>🔢</span>
          <span className="font-medium" style={{color: '#4285F4'}}>Matemática</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded" style={{backgroundColor: 'rgba(52, 168, 83, 0.1)', borderLeft: '4px solid #34A853'}}>
          <span>📚</span>
          <span className="font-medium" style={{color: '#34A853'}}>Português</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded" style={{backgroundColor: 'rgba(251, 188, 5, 0.1)', borderLeft: '4px solid #FBBC05'}}>
          <span>🔬</span>
          <span className="font-medium" style={{color: '#FBBC05'}}>Ciências</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded" style={{backgroundColor: 'rgba(234, 67, 53, 0.1)', borderLeft: '4px solid #EA4335'}}>
          <span>📜</span>
          <span className="font-medium" style={{color: '#EA4335'}}>História</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded" style={{backgroundColor: 'rgba(156, 39, 176, 0.1)', borderLeft: '4px solid #9C27B0'}}>
          <span>🌍</span>
          <span className="font-medium" style={{color: '#9C27B0'}}>Geografia</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estrutura de Dados</h3>
      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  id: 1,
  name: 'Matemática',
  icon: 'calculator',
  color: '#4285F4'
}`}
      </pre>
    </div>
  ),
};
