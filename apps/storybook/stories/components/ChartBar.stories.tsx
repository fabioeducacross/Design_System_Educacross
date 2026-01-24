import type { Meta, StoryObj } from "@storybook/react";
import { ChartBar } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Charts/ChartBar",
  component: ChartBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gráfico de barras horizontais com fallback para série vazia, alinhado ao BarChart do frontoffice (ApexCharts).",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "Objeto com series (name, data, color) e chartColumnLabel (categorias).",
    },
    height: {
      control: { type: "number", min: 120, max: 600, step: 10 },
      description: "Altura em pixels do gráfico.",
    },
    chartYLabels: {
      control: "object",
      description: "Labels usadas no tooltip para mapear índices da série.",
    },
  },
} satisfies Meta<typeof ChartBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = {
  chartColumnLabel: ["Q1", "Q2", "Q3", "Q4"],
  series: [
    {
      name: "Concluíram",
      data: [72, 64, 81, 69],
      color: "hsl(var(--primary))",
    },
    {
      name: "Em andamento",
      data: [18, 24, 10, 15],
      color: "hsl(var(--warning))",
    },
  ],
};

export const Default: Story = {
  args: {
    data: sampleData,
    height: 280,
    chartYLabels: ["1º Bim.", "2º Bim.", "3º Bim.", "4º Bim."],
  },
  parameters: {
    multiFrameworkCode: {
      react: `<ChartBar data={${JSON.stringify(sampleData)}} chartYLabels={["1º Bim.","2º Bim.","3º Bim.","4º Bim."]} />`,
      vue2: `<BarChart :data="data" :chart-y-labels="['1º Bim.','2º Bim.','3º Bim.','4º Bim.']" />`,
      vue3: `<EdChartBar :data="data" :chart-y-labels="['1º Bim.','2º Bim.','3º Bim.','4º Bim.']" />`,
    },
  },
};

export const SingleSeriesFallback: Story = {
  args: {
    data: {
      chartColumnLabel: ["Turma A"],
      series: [{ name: "Sem dados", data: [0] }],
    },
    height: 200,
  },
};
