import type { Meta, StoryObj } from "@storybook/react";

/**
 * **Divider** - Componente de divisão visual
 * 
 * Separador horizontal com texto opcional.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/divider/Divider.vue`
 * 
 * @example
 * ```vue
 * <Divider text="Seção" variant="primary" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Layout/Divider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Separador horizontal com texto opcional centralizado.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "Texto exibido no centro do divisor",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "dashed"],
      description: "Estilo visual do divisor",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const DividerMock = ({ text, variant = "default" }: { text?: string; variant?: string }) => (
  <div className="w-full py-4">
    <div className={`
      flex items-center gap-4
      ${variant === "dashed" ? "" : ""}
    `}>
      <div className={`
        flex-1 h-px
        ${variant === "primary" ? "bg-primary" : ""}
        ${variant === "secondary" ? "bg-secondary" : ""}
        ${variant === "dashed" ? "border-t border-dashed border-border" : "bg-border"}
      `} />
      {text && (
        <span className={`
          text-sm font-medium
          ${variant === "primary" ? "text-primary" : "text-muted-foreground"}
        `}>
          {text}
        </span>
      )}
      <div className={`
        flex-1 h-px
        ${variant === "primary" ? "bg-primary" : ""}
        ${variant === "secondary" ? "bg-secondary" : ""}
        ${variant === "dashed" ? "border-t border-dashed border-border" : "bg-border"}
      `} />
    </div>
  </div>
);

export const Default: Story = {
  render: () => <DividerMock />,
};

export const WithText: Story = {
  render: () => <DividerMock text="ou continue com" />,
};

export const Primary: Story = {
  render: () => <DividerMock text="Seção Principal" variant="primary" />,
};

export const Dashed: Story = {
  render: () => <DividerMock text="Separador" variant="dashed" />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <DividerMock />
      <DividerMock text="Default" />
      <DividerMock text="Primary" variant="primary" />
      <DividerMock text="Secondary" variant="secondary" />
      <DividerMock text="Dashed" variant="dashed" />
    </div>
  ),
};
