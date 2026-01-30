import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppEchartLine** - Gráfico de Linhas ECharts
 * 
 * Wrapper para gráfico de linhas usando Apache ECharts.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/AppEchartLine.vue`
 * 
 * @example
 * ```vue
 * <AppEchartLine :data="chartData" :options="chartOptions" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Charts/AppEchartLine",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Gráfico de linhas para visualização de tendências usando ECharts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface LineData {
  labels: string[];
  datasets: {
    name: string;
    values: number[];
    color?: string;
  }[];
}

// Mock visual do componente Vue (sem ECharts real)
const AppEchartLineMock = ({ 
  data,
  title = "",
  height = 300,
  showArea = false
}: { 
  data: LineData;
  title?: string;
  height?: number;
  showArea?: boolean;
}) => {
  const allValues = data.datasets.flatMap(d => d.values);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;
  
  const defaultColors = ["#6e63e8", "#28c76f", "#ff9f43", "#00cfe8"];

  // Gerar pontos SVG para cada dataset
  const generatePath = (values: number[]) => {
    const width = 100;
    const height = 100;
    const padding = 10;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    
    return values.map((value, index) => {
      const x = padding + (index / (values.length - 1)) * usableWidth;
      const y = padding + usableHeight - ((value - minValue) / range) * usableHeight;
      return `${x},${y}`;
    }).join(" L ");
  };

  return (
    <div className="bg-card border rounded-lg p-6" style={{ minHeight: height }}>
      {title && <h4 className="font-semibold mb-4">{title}</h4>}
      
      <div className="relative" style={{ height: height - 80 }}>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-dashed border-muted h-0" />
          ))}
        </div>
        
        {/* Chart */}
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {data.datasets.map((dataset, index) => {
            const color = dataset.color || defaultColors[index % defaultColors.length];
            const pathD = `M ${generatePath(dataset.values)}`;
            
            return (
              <g key={index}>
                {showArea && (
                  <path
                    d={`${pathD} L 90,90 L 10,90 Z`}
                    fill={color}
                    fillOpacity="0.1"
                  />
                )}
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {dataset.values.map((value, i) => {
                  const x = 10 + (i / (dataset.values.length - 1)) * 80;
                  const y = 10 + 80 - ((value - minValue) / range) * 80;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={color}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {data.labels.map((label, index) => (
            <span key={index} className="text-xs text-muted-foreground">
              {label}
            </span>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      {data.datasets.length > 1 && (
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.color || defaultColors[index % defaultColors.length] }}
              />
              <span className="text-sm">{dataset.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const monthlyData: LineData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    { name: "Proficiência", values: [45, 52, 48, 61, 55, 68], color: "#6e63e8" },
  ],
};

export const Default: Story = {
  render: () => <AppEchartLineMock data={monthlyData} title="Evolução da Proficiência" />,
};

export const WithArea: Story = {
  name: "Com Área Preenchida",
  render: () => <AppEchartLineMock data={monthlyData} title="Evolução da Proficiência" showArea />,
};

export const MultipleLines: Story = {
  name: "Múltiplas Linhas",
  render: () => (
    <AppEchartLineMock 
      data={{
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          { name: "Turma 5ºA", values: [45, 52, 48, 61, 55, 68], color: "#6e63e8" },
          { name: "Turma 5ºB", values: [50, 48, 55, 52, 60, 65], color: "#28c76f" },
          { name: "Turma 5ºC", values: [40, 45, 50, 55, 58, 62], color: "#ff9f43" },
        ],
      }}
      title="Comparação entre Turmas"
      height={350}
    />
  ),
};

export const Weekly: Story = {
  name: "Dados Semanais",
  render: () => (
    <AppEchartLineMock 
      data={{
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
        datasets: [
          { name: "Atividades", values: [12, 19, 15, 25, 22] },
        ],
      }}
      title="Atividades por Dia"
    />
  ),
};

export const Yearly: Story = {
  name: "Dados Anuais",
  render: () => (
    <AppEchartLineMock 
      data={{
        labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
        datasets: [
          { name: "Alunos Ativos", values: [1200, 1800, 2400, 3200, 4100, 5000], color: "#00cfe8" },
        ],
      }}
      title="Crescimento de Usuários"
      height={350}
      showArea
    />
  ),
};
