import type { Meta, StoryObj } from "@storybook/react";
import { ChartRadialBar } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Charts/ChartRadialBar",
  component: ChartRadialBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "RadialBar multi-série com label total, inspirado no RadialBarChart do frontoffice (ApexCharts).",
      },
    },
  },
  argTypes: {
    chartSeries: {
      control: "object",
      description: "Valores numéricos das séries.",
    },
    seriesColors: {
      control: "object",
      description: "Cores das séries (CSS).",
    },
    labels: {
      control: "object",
      description: "Rótulos das séries.",
    },
    heightSize: {
      control: { type: "number", min: 120, max: 400, step: 10 },
      description: "Altura do gráfico.",
    },
    showTotalLabel: {
      control: "boolean",
      description: "Exibe label total no centro.",
    },
  },
} satisfies Meta<typeof ChartRadialBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chartSeries: [62, 48],
    labels: ["Iniciaram", "Finalizaram"],
    seriesColors: ["hsl(var(--info))", "hsl(var(--primary))"],
    heightSize: 220,
    showTotalLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<ChartRadialBar chartSeries={[62,48]} labels={["Iniciaram","Finalizaram"]} />`,
      vue2: `<RadialBarChart :chart-series="[62,48]" :labels="['Iniciaram','Finalizaram']" />`,
      vue3: `<EdChartRadialBar :chart-series="[62,48]" :labels="['Iniciaram','Finalizaram']" />`,
    },
  },
};

export const SingleSeries: Story = {
  args: {
    chartSeries: [85],
    labels: ["Concluído"],
    seriesColors: ["hsl(var(--success))"],
    heightSize: 200,
    showTotalLabel: false,
  },
};
