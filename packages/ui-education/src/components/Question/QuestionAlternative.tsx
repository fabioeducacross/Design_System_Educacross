import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { Checkbox, Radio, Input } from "@fabioeducacross/ui";

export type AlternativeType = "radio" | "checkbox" | "input";

export interface Alternative {
  /**
   * ID único da alternativa
   */
  id: string;
  
  /**
   * Texto/conteúdo da alternativa
   */
  text: string;
  
  /**
   * Se a alternativa está correta (usado para feedback)
   */
  isCorrect?: boolean;
  
  /**
   * Texto de feedback para mostrar quando selecionada
   */
  feedback?: string;
  
  /**
   * Imagem associada (opcional)
   */
  image?: string;
}

export interface QuestionAlternativeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Tipo de alternativa (radio, checkbox, input)
   */
  type: AlternativeType;
  
  /**
   * Dados da alternativa
   */
  alternative: Alternative;
  
  /**
   * Se está selecionada/respondida
   */
  selected?: boolean;
  
  /**
   * Callback quando selecionada
   */
  onChange?: (selected: boolean, value?: string) => void;
  
  /**
   * Se está em modo apenas leitura
   */
  readOnly?: boolean;
  
  /**
   * Se deve desabilitar a alternativa
   */
  disabled?: boolean;
  
  /**
   * Se deve mostrar feedback (correto/incorreto)
   */
  showFeedback?: boolean;
  
  /**
   * Status da alternativa (para feedback visual)
   */
  status?: "correct" | "incorrect" | "pending" | "unanswered";
  
  /**
   * Nome do grupo (para inputs radio)
   */
  name?: string;
}

/**
 * QuestionAlternative - Componente de alternativa de questão
 * 
 * Renderiza uma alternativa de questão com suporte a diferentes tipos
 * de interação (radio, checkbox, input) e estados visuais (correto/incorreto).
 * 
 * @example
 * ```tsx
 * <QuestionAlternative
 *   type="radio"
 *   alternative={{ id: "a", text: "Brasília", isCorrect: true }}
 *   selected={false}
 *   onChange={(selected) => console.log(selected)}
 * />
 * ```
 */
export const QuestionAlternative = React.forwardRef<HTMLDivElement, QuestionAlternativeProps>(
  (
    {
      className,
      type,
      alternative,
      selected = false,
      onChange,
      readOnly = false,
      disabled = false,
      showFeedback = false,
      status,
      name,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");

    const isDisabled = disabled || readOnly;

    const handleChange = (checked: boolean) => {
      if (isDisabled) return;
      onChange?.(checked, type === "input" ? inputValue : undefined);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      const value = e.target.value;
      setInputValue(value);
      onChange?.(true, value);
    };

    // Determinar classes de feedback
    // Prioridade: status explícito > lógica baseada em seleção
    const getFeedbackClass = () => {
      if (!showFeedback && !status) return "";
      
      // Status explícito tem prioridade
      if (status === "correct") {
        return "border-green-500 bg-green-50 dark:bg-green-950/20";
      }
      if (status === "incorrect") {
        return "border-red-500 bg-red-50 dark:bg-red-950/20";
      }
      if (status === "pending" || status === "unanswered") {
        return ""; // Sem estilo especial
      }
      
      // Lógica baseada em seleção (quando showFeedback mas sem status)
      if (showFeedback && selected && alternative.isCorrect) {
        return "border-green-500 bg-green-50 dark:bg-green-950/20";
      }
      if (showFeedback && selected && !alternative.isCorrect) {
        return "border-red-500 bg-red-50 dark:bg-red-950/20";
      }
      if (showFeedback && !selected && alternative.isCorrect) {
        return "border-green-500 bg-green-50/50 dark:bg-green-950/10";
      }
      
      return "";
    };
    
    const feedbackClass = getFeedbackClass();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 rounded-lg border border-border p-4",
          "transition-all duration-200",
          "hover:bg-accent/50",
          {
            "bg-accent": selected && !showFeedback,
            "cursor-pointer": !isDisabled,
            "cursor-not-allowed opacity-60": isDisabled,
          },
          feedbackClass,
          className
        )}
        onClick={() => type !== "input" && handleChange(!selected)}
        {...props}
      >
        {/* Input Control */}
        <div className="pt-0.5">
          {type === "radio" && (
            <Radio
              value={alternative.id}
              checked={selected}
              onChange={() => handleChange(!selected)}
              disabled={isDisabled}
              name={name}
            />
          )}
          {type === "checkbox" && (
            <Checkbox
              checked={selected}
              onChange={() => handleChange(!selected)}
              disabled={isDisabled}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Text */}
          <div className="text-sm text-foreground mb-2">
            {alternative.text}
          </div>

          {/* Image */}
          {alternative.image && (
            <img
              src={alternative.image}
              alt={alternative.text}
              className="max-w-full h-auto rounded-md mt-2"
            />
          )}

          {/* Input Field (para tipo input) */}
          {type === "input" && (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              disabled={isDisabled}
              placeholder="Digite sua resposta..."
              className="mt-2"
            />
          )}

          {/* Feedback Icon */}
          {showFeedback && selected && (
            <div className="mt-2 flex items-center gap-2">
              {alternative.isCorrect ? (
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  ✓ Correto
                </span>
              ) : (
                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                  ✗ Incorreto
                </span>
              )}
            </div>
          )}

          {/* Feedback Text */}
          {showFeedback && alternative.feedback && (
            <div className={cn(
              "mt-2 text-sm px-3 py-2 rounded-md",
              alternative.isCorrect 
                ? "bg-success/10 text-success-foreground border border-success/20"
                : "bg-destructive/10 text-destructive-foreground border border-destructive/20"
            )}>
              {alternative.feedback}
            </div>
          )}
        </div>
      </div>
    );
  }
);

QuestionAlternative.displayName = "QuestionAlternative";
