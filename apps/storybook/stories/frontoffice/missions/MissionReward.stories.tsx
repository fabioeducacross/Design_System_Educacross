import type { Meta, StoryObj } from "@storybook/react";

/**
 * # MissionReward
 * 
 * **Origem**: `educacross-frontoffice/src/components/missions/MissionReward.vue`
 * 
 * Componente para exibir recompensas de missões.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `points` | `number` | 0 | Pontos da recompensa |
 * | `type` | `string` | 'star' | Tipo (star, coin, badge) |
 * | `earned` | `boolean` | false | Se já foi conquistado |
 * | `size` | `string` | 'md' | Tamanho (sm, md, lg) |
 * 
 * ## Tipos de Recompensa
 * 
 * - **star**: Estrelas (padrão)
 * - **coin**: Moedas do jogo
 * - **badge**: Emblemas/conquistas
 * - **trophy**: Troféus especiais
 * 
 * @see Frontoffice: src/components/missions/MissionReward.vue
 */

const meta: Meta = {
  title: "Frontoffice/Missions/MissionReward",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: MissionReward

Exibe recompensas de missões gamificadas.

### Arquivo Original
\`educacross-frontoffice/src/components/missions/MissionReward.vue\`

### Uso no Vue
\`\`\`vue
<MissionReward
  :points="100"
  type="star"
  earned
/>

<!-- Recompensa pendente -->
<MissionReward
  :points="50"
  type="coin"
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
      <h2 className="text-xl font-bold mb-4">MissionReward - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tipos de Recompensa</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col items-center p-4 border rounded-lg">
          <span className="text-3xl mb-2">⭐</span>
          <span className="font-bold">+100</span>
          <span className="text-xs text-muted-foreground">star</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-lg">
          <span className="text-3xl mb-2">🪙</span>
          <span className="font-bold">+50</span>
          <span className="text-xs text-muted-foreground">coin</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-lg">
          <span className="text-3xl mb-2">🏅</span>
          <span className="font-bold">+1</span>
          <span className="text-xs text-muted-foreground">badge</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-lg">
          <span className="text-3xl mb-2">🏆</span>
          <span className="font-bold">+1</span>
          <span className="text-xs text-muted-foreground">trophy</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estados</h3>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 p-2 border rounded opacity-50">
          <span className="text-xl">⭐</span>
          <span className="text-sm">+100 (pendente)</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded bg-yellow-500/10 border-yellow-500/50">
          <span className="text-xl">⭐</span>
          <span className="text-sm text-yellow-600 font-medium">+100 conquistado!</span>
        </div>
      </div>
    </div>
  ),
};
