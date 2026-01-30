import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppEchartBar** - Gráfico de Barras ECharts
 * 
 * Wrapper para gráfico de barras usando Apache ECharts.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/AppEchartBar.vue`
 * 
 * @example
 * ```vue
 * <AppEchartBar :data="chartData" :options="chartOptions" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Charts/AppEchartBar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Gráfico de barras verticais ou horizontais usando ECharts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface BarData {
  labels: string[];
  values: number[];
  colors?: string[];
}

// Mock visual do componente Vue (sem ECharts real)
const AppEchartBarMock = ({ 
  data,
  horizontal = false,
  title = "",
  height = 300
}: { 
  data: BarData;
  horizontal?: boolean;
  title?: string;
  height?: number;
}) => {
  const maxValue = Math.max(...data.values);
  const defaultColors = [
    "bg-legend-advanced",
    "bg-legend-proficient", 
    "bg-legend-basic",
    "bg-legend-below-basic",
    "bg-primary",
    "bg-secondary",
  ];

  return (
    <div className="bg-card border rounded-lg p-6" style={{ minHeight: height }}>
      {title && <h4 className="font-semibold mb-4">{title}</h4>}
      
      <div className={`flex ${horizontal ? "flex-col gap-3" : "items-end gap-4 justify-around"}`} style={{ height: height - 60 }}>
        {data.values.map((value, index) => {
          const percentage = (value / maxValue) * 100;
          const color = data.colors?.[index] || defaultColors[index % defaultColors.length];
          
          if (horizontal) {
            return (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24 text-right">
                  {data.labels[index]}
                </span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${color} rounded-full transition-all flex items-center justify-end pr-2`}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs font-medium text-white">{value}</span>
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex-1 w-full flex items-end justify-center">
                <div 
                  className={`w-12 ${color} rounded-t transition-all`}
                  style={{ height: `${percentage}%`, minHeight: 4 }}
                />
              </div>
              <span className="text-xs font-medium">{value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {data.labels[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const proficiencyData: BarData = {
  labels: ["Avançado", "Proficiente", "Básico", "Abaixo do Básico"],
  values: [8, 12, 5, 2],
  colors: ["bg-legend-advanced", "bg-legend-proficient", "bg-legend-basic", "bg-legend-below-basic"],
};

export const Default: Story = {
  render: () => <AppEchartBarMock data={proficiencyData} title="Distribuição por Proficiência" />,
};

export const Horizontal: Story = {
  name: "Barras Horizontais",
  render: () => <AppEchartBarMock data={proficiencyData} horizontal title="Distribuição por Proficiência" />,
};

export const Monthly: Story = {
  name: "Dados Mensais",
  render: () => (
    <AppEchartBarMock 
      data={{
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        values: [45, 62, 55, 78, 85, 92],
      }}
      title="Evolução Mensal (%)"
      height={350}
    />
  ),
};

export const Comparison: Story = {
  name: "Comparação de Turmas",
  render: () => (
    <AppEchartBarMock 
      data={{
        labels: ["5ºA", "5ºB", "5ºC", "5ºD"],
        values: [72, 65, 81, 58],
        colors: ["bg-primary", "bg-primary", "bg-primary", "bg-primary"],
      }}
      title="Média por Turma"
    />
  ),
};

export const SmallValues: Story = {
  name: "Valores Pequenos",
  render: () => (
    <AppEchartBarMock 
      data={{
        labels: ["Cat A", "Cat B", "Cat C"],
        values: [3, 7, 2],
      }}
      height={200}
    />
  ),
};
