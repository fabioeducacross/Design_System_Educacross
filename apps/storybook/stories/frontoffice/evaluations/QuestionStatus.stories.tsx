import type { Meta, StoryObj } from "@storybook/react";

/**
 * **QuestionStatus** - Status de questão
 * 
 * Badge que indica o status de uma questão (correta, incorreta, pendente).
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/question/QuestionStatus.vue`
 * 
 * @example
 * ```vue
 * <QuestionStatus status="correct" showLabel />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Evaluations/QuestionStatus",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Indicador visual do status de uma questão em avaliações.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["correct", "incorrect", "partial", "pending", "skipped"],
      description: "Status da questão",
    },
    showLabel: {
      control: "boolean",
      description: "Mostrar label textual",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do badge",
    },
  },
};

export default meta;
type Story = StoryObj;

type Status = "correct" | "incorrect" | "partial" | "pending" | "skipped";

const statusConfig: Record<Status, { label: string; icon: string; bg: string; text: string }> = {
  correct: { 
    label: "Correta", 
    icon: "check_circle", 
    bg: "bg-success/10", 
    text: "text-success" 
  },
  incorrect: { 
    label: "Incorreta", 
    icon: "cancel", 
    bg: "bg-destructive/10", 
    text: "text-destructive" 
  },
  partial: { 
    label: "Parcial", 
    icon: "remove_circle", 
    bg: "bg-warning/10", 
    text: "text-warning" 
  },
  pending: { 
    label: "Pendente", 
    icon: "pending", 
    bg: "bg-muted", 
    text: "text-muted-foreground" 
  },
  skipped: { 
    label: "Pulada", 
    icon: "skip_next", 
    bg: "bg-secondary/10", 
    text: "text-secondary-foreground" 
  },
};

// Mock do componente Vue
const QuestionStatusMock = ({ 
  status = "pending",
  showLabel = false,
  size = "md"
}: { 
  status?: Status;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: { container: "px-2 py-0.5 text-xs gap-1", icon: "text-sm" },
    md: { container: "px-3 py-1 text-sm gap-1.5", icon: "text-lg" },
    lg: { container: "px-4 py-1.5 text-base gap-2", icon: "text-xl" },
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${config.bg} ${config.text}
      ${sizeClasses[size].container}
    `}>
      <span className={`material-symbols-outlined ${sizeClasses[size].icon}`}>
        {config.icon}
      </span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <QuestionStatusMock status="correct" showLabel />
      <QuestionStatusMock status="incorrect" showLabel />
      <QuestionStatusMock status="partial" showLabel />
      <QuestionStatusMock status="pending" showLabel />
      <QuestionStatusMock status="skipped" showLabel />
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-2">
      <QuestionStatusMock status="correct" />
      <QuestionStatusMock status="incorrect" />
      <QuestionStatusMock status="partial" />
      <QuestionStatusMock status="pending" />
      <QuestionStatusMock status="skipped" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-16">Small:</span>
        <QuestionStatusMock status="correct" showLabel size="sm" />
        <QuestionStatusMock status="incorrect" showLabel size="sm" />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-16">Medium:</span>
        <QuestionStatusMock status="correct" showLabel size="md" />
        <QuestionStatusMock status="incorrect" showLabel size="md" />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-16">Large:</span>
        <QuestionStatusMock status="correct" showLabel size="lg" />
        <QuestionStatusMock status="incorrect" showLabel size="lg" />
      </div>
    </div>
  ),
};

export const QuestionList: Story = {
  name: "Exemplo: Lista de Questões",
  render: () => (
    <div className="max-w-md border rounded-lg overflow-hidden">
      {[
        { num: 1, status: "correct" as Status },
        { num: 2, status: "correct" as Status },
        { num: 3, status: "incorrect" as Status },
        { num: 4, status: "correct" as Status },
        { num: 5, status: "partial" as Status },
        { num: 6, status: "skipped" as Status },
        { num: 7, status: "correct" as Status },
        { num: 8, status: "pending" as Status },
        { num: 9, status: "pending" as Status },
        { num: 10, status: "pending" as Status },
      ].map((q) => (
        <div 
          key={q.num}
          className="flex items-center justify-between px-4 py-2 border-b last:border-b-0 hover:bg-accent/50"
        >
          <span className="text-sm font-medium">Questão {q.num}</span>
          <QuestionStatusMock status={q.status} size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const Summary: Story = {
  name: "Exemplo: Resumo de Avaliação",
  render: () => {
    const results = [
      { status: "correct" as Status, count: 7 },
      { status: "incorrect" as Status, count: 2 },
      { status: "partial" as Status, count: 1 },
      { status: "skipped" as Status, count: 0 },
    ];

    return (
      <div className="p-6 bg-card border rounded-lg max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Resultado da Avaliação</h3>
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.status} className="flex items-center justify-between">
              <QuestionStatusMock status={r.status} showLabel />
              <span className="font-bold text-lg">{r.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-xl">10 questões</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-muted-foreground">Nota</span>
            <span className="font-bold text-2xl text-success">7,5</span>
          </div>
        </div>
      </div>
    );
  },
};
