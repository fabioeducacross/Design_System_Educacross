import * as React from "react";
import { QuestionContent } from "../QuestionContent";
import { QuestionAlternative, type Alternative } from "../QuestionAlternative";

export interface TrueFalseData {
  /**
   * Resposta correta
   */
  correctAnswer: boolean;
  
  /**
   * Texto customizado para opção "Verdadeiro"
   * @default "Verdadeiro"
   */
  trueLabel?: string;
  
  /**
   * Texto customizado para opção "Falso"
   * @default "Falso"
   */
  falseLabel?: string;
}

export interface TrueFalseProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão (resposta correta e labels)
   */
  data: TrueFalseData;
  
  /**
   * Resposta atual (boolean)
   */
  answer?: boolean;
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: boolean) => void;
  
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
 * Template TrueFalse - Questões Verdadeiro ou Falso
 * 
 * Questão simples com duas opções: Verdadeiro ou Falso.
 * Suporta customização dos labels e feedback visual.
 * 
 * @example
 * ```tsx
 * <TrueFalse
 *   content="O Brasil é o maior país da América do Sul."
 *   data={{
 *     correctAnswer: true,
 *     trueLabel: "Verdadeiro",
 *     falseLabel: "Falso"
 *   }}
 *   answer={true}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const TrueFalse = React.forwardRef<HTMLDivElement, TrueFalseProps>(
  ({ content, data, answer, onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { correctAnswer, trueLabel = "Verdadeiro", falseLabel = "Falso" } = data;
    
    // Criar alternativas baseadas nos labels
    const alternatives: Alternative[] = React.useMemo(
      () => [
        {
          id: "true",
          text: trueLabel,
          isCorrect: correctAnswer === true,
        },
        {
          id: "false",
          text: falseLabel,
          isCorrect: correctAnswer === false,
        },
      ],
      [trueLabel, falseLabel, correctAnswer]
    );
    
    /**
     * Handler para mudança de seleção
     */
    const handleSelectionChange = React.useCallback(
      (alternativeId: string, selected: boolean) => {
        if (readOnly || !onAnswerChange || !selected) return;
        
        const booleanAnswer = alternativeId === "true";
        onAnswerChange(booleanAnswer);
      },
      [readOnly, onAnswerChange]
    );
    
    /**
     * Determina qual alternativa está selecionada
     */
    const selectedId = React.useMemo(() => {
      if (answer === undefined) return undefined;
      return answer ? "true" : "false";
    }, [answer]);
    
    /**
     * Determina o status da alternativa para feedback visual
     */
    const getAlternativeStatus = React.useCallback(
      (alternative: Alternative): "correct" | "incorrect" | undefined => {
        if (!showFeedback) return undefined;
        
        const isSelected = selectedId === alternative.id;
        
        if (isSelected && alternative.isCorrect) return "correct";
        if (isSelected && !alternative.isCorrect) return "incorrect";
        if (!isSelected && alternative.isCorrect) return "correct"; // Mostrar resposta correta
        
        return undefined;
      },
      [showFeedback, selectedId]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Alternativas */}
        <div className="grid gap-3 sm:grid-cols-2">
          {alternatives.map((alternative) => (
            <QuestionAlternative
              key={alternative.id}
              type="radio"
              alternative={alternative}
              selected={selectedId === alternative.id}
              onChange={(selected: boolean) => handleSelectionChange(alternative.id, selected)}
              readOnly={readOnly}
              showFeedback={showFeedback}
              status={getAlternativeStatus(alternative)}
              name="true-false-question"
            />
          ))}
        </div>
        
        {/* Mensagem quando nenhuma alternativa selecionada */}
        {!readOnly && answer === undefined && (
          <p className="text-sm text-muted-foreground italic">
            Selecione Verdadeiro ou Falso
          </p>
        )}
      </div>
    );
  }
);

TrueFalse.displayName = "TrueFalse";
