import * as React from "react";
import { QuestionContent } from "../QuestionContent";

export interface EssayData {
  /**
   * Número mínimo de caracteres
   */
  minLength?: number;
  
  /**
   * Número máximo de caracteres
   */
  maxLength?: number;
  
  /**
   * Número mínimo de palavras
   */
  minWords?: number;
  
  /**
   * Placeholder do textarea
   */
  placeholder?: string;
  
  /**
   * Altura mínima do textarea em linhas
   * @default 6
   */
  rows?: number;
}

export interface EssayProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão (configurações do textarea)
   */
  data: EssayData;
  
  /**
   * Resposta atual (texto)
   */
  answer?: string;
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: string) => void;
  
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
 * Template Essay - Questões dissertativas com textarea
 * 
 * Suporta:
 * - Validação de comprimento (caracteres)
 * - Validação de número de palavras
 * - Contador de caracteres/palavras
 * - Modo somente leitura
 * 
 * @example
 * ```tsx
 * <Essay
 *   content="Explique o conceito de fotossíntese."
 *   data={{
 *     minLength: 100,
 *     maxLength: 500,
 *     minWords: 20,
 *     placeholder: "Digite sua resposta aqui...",
 *     rows: 8
 *   }}
 *   answer={userAnswer}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Essay = React.forwardRef<HTMLDivElement, EssayProps>(
  ({ content, data, answer = "", onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const {
      minLength,
      maxLength,
      minWords,
      placeholder = "Digite sua resposta aqui...",
      rows = 6,
    } = data;
    
    // Calcula estatísticas da resposta
    const stats = React.useMemo(() => {
      const charCount = answer.length;
      const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
      
      return { charCount, wordCount };
    }, [answer]);
    
    // Validações
    const validation = React.useMemo(() => {
      const errors: string[] = [];
      
      if (minLength && stats.charCount < minLength) {
        errors.push(`Mínimo de ${minLength} caracteres (atual: ${stats.charCount})`);
      }
      
      if (maxLength && stats.charCount > maxLength) {
        errors.push(`Máximo de ${maxLength} caracteres (atual: ${stats.charCount})`);
      }
      
      if (minWords && stats.wordCount < minWords) {
        errors.push(`Mínimo de ${minWords} palavras (atual: ${stats.wordCount})`);
      }
      
      return {
        isValid: errors.length === 0,
        errors,
      };
    }, [stats, minLength, maxLength, minWords]);
    
    /**
     * Handler para mudança de texto
     */
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (readOnly || !onAnswerChange) return;
        
        const newValue = e.target.value;
        
        // Impede ultrapassar o maxLength se definido
        if (maxLength && newValue.length > maxLength) {
          return;
        }
        
        onAnswerChange(newValue);
      },
      [readOnly, onAnswerChange, maxLength]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Textarea */}
        <div className="space-y-2">
          <textarea
            value={answer}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            readOnly={readOnly}
            className={`
              w-full px-4 py-3 rounded-lg border text-sm
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              ${readOnly ? "bg-muted cursor-default" : "bg-background"}
              ${validation.isValid ? "border-input" : "border-destructive"}
            `}
            aria-label="Resposta dissertativa"
            aria-invalid={!validation.isValid}
            aria-describedby={
              !validation.isValid ? "essay-validation-errors" : undefined
            }
          />
          
          {/* Contador e Validações */}
          <div className="flex justify-between items-start gap-4 text-xs">
            {/* Estatísticas */}
            <div className="flex gap-4 text-muted-foreground">
              <span>
                {stats.charCount} {stats.charCount === 1 ? "caractere" : "caracteres"}
                {maxLength && ` / ${maxLength}`}
              </span>
              <span>
                {stats.wordCount} {stats.wordCount === 1 ? "palavra" : "palavras"}
                {minWords && ` (mín: ${minWords})`}
              </span>
            </div>
            
            {/* Erros de Validação */}
            {!validation.isValid && (
              <div id="essay-validation-errors" className="text-destructive text-right">
                {validation.errors.map((error, idx) => (
                  <div key={idx}>{error}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mensagem quando vazio */}
        {!readOnly && answer.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Digite sua resposta no campo acima
          </p>
        )}
        
        {/* Feedback (quando aplicável) */}
        {showFeedback && answer.length > 0 && (
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm font-medium mb-1">Resposta enviada</p>
            <p className="text-sm text-muted-foreground">
              Sua resposta dissertativa foi registrada e será avaliada pelo professor.
            </p>
          </div>
        )}
      </div>
    );
  }
);

Essay.displayName = "Essay";
