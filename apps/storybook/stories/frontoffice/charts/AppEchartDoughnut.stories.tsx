import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppEchartDoughnut** - Gráfico de Rosca ECharts
 * 
 * Wrapper para gráfico de rosca (doughnut) usando Apache ECharts.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/AppEchartDoughnut.vue`
 * 
 * @example
 * ```vue
 * <AppEchartDoughnut :data="chartData" :options="chartOptions" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Charts/AppEchartDoughnut",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Gráfico de rosca (pizza com furo central) usando ECharts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface DoughnutData {
  labels: string[];
  values: number[];
  colors?: string[];
}

// Mock visual do componente Vue (sem ECharts real)
const AppEchartDoughnutMock = ({ 
  data,
  title = "",
  centerLabel = "",
  centerValue = "",
  size = 200
}: { 
  data: DoughnutData;
  title?: string;
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}) => {
  const total = data.values.reduce((a, b) => a + b, 0);
  const defaultColors = [
    "#6e63e8", // advanced
    "#28c76f", // proficient
    "#ff9f43", // basic
    "#ea5455", // below-basic
    "#00cfe8", // in-progress
    "#b4b7bd", // not-completed
  ];
  
  // Calcular ângulos para o gráfico
  let currentAngle = -90;
  const segments = data.values.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      value,
      percentage,
      startAngle,
      angle,
      color: data.colors?.[index] || defaultColors[index % defaultColors.length],
      label: data.labels[index],
    };
  });

  return (
    <div className="bg-card border rounded-lg p-6">
      {title && <h4 className="font-semibold mb-4 text-center">{title}</h4>}
      
      <div className="flex items-center justify-center gap-8">
        {/* Gráfico simulado */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {segments.map((segment, index) => {
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference * (1 - segment.percentage / 100);
              const rotation = segments.slice(0, index).reduce((a, s) => a + s.percentage, 0);
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{
                    transform: `rotate(${rotation * 3.6}deg)`,
                    transformOrigin: "50% 50%",
                  }}
                />
              );
            })}
          </svg>
          
          {/* Centro */}
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerValue && <p className="text-2xl font-bold">{centerValue}</p>}
              {centerLabel && <p className="text-xs text-muted-foreground">{centerLabel}</p>}
            </div>
          )}
        </div>
        
        {/* Legenda */}
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm">{segment.label}</span>
              <span className="text-sm text-muted-foreground">
                ({segment.value} - {segment.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const proficiencyData: DoughnutData = {
  labels: ["Avançado", "Proficiente", "Básico", "Abaixo do Básico"],
  values: [8, 12, 5, 2],
  colors: ["#6e63e8", "#28c76f", "#ff9f43", "#ea5455"],
};

export const Default: Story = {
  render: () => (
    <AppEchartDoughnutMock 
      data={proficiencyData} 
      title="Distribuição por Proficiência"
      centerValue="27"
      centerLabel="alunos"
    />
  ),
};

export const Status: Story = {
  name: "Status de Conclusão",
  render: () => (
    <AppEchartDoughnutMock 
      data={{
        labels: ["Concluído", "Em Andamento", "Não Iniciado"],
        values: [15, 8, 4],
        colors: ["#28c76f", "#00cfe8", "#b4b7bd"],
      }}
      title="Status das Atividades"
      centerValue="56%"
      centerLabel="concluído"
    />
  ),
};

export const Subjects: Story = {
  name: "Por Disciplina",
  render: () => (
    <AppEchartDoughnutMock 
      data={{
        labels: ["Matemática", "Português", "Ciências", "História"],
        values: [120, 95, 68, 45],
      }}
      title="Atividades por Disciplina"
      centerValue="328"
      centerLabel="atividades"
      size={220}
    />
  ),
};

export const Binary: Story = {
  name: "Dois Valores",
  render: () => (
    <AppEchartDoughnutMock 
      data={{
        labels: ["Acertos", "Erros"],
        values: [75, 25],
        colors: ["#28c76f", "#ea5455"],
      }}
      title="Taxa de Acerto"
      centerValue="75%"
      centerLabel="acertos"
      size={180}
    />
  ),
};

export const Small: Story = {
  name: "Tamanho Pequeno",
  render: () => (
    <AppEchartDoughnutMock 
      data={proficiencyData}
      centerValue="27"
      size={120}
    />
  ),
};
