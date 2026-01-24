import type { Meta, StoryObj } from "@storybook/react";
import { LegendCard } from "@fabioeducacross/ui";
import { Trophy, Flag, BookOpen } from "lucide-react";

const meta = {
  title: "Components/Legends/LegendCard",
  component: LegendCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cartões de legenda que destacam o item ativo (maior percentual), equivalentes ao LegendCard do frontoffice.",
      },
    },
  },
  argTypes: {
    items: { control: "object" },
    active: { control: { type: "number", min: 0, max: 10, step: 1 } },
    tooltipActiveText: { control: "text" },
    renderContent: { control: false },
  },
} satisfies Meta<typeof LegendCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { title: "Leitura", icon: <BookOpen className="h-5 w-5 text-primary" />, variant: "primary" },
  { title: "Missões", icon: <Flag className="h-5 w-5 text-success" />, variant: "success" },
  { title: "Pontuação", icon: <Trophy className="h-5 w-5 text-warning" />, variant: "warning" },
];

export const Default: Story = {
  args: {
    items,
    active: 1,
    tooltipActiveText: "Maior percentual nesta faixa.",
  },
  render: (args) => (
    <LegendCard
      {...args}
      renderContent={(item, index) => (
        <div className="text-sm text-muted-foreground">
          {index === 0 && "45% concluído"}
          {index === 1 && "56% engajado"}
          {index === 2 && "22% aguardando"}
        </div>
      )}
      className="w-full max-w-4xl"
    />
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<LegendCard items={items} active={1} />`,
      vue2: `<LegendCard :items="items" :active="1" />`,
      vue3: `<EdLegendCard :items="items" :active="1" />`,
    },
  },
};
