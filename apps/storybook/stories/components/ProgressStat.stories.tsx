import type { Meta, StoryObj } from "@storybook/react";
import { ProgressStat } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Progress/ProgressStat",
  component: ProgressStat,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Barra de progresso simples com label e valor formatado, similar ao ProgressBarHorizontalV2 do frontoffice.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    height: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "destructive", "info"],
    },
    label: { control: "text" },
    tooltip: { control: "text" },
  },
} satisfies Meta<typeof ProgressStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 72,
    label: "Progresso",
    variant: "primary",
    height: "6px",
    tooltip: "Percentual concluído",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<ProgressStat value={72} label="Progresso" />`,
      vue2: `<ProgressBarHorizontalV2 :value="72" label="Progresso" />`,
      vue3: `<EdProgressStat :value="72" label="Progresso" />`,
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <ProgressStat value={80} label="Sucesso" variant="success" />
      <ProgressStat value={55} label="Aviso" variant="warning" />
      <ProgressStat value={30} label="Erro" variant="destructive" />
    </div>
  ),
};
