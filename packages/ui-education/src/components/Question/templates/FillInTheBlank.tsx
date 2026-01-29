import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";

export interface BlankField {
  /**
   * ID único do campo
   */
  id: string;
  
  /**
   * Resposta(s) correta(s) para este campo
   */
  correctAnswers: string[];
  
  /**
   * Se deve ignorar maiúsculas/minúsculas na comparação
   * @default true
   */
  caseSensitive?: boolean;
  
  /**
   * Placeholder do input
   */
  placeholder?: string;
  
  /**
   * Largura do campo em caracteres
   * @default 10
   */
  size?: number;
}

export interface FillInTheBlankData {
  /**
   * Lista de campos/lacunas a preencher
   */
  fields: BlankField[];
  
  /**
   * Se deve aceitar respostas parciais (considerar correto se alguma das correctAnswers bater)
   * @default true
   */
  acceptPartialMatch?: boolean;
}

export interface FillInTheBlankProps {
  /**
   * Conteúdo/enunciado da questão (com placeholders {{0}}, {{1}}, etc)
   */
  content: string;
  
  /**
   * Dados da questão (campos e configurações)
   */
  data: FillInTheBlankData;
  
  /**
   * Resposta atual (objeto com id do campo -> valor)
   */
  answer?: Record<string, string>;
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: Record<string, string>) => void;
  
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
 * Template FillInTheBlank - Questões de preencher lacunas
 * 
 * O conteúdo deve incluir placeholders no formato {{índice}} que serão
 * substituídos por campos de input.
 * 
 * Suporta:
 * - Múltiplas respostas corretas por campo
 * - Case sensitive/insensitive
 * - Feedback visual por campo
 * - Tamanhos de input customizados
 * 
 * @example
 * ```tsx
 * <FillInTheBlank
 *   content="A capital do Brasil é {{0}} e foi fundada em {{1}}."
 *   data={{
 *     fields: [
 *       { id: "0", correctAnswers: ["Brasília", "Brasilia"], placeholder: "cidade" },
 *       { id: "1", correctAnswers: ["1960"], placeholder: "ano", size: 6 }
 *     ]
 *   }}
 *   answer={{ "0": "Brasília", "1": "1960" }}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const FillInTheBlank = React.forwardRef<HTMLDivElement, FillInTheBlankProps>(
  ({ content, data, answer = {}, onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { fields = [], acceptPartialMatch = true } = data;
    
    /**
     * Verifica se a resposta de um campo está correta
     */
    const isFieldCorrect = React.useCallback(
      (fieldId: string): boolean | undefined => {
        const field = fields.find(f => f.id === fieldId);
        if (!field || !answer[fieldId]) return undefined;
        
        const userAnswer = answer[fieldId].trim();
        if (!userAnswer) return undefined;
        
        return field.correctAnswers.some(correct => {
          const compare = field.caseSensitive !== false
            ? (a: string, b: string) => a === b
            : (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
          
          return compare(userAnswer, correct);
        });
      },
      [fields, answer]
    );
    
    /**
     * Handler para mudança de um campo específico
     */
    const handleFieldChange = React.useCallback(
      (fieldId: string, value: string) => {
        if (readOnly || !onAnswerChange) return;
        
        onAnswerChange({
          ...answer,
          [fieldId]: value,
        });
      },
      [answer, readOnly, onAnswerChange]
    );
    
    /**
     * Renderiza um input para uma lacuna
     */
    const renderBlankInput = React.useCallback(
      (field: BlankField) => {
        const value = answer[field.id] || "";
        const isCorrect = isFieldCorrect(field.id);
        
        // Classes de feedback
        const feedbackClass = showFeedback && isCorrect !== undefined
          ? isCorrect
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "border-red-500 bg-red-50 dark:bg-red-950"
          : "";
        
        return (
          <input
            key={field.id}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            size={field.size || 10}
            readOnly={readOnly}
            className={cn(
              "inline-block px-2 py-1 rounded border border-input",
              "bg-background text-foreground text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-muted cursor-default": readOnly,
              },
              feedbackClass
            )}
            aria-label={`Campo ${field.id}`}
          />
        );
      },
      [answer, readOnly, showFeedback, isFieldCorrect, handleFieldChange]
    );
    
    /**
     * Substitui placeholders {{índice}} por inputs
     */
    const renderContentWithBlanks = React.useMemo(() => {
      // Split content por placeholders
      const parts = content.split(/(\{\{\d+\}\})/g);
      
      return parts.map((part, idx) => {
        // Verifica se é um placeholder
        const match = part.match(/\{\{(\d+)\}\}/);
        if (match) {
          const fieldId = match[1];
          const field = fields.find(f => f.id === fieldId);
          
          if (field) {
            return <React.Fragment key={`field-${idx}`}>{renderBlankInput(field)}</React.Fragment>;
          }
        }
        
        // Texto normal
        return <span key={`text-${idx}`} dangerouslySetInnerHTML={{ __html: part }} />;
      });
    }, [content, fields, renderBlankInput]);
    
    // Estatísticas
    const stats = React.useMemo(() => {
      const totalFields = fields.length;
      const filledFields = Object.values(answer).filter(v => v.trim().length > 0).length;
      const correctFields = showFeedback
        ? fields.filter(f => isFieldCorrect(f.id) === true).length
        : 0;
      
      return { totalFields, filledFields, correctFields };
    }, [fields, answer, showFeedback, isFieldCorrect]);
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado com inputs inline */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="text-foreground leading-relaxed">
            {renderContentWithBlanks}
          </div>
        </div>
        
        {/* Informações */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {stats.filledFields} de {stats.totalFields} campos preenchidos
          </span>
          
          {showFeedback && stats.filledFields > 0 && (
            <span className={stats.correctFields === stats.totalFields ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
              {stats.correctFields} correto(s)
            </span>
          )}
        </div>
        
        {/* Mensagem quando campos vazios */}
        {!readOnly && stats.filledFields === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Preencha as lacunas no texto acima
          </p>
        )}
      </div>
    );
  }
);

FillInTheBlank.displayName = "FillInTheBlank";
