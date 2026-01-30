import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ListTableRanking
 * 
 * **Origem**: `educacross-frontoffice/src/components/list/ListTableRanking.vue`
 * 
 * Tabela de ranking com posições e destaque para líderes.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `items` | `Array` | [] | Itens do ranking |
 * | `columns` | `Array` | [] | Definição de colunas |
 * | `showMedals` | `boolean` | true | Mostrar medalhas 1º, 2º, 3º |
 * | `highlightTop` | `number` | 3 | Quantos destacar |
 * | `showChange` | `boolean` | false | Mostrar mudança de posição |
 * 
 * ## Estrutura do Item
 * 
 * ```javascript
 * {
 *   position: 1,
 *   previousPosition: 2, // para mostrar mudança
 *   name: 'João Silva',
 *   avatar: '/avatars/joao.jpg',
 *   score: 950,
 *   ...customFields
 * }
 * ```
 * 
 * @see Frontoffice: src/components/list/ListTableRanking.vue
 */

const meta: Meta = {
  title: "Frontoffice/Tables/ListTableRanking",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ListTableRanking

Tabela de ranking com medalhas e destaques.

### Arquivo Original
\`educacross-frontoffice/src/components/list/ListTableRanking.vue\`

### Uso no Vue
\`\`\`vue
<ListTableRanking
  :items="rankingData"
  :columns="columns"
  show-medals
  :highlight-top="3"
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
      <h2 className="text-xl font-bold mb-4">ListTableRanking - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo de Ranking</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left w-16">#</th>
              <th className="p-3 text-left">Aluno</th>
              <th className="p-3 text-right">Pontos</th>
              <th className="p-3 text-center">Variação</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-yellow-50">
              <td className="p-3 text-2xl">🥇</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm">JS</div>
                  <span className="font-medium">João Silva</span>
                </div>
              </td>
              <td className="p-3 text-right font-bold">950</td>
              <td className="p-3 text-center text-green-600">▲ 2</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-3 text-2xl">🥈</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm">MS</div>
                  <span className="font-medium">Maria Santos</span>
                </div>
              </td>
              <td className="p-3 text-right font-bold">920</td>
              <td className="p-3 text-center text-red-600">▼ 1</td>
            </tr>
            <tr className="border-b bg-orange-50">
              <td className="p-3 text-2xl">🥉</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm">PC</div>
                  <span className="font-medium">Pedro Costa</span>
                </div>
              </td>
              <td className="p-3 text-right font-bold">890</td>
              <td className="p-3 text-center text-muted-foreground">—</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium text-muted-foreground">4</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">AL</div>
                  <span>Ana Lima</span>
                </div>
              </td>
              <td className="p-3 text-right">850</td>
              <td className="p-3 text-center text-green-600">▲ 1</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium text-muted-foreground">5</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">CF</div>
                  <span>Carlos Ferreira</span>
                </div>
              </td>
              <td className="p-3 text-right">820</td>
              <td className="p-3 text-center text-red-600">▼ 2</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Props</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">showMedals</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Mostrar 🥇🥈🥉</td></tr>
          <tr><td className="border border-border p-2">highlightTop</td><td className="border border-border p-2">number</td><td className="border border-border p-2">Quantos destacar com fundo</td></tr>
          <tr><td className="border border-border p-2">showChange</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Mostrar ▲ ▼ de posição</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
