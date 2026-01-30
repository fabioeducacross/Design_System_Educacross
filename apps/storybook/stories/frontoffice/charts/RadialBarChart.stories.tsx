import type { Meta, StoryObj } from "@storybook/react";

/**
 * **RadialBarChart** - Gráfico radial com múltiplas barras
 * 
 * Gráfico circular com múltiplas barras radiais para comparação.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/chart/RadialBarChart.vue`
 * 
 * @example
 * ```vue
 * <RadialBarChart :data="[
 *   { label: 'Matemática', value: 75 },
 *   { label: 'Português', value: 60 }
 * ]" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Charts/RadialBarChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Gráfico radial com múltiplas barras para comparação de métricas.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array de dados com label e value",
    },
    size: {
      control: "number",
      description: "Tamanho do gráfico em pixels",
    },
    showLegend: {
      control: "boolean",
      description: "Mostrar legenda",
    },
  },
};

export default meta;
type Story = StoryObj;

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

const defaultColors = [
  "stroke-legend-advanced",
  "stroke-legend-proficient",
  "stroke-legend-basic",
  "stroke-legend-below-basic",
];

const bgColors = [
  "bg-legend-advanced",
  "bg-legend-proficient",
  "bg-legend-basic",
  "bg-legend-below-basic",
];

// Mock do componente Vue
const RadialBarChartMock = ({ 
  data,
  size = 200,
  showLegend = true,
  showLabels = true,
  thickness = 10
}: { 
  data: DataItem[];
  size?: number;
  showLegend?: boolean;
  showLabels?: boolean;
  thickness?: number;
}) => {
  const center = size / 2;
  const maxRadius = (size - thickness) / 2 - 10;
  const radiusStep = (maxRadius - 30) / data.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const radius = maxRadius - index * radiusStep;
          const circumference = 2 * Math.PI * radius;
          const progress = (item.value / 100) * circumference;
          
          return (
            <g key={index}>
              {/* Track (background) */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                strokeWidth={thickness}
                className="stroke-muted"
              />
              {/* Progress */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                strokeWidth={thickness}
                strokeDasharray={`${progress} ${circumference}`}
                strokeLinecap="round"
                className={defaultColors[index % defaultColors.length]}
              />
            </g>
          );
        })}
        
        {/* Center text */}
        {showLabels && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-2xl font-bold transform rotate-90"
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            {Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)}%
          </text>
        )}
      </svg>
      
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${bgColors[index % bgColors.length]}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const subjectData: DataItem[] = [
  { label: "Matemática", value: 75 },
  { label: "Português", value: 60 },
  { label: "Ciências", value: 85 },
  { label: "História", value: 45 },
];

export const Default: Story = {
  render: () => <RadialBarChartMock data={subjectData} />,
};

export const LargeSize: Story = {
  render: () => <RadialBarChartMock data={subjectData} size={300} thickness={15} />,
};

export const SmallSize: Story = {
  render: () => <RadialBarChartMock data={subjectData} size={150} thickness={8} />,
};

export const TwoItems: Story = {
  render: () => (
    <RadialBarChartMock 
      data={[
        { label: "Concluído", value: 68 },
        { label: "Pendente", value: 32 },
      ]} 
    />
  ),
};

export const WithoutLegend: Story = {
  render: () => <RadialBarChartMock data={subjectData} showLegend={false} />,
};

export const ProficiencyDistribution: Story = {
  name: "Exemplo: Distribuição de Proficiência",
  render: () => (
    <div className="flex items-center gap-8">
      <RadialBarChartMock 
        data={[
          { label: "Avançado", value: 15 },
          { label: "Proficiente", value: 35 },
          { label: "Básico", value: 30 },
          { label: "Abaixo do Básico", value: 20 },
        ]}
        size={250}
        thickness={12}
      />
      <div className="space-y-2">
        <h4 className="font-semibold">Turma 5º Ano A</h4>
        <p className="text-sm text-muted-foreground">30 alunos</p>
        <p className="text-sm text-muted-foreground">Matemática - 2º Bimestre</p>
      </div>
    </div>
  ),
};

export const MultipleCharts: Story = {
  name: "Exemplo: Comparativo de Turmas",
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="text-center">
        <RadialBarChartMock 
          data={[
            { label: "Avançado", value: 20 },
            { label: "Proficiente", value: 40 },
            { label: "Básico", value: 25 },
            { label: "Abaixo", value: 15 },
          ]}
          size={160}
          thickness={8}
          showLegend={false}
        />
        <p className="mt-2 font-medium">5º Ano A</p>
      </div>
      <div className="text-center">
        <RadialBarChartMock 
          data={[
            { label: "Avançado", value: 15 },
            { label: "Proficiente", value: 30 },
            { label: "Básico", value: 35 },
            { label: "Abaixo", value: 20 },
          ]}
          size={160}
          thickness={8}
          showLegend={false}
        />
        <p className="mt-2 font-medium">5º Ano B</p>
      </div>
      <div className="text-center">
        <RadialBarChartMock 
          data={[
            { label: "Avançado", value: 25 },
            { label: "Proficiente", value: 45 },
            { label: "Básico", value: 20 },
            { label: "Abaixo", value: 10 },
          ]}
          size={160}
          thickness={8}
          showLegend={false}
        />
        <p className="mt-2 font-medium">5º Ano C</p>
      </div>
    </div>
  ),
};
