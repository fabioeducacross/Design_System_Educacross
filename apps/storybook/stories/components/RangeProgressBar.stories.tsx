import type { Meta, StoryObj } from "@storybook/react";
import { RangeProgressBar } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Progress/RangeProgressBar",
  component: RangeProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Barra de progresso com cores dinâmicas por faixas, equivalente ao ProgressBarHorizontal/TopInfo do frontoffice.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    suffix: { control: "text" },
    showBottomValue: { control: "boolean" },
    ranges: { control: "object" },
    label: { control: "text" },
  },
} satisfies Meta<typeof RangeProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 68,
    label: "Conclusão da turma",
    suffix: "%",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<RangeProgressBar value={68} label="Conclusão da turma" suffix="%" />`,
      vue2: `<ProgressBarHorizontal :value="68" label="Conclusão da turma" sufix="%" />`,
      vue3: `<EdRangeProgressBar :value="68" label="Conclusão da turma" suffix="%" />`,
    },
  },
};

export const BottomValue: Story = {
  args: {
    value: 45,
    label: "Meta trimestral",
    suffix: "%",
    showBottomValue: true,
  },
};
