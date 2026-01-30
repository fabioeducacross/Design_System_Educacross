import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppEchartRadar** - Gráfico de Radar ECharts
 * 
 * Wrapper para gráfico de radar/aranha usando Apache ECharts.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/AppEchartRadar.vue`
 * 
 * @example
 * ```vue
 * <AppEchartRadar :data="chartData" :options="chartOptions" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Charts/AppEchartRadar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Gráfico de radar para visualização multidimensional usando ECharts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface RadarData {
  indicators: { name: string; max: number }[];
  datasets: {
    name: string;
    values: number[];
    color?: string;
  }[];
}

// Mock visual do componente Vue (sem ECharts real)
const AppEchartRadarMock = ({ 
  data,
  title = "",
  size = 300
}: { 
  data: RadarData;
  title?: string;
  size?: number;
}) => {
  const defaultColors = ["#6e63e8", "#28c76f", "#ff9f43"];
  const center = 50;
  const radius = 35;
  const numIndicators = data.indicators.length;
  
  // Calcular posições dos vértices
  const getPoint = (index: number, value: number, max: number) => {
    const angle = (index * 360 / numIndicators - 90) * (Math.PI / 180);
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };
  
  // Pontos do grid
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-card border rounded-lg p-6">
      {title && <h4 className="font-semibold mb-4 text-center">{title}</h4>}
      
      <div className="flex items-center justify-center gap-8">
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          {/* Grid circles */}
          {gridLevels.map((level, i) => (
            <polygon
              key={i}
              points={data.indicators.map((_, index) => {
                const point = getPoint(index, level * 100, 100);
                return `${point.x},${point.y}`;
              }).join(" ")}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Axis lines */}
          {data.indicators.map((_, index) => {
            const point = getPoint(index, 100, 100);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
            );
          })}
          
          {/* Data polygons */}
          {data.datasets.map((dataset, dataIndex) => {
            const color = dataset.color || defaultColors[dataIndex % defaultColors.length];
            const points = dataset.values.map((value, index) => {
              const point = getPoint(index, value, data.indicators[index].max);
              return `${point.x},${point.y}`;
            }).join(" ");
            
            return (
              <g key={dataIndex}>
                <polygon
                  points={points}
                  fill={color}
                  fillOpacity="0.2"
                  stroke={color}
                  strokeWidth="2"
                />
                {dataset.values.map((value, index) => {
                  const point = getPoint(index, value, data.indicators[index].max);
                  return (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill={color}
                    />
                  );
                })}
              </g>
            );
          })}
          
          {/* Labels */}
          {data.indicators.map((indicator, index) => {
            const point = getPoint(index, 115, 100);
            return (
              <text
                key={index}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="4"
                fill="currentColor"
                className="text-muted-foreground"
              >
                {indicator.name}
              </text>
            );
          })}
        </svg>
        
        {/* Legend */}
        {data.datasets.length > 1 && (
          <div className="space-y-2">
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
    </div>
  );
};

const skillsData: RadarData = {
  indicators: [
    { name: "Números", max: 100 },
    { name: "Álgebra", max: 100 },
    { name: "Geometria", max: 100 },
    { name: "Grandezas", max: 100 },
    { name: "Probabilidade", max: 100 },
  ],
  datasets: [
    { name: "Aluno", values: [85, 65, 70, 55, 80], color: "#6e63e8" },
  ],
};

export const Default: Story = {
  render: () => <AppEchartRadarMock data={skillsData} title="Perfil de Competências" />,
};

export const Comparison: Story = {
  name: "Comparação",
  render: () => (
    <AppEchartRadarMock 
      data={{
        indicators: [
          { name: "Números", max: 100 },
          { name: "Álgebra", max: 100 },
          { name: "Geometria", max: 100 },
          { name: "Grandezas", max: 100 },
          { name: "Probabilidade", max: 100 },
        ],
        datasets: [
          { name: "Aluno", values: [85, 65, 70, 55, 80], color: "#6e63e8" },
          { name: "Média da Turma", values: [70, 72, 68, 65, 60], color: "#28c76f" },
        ],
      }}
      title="Aluno vs Turma"
    />
  ),
};

export const SixDimensions: Story = {
  name: "6 Dimensões",
  render: () => (
    <AppEchartRadarMock 
      data={{
        indicators: [
          { name: "Leitura", max: 100 },
          { name: "Escrita", max: 100 },
          { name: "Gramática", max: 100 },
          { name: "Interpretação", max: 100 },
          { name: "Vocabulário", max: 100 },
          { name: "Produção", max: 100 },
        ],
        datasets: [
          { name: "Português", values: [78, 65, 82, 70, 88, 60] },
        ],
      }}
      title="Competências de Português"
    />
  ),
};

export const LowPerformance: Story = {
  name: "Baixo Desempenho",
  render: () => (
    <AppEchartRadarMock 
      data={{
        indicators: [
          { name: "Números", max: 100 },
          { name: "Álgebra", max: 100 },
          { name: "Geometria", max: 100 },
          { name: "Grandezas", max: 100 },
          { name: "Probabilidade", max: 100 },
        ],
        datasets: [
          { name: "Aluno", values: [35, 25, 40, 20, 30], color: "#ea5455" },
        ],
      }}
      title="Aluno com Dificuldades"
    />
  ),
};

export const Small: Story = {
  name: "Tamanho Pequeno",
  render: () => <AppEchartRadarMock data={skillsData} size={180} />,
};
