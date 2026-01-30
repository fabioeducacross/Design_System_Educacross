import type { Meta, StoryObj } from "@storybook/react";

/**
 * # MissionCard
 * 
 * **Origem**: `educacross-frontoffice/src/components/missions/MissionCard.vue`
 * 
 * Card de missão gamificada exibido para alunos.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `mission` | `Object` | - | Dados da missão |
 * | `locked` | `boolean` | false | Missão bloqueada |
 * | `completed` | `boolean` | false | Missão concluída |
 * | `progress` | `number` | 0 | Progresso (0-100) |
 * | `showProgress` | `boolean` | true | Mostrar barra de progresso |
 * 
 * ## Estados da Missão
 * 
 * - **locked**: Cinza, ícone de cadeado
 * - **available**: Colorido, clicável
 * - **in-progress**: Borda destacada, barra de progresso
 * - **completed**: Badge de check, desabilitado
 * 
 * @see Frontoffice: src/components/missions/MissionCard.vue
 */

const meta: Meta = {
  title: "Frontoffice/Missions/MissionCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: MissionCard

Card de missão gamificada para alunos.

### Arquivo Original
\`educacross-frontoffice/src/components/missions/MissionCard.vue\`

### Uso no Vue
\`\`\`vue
<MissionCard
  :mission="mission"
  :progress="45"
  @click="openMission(mission)"
/>

<script setup>
const mission = {
  id: 1,
  title: 'Explorando Números',
  description: 'Complete 5 jogos de matemática',
  icon: 'target',
  reward: 100,
  games: 5
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
      <h2 className="text-xl font-bold mb-4">MissionCard - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estados</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="border rounded-lg p-3 opacity-50 bg-muted">
          <div className="text-2xl mb-2">🔒</div>
          <h4 className="font-medium text-sm">Missão Bloqueada</h4>
          <p className="text-xs text-muted-foreground">Complete a missão anterior</p>
        </div>
        <div className="border rounded-lg p-3 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-medium text-sm">Explorando Números</h4>
          <p className="text-xs text-muted-foreground">Complete 5 jogos</p>
          <div className="mt-2 text-xs text-primary">+100 ⭐</div>
        </div>
        <div className="border-2 border-primary rounded-lg p-3 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-medium text-sm">Em Andamento</h4>
          <div className="w-full bg-muted h-2 rounded mt-2">
            <div className="w-[45%] h-full bg-primary rounded"></div>
          </div>
          <span className="text-xs">45%</span>
        </div>
        <div className="border rounded-lg p-3 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <div className="text-2xl mb-2">✅</div>
          <h4 className="font-medium text-sm">Missão Completa!</h4>
          <p className="text-xs text-green-600">+100 ⭐ conquistados</p>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estrutura de Dados</h3>
      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  id: 1,
  title: 'Explorando Números',
  description: 'Complete 5 jogos de matemática',
  icon: 'target',
  reward: 100,      // pontos
  games: 5,         // total de jogos
  completed: 3      // jogos completos
}`}
      </pre>
    </div>
  ),
};
