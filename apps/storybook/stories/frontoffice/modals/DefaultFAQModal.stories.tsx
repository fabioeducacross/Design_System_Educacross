import type { Meta, StoryObj } from "@storybook/react";

/**
 * # DefaultFAQModal
 * 
 * **Origem**: `educacross-frontoffice/src/components/modals/DefaultFAQModal.vue`
 * 
 * Modal de FAQ/ajuda padrão do sistema.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `visible` | `boolean` | false | Controla visibilidade |
 * | `title` | `string` | 'Ajuda' | Título do modal |
 * | `faqs` | `Array` | [] | Lista de FAQs |
 * | `searchable` | `boolean` | true | Habilitar busca |
 * 
 * ## Estrutura FAQ
 * 
 * ```javascript
 * const faqs = [
 *   {
 *     question: 'Como alterar minha senha?',
 *     answer: 'Acesse Configurações > Conta > Alterar Senha',
 *     category: 'Conta'
 *   }
 * ]
 * ```
 * 
 * @see Frontoffice: src/components/modals/DefaultFAQModal.vue
 */

const meta: Meta = {
  title: "Frontoffice/Modals/DefaultFAQModal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: DefaultFAQModal

Modal de FAQ/ajuda do Frontoffice.

### Arquivo Original
\`educacross-frontoffice/src/components/modals/DefaultFAQModal.vue\`

### Uso no Vue
\`\`\`vue
<DefaultFAQModal
  v-model:visible="showFAQ"
  title="Central de Ajuda"
  :faqs="faqList"
  searchable
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
      <h2 className="text-xl font-bold mb-4">DefaultFAQModal - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura do Modal</h3>
      <div className="border rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold">❓ Central de Ajuda</h3>
          <button className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        
        <div className="p-4">
          <input 
            type="search" 
            placeholder="Buscar pergunta..." 
            className="w-full border rounded px-3 py-2 mb-4 text-sm"
          />
          
          <div className="space-y-2">
            <details className="border rounded">
              <summary className="p-3 cursor-pointer hover:bg-muted font-medium">
                Como alterar minha senha?
              </summary>
              <div className="p-3 pt-0 text-sm text-muted-foreground">
                Acesse Configurações → Conta → Alterar Senha. Digite sua senha atual e a nova senha.
              </div>
            </details>
            <details className="border rounded">
              <summary className="p-3 cursor-pointer hover:bg-muted font-medium">
                Como ver o progresso do aluno?
              </summary>
              <div className="p-3 pt-0 text-sm text-muted-foreground">
                No menu lateral, acesse Relatórios → Desempenho. Selecione a turma e o aluno.
              </div>
            </details>
            <details className="border rounded">
              <summary className="p-3 cursor-pointer hover:bg-muted font-medium">
                O que significam as cores de proficiência?
              </summary>
              <div className="p-3 pt-0 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                  <li><span style={{color: '#6e63e8'}}>Roxo</span>: Avançado (75-100%)</li>
                  <li><span style={{color: '#28c76f'}}>Verde</span>: Proficiente (50-74%)</li>
                  <li><span style={{color: '#ff9f43'}}>Laranja</span>: Básico (25-49%)</li>
                  <li><span style={{color: '#ea5455'}}>Vermelho</span>: Abaixo do Básico (0-24%)</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  ),
};
