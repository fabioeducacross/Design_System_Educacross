import type { Meta, StoryObj } from "@storybook/react";

/**
 * # RadialBar (GaugeChart)
 * 
 * **Origem**: `educacross-frontoffice/src/components/charts/AppEcharts.vue`
 * 
 * Gráfico radial/gauge para exibir métricas únicas.
 * 
 * ## Uso Comum
 * 
 * - Porcentagem de conclusão de trilha
 * - Nota média geral
 * - Progresso de meta
 * - Indicador de proficiência
 * 
 * ## Cores por Valor
 * 
 * ```javascript
 * const getColor = (value) => {
 *   if (value >= 75) return '#6e63e8'; // advanced
 *   if (value >= 50) return '#28c76f'; // proficient
 *   if (value >= 25) return '#ff9f43'; // basic (LARANJA!)
 *   return '#ea5455'; // below-basic
 * }
 * ```
 * 
 * @see Frontoffice: src/components/charts/AppEcharts.vue
 */

const meta: Meta = {
  title: "Frontoffice/Charts/RadialBar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppEcharts (RadialBar/Gauge)

Gráfico radial para métricas únicas.

### Arquivo Original
\`educacross-frontoffice/src/components/charts/AppEcharts.vue\`

### Uso no Vue
\`\`\`vue
<AppEcharts
  :options="gaugeOptions"
  height="300px"
/>

<script setup>
const gaugeOptions = {
  series: [{
    type: 'gauge',
    progress: { show: true, width: 18 },
    axisLine: { lineStyle: { width: 18 } },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    pointer: { show: false },
    detail: {
      valueAnimation: true,
      fontSize: 32,
      formatter: '{value}%'
    },
    data: [{ value: 72, itemStyle: { color: '#28c76f' } }]
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
      <h2 className="text-xl font-bold mb-4">RadialBar/Gauge - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplos por Proficiência</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6e63e8" strokeWidth="8" 
                strokeDasharray={`${85 * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold">85%</span>
          </div>
          <span className="text-xs mt-1">Avançado</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#28c76f" strokeWidth="8" 
                strokeDasharray={`${65 * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold">65%</span>
          </div>
          <span className="text-xs mt-1">Proficiente</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ff9f43" strokeWidth="8" 
                strokeDasharray={`${35 * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold">35%</span>
          </div>
          <span className="text-xs mt-1">Básico</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ea5455" strokeWidth="8" 
                strokeDasharray={`${15 * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold">15%</span>
          </div>
          <span className="text-xs mt-1">Abaixo</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Usos Comuns</h3>
      <ul className="list-disc list-inside text-sm">
        <li>Conclusão de trilha de aprendizagem</li>
        <li>Média geral de turma</li>
        <li>Progresso de meta</li>
        <li>Indicador de proficiência individual</li>
      </ul>
    </div>
  ),
};
