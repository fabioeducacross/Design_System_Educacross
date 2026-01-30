import type { Meta, StoryObj } from "@storybook/react";

/**
 * # PieChart (AppEcharts)
 * 
 * **Origem**: `educacross-frontoffice/src/components/charts/AppEcharts.vue`
 * 
 * Gráfico de pizza/rosca usando ECharts.
 * 
 * ## Tipos de Gráfico
 * 
 * - **Pie Chart**: Gráfico de pizza sólido
 * - **Donut Chart**: Pizza com centro vazado (radius: ['40%', '70%'])
 * - **Rose Chart**: Pizza com variação de raio
 * 
 * ## Cores Legend Padrão
 * 
 * Usadas para exibir distribuição de proficiência:
 * - Avançado: #6e63e8 (roxo)
 * - Proficiente: #28c76f (verde)
 * - Básico: #ff9f43 (LARANJA!)
 * - Abaixo do Básico: #ea5455 (vermelho)
 * - Não Concluído: #b4b7bd (cinza)
 * 
 * @see Frontoffice: src/components/charts/AppEcharts.vue
 */

const meta: Meta = {
  title: "Frontoffice/Charts/PieChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppEcharts (PieChart)

Gráfico de pizza usando Apache ECharts.

### Arquivo Original
\`educacross-frontoffice/src/components/charts/AppEcharts.vue\`

### Uso no Vue
\`\`\`vue
<AppEcharts
  :options="pieChartOptions"
  height="350px"
/>

<script setup>
const pieChartOptions = {
  series: [{
    type: 'pie',
    radius: ['40%', '70%'], // Donut
    data: [
      { value: 25, name: 'Avançado', itemStyle: { color: '#6e63e8' } },
      { value: 35, name: 'Proficiente', itemStyle: { color: '#28c76f' } },
      { value: 20, name: 'Básico', itemStyle: { color: '#ff9f43' } },
      { value: 15, name: 'Abaixo do Básico', itemStyle: { color: '#ea5455' } },
      { value: 5, name: 'Não Concluído', itemStyle: { color: '#b4b7bd' } }
    ]
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
      <h2 className="text-xl font-bold mb-4">PieChart - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo: Donut de Proficiência</h3>
      <div className="flex items-center gap-8 mb-4">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Simplified donut representation */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#6e63e8" strokeWidth="15" strokeDasharray="62.8 188.4" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#28c76f" strokeWidth="15" strokeDasharray="87.92 188.4" strokeDashoffset="-62.8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ff9f43" strokeWidth="15" strokeDasharray="50.24 188.4" strokeDashoffset="-150.72" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ea5455" strokeWidth="15" strokeDasharray="37.68 188.4" strokeDashoffset="-200.96" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#b4b7bd" strokeWidth="15" strokeDasharray="12.56 188.4" strokeDashoffset="-238.64" />
            <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-lg font-bold fill-foreground">100</text>
            <text x="50" y="60" textAnchor="middle" dy=".3em" className="text-xs fill-muted-foreground">alunos</text>
          </svg>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#6e63e8'}}></div> 25% Avançado (25)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#28c76f'}}></div> 35% Proficiente (35)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#ff9f43'}}></div> 20% Básico (20)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#ea5455'}}></div> 15% Abaixo (15)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#b4b7bd'}}></div> 5% Não Concluído (5)</div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Tipos de Gráfico</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">radius</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">Pie</td><td className="border border-border p-2">'70%'</td><td className="border border-border p-2">Distribuição simples</td></tr>
          <tr><td className="border border-border p-2">Donut</td><td className="border border-border p-2">['40%', '70%']</td><td className="border border-border p-2">Com valor central</td></tr>
          <tr><td className="border border-border p-2">Rose</td><td className="border border-border p-2">roseType: 'area'</td><td className="border border-border p-2">Variação de magnitude</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
