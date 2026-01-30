import type { Meta, StoryObj } from "@storybook/react";

/**
 * # GameDetailsModal
 * 
 * **Origem**: `educacross-frontoffice/src/components/modals/GameDetailsModal.vue`
 * 
 * Modal com detalhes de um jogo educativo.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `visible` | `boolean` | false | Controla visibilidade |
 * | `game` | `Object` | null | Dados do jogo |
 * | `showPlayButton` | `boolean` | true | Mostrar botão jogar |
 * | `showStats` | `boolean` | true | Mostrar estatísticas |
 * 
 * ## Estrutura do Jogo
 * 
 * ```javascript
 * const game = {
 *   id: 1,
 *   title: 'Matemática Divertida',
 *   description: 'Aprenda operações básicas',
 *   thumbnail: '/games/math.jpg',
 *   subject: 'Matemática',
 *   skills: ['Adição', 'Subtração'],
 *   difficulty: 'Fácil',
 *   duration: '10 min'
 * }
 * ```
 * 
 * @see Frontoffice: src/components/modals/GameDetailsModal.vue
 */

const meta: Meta = {
  title: "Frontoffice/Modals/GameDetailsModal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: GameDetailsModal

Modal de detalhes de jogo educativo.

### Arquivo Original
\`educacross-frontoffice/src/components/modals/GameDetailsModal.vue\`

### Uso no Vue
\`\`\`vue
<GameDetailsModal
  v-model:visible="showGameDetails"
  :game="selectedGame"
  @play="startGame"
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
      <h2 className="text-xl font-bold mb-4">GameDetailsModal - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura do Modal</h3>
      <div className="border rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
        <div className="h-40 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <span className="text-6xl">🎮</span>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg">Matemática Divertida</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Matemática</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Aprenda operações básicas de forma divertida com jogos interativos e desafios progressivos.
          </p>
          
          <div className="flex gap-4 text-sm mb-3">
            <div>
              <span className="text-muted-foreground">Duração:</span>
              <span className="ml-1 font-medium">10 min</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dificuldade:</span>
              <span className="ml-1 font-medium text-green-600">Fácil</span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Habilidades:</span>
            <div className="flex gap-1 mt-1">
              <span className="px-2 py-0.5 bg-muted text-xs rounded">Adição</span>
              <span className="px-2 py-0.5 bg-muted text-xs rounded">Subtração</span>
              <span className="px-2 py-0.5 bg-muted text-xs rounded">Raciocínio</span>
            </div>
          </div>
          
          <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium">
            ▶ Jogar Agora
          </button>
        </div>
      </div>
    </div>
  ),
};
