import type { Meta, StoryObj } from "@storybook/react";

/**
 * # MissionProgress
 * 
 * **Origem**: `educacross-frontoffice/src/components/missions/MissionProgress.vue`
 * 
 * Barra de progresso de missão com estilo gamificado.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `current` | `number` | 0 | Valor atual |
 * | `total` | `number` | 100 | Valor máximo |
 * | `showLabel` | `boolean` | true | Mostrar label "X/Y" |
 * | `showPercentage` | `boolean` | false | Mostrar % |
 * | `variant` | `string` | 'primary' | Cor da barra |
 * | `animated` | `boolean` | true | Animação de preenchimento |
 * 
 * ## Variantes de Estilo
 * 
 * - **primary**: Cor principal (azul/roxo)
 * - **success**: Verde (para missões completas)
 * - **warning**: Laranja (próximo do prazo)
 * 
 * @see Frontoffice: src/components/missions/MissionProgress.vue
 */

const meta: Meta = {
  title: "Frontoffice/Missions/MissionProgress",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: MissionProgress

Barra de progresso gamificada para missões.

### Arquivo Original
\`educacross-frontoffice/src/components/missions/MissionProgress.vue\`

### Uso no Vue
\`\`\`vue
<MissionProgress
  :current="3"
  :total="5"
  variant="primary"
  show-label
/>

<!-- Com porcentagem -->
<MissionProgress
  :current="75"
  :total="100"
  show-percentage
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
      <h2 className="text-xl font-bold mb-4">MissionProgress - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplos</h3>
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Jogos</span>
            <span>3/5</span>
          </div>
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-primary rounded-full transition-all"></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quase lá!</span>
            <span>4/5</span>
          </div>
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
            <div className="w-[80%] h-full rounded-full transition-all" style={{backgroundColor: '#ff9f43'}}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Completo! 🎉</span>
            <span>5/5</span>
          </div>
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
            <div className="w-full h-full rounded-full transition-all" style={{backgroundColor: '#28c76f'}}></div>
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
          <tr><td className="border border-border p-2">current</td><td className="border border-border p-2">number</td><td className="border border-border p-2">0</td></tr>
          <tr><td className="border border-border p-2">total</td><td className="border border-border p-2">number</td><td className="border border-border p-2">100</td></tr>
          <tr><td className="border border-border p-2">showLabel</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">true</td></tr>
          <tr><td className="border border-border p-2">animated</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">true</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
