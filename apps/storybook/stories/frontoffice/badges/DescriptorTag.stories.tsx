import type { Meta, StoryObj } from "@storybook/react";

/**
 * **DescriptorTag** - Tag de descritor
 * 
 * Tag que identifica descritores/habilidades em questões e conteúdos.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/descriptors/DescriptorTag.vue`
 * 
 * @example
 * ```vue
 * <DescriptorTag text="D15" variant="primary" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Badges/DescriptorTag",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tag para exibir códigos de descritores e habilidades BNCC.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "Código do descritor",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
      description: "Variante de cor",
    },
    tooltip: {
      control: "text",
      description: "Texto do tooltip com descrição completa",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const DescriptorTagMock = ({ 
  text,
  variant = "default",
  tooltip,
  removable = false,
  onClick
}: { 
  text: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  tooltip?: string;
  removable?: boolean;
  onClick?: () => void;
}) => {
  const variantClasses = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary border-primary/30",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-medium
        ${variantClasses[variant]}
        ${onClick ? "cursor-pointer hover:opacity-80" : ""}
      `}
      title={tooltip}
      onClick={onClick}
    >
      {text}
      {removable && (
        <button className="ml-1 hover:text-foreground">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      )}
    </span>
  );
};

export const Default: Story = {
  render: () => <DescriptorTagMock text="D15" />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <DescriptorTagMock text="D01" variant="default" />
      <DescriptorTagMock text="D15" variant="primary" />
      <DescriptorTagMock text="D23" variant="secondary" />
      <DescriptorTagMock text="D08" variant="success" />
      <DescriptorTagMock text="D12" variant="warning" />
      <DescriptorTagMock text="D05" variant="danger" />
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <DescriptorTagMock 
        text="D15" 
        variant="primary"
        tooltip="Reconhecer diferentes formas de representação de um mesmo número racional"
      />
      <DescriptorTagMock 
        text="D23" 
        variant="primary"
        tooltip="Resolver problema utilizando o cálculo de porcentagem"
      />
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <DescriptorTagMock text="D15" variant="primary" removable />
      <DescriptorTagMock text="D23" variant="primary" removable />
      <DescriptorTagMock text="D08" variant="primary" removable />
    </div>
  ),
};

export const BNCCCodes: Story = {
  name: "Exemplo: Códigos BNCC",
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Matemática - 5º Ano</p>
        <div className="flex flex-wrap gap-2">
          <DescriptorTagMock text="EF05MA01" variant="primary" tooltip="Ler, escrever e ordenar números naturais até a ordem das centenas de milhar" />
          <DescriptorTagMock text="EF05MA02" variant="primary" tooltip="Ler, escrever e ordenar números racionais na forma decimal" />
          <DescriptorTagMock text="EF05MA03" variant="primary" tooltip="Identificar e representar frações" />
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Português - 5º Ano</p>
        <div className="flex flex-wrap gap-2">
          <DescriptorTagMock text="EF05LP01" variant="success" tooltip="Grafar palavras utilizando regras de correspondência fonema-grafema" />
          <DescriptorTagMock text="EF05LP02" variant="success" tooltip="Identificar o caráter polissêmico das palavras" />
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Descritores SAEB</p>
        <div className="flex flex-wrap gap-2">
          <DescriptorTagMock text="D01" variant="warning" />
          <DescriptorTagMock text="D03" variant="warning" />
          <DescriptorTagMock text="D05" variant="warning" />
          <DescriptorTagMock text="D15" variant="warning" />
          <DescriptorTagMock text="D23" variant="warning" />
        </div>
      </div>
    </div>
  ),
};

export const QuestionCard: Story = {
  name: "Exemplo: Card de Questão",
  render: () => (
    <div className="max-w-lg p-4 bg-card border rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
          Questão 1
        </span>
        <div className="flex gap-1">
          <DescriptorTagMock text="D15" variant="primary" />
          <DescriptorTagMock text="D23" variant="primary" />
        </div>
      </div>
      <p className="text-sm text-foreground">
        João tinha 45 figurinhas e ganhou mais 28 de seu amigo. Quantas figurinhas João tem agora?
      </p>
      <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-muted-foreground">
        <span>Dificuldade: Fácil</span>
        <span>•</span>
        <span>Matemática</span>
        <span>•</span>
        <span>5º Ano</span>
      </div>
    </div>
  ),
};
