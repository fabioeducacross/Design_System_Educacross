import * as React from "react";
import { cn } from "@fabioeducacross/ui";

export interface ClozeGap {
  /**
   * ID único da lacuna
   */
  id: string;
  
  /**
   * Resposta(s) correta(s)
   */
  correctAnswers: string[];
  
  /**
   * Placeholder
   */
  placeholder?: string;
  
  /**
   * Largura do campo (em caracteres)
   * @default 10
   */
  size?: number;
  
  /**
   * Se deve ignorar maiúsculas/minúsculas
   * @default true
   */
  caseSensitive?: boolean;
}

export interface ClozeData {
  /**
   * Texto com lacunas marcadas como {{0}}, {{1}}, etc
   */
  text: string;
  
  /**
   * Definição das lacunas
   */
  gaps: ClozeGap[];
}

export interface ClozeProps {
  /**
   * Conteúdo (pode ser usado para instruções adicionais)
   */
  content?: string;
  
  /**
   * Dados da questão
   */
  data: ClozeData;
  
  /**
   * Resposta atual (mapa de gap id -> valor)
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
 * Template Cloze - Questões com lacunas no texto (texto lacunado)
 * 
 * Similar ao FillInTheBlank, mas focado em texto corrido com múltiplas lacunas inline.
 * 
 * @example
 * ```tsx
 * <Cloze
 *   data={{
 *     text: "A {{0}} é a capital do {{1}}, fundada em {{2}}.",
 *     gaps: [
 *       { id: "0", correctAnswers: ["Brasília"], placeholder: "cidade" },
 *       { id: "1", correctAnswers: ["Brasil"], placeholder: "país" },
 *       { id: "2", correctAnswers: ["1960"], placeholder: "ano", size: 6 }
 *     ]
 *   }}
 *   answer={{ "0": "Brasília", "1": "Brasil", "2": "1960" }}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Cloze = React.forwardRef<HTMLDivElement, ClozeProps>(
  ({ content, data, answer = {}, onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { text, gaps = [] } = data;
    
    /**
     * Verifica se uma lacuna está correta
     */
    const isGapCorrect = React.useCallback(
      (gapId: string): boolean | undefined => {
        const gap = gaps.find(g => g.id === gapId);
        if (!gap || !answer[gapId]) return undefined;
        
        const userAnswer = answer[gapId].trim();
        if (!userAnswer) return undefined;
        
        return gap.correctAnswers.some(correct => {
          const compare = gap.caseSensitive !== false
            ? (a: string, b: string) => a === b
            : (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
          
          return compare(userAnswer, correct);
        });
      },
      [gaps, answer]
    );
    
    /**
     * Handler para mudança de lacuna
     */
    const handleGapChange = React.useCallback(
      (gapId: string, value: string) => {
        if (readOnly || !onAnswerChange) return;
        
        onAnswerChange({
          ...answer,
          [gapId]: value,
        });
      },
      [answer, readOnly, onAnswerChange]
    );
    
    /**
     * Renderiza input para lacuna
     */
    const renderGapInput = React.useCallback(
      (gap: ClozeGap) => {
        const value = answer[gap.id] || "";
        const isCorrect = isGapCorrect(gap.id);
        
        // Classes de feedback
        const feedbackClass = showFeedback && isCorrect !== undefined
          ? isCorrect
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "border-red-500 bg-red-50 dark:bg-red-950"
          : "";
        
        return (
          <input
            key={gap.id}
            type="text"
            value={value}
            onChange={(e) => handleGapChange(gap.id, e.target.value)}
            placeholder={gap.placeholder}
            size={gap.size || 10}
            readOnly={readOnly}
            className={cn(
              "inline-block mx-1 px-2 py-1 rounded border border-input",
              "bg-background text-foreground text-base",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-muted cursor-default": readOnly,
              },
              feedbackClass
            )}
            aria-label={`Lacuna ${gap.id}`}
          />
        );
      },
      [answer, readOnly, showFeedback, isGapCorrect, handleGapChange]
    );
    
    /**
     * Substitui placeholders por inputs
     */
    const renderTextWithGaps = React.useMemo(() => {
      const parts = text.split(/(\{\{\d+\}\})/g);
      
      return parts.map((part, idx) => {
        const match = part.match(/\{\{(\d+)\}\}/);
        if (match) {
          const gapId = match[1];
          const gap = gaps.find(g => g.id === gapId);
          
          if (gap) {
            return <React.Fragment key={`gap-${idx}`}>{renderGapInput(gap)}</React.Fragment>;
          }
        }
        
        return <span key={`text-${idx}`}>{part}</span>;
      });
    }, [text, gaps, renderGapInput]);
    
    // Estatísticas
    const stats = React.useMemo(() => {
      const totalGaps = gaps.length;
      const filledGaps = Object.values(answer).filter(v => v.trim().length > 0).length;
      const correctGaps = showFeedback
        ? gaps.filter(g => isGapCorrect(g.id) === true).length
        : 0;
      
      return { totalGaps, filledGaps, correctGaps };
    }, [gaps, answer, showFeedback, isGapCorrect]);
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Instruções (opcional) */}
        {content && (
          <div className="text-sm text-muted-foreground mb-3">
            {content}
          </div>
        )}
        
        {/* Texto com lacunas inline */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="text-foreground leading-relaxed text-base">
            {renderTextWithGaps}
          </div>
        </div>
        
        {/* Informações */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {stats.filledGaps} de {stats.totalGaps} lacunas preenchidas
          </span>
          
          {showFeedback && stats.filledGaps > 0 && (
            <span className={stats.correctGaps === stats.totalGaps ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
              {stats.correctGaps} correto(s)
            </span>
          )}
        </div>
      </div>
    );
  }
);

Cloze.displayName = "Cloze";
