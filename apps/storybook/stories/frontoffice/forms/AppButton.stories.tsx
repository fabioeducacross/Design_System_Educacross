import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppButton** - Botão principal do Design System
 * 
 * Botão versátil com múltiplas variantes e estados.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/@core/app-button/AppButton.vue`
 * 
 * @example
 * ```vue
 * <AppButton variant="primary" size="md">
 *   Salvar
 * </AppButton>
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Forms/AppButton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Botão principal do Frontoffice com suporte a variantes, tamanhos, loading e ícones.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info", "outline", "ghost", "link"],
      description: "Variante visual do botão",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento",
    },
    block: {
      control: "boolean",
      description: "Botão ocupa largura total",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const AppButtonMock = ({ 
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  block = false,
  icon,
  iconPosition = "left"
}: { 
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
}) => {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "bg-success text-white hover:bg-success/90",
    warning: "bg-warning text-white hover:bg-warning/90",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    info: "bg-info text-white hover:bg-info/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-md font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${block ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
    </button>
  );
};

export const Default: Story = {
  render: () => <AppButtonMock>Botão Primário</AppButtonMock>,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <AppButtonMock variant="primary">Primary</AppButtonMock>
      <AppButtonMock variant="secondary">Secondary</AppButtonMock>
      <AppButtonMock variant="success">Success</AppButtonMock>
      <AppButtonMock variant="warning">Warning</AppButtonMock>
      <AppButtonMock variant="danger">Danger</AppButtonMock>
      <AppButtonMock variant="info">Info</AppButtonMock>
      <AppButtonMock variant="outline">Outline</AppButtonMock>
      <AppButtonMock variant="ghost">Ghost</AppButtonMock>
      <AppButtonMock variant="link">Link</AppButtonMock>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <AppButtonMock size="sm">Small</AppButtonMock>
      <AppButtonMock size="md">Medium</AppButtonMock>
      <AppButtonMock size="lg">Large</AppButtonMock>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <AppButtonMock icon="add">Adicionar</AppButtonMock>
      <AppButtonMock icon="save" variant="success">Salvar</AppButtonMock>
      <AppButtonMock icon="delete" variant="danger">Excluir</AppButtonMock>
      <AppButtonMock icon="arrow_forward" iconPosition="right" variant="outline">Próximo</AppButtonMock>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-3">
      <AppButtonMock loading>Carregando...</AppButtonMock>
      <AppButtonMock loading variant="success">Salvando...</AppButtonMock>
      <AppButtonMock loading variant="outline">Processando...</AppButtonMock>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-3">
      <AppButtonMock disabled>Desabilitado</AppButtonMock>
      <AppButtonMock disabled variant="success">Desabilitado</AppButtonMock>
      <AppButtonMock disabled variant="outline">Desabilitado</AppButtonMock>
    </div>
  ),
};

export const Block: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <AppButtonMock block>Botão Full Width</AppButtonMock>
      <AppButtonMock block variant="outline">Outro Botão Full Width</AppButtonMock>
    </div>
  ),
};

export const ButtonGroup: Story = {
  name: "Exemplo: Grupo de Botões",
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <AppButtonMock variant="outline">Cancelar</AppButtonMock>
        <AppButtonMock>Confirmar</AppButtonMock>
      </div>
      
      <div className="flex gap-2">
        <AppButtonMock icon="arrow_back" variant="ghost">Voltar</AppButtonMock>
        <div className="flex-1" />
        <AppButtonMock variant="outline">Salvar Rascunho</AppButtonMock>
        <AppButtonMock icon="send" variant="success">Publicar</AppButtonMock>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  name: "Exemplo: Botões só com Ícone",
  render: () => (
    <div className="flex gap-2">
      <button className="p-2 rounded-md hover:bg-accent">
        <span className="material-symbols-outlined">edit</span>
      </button>
      <button className="p-2 rounded-md hover:bg-accent">
        <span className="material-symbols-outlined">delete</span>
      </button>
      <button className="p-2 rounded-md hover:bg-accent">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
    </div>
  ),
};
