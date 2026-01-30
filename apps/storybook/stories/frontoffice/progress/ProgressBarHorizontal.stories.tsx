import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ProgressBarHorizontal
 * 
 * **Origem**: `educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue`
 * 
 * Barra de progresso horizontal com suporte a cores Legend.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `number` | 0 | Valor atual (0-100) |
 * | `max` | `number` | 100 | Valor máximo |
 * | `variant` | `string` | 'primary' | Cor da barra |
 * | `showLabel` | `boolean` | true | Mostrar porcentagem |
 * | `height` | `string` | '10px' | Altura da barra |
 * | `striped` | `boolean` | false | Padrão listrado |
 * | `animated` | `boolean` | false | Animação de listras |
 * 
 * ## Variantes de Cor
 * 
 * Suporta todas as cores Legend:
 * - legend-advanced, legend-proficient, legend-basic, legend-below-basic
 * - Também: primary, success, warning, danger, info
 * 
 * @see Frontoffice: src/components/progessBar/ProgressBarHorizontal.vue
 */

const meta: Meta = {
  title: "Frontoffice/Progress/ProgressBarHorizontal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ProgressBarHorizontal

Barra de progresso horizontal do Frontoffice.

### Arquivo Original
\`educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue\`

### Uso no Vue
\`\`\`vue
<ProgressBarHorizontal
  :value="75"
  variant="legend-proficient"
  show-label
/>

<!-- Com animação -->
<ProgressBarHorizontal
  :value="50"
  variant="primary"
  striped
  animated
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
      <h2 className="text-xl font-bold mb-4">ProgressBarHorizontal - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Cores Legend</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-full h-4 bg-muted rounded overflow-hidden">
            <div className="h-full w-[90%] rounded" style={{backgroundColor: '#6e63e8'}}></div>
          </div>
          <span className="text-sm w-20">90%</span>
          <span className="text-xs text-muted-foreground">legend-advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full h-4 bg-muted rounded overflow-hidden">
            <div className="h-full w-[65%] rounded" style={{backgroundColor: '#28c76f'}}></div>
          </div>
          <span className="text-sm w-20">65%</span>
          <span className="text-xs text-muted-foreground">legend-proficient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full h-4 bg-muted rounded overflow-hidden">
            <div className="h-full w-[40%] rounded" style={{backgroundColor: '#ff9f43'}}></div>
          </div>
          <span className="text-sm w-20">40%</span>
          <span className="text-xs text-muted-foreground">legend-basic ⚠️</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full h-4 bg-muted rounded overflow-hidden">
            <div className="h-full w-[15%] rounded" style={{backgroundColor: '#ea5455'}}></div>
          </div>
          <span className="text-sm w-20">15%</span>
          <span className="text-xs text-muted-foreground">legend-below-basic</span>
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
          <tr><td className="border border-border p-2">max</td><td className="border border-border p-2">number</td><td className="border border-border p-2">100</td></tr>
          <tr><td className="border border-border p-2">variant</td><td className="border border-border p-2">string</td><td className="border border-border p-2">'primary'</td></tr>
          <tr><td className="border border-border p-2">showLabel</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">true</td></tr>
          <tr><td className="border border-border p-2">striped</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">false</td></tr>
          <tr><td className="border border-border p-2">animated</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">false</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
