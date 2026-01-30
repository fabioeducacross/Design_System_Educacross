import type { Meta, StoryObj } from "@storybook/react";

/**
 * # BarChart (AppEcharts)
 * 
 * **Origem**: `educacross-frontoffice/src/components/charts/AppEcharts.vue`
 * 
 * Wrapper do ECharts para gráficos de barra.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `options` | `Object` | {} | Opções ECharts |
 * | `width` | `string` | '100%' | Largura |
 * | `height` | `string` | '350px' | Altura |
 * | `loading` | `boolean` | false | Exibir loading |
 * 
 * ## Cores Legend em Gráficos
 * 
 * ```javascript
 * const colors = {
 *   advanced: '#6e63e8',
 *   proficient: '#28c76f',
 *   basic: '#ff9f43',        // LARANJA!
 *   belowBasic: '#ea5455',
 *   notCompleted: '#b4b7bd',
 *   inProgress: '#00cfe8'
 * }
 * ```
 * 
 * @see Frontoffice: src/components/charts/AppEcharts.vue
 * @see https://echarts.apache.org/
 */

const meta: Meta = {
  title: "Frontoffice/Charts/BarChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppEcharts (BarChart)

Gráfico de barras usando Apache ECharts.

### Arquivo Original
\`educacross-frontoffice/src/components/charts/AppEcharts.vue\`

### Uso no Vue
\`\`\`vue
<AppEcharts
  :options="barChartOptions"
  height="400px"
/>

<script setup>
const barChartOptions = {
  xAxis: {
    type: 'category',
    data: ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano']
  },
  yAxis: {
    type: 'value',
    max: 100
  },
  series: [{
    data: [85, 72, 68, 91, 78],
    type: 'bar',
    itemStyle: {
      color: function(params) {
        const value = params.value;
        if (value >= 75) return '#6e63e8'; // advanced
        if (value >= 50) return '#28c76f'; // proficient
        if (value >= 25) return '#ff9f43'; // basic
        return '#ea5455'; // below-basic
      }
    }
  }]
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
      <h2 className="text-xl font-bold mb-4">BarChart - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo Visual</h3>
      <div className="h-64 bg-muted rounded p-4 mb-4">
        <div className="flex items-end justify-around h-full">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t" style={{height: '85%', backgroundColor: '#6e63e8'}}></div>
            <span className="text-xs">1º Ano</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t" style={{height: '72%', backgroundColor: '#28c76f'}}></div>
            <span className="text-xs">2º Ano</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t" style={{height: '68%', backgroundColor: '#28c76f'}}></div>
            <span className="text-xs">3º Ano</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t" style={{height: '91%', backgroundColor: '#6e63e8'}}></div>
            <span className="text-xs">4º Ano</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t" style={{height: '78%', backgroundColor: '#6e63e8'}}></div>
            <span className="text-xs">5º Ano</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Cores por Proficiência</h3>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{backgroundColor: '#6e63e8'}}></div> 75%+ Avançado</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{backgroundColor: '#28c76f'}}></div> 50-74% Proficiente</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{backgroundColor: '#ff9f43'}}></div> 25-49% Básico</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{backgroundColor: '#ea5455'}}></div> 0-24% Abaixo</div>
      </div>
    </div>
  ),
};
