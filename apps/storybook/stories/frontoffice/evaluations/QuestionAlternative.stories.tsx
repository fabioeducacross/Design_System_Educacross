import type { Meta, StoryObj } from "@storybook/react";

/**
 * **QuestionAlternative** - Alternativa de questão
 * 
 * Exibe uma alternativa de questão com status (correta, incorreta, selecionada).
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/evaluations/questionDetail/.../QuestionAlternative.vue`
 * 
 * @example
 * ```vue
 * <QuestionAlternative 
 *   :alternative="{ id: 1, text: 'Resposta A', correct: true }"
 *   :selected="true"
 * />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Evaluations/QuestionAlternative",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Alternativa individual de uma questão de múltipla escolha.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "Texto da alternativa",
    },
    letter: {
      control: "text",
      description: "Letra da alternativa (A, B, C...)",
    },
    isCorrect: {
      control: "boolean",
      description: "Se é a alternativa correta",
    },
    isSelected: {
      control: "boolean",
      description: "Se foi selecionada pelo aluno",
    },
    showResult: {
      control: "boolean",
      description: "Mostrar resultado (correta/incorreta)",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const QuestionAlternativeMock = ({ 
  letter = "A",
  text,
  isCorrect = false,
  isSelected = false,
  showResult = false,
  disabled = false
}: { 
  letter?: string;
  text: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  showResult?: boolean;
  disabled?: boolean;
}) => {
  // Determinar estado visual
  let bgClass = "bg-card hover:bg-accent/50";
  let borderClass = "border-border";
  let letterBg = "bg-muted";
  let letterText = "text-muted-foreground";
  let icon = null;

  if (showResult) {
    if (isCorrect) {
      bgClass = "bg-success/10";
      borderClass = "border-success";
      letterBg = "bg-success";
      letterText = "text-white";
      icon = "check_circle";
    } else if (isSelected && !isCorrect) {
      bgClass = "bg-destructive/10";
      borderClass = "border-destructive";
      letterBg = "bg-destructive";
      letterText = "text-white";
      icon = "cancel";
    }
  } else if (isSelected) {
    bgClass = "bg-primary/10";
    borderClass = "border-primary";
    letterBg = "bg-primary";
    letterText = "text-primary-foreground";
  }

  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer
      ${bgClass} ${borderClass}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}>
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
        ${letterBg} ${letterText}
      `}>
        {letter}
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground">{text}</p>
      </div>
      {icon && (
        <span className={`
          material-symbols-outlined text-xl
          ${isCorrect ? "text-success" : "text-destructive"}
        `}>
          {icon}
        </span>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock letter="A" text="Esta é a primeira alternativa da questão." />
      <QuestionAlternativeMock letter="B" text="Esta é a segunda alternativa da questão." />
      <QuestionAlternativeMock letter="C" text="Esta é a terceira alternativa da questão." />
      <QuestionAlternativeMock letter="D" text="Esta é a quarta alternativa da questão." />
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock letter="A" text="Alternativa não selecionada" />
      <QuestionAlternativeMock letter="B" text="Alternativa selecionada pelo aluno" isSelected />
      <QuestionAlternativeMock letter="C" text="Alternativa não selecionada" />
      <QuestionAlternativeMock letter="D" text="Alternativa não selecionada" />
    </div>
  ),
};

export const CorrectAnswer: Story = {
  name: "Resultado: Resposta Correta",
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock letter="A" text="Alternativa incorreta" showResult />
      <QuestionAlternativeMock letter="B" text="Alternativa correta e selecionada" isCorrect isSelected showResult />
      <QuestionAlternativeMock letter="C" text="Alternativa incorreta" showResult />
      <QuestionAlternativeMock letter="D" text="Alternativa incorreta" showResult />
    </div>
  ),
};

export const WrongAnswer: Story = {
  name: "Resultado: Resposta Incorreta",
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock letter="A" text="Alternativa incorreta selecionada pelo aluno" isSelected showResult />
      <QuestionAlternativeMock letter="B" text="Alternativa incorreta" showResult />
      <QuestionAlternativeMock letter="C" text="Esta era a alternativa correta" isCorrect showResult />
      <QuestionAlternativeMock letter="D" text="Alternativa incorreta" showResult />
    </div>
  ),
};

export const LongText: Story = {
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock 
        letter="A" 
        text="Esta é uma alternativa com um texto muito longo que pode ocupar múltiplas linhas. Isso é comum em questões que precisam de descrições detalhadas ou que contêm fórmulas e explicações extensas." 
      />
      <QuestionAlternativeMock 
        letter="B" 
        text="Outra alternativa com texto extenso para demonstrar como o componente lida com conteúdo maior e mantém a legibilidade e o alinhamento correto dos elementos."
        isSelected
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-xl space-y-2">
      <QuestionAlternativeMock letter="A" text="Alternativa desabilitada" disabled />
      <QuestionAlternativeMock letter="B" text="Alternativa desabilitada" disabled />
      <QuestionAlternativeMock letter="C" text="Alternativa desabilitada" disabled />
    </div>
  ),
};
