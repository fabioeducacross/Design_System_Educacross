import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fabioeducacross/ui";

const statusVariants = cva(
  [
    "inline-flex items-center gap-2 rounded-full px-3 py-1",
    "text-xs font-medium",
    "transition-colors duration-200",
  ],
  {
    variants: {
      status: {
        correct: [
          "bg-green-100 text-green-700",
          "dark:bg-green-950 dark:text-green-400",
          "border border-green-200 dark:border-green-800",
        ],
        incorrect: [
          "bg-red-100 text-red-700",
          "dark:bg-red-950 dark:text-red-400",
          "border border-red-200 dark:border-red-800",
        ],
        pending: [
          "bg-yellow-100 text-yellow-700",
          "dark:bg-yellow-950 dark:text-yellow-400",
          "border border-yellow-200 dark:border-yellow-800",
        ],
        unanswered: [
          "bg-gray-100 text-gray-700",
          "dark:bg-gray-800 dark:text-gray-400",
          "border border-gray-200 dark:border-gray-700",
        ],
      },
    },
    defaultVariants: {
      status: "unanswered",
    },
  }
);

export interface QuestionStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  /**
   * Status da questão
   */
  status: "correct" | "incorrect" | "pending" | "unanswered";
  
  /**
   * Texto customizado (opcional, sobrescreve o padrão)
   */
  label?: string;
  
  /**
   * Se deve mostrar o ícone
   */
  showIcon?: boolean;
}

/**
 * QuestionStatus - Indicador de status da questão
 * 
 * Componente visual para mostrar o estado de uma questão
 * (correto, incorreto, pendente, não respondida).
 * 
 * @example
 * ```tsx
 * <QuestionStatus status="correct" />
 * <QuestionStatus status="incorrect" label="Resposta errada" />
 * <QuestionStatus status="pending" showIcon />
 * ```
 */
export const QuestionStatus = React.forwardRef<HTMLDivElement, QuestionStatusProps>(
  (
    {
      className,
      status,
      label,
      showIcon = true,
      ...props
    },
    ref
  ) => {
    // Mapeamento de ícones por status
    const icons = {
      correct: "✓",
      incorrect: "✗",
      pending: "⏱",
      unanswered: "○",
    };

    // Mapeamento de labels padrão
    const defaultLabels = {
      correct: "Correto",
      incorrect: "Incorreto",
      pending: "Pendente",
      unanswered: "Não respondida",
    };

    const displayLabel = label || defaultLabels[status];
    const icon = icons[status];

    return (
      <div
        ref={ref}
        className={cn(statusVariants({ status }), className)}
        role="status"
        aria-label={displayLabel}
        {...props}
      >
        {showIcon && (
          <span className="text-base leading-none" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{displayLabel}</span>
      </div>
    );
  }
);

QuestionStatus.displayName = "QuestionStatus";
