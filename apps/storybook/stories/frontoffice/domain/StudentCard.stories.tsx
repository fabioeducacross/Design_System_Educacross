import type { Meta, StoryObj } from "@storybook/react";

/**
 * # StudentCard
 * 
 * **Origem**: `educacross-frontoffice/src/components/student/StudentCard.vue`
 * 
 * Card de exibição de informações do aluno.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `student` | `Object` | - | Dados do aluno |
 * | `showAvatar` | `boolean` | true | Mostrar avatar |
 * | `showClass` | `boolean` | true | Mostrar turma |
 * | `showProgress` | `boolean` | false | Mostrar progresso |
 * | `clickable` | `boolean` | false | Clicável |
 * 
 * ## Eventos
 * 
 * - `@click` - Ao clicar no card
 * - `@action` - Ação do menu
 * 
 * @see Frontoffice: src/components/student/StudentCard.vue
 */

const meta: Meta = {
  title: "Frontoffice/Domain/StudentCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: StudentCard

Card de informações do aluno.

### Arquivo Original
\`educacross-frontoffice/src/components/student/StudentCard.vue\`

### Uso no Vue
\`\`\`vue
<StudentCard
  :student="student"
  show-progress
  clickable
  @click="openStudentDetails"
/>

<script setup>
const student = {
  id: 1,
  name: 'João Silva',
  avatar: '/avatars/joao.jpg',
  class: '5º Ano A',
  progress: 72
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
      <h2 className="text-xl font-bold mb-4">StudentCard - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Variações</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border rounded-lg p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">JS</div>
          <div>
            <h4 className="font-medium">João Silva</h4>
            <p className="text-sm text-muted-foreground">5º Ano A</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">MS</div>
            <div>
              <h4 className="font-medium">Maria Santos</h4>
              <p className="text-sm text-muted-foreground">5º Ano A</p>
            </div>
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div className="w-[85%] h-full rounded-full" style={{backgroundColor: '#6e63e8'}}></div>
          </div>
          <span className="text-xs text-muted-foreground">85% concluído</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estrutura de Dados</h3>
      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  id: 1,
  name: 'João Silva',
  avatar: '/avatars/joao.jpg',
  class: '5º Ano A',
  school: 'Escola Municipal',
  progress: 72,
  proficiency: 3 // 0-4
}`}
      </pre>
    </div>
  ),
};
