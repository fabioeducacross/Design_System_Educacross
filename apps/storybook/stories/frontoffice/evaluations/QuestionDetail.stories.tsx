import type { Meta, StoryObj } from "@storybook/react";

/**
 * # QuestionDetail
 * 
 * **Origem**: `educacross-frontoffice/src/components/evaluations/questionDetail/QuestionDetail.vue`
 * 
 * Componente principal para exibição de questões de avaliação.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `question` | `Object` | - | Dados da questão |
 * | `showAnswer` | `boolean` | false | Mostrar resposta correta |
 * | `showFeedback` | `boolean` | false | Mostrar feedback |
 * | `readonly` | `boolean` | false | Modo somente leitura |
 * | `template` | `string` | null | Template específico (1-11) |
 * 
 * ## Templates Disponíveis
 * 
 * O Frontoffice possui 11 templates diferentes para tipos de questão:
 * - Template1: Múltipla escolha simples
 * - Template2: Múltipla escolha com imagem
 * - Template3: Verdadeiro/Falso
 * - Template4: Associação
 * - Template5: Ordenação
 * - Template6: Lacunas (fill in the blanks)
 * - Template7: Resposta curta
 * - Template8: Resposta dissertativa
 * - Template9: Hotspot (clique em área)
 * - Template10: Arraste e solte
 * - Template11: Questão composta
 * 
 * @see Frontoffice: src/components/evaluations/questionDetail/
 */

const meta: Meta = {
  title: "Frontoffice/Evaluations/QuestionDetail",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: QuestionDetail

Componente principal para renderização de questões de avaliação.

### Arquivo Original
\`educacross-frontoffice/src/components/evaluations/questionDetail/QuestionDetail.vue\`

### Uso no Vue
\`\`\`vue
<QuestionDetail
  :question="currentQuestion"
  :show-answer="showAnswers"
  :show-feedback="showFeedback"
  :readonly="isReviewMode"
  @answer-selected="onAnswerSelected"
/>
\`\`\`

### Estrutura da Questão
\`\`\`javascript
const question = {
  id: 1,
  type: 'multiple-choice',
  template: 1,
  statement: 'Qual é a capital do Brasil?',
  alternatives: [
    { id: 'a', text: 'São Paulo', correct: false },
    { id: 'b', text: 'Rio de Janeiro', correct: false },
    { id: 'c', text: 'Brasília', correct: true },
    { id: 'd', text: 'Salvador', correct: false }
  ],
  feedback: 'Brasília é a capital federal desde 1960.'
}
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
      <h2 className="text-xl font-bold mb-4">QuestionDetail - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Templates de Questão</h3>
      <table className="w-full border-collapse border border-border text-sm mb-4">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">#</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">1</td><td className="border border-border p-2">Múltipla Escolha</td><td className="border border-border p-2">4-5 alternativas, 1 correta</td></tr>
          <tr><td className="border border-border p-2">2</td><td className="border border-border p-2">ME com Imagem</td><td className="border border-border p-2">Alternativas com imagens</td></tr>
          <tr><td className="border border-border p-2">3</td><td className="border border-border p-2">V/F</td><td className="border border-border p-2">Verdadeiro ou Falso</td></tr>
          <tr><td className="border border-border p-2">4</td><td className="border border-border p-2">Associação</td><td className="border border-border p-2">Conectar colunas</td></tr>
          <tr><td className="border border-border p-2">5</td><td className="border border-border p-2">Ordenação</td><td className="border border-border p-2">Ordenar itens</td></tr>
          <tr><td className="border border-border p-2">6</td><td className="border border-border p-2">Lacunas</td><td className="border border-border p-2">Preencher espaços</td></tr>
          <tr><td className="border border-border p-2">7</td><td className="border border-border p-2">Resposta Curta</td><td className="border border-border p-2">Texto curto</td></tr>
          <tr><td className="border border-border p-2">8</td><td className="border border-border p-2">Dissertativa</td><td className="border border-border p-2">Texto longo</td></tr>
          <tr><td className="border border-border p-2">9</td><td className="border border-border p-2">Hotspot</td><td className="border border-border p-2">Clique em área</td></tr>
          <tr><td className="border border-border p-2">10</td><td className="border border-border p-2">Drag & Drop</td><td className="border border-border p-2">Arrastar elementos</td></tr>
          <tr><td className="border border-border p-2">11</td><td className="border border-border p-2">Composta</td><td className="border border-border p-2">Múltiplas partes</td></tr>
        </tbody>
      </table>
      
      <h3 className="font-semibold mb-2">Arquivos Relacionados</h3>
      <ul className="list-disc list-inside text-sm">
        <li><code>QuestionAlternative.vue</code> - Alternativa individual</li>
        <li><code>QuestionContent.vue</code> - Conteúdo/enunciado</li>
        <li><code>QuestionStatus.vue</code> - Status da questão</li>
        <li><code>templates/Template*.vue</code> - Templates específicos</li>
      </ul>
    </div>
  ),
};
