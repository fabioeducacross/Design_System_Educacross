import type { Meta, StoryObj } from "@storybook/react";

/**
 * # GameCard
 * 
 * **Origem**: `educacross-frontoffice/src/components/games/GameCard.vue`
 * 
 * Card de jogo educativo na listagem.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `game` | `Object` | - | Dados do jogo |
 * | `showSubject` | `boolean` | true | Mostrar disciplina |
 * | `showDifficulty` | `boolean` | true | Mostrar dificuldade |
 * | `showDuration` | `boolean` | true | Mostrar duração |
 * | `compact` | `boolean` | false | Versão compacta |
 * | `locked` | `boolean` | false | Jogo bloqueado |
 * 
 * ## Eventos
 * 
 * - `@click` - Ao clicar no card
 * - `@play` - Ao clicar em jogar
 * - `@details` - Ao clicar em detalhes
 * 
 * @see Frontoffice: src/components/games/GameCard.vue
 */

const meta: Meta = {
  title: "Frontoffice/Games/GameCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: GameCard

Card de jogo na listagem.

### Arquivo Original
\`educacross-frontoffice/src/components/games/GameCard.vue\`

### Uso no Vue
\`\`\`vue
<GameCard
  :game="game"
  @play="startGame(game)"
  @details="openDetails(game)"
/>

<script setup>
const game = {
  id: 1,
  title: 'Aventura Matemática',
  thumbnail: '/games/math.jpg',
  subject: { id: 1, name: 'Matemática', color: '#4285F4' },
  difficulty: 'Fácil',
  duration: '10 min'
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
      <h2 className="text-xl font-bold mb-4">GameCard - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Variações</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-5xl">🎮</span>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#4285F4'}}></div>
              <span className="text-xs text-muted-foreground">Matemática</span>
            </div>
            <h4 className="font-medium text-sm mb-2">Aventura Matemática</h4>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>⏱ 10 min</span>
              <span className="text-green-600">Fácil</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-5xl">📖</span>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#34A853'}}></div>
              <span className="text-xs text-muted-foreground">Português</span>
            </div>
            <h4 className="font-medium text-sm mb-2">Caça Palavras</h4>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>⏱ 15 min</span>
              <span className="text-yellow-600">Médio</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden opacity-50 relative">
          <div className="h-32 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
            <span className="text-5xl">🔒</span>
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm mb-2">Desafio Final</h4>
            <p className="text-xs text-muted-foreground">Complete os jogos anteriores</p>
          </div>
          <div className="absolute inset-0 bg-background/50"></div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estrutura de Dados</h3>
      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  id: 1,
  title: 'Aventura Matemática',
  thumbnail: '/games/math.jpg',
  subject: { id: 1, name: 'Matemática', color: '#4285F4' },
  difficulty: 'Fácil',  // Fácil, Médio, Difícil
  duration: '10 min',
  skills: ['Adição', 'Subtração'],
  completed: false,
  locked: false
}`}
      </pre>
    </div>
  ),
};
