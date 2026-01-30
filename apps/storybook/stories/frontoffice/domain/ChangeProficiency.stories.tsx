import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ChangeProficiency
 * 
 * **Origem**: `educacross-frontoffice/src/components/proficiency/ChangeProficiency.vue`
 * 
 * Modal/form para alterar a proficiência de um aluno.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `student` | `Object` | - | Dados do aluno |
 * | `currentLevel` | `number` | 0 | Nível atual (0-4) |
 * | `subject` | `Object` | null | Disciplina |
 * | `showJustification` | `boolean` | true | Requer justificativa |
 * 
 * ## Níveis de Proficiência
 * 
 * - 0: Não concluído (cinza)
 * - 1: Abaixo do Básico (vermelho) - 0-24%
 * - 2: Básico (LARANJA) - 25-49%
 * - 3: Proficiente (verde) - 50-74%
 * - 4: Avançado (roxo) - 75-100%
 * 
 * @see Frontoffice: src/components/proficiency/ChangeProficiency.vue
 */

const meta: Meta = {
  title: "Frontoffice/Domain/ChangeProficiency",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ChangeProficiency

Modal para alterar proficiência manualmente.

### Arquivo Original
\`educacross-frontoffice/src/components/proficiency/ChangeProficiency.vue\`

### Uso no Vue
\`\`\`vue
<ChangeProficiency
  :student="selectedStudent"
  :current-level="student.proficiencyLevel"
  :subject="currentSubject"
  @save="saveProficiency"
  @cancel="closeModal"
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
      <h2 className="text-xl font-bold mb-4">ChangeProficiency - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Níveis de Proficiência</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="level" className="w-4 h-4" />
          <div className="w-4 h-4 rounded" style={{backgroundColor: '#b4b7bd'}}></div>
          <div>
            <span className="font-medium">Não Concluído</span>
            <span className="text-sm text-muted-foreground ml-2">Nenhuma avaliação</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="level" className="w-4 h-4" />
          <div className="w-4 h-4 rounded" style={{backgroundColor: '#ea5455'}}></div>
          <div>
            <span className="font-medium">Abaixo do Básico</span>
            <span className="text-sm text-muted-foreground ml-2">0-24%</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="level" className="w-4 h-4" />
          <div className="w-4 h-4 rounded" style={{backgroundColor: '#ff9f43'}}></div>
          <div>
            <span className="font-medium">Básico</span>
            <span className="text-sm text-muted-foreground ml-2">25-49% ⚠️ LARANJA</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="level" className="w-4 h-4" />
          <div className="w-4 h-4 rounded" style={{backgroundColor: '#28c76f'}}></div>
          <div>
            <span className="font-medium">Proficiente</span>
            <span className="text-sm text-muted-foreground ml-2">50-74%</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border rounded" style={{borderColor: '#6e63e8'}}>
          <input type="radio" name="level" className="w-4 h-4" defaultChecked />
          <div className="w-4 h-4 rounded" style={{backgroundColor: '#6e63e8'}}></div>
          <div>
            <span className="font-medium">Avançado</span>
            <span className="text-sm text-muted-foreground ml-2">75-100%</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Justificativa</h3>
      <textarea 
        className="w-full border rounded p-2 text-sm" 
        rows={3}
        placeholder="Justifique a alteração de proficiência..."
      ></textarea>
      
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-2 border rounded">Cancelar</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Salvar</button>
      </div>
    </div>
  ),
};
