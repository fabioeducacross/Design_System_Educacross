import type { Meta, StoryObj } from "@storybook/react";

/**
 * **RainbowProgressBar** - Barra de progresso multi-segmento
 * 
 * Exibe múltiplos segmentos de progresso com cores diferentes.
 * Usado para mostrar distribuição de proficiência em turmas.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/progessBar/RainbowProgressBar.vue`
 * 
 * @example
 * ```vue
 * <RainbowProgressBar :segments="[
 *   { value: 15, variant: 'legend-advanced' },
 *   { value: 30, variant: 'legend-proficient' },
 *   { value: 35, variant: 'legend-basic' },
 *   { value: 20, variant: 'legend-below-basic' }
 * ]" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Progress/RainbowProgressBar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Barra de progresso com múltiplos segmentos coloridos. Usa Legend Colors do Design System.",
      },
    },
  },
  argTypes: {
    segments: {
      description: "Array de segmentos com value e variant",
    },
    height: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Altura da barra",
    },
    showLabels: {
      control: "boolean",
      description: "Mostrar porcentagem em cada segmento",
    },
  },
};

export default meta;
type Story = StoryObj;

interface Segment {
  value: number;
  variant: string;
  label?: string;
}

const variantColors: Record<string, string> = {
  "legend-below-basic": "bg-legend-below-basic",
  "legend-basic": "bg-legend-basic",
  "legend-proficient": "bg-legend-proficient",
  "legend-advanced": "bg-legend-advanced",
  "legend-not-completed": "bg-legend-not-completed",
  "legend-in-progress": "bg-legend-in-progress",
};

// Mock do componente Vue
const RainbowProgressBarMock = ({ 
  segments, 
  height = "md",
  showLabels = false,
  rounded = true
}: { 
  segments: Segment[];
  height?: "sm" | "md" | "lg";
  showLabels?: boolean;
  rounded?: boolean;
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  
  const heightClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className="w-full">
      <div className={`
        flex overflow-hidden
        ${heightClasses[height]}
        ${rounded ? "rounded-full" : ""}
        bg-muted
      `}>
        {segments.map((segment, index) => {
          const width = (segment.value / total) * 100;
          const isFirst = index === 0;
          const isLast = index === segments.length - 1;
          
          return (
            <div
              key={index}
              className={`
                ${variantColors[segment.variant]}
                ${isFirst && rounded ? "rounded-l-full" : ""}
                ${isLast && rounded ? "rounded-r-full" : ""}
                flex items-center justify-center
                transition-all duration-300
              `}
              style={{ width: `${width}%` }}
            >
              {showLabels && width > 10 && (
                <span className="text-xs font-medium text-white">
                  {Math.round(width)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legenda abaixo */}
      {showLabels && (
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${variantColors[segment.variant]}`} />
              <span>{segment.label || `${segment.value}%`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const defaultSegments: Segment[] = [
  { value: 10, variant: "legend-advanced", label: "Avançado" },
  { value: 25, variant: "legend-proficient", label: "Proficiente" },
  { value: 40, variant: "legend-basic", label: "Básico" },
  { value: 25, variant: "legend-below-basic", label: "Abaixo" },
];

export const Default: Story = {
  render: () => <RainbowProgressBarMock segments={defaultSegments} />,
};

export const WithLabels: Story = {
  render: () => <RainbowProgressBarMock segments={defaultSegments} showLabels />,
};

export const SmallHeight: Story = {
  render: () => <RainbowProgressBarMock segments={defaultSegments} height="sm" />,
};

export const LargeHeight: Story = {
  render: () => <RainbowProgressBarMock segments={defaultSegments} height="lg" showLabels />,
};

export const TurmaExemplo: Story = {
  name: "Exemplo: Distribuição de Turma",
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Turma 5º Ano A - 30 alunos</p>
        <RainbowProgressBarMock 
          segments={[
            { value: 3, variant: "legend-advanced", label: "3 Avançado" },
            { value: 12, variant: "legend-proficient", label: "12 Proficiente" },
            { value: 10, variant: "legend-basic", label: "10 Básico" },
            { value: 5, variant: "legend-below-basic", label: "5 Abaixo" },
          ]} 
          height="lg"
          showLabels
        />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Turma 5º Ano B - 28 alunos</p>
        <RainbowProgressBarMock 
          segments={[
            { value: 5, variant: "legend-advanced", label: "5 Avançado" },
            { value: 15, variant: "legend-proficient", label: "15 Proficiente" },
            { value: 6, variant: "legend-basic", label: "6 Básico" },
            { value: 2, variant: "legend-below-basic", label: "2 Abaixo" },
          ]} 
          height="lg"
          showLabels
        />
      </div>
    </div>
  ),
};

export const WithNotCompleted: Story = {
  render: () => (
    <RainbowProgressBarMock 
      segments={[
        { value: 5, variant: "legend-not-completed", label: "Não fizeram" },
        { value: 8, variant: "legend-advanced", label: "Avançado" },
        { value: 20, variant: "legend-proficient", label: "Proficiente" },
        { value: 12, variant: "legend-basic", label: "Básico" },
        { value: 5, variant: "legend-below-basic", label: "Abaixo" },
      ]} 
      showLabels
    />
  ),
};

export const WithInProgress: Story = {
  render: () => (
    <RainbowProgressBarMock 
      segments={[
        { value: 10, variant: "legend-in-progress", label: "Em andamento" },
        { value: 5, variant: "legend-advanced", label: "Avançado" },
        { value: 15, variant: "legend-proficient", label: "Proficiente" },
        { value: 12, variant: "legend-basic", label: "Básico" },
        { value: 8, variant: "legend-below-basic", label: "Abaixo" },
      ]} 
      showLabels
    />
  ),
};
