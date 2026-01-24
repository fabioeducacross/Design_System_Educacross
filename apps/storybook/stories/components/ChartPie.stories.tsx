import type { Meta, StoryObj } from "@storybook/react";
import { ChartPie } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Charts/ChartPie",
  component: ChartPie,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Gráfico de pizza com tooltip customizado e fallback visual quando a série é toda zero (mesma UX do PieChart frontoffice).",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "Objeto com series (números), colors e tooltipLabels.",
    },
    height: {
      control: { type: "number", min: 120, max: 400, step: 10 },
      description: "Altura do gráfico.",
    },
    tooltipSuffix: {
      control: "text",
      description: "Texto adicional no tooltip (ex: % ou unidades).",
    },
  },
} satisfies Meta<typeof ChartPie>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = {
  series: [320, 210, 120],
  colors: ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))"],
  tooltipLabels: ["Matemática", "Português", "Ciências"],
};

export const Default: Story = {
  args: {
    data,
    height: 200,
    tooltipSuffix: " alunos",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<ChartPie data={{ series: [320,210,120], colors: ['hsl(var(--primary))','hsl(var(--success))','hsl(var(--warning))'], tooltipLabels: ['Matemática','Português','Ciências'] }} tooltipSuffix=" alunos" />`,
      vue2: `<PieChart :data="{ series: [320,210,120], colors: ['#3b82f6','#22c55e','#f59e0b'], tooltipLabels: ['Matemática','Português','Ciências'] }" tooltip-suffix=" alunos" />`,
      vue3: `<EdChartPie :data="{ series: [320,210,120], colors: ['#3b82f6','#22c55e','#f59e0b'], tooltipLabels: ['Matemática','Português','Ciências'] }" tooltip-suffix=" alunos" />`,
    },
  },
};

export const AllZeroFallback: Story = {
  args: {
    data: { series: [0, 0, 0], colors: ["hsl(var(--muted-foreground))"], tooltipLabels: ["Sem dados"] },
    height: 160,
  },
};
