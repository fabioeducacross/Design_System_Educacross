import type { Meta, StoryObj } from "@storybook/react";
import { LegendEnum } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Legends/LegendEnum",
  component: LegendEnum,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Lista enumerada de legendas com badges e textos, equivalente ao LegendEnum do frontoffice (usado em proficiência/leituras).",
      },
    },
  },
  argTypes: {
    legends: { control: "object" },
    showBorder: { control: "boolean" },
    cardClassName: { control: "text" },
  },
} satisfies Meta<typeof LegendEnum>;

export default meta;
type Story = StoryObj<typeof meta>;

const legends = [
  {
    text: "Nível de proficiência",
    enum: [
      { text: "Emergente", legend: "<strong>0-39%</strong>", variant: "destructive" },
      { text: "Em desenvolvimento", legend: "<strong>40-69%</strong>", variant: "warning" },
      { text: "Proficiente", legend: "<strong>70-100%</strong>", variant: "success" },
    ],
  },
];

export const Default: Story = {
  args: {
    legends,
    showBorder: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<LegendEnum legends={[{ text: 'Nível de proficiência', enum: [{ text: 'Emergente', legend: '<strong>0-39%</strong>', variant: 'destructive' }] }]} showBorder />`,
      vue2: `<LegendEnum :legends="legends" :border="true" />`,
      vue3: `<EdLegendEnum :legends="legends" :show-border="true" />`,
    },
  },
};
