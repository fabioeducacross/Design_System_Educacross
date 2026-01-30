import type { Meta, StoryObj } from "@storybook/react";

/**
 * # LineChart (AppEcharts)
 * 
 * **Origem**: `educacross-frontoffice/src/components/charts/AppEcharts.vue`
 * 
 * Gráfico de linha para séries temporais.
 * 
 * ## Uso Comum
 * 
 * - Evolução de notas ao longo do tempo
 * - Acessos por período
 * - Progresso de turmas
 * - Comparativo entre períodos
 * 
 * ## Opções Comuns
 * 
 * - `smooth: true` - Linhas suaves
 * - `areaStyle: {}` - Área preenchida
 * - `stack: 'total'` - Empilhar séries
 * 
 * @see Frontoffice: src/components/charts/AppEcharts.vue
 */

const meta: Meta = {
  title: "Frontoffice/Charts/LineChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppEcharts (LineChart)

Gráfico de linha para séries temporais.

### Arquivo Original
\`educacross-frontoffice/src/components/charts/AppEcharts.vue\`

### Uso no Vue
\`\`\`vue
<AppEcharts
  :options="lineChartOptions"
  height="350px"
/>

<script setup>
const lineChartOptions = {
  xAxis: {
    type: 'category',
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  },
  yAxis: { type: 'value' },
  series: [{
    data: [65, 72, 68, 75, 82, 78],
    type: 'line',
    smooth: true,
    areaStyle: {
      color: 'rgba(40, 199, 111, 0.2)'
    },
    itemStyle: { color: '#28c76f' }
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
      <h2 className="text-xl font-bold mb-4">LineChart - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo: Evolução de Média</h3>
      <div className="h-48 bg-muted rounded p-4 relative">
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#28c76f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#28c76f" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid */}
          <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeDasharray="4" />
          <line x1="40" y1="90" x2="380" y2="90" stroke="#e5e7eb" strokeDasharray="4" />
          <line x1="40" y1="50" x2="380" y2="50" stroke="#e5e7eb" strokeDasharray="4" />
          {/* Area */}
          <path d="M60,82 L120,58 L180,70 L240,46 L300,22 L360,34 L360,130 L60,130 Z" fill="url(#areaGradient)" />
          {/* Line */}
          <polyline fill="none" stroke="#28c76f" strokeWidth="3" 
            points="60,82 120,58 180,70 240,46 300,22 360,34" strokeLinejoin="round" />
          {/* Points */}
          <circle cx="60" cy="82" r="4" fill="#28c76f" />
          <circle cx="120" cy="58" r="4" fill="#28c76f" />
          <circle cx="180" cy="70" r="4" fill="#28c76f" />
          <circle cx="240" cy="46" r="4" fill="#28c76f" />
          <circle cx="300" cy="22" r="4" fill="#6e63e8" />
          <circle cx="360" cy="34" r="4" fill="#6e63e8" />
          {/* Labels */}
          <text x="60" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Jan</text>
          <text x="120" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Fev</text>
          <text x="180" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Mar</text>
          <text x="240" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Abr</text>
          <text x="300" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Mai</text>
          <text x="360" y="145" className="text-[10px] fill-muted-foreground" textAnchor="middle">Jun</text>
        </svg>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Opções de Estilo</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Opção</th>
            <th className="border border-border p-2 text-left">Valor</th>
            <th className="border border-border p-2 text-left">Efeito</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">smooth</td><td className="border border-border p-2">true</td><td className="border border-border p-2">Curvas suaves</td></tr>
          <tr><td className="border border-border p-2">areaStyle</td><td className="border border-border p-2">{'{}'}</td><td className="border border-border p-2">Preenche área</td></tr>
          <tr><td className="border border-border p-2">stack</td><td className="border border-border p-2">'total'</td><td className="border border-border p-2">Empilha séries</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
