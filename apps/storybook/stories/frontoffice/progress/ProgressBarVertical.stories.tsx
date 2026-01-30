import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ProgressBarVertical
 * 
 * **Origem**: `educacross-frontoffice/src/components/progessBar/ProgressBarVertical.vue`
 * 
 * Barra de progresso vertical para rankings e comparativos.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `number` | 0 | Valor atual (0-100) |
 * | `max` | `number` | 100 | Valor máximo |
 * | `variant` | `string` | 'primary' | Cor da barra |
 * | `showLabel` | `boolean` | true | Mostrar valor |
 * | `height` | `string` | '200px' | Altura da barra |
 * | `width` | `string` | '24px' | Largura da barra |
 * 
 * ## Uso Comum
 * 
 * - Comparativo de turmas lado a lado
 * - Rankings de desempenho
 * - Gráficos de barras verticais simples
 * 
 * @see Frontoffice: src/components/progessBar/ProgressBarVertical.vue
 */

const meta: Meta = {
  title: "Frontoffice/Progress/ProgressBarVertical",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ProgressBarVertical

Barra de progresso vertical.

### Arquivo Original
\`educacross-frontoffice/src/components/progessBar/ProgressBarVertical.vue\`

### Uso no Vue
\`\`\`vue
<ProgressBarVertical
  :value="75"
  variant="legend-proficient"
  height="150px"
  show-label
/>

<!-- Comparativo de turmas -->
<div class="d-flex gap-3">
  <ProgressBarVertical :value="85" label="5º A" variant="legend-advanced" />
  <ProgressBarVertical :value="72" label="5º B" variant="legend-proficient" />
  <ProgressBarVertical :value="58" label="5º C" variant="legend-proficient" />
</div>
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
      <h2 className="text-xl font-bold mb-4">ProgressBarVertical - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Comparativo de Turmas</h3>
      <div className="flex items-end gap-6 h-48 mb-4 p-4 bg-muted rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">85%</span>
          <div className="w-8 bg-background rounded-t overflow-hidden" style={{height: '140px'}}>
            <div className="w-full rounded-t" style={{height: '85%', backgroundColor: '#6e63e8', marginTop: '15%'}}></div>
          </div>
          <span className="text-xs">5º A</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">72%</span>
          <div className="w-8 bg-background rounded-t overflow-hidden" style={{height: '140px'}}>
            <div className="w-full rounded-t" style={{height: '72%', backgroundColor: '#28c76f', marginTop: '28%'}}></div>
          </div>
          <span className="text-xs">5º B</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">58%</span>
          <div className="w-8 bg-background rounded-t overflow-hidden" style={{height: '140px'}}>
            <div className="w-full rounded-t" style={{height: '58%', backgroundColor: '#28c76f', marginTop: '42%'}}></div>
          </div>
          <span className="text-xs">5º C</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">45%</span>
          <div className="w-8 bg-background rounded-t overflow-hidden" style={{height: '140px'}}>
            <div className="w-full rounded-t" style={{height: '45%', backgroundColor: '#ff9f43', marginTop: '55%'}}></div>
          </div>
          <span className="text-xs">5º D</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">22%</span>
          <div className="w-8 bg-background rounded-t overflow-hidden" style={{height: '140px'}}>
            <div className="w-full rounded-t" style={{height: '22%', backgroundColor: '#ea5455', marginTop: '78%'}}></div>
          </div>
          <span className="text-xs">5º E</span>
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
          <tr><td className="border border-border p-2">value</td><td className="border border-border p-2">number</td><td className="border border-border p-2">0</td></tr>
          <tr><td className="border border-border p-2">height</td><td className="border border-border p-2">string</td><td className="border border-border p-2">'200px'</td></tr>
          <tr><td className="border border-border p-2">width</td><td className="border border-border p-2">string</td><td className="border border-border p-2">'24px'</td></tr>
          <tr><td className="border border-border p-2">variant</td><td className="border border-border p-2">string</td><td className="border border-border p-2">'primary'</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
