import type { Meta, StoryObj } from "@storybook/react";

/**
 * **EFormCheck** - Checkbox/Radio do Design System
 * 
 * Componente de formulário para seleção única ou múltipla.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/form/EFormCheck.vue`
 * 
 * @example
 * ```vue
 * <EFormCheck v-model="checked" label="Aceito os termos" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Forms/EFormCheck",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Checkbox e radio buttons estilizados do Frontoffice.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label do checkbox",
    },
    checked: {
      control: "boolean",
      description: "Estado marcado/desmarcado",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
    type: {
      control: "select",
      options: ["checkbox", "radio", "switch"],
      description: "Tipo do input",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const EFormCheckMock = ({ 
  label, 
  checked = false,
  disabled = false,
  type = "checkbox",
  variant = "primary"
}: { 
  label: string;
  checked?: boolean;
  disabled?: boolean;
  type?: "checkbox" | "radio" | "switch";
  variant?: "primary" | "success" | "warning" | "danger";
}) => {
  const variantColors = {
    primary: "bg-primary border-primary",
    success: "bg-success border-success",
    warning: "bg-warning border-warning",
    danger: "bg-destructive border-destructive",
  };

  if (type === "switch") {
    return (
      <label className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}>
        <div className="relative">
          <div className={`
            w-11 h-6 rounded-full transition-colors
            ${checked ? variantColors[variant] : "bg-muted"}
          `}>
            <div className={`
              absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm
              transition-transform duration-200
              ${checked ? "translate-x-5" : "translate-x-0.5"}
            `} />
          </div>
        </div>
        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  }

  return (
    <label className={`
      inline-flex items-center gap-2 cursor-pointer
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}>
      <div className={`
        w-4 h-4 border-2 flex items-center justify-center
        ${type === "radio" ? "rounded-full" : "rounded"}
        ${checked ? variantColors[variant] : "border-input bg-background"}
        transition-colors
      `}>
        {checked && (
          type === "radio" ? (
            <div className="w-2 h-2 bg-white rounded-full" />
          ) : (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )
        )}
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
};

export const Checkbox: Story = {
  render: () => (
    <div className="space-y-3">
      <EFormCheckMock label="Opção não marcada" checked={false} />
      <EFormCheckMock label="Opção marcada" checked={true} />
      <EFormCheckMock label="Opção desabilitada" disabled />
      <EFormCheckMock label="Marcada e desabilitada" checked disabled />
    </div>
  ),
};

export const Radio: Story = {
  render: () => (
    <div className="space-y-3">
      <EFormCheckMock type="radio" label="Opção A" checked={true} />
      <EFormCheckMock type="radio" label="Opção B" checked={false} />
      <EFormCheckMock type="radio" label="Opção C" checked={false} />
      <EFormCheckMock type="radio" label="Opção D (desabilitada)" disabled />
    </div>
  ),
};

export const Switch: Story = {
  render: () => (
    <div className="space-y-3">
      <EFormCheckMock type="switch" label="Notificações" checked={true} />
      <EFormCheckMock type="switch" label="Modo escuro" checked={false} />
      <EFormCheckMock type="switch" label="Som (desabilitado)" disabled />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-6">
        <EFormCheckMock label="Primary" checked variant="primary" />
        <EFormCheckMock label="Success" checked variant="success" />
        <EFormCheckMock label="Warning" checked variant="warning" />
        <EFormCheckMock label="Danger" checked variant="danger" />
      </div>
      <div className="flex gap-6">
        <EFormCheckMock type="switch" label="Primary" checked variant="primary" />
        <EFormCheckMock type="switch" label="Success" checked variant="success" />
        <EFormCheckMock type="switch" label="Warning" checked variant="warning" />
        <EFormCheckMock type="switch" label="Danger" checked variant="danger" />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  name: "Exemplo: Formulário de Preferências",
  render: () => (
    <div className="max-w-md p-6 border rounded-lg space-y-6">
      <h3 className="text-lg font-semibold">Preferências</h3>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Notificações</p>
        <EFormCheckMock type="switch" label="Email" checked />
        <EFormCheckMock type="switch" label="Push" checked={false} />
        <EFormCheckMock type="switch" label="SMS" checked={false} />
      </div>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Frequência</p>
        <EFormCheckMock type="radio" label="Diária" checked />
        <EFormCheckMock type="radio" label="Semanal" />
        <EFormCheckMock type="radio" label="Mensal" />
      </div>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Interesses</p>
        <EFormCheckMock label="Matemática" checked />
        <EFormCheckMock label="Português" checked />
        <EFormCheckMock label="Ciências" />
        <EFormCheckMock label="História" />
      </div>
    </div>
  ),
};
