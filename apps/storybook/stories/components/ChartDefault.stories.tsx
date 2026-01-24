import type { Meta, StoryObj } from "@storybook/react";
import { ChartDefault } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Charts/ChartDefault",
  component: ChartDefault,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gráfico do tipo donut com rótulo total no centro, espelhando o DefaultChart do frontoffice (ApexCharts).",
      },
    },
  },
  argTypes: {
    series: {
      control: "object",
      description: "Valores das fatias (numéricos).",
    },
    labels: {
      control: "object",
      description: "Rótulos das fatias.",
    },
    colors: {
      control: "object",
      description: "Paleta de cores para cada fatia.",
    },
    height: {
      control: { type: "number", min: 120, max: 400, step: 10 },
      description: "Altura em pixels do gráfico.",
    },
  },
} satisfies Meta<typeof ChartDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSeries = [28, 54, 18];

export const Default: Story = {
  args: {
    series: defaultSeries,
    labels: ["iniciaram", "finalizaram", "não iniciaram"],
    colors: ["#28c76f66", "hsl(var(--success))", "#28c76f33"],
    height: 240,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<ChartDefault series={[28,54,18]} labels={["iniciaram","finalizaram","não iniciaram"]} colors={["#28c76f66","hsl(var(--success))","#28c76f33"]} />`,
      vue2: `<DefaultChart :series="[28,54,18]" :labels="['iniciaram','finalizaram','não iniciaram']" :colors="['#28c76f66', $themeColors.success, '#28c76f33']" />`,
      vue3: `<EdChartDefault :series="[28,54,18]" :labels="['iniciaram','finalizaram','não iniciaram']" />`,
    },
  },
};

export const CustomColors: Story = {
  args: {
    series: [35, 40, 25],
    labels: ["ativos", "concluídos", "pendentes"],
    colors: ["hsl(var(--primary))", "hsl(var(--warning))", "hsl(var(--muted-foreground))"],
    height: 240,
  },
};
