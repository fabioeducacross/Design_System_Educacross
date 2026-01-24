import type { Meta, StoryObj } from "@storybook/react";
import { RainbowProgressBar } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Progress/RainbowProgressBar",
  component: RainbowProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Barra gradiente com marcador triangular, equivalente ao RainbowProgressBar do frontoffice (usado em leituras/níveis).",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showLegend: { control: "boolean" },
    legend: { control: false },
  },
} satisfies Meta<typeof RainbowProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 52,
    showLegend: true,
  },
  render: (args) => (
    <div className="w-80 space-y-2">
      <RainbowProgressBar {...args} legend={<span className="text-xs text-muted-foreground">52 pontos de leitura</span>} />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<RainbowProgressBar value={52} showLegend legend={<span className="text-xs text-muted-foreground">52 pontos de leitura</span>} />`,
      vue2: `<RainbowProgressBar :value="52"><template #legend>52 pontos de leitura</template></RainbowProgressBar>`,
      vue3: `<EdRainbowProgressBar :value="52"><template #legend>52 pontos de leitura</template></EdRainbowProgressBar>`,
    },
  },
};
