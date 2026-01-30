import type { Meta, StoryObj } from "@storybook/react";

/**
 * **VerticalDivider** - Divisor vertical
 * 
 * Separador vertical para uso entre elementos em linha.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/divider/VerticalDivider.vue`
 * 
 * @example
 * ```vue
 * <div class="flex items-center">
 *   <span>Item 1</span>
 *   <VerticalDivider />
 *   <span>Item 2</span>
 * </div>
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Layout/VerticalDivider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Divisor vertical para separar elementos inline.",
      },
    },
  },
  argTypes: {
    height: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Altura do divisor",
    },
    variant: {
      control: "select",
      options: ["default", "light", "dark"],
      description: "Variante de cor",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const VerticalDividerMock = ({ 
  height = "md",
  variant = "default"
}: { 
  height?: "sm" | "md" | "lg" | "full";
  variant?: "default" | "light" | "dark";
}) => {
  const heightClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    full: "h-full",
  };

  const variantClasses = {
    default: "bg-border",
    light: "bg-border/50",
    dark: "bg-foreground/20",
  };

  return (
    <div className={`
      w-px mx-2
      ${heightClasses[height]}
      ${variantClasses[variant]}
    `} />
  );
};

export const Default: Story = {
  render: () => (
    <div className="flex items-center">
      <span className="text-sm">Item 1</span>
      <VerticalDividerMock />
      <span className="text-sm">Item 2</span>
      <VerticalDividerMock />
      <span className="text-sm">Item 3</span>
    </div>
  ),
};

export const Heights: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-sm w-12">Small:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock height="sm" />
        <span className="text-sm">Item</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm w-12">Medium:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock height="md" />
        <span className="text-sm">Item</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm w-12">Large:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock height="lg" />
        <span className="text-sm">Item</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-sm w-16">Default:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock variant="default" />
        <span className="text-sm">Item</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm w-16">Light:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock variant="light" />
        <span className="text-sm">Item</span>
      </div>
      <div className="flex items-center bg-card p-2 rounded">
        <span className="text-sm w-16">Dark:</span>
        <span className="text-sm">Item</span>
        <VerticalDividerMock variant="dark" />
        <span className="text-sm">Item</span>
      </div>
    </div>
  ),
};

export const InBreadcrumb: Story = {
  name: "Exemplo: Breadcrumb",
  render: () => (
    <nav className="flex items-center text-sm">
      <a href="#" className="text-muted-foreground hover:text-foreground">Home</a>
      <VerticalDividerMock height="sm" />
      <a href="#" className="text-muted-foreground hover:text-foreground">Turmas</a>
      <VerticalDividerMock height="sm" />
      <a href="#" className="text-muted-foreground hover:text-foreground">5º Ano A</a>
      <VerticalDividerMock height="sm" />
      <span className="text-foreground font-medium">Relatório</span>
    </nav>
  ),
};

export const InToolbar: Story = {
  name: "Exemplo: Toolbar",
  render: () => (
    <div className="flex items-center gap-1 p-2 bg-card border rounded-lg">
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_bold</span>
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_italic</span>
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_underlined</span>
      </button>
      
      <VerticalDividerMock height="lg" />
      
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_align_left</span>
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_align_center</span>
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_align_right</span>
      </button>
      
      <VerticalDividerMock height="lg" />
      
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <span className="material-symbols-outlined text-lg">format_list_numbered</span>
      </button>
    </div>
  ),
};

export const InStats: Story = {
  name: "Exemplo: Estatísticas",
  render: () => (
    <div className="flex items-center justify-center gap-6 p-4 bg-card border rounded-lg">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">128</p>
        <p className="text-xs text-muted-foreground">Alunos</p>
      </div>
      
      <VerticalDividerMock height="lg" />
      
      <div className="text-center">
        <p className="text-2xl font-bold text-success">85%</p>
        <p className="text-xs text-muted-foreground">Aprovação</p>
      </div>
      
      <VerticalDividerMock height="lg" />
      
      <div className="text-center">
        <p className="text-2xl font-bold text-warning">42</p>
        <p className="text-xs text-muted-foreground">Missões</p>
      </div>
      
      <VerticalDividerMock height="lg" />
      
      <div className="text-center">
        <p className="text-2xl font-bold text-info">7.2</p>
        <p className="text-xs text-muted-foreground">Média</p>
      </div>
    </div>
  ),
};
