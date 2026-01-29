import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";
import { QuestionAlternative, type Alternative } from "../QuestionAlternative";

export interface MultipleChoiceData {
  /**
   * Lista de alternativas
   */
  alternatives: Alternative[];
  
  /**
   * Se permite múltiplas seleções (checkboxes ao invés de radio)
   * @default false
   */
  multipleSelection?: boolean;
  
  /**
   * Número de alternativas por linha (para layout em grid)
   * @default 1
   */
  columnsCount?: number;
  
  /**
   * Se deve embaralhar as alternativas
   * @default false
   */
  shuffle?: boolean;
}

export interface MultipleChoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão (alternativas e configurações)
   */
  data: MultipleChoiceData;
  
  /**
   * Resposta atual (array de IDs selecionados)
   */
  answer?: string[];
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: string[]) => void;
  
  /**
   * Se a questão está em modo de visualização
   */
  readOnly?: boolean;
  
  /**
   * Se deve mostrar feedback/correção
   */
  showFeedback?: boolean;
}

/**
 * Template MultipleChoice - Questões de múltipla escolha com radio buttons ou checkboxes
 * 
 * Suporta:
 * - Seleção única (radio) ou múltipla (checkbox)
 * - Feedback visual (correto/incorreto)
 * - Layout em colunas
 * - Imagens nas alternativas
 * 
 * @example
 * ```tsx
 * <MultipleChoice
 *   content="Qual é a capital do Brasil?"
 *   data={{
 *     alternatives: [
 *       { id: "1", text: "Rio de Janeiro", isCorrect: false },
 *       { id: "2", text: "Brasília", isCorrect: true },
 *       { id: "3", text: "São Paulo", isCorrect: false },
 *     ]
 *   }}
 *   answer={["2"]}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const MultipleChoice = React.forwardRef<HTMLDivElement, MultipleChoiceProps>(
  ({ className, content, data, answer = [], onAnswerChange, readOnly = false, showFeedback = false, ...rest }, ref) => {
    const { alternatives = [], multipleSelection = false, columnsCount = 1 } = data;
    
    // Controla quais alternativas estão selecionadas
    // answer pode ser array direto ou objeto {selected: string | string[]}
    const selectedIds = React.useMemo(() => {
      if (Array.isArray(answer)) return new Set(answer);
      if (typeof answer === 'object' && answer !== null && 'selected' in answer) {
        const answerObj = answer as { selected: string | string[] };
        const selected = answerObj.selected;
        return new Set(Array.isArray(selected) ? selected : [selected]);
      }
      return new Set<string>();
    }, [answer]);
    
    /**
     * Handler para mudança de seleção
     */
    const handleSelectionChange = React.useCallback(
      (alternativeId: string, selected: boolean) => {
        if (readOnly || !onAnswerChange) return;
        
        // Garante que currentAnswer seja sempre array
        let currentAnswer: string[] = [];
        if (Array.isArray(answer)) {
          currentAnswer = answer;
        } else if (typeof answer === 'object' && answer !== null && 'selected' in answer) {
          const answerObj = answer as { selected: string | string[] };
          currentAnswer = Array.isArray(answerObj.selected) ? answerObj.selected : [answerObj.selected];
        }
        
        let newAnswer: string[];
        
        if (multipleSelection) {
          // Checkbox: adiciona ou remove da lista
          newAnswer = selected
            ? [...currentAnswer, alternativeId]
            : currentAnswer.filter(id => id !== alternativeId);
        } else {
          // Radio: substitui a seleção
          newAnswer = selected ? [alternativeId] : [];
        }
        
        onAnswerChange(newAnswer);
      },
      [answer, multipleSelection, readOnly, onAnswerChange]
    );
    
    /**
     * Determina o status da alternativa para feedback visual
     */
    const getAlternativeStatus = React.useCallback(
      (alternative: Alternative): "correct" | "incorrect" | undefined => {
        if (!showFeedback) return undefined;
        
        const isSelected = selectedIds.has(alternative.id);
        
        if (isSelected && alternative.isCorrect) return "correct";
        if (isSelected && !alternative.isCorrect) return "incorrect";
        if (!isSelected && alternative.isCorrect) return "correct"; // Mostrar resposta correta
        
        return undefined;
      },
      [showFeedback, selectedIds]
    );
    
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...rest}>
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Alternativas */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: columnsCount > 1 ? `repeat(${columnsCount}, 1fr)` : "1fr"
          }}
        >
          {alternatives.map((alternative) => (
            <QuestionAlternative
              key={alternative.id}
              type={multipleSelection ? "checkbox" : "radio"}
              alternative={alternative}
              name="question"
              selected={selectedIds.has(alternative.id)}
              onChange={(selected: boolean) => handleSelectionChange(alternative.id, selected)}
              readOnly={readOnly}
              showFeedback={showFeedback}
              status={getAlternativeStatus(alternative)}
            />
          ))}
        </div>
        
        {/* Mensagem quando nenhuma alternativa selecionada */}
        {!readOnly && answer.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            {multipleSelection 
              ? "Selecione uma ou mais alternativas" 
              : "Selecione uma alternativa"}
          </p>
        )}
      </div>
    );
  }
);

MultipleChoice.displayName = "MultipleChoice";
