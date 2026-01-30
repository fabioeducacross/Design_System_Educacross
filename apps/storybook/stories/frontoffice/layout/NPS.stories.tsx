import type { Meta, StoryObj } from "@storybook/react";

/**
 * # NPS (Net Promoter Score)
 * 
 * **Origem**: `educacross-frontoffice/src/components/nps/NPS.vue`
 * 
 * Componente de pesquisa NPS para coletar feedback.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `visible` | `boolean` | false | Controla visibilidade |
 * | `question` | `string` | '...' | Pergunta NPS |
 * | `showComment` | `boolean` | true | Mostrar campo de comentário |
 * | `autoClose` | `boolean` | true | Fechar após envio |
 * 
 * ## Escalas NPS
 * 
 * - 0-6: Detratores (vermelho)
 * - 7-8: Passivos (amarelo)
 * - 9-10: Promotores (verde)
 * 
 * @see Frontoffice: src/components/nps/NPS.vue
 */

const meta: Meta = {
  title: "Frontoffice/Layout/NPS",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: NPS

Pesquisa Net Promoter Score.

### Arquivo Original
\`educacross-frontoffice/src/components/nps/NPS.vue\`

### Uso no Vue
\`\`\`vue
<NPS
  v-model:visible="showNPS"
  question="De 0 a 10, quanto você recomendaria a Educacross?"
  show-comment
  @submit="submitNPS"
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
      <h2 className="text-xl font-bold mb-4">NPS - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Widget NPS</h3>
      <div className="border rounded-lg shadow-lg max-w-md mx-auto p-6">
        <button className="absolute top-2 right-2 text-muted-foreground">✕</button>
        
        <h4 className="font-medium text-center mb-4">
          De 0 a 10, quanto você recomendaria a Educacross para um colega?
        </h4>
        
        <div className="flex justify-between mb-4">
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <button 
              key={n}
              className={`w-8 h-8 rounded-full border text-sm font-medium transition-colors ${
                n <= 6 ? 'hover:bg-red-100 hover:border-red-300' :
                n <= 8 ? 'hover:bg-yellow-100 hover:border-yellow-300' :
                'hover:bg-green-100 hover:border-green-300'
              } ${n === 9 ? 'bg-green-500 text-white border-green-500' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          <span>Nada provável</span>
          <span>Muito provável</span>
        </div>
        
        <textarea 
          placeholder="O que motivou sua nota? (opcional)"
          className="w-full border rounded p-2 text-sm mb-4"
          rows={2}
        ></textarea>
        
        <button className="w-full py-2 bg-primary text-primary-foreground rounded font-medium">
          Enviar Avaliação
        </button>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Classificação NPS</h3>
      <div className="flex gap-2">
        <div className="flex-1 p-2 rounded text-center text-sm" style={{backgroundColor: 'rgba(234, 84, 85, 0.1)'}}>
          <span className="block font-bold" style={{color: '#ea5455'}}>0-6</span>
          <span className="text-xs">Detratores</span>
        </div>
        <div className="flex-1 p-2 rounded text-center text-sm" style={{backgroundColor: 'rgba(255, 159, 67, 0.1)'}}>
          <span className="block font-bold" style={{color: '#ff9f43'}}>7-8</span>
          <span className="text-xs">Passivos</span>
        </div>
        <div className="flex-1 p-2 rounded text-center text-sm" style={{backgroundColor: 'rgba(40, 199, 111, 0.1)'}}>
          <span className="block font-bold" style={{color: '#28c76f'}}>9-10</span>
          <span className="text-xs">Promotores</span>
        </div>
      </div>
    </div>
  ),
};
