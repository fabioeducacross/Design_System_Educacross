import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";

export interface MatchingPair {
  /**
   * ID único do par
   */
  id: string;
  
  /**
   * Conteúdo do item esquerdo
   */
  left: string;
  
  /**
   * ID do item direito correto
   */
  correctRightId: string;
}

export interface MatchingItem {
  /**
   * ID único do item
   */
  id: string;
  
  /**
   * Conteúdo do item
   */
  content: string;
}

export interface MatchingData {
  /**
   * Lista de pares (itens da esquerda com resposta correta)
   */
  pairs: MatchingPair[];
  
  /**
   * Lista de itens da direita (para associar)
   */
  rightItems: MatchingItem[];
  
  /**
   * Se deve embaralhar os itens da direita
   * @default true
   */
  shuffle?: boolean;
}

export interface MatchingProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão
   */
  data: MatchingData;
  
  /**
   * Resposta atual (mapa de leftId -> rightId)
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
 * Template Matching - Questões de associação/correspondência
 * 
 * Permite associar itens da esquerda com itens da direita.
 * Versão simplificada com dropdowns (drag & drop pode ser implementado depois).
 * 
 * @example
 * ```tsx
 * <Matching
 *   content="Associe os países com suas capitais:"
 *   data={{
 *     pairs: [
 *       { id: "1", left: "Brasil", correctRightId: "a" },
 *       { id: "2", left: "Argentina", correctRightId: "b" }
 *     ],
 *     rightItems: [
 *       { id: "a", content: "Brasília" },
 *       { id: "b", content: "Buenos Aires" }
 *     ]
 *   }}
 *   answer={{ "1": "a", "2": "b" }}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Matching = React.forwardRef<HTMLDivElement, MatchingProps>(
  ({ content, data, answer = {}, onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { pairs = [], rightItems = [] } = data;
    
    /**
     * Verifica se uma associação está correta
     */
    const isMatchCorrect = React.useCallback(
      (pairId: string): boolean | undefined => {
        const pair = pairs.find(p => p.id === pairId);
        if (!pair || !answer[pairId]) return undefined;
        
        return answer[pairId] === pair.correctRightId;
      },
      [pairs, answer]
    );
    
    /**
     * Handler para mudança de seleção
     */
    const handleSelectionChange = React.useCallback(
      (pairId: string, rightId: string) => {
        if (readOnly || !onAnswerChange) return;
        
        onAnswerChange({
          ...answer,
          [pairId]: rightId,
        });
      },
      [answer, readOnly, onAnswerChange]
    );
    
    // Estatísticas
    const stats = React.useMemo(() => {
      const totalPairs = pairs.length;
      const matched = Object.keys(answer).filter(k => answer[k]).length;
      const correct = showFeedback
        ? pairs.filter(p => isMatchCorrect(p.id) === true).length
        : 0;
      
      return { totalPairs, matched, correct };
    }, [pairs, answer, showFeedback, isMatchCorrect]);
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Grid de Associação */}
        <div className="space-y-3">
          {pairs.map((pair) => {
            const selectedRightId = answer[pair.id];
            const isCorrect = isMatchCorrect(pair.id);
            
            // Classes de feedback
            const feedbackClass = showFeedback && isCorrect !== undefined
              ? isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-950"
                : "border-red-500 bg-red-50 dark:bg-red-950"
              : "";
            
            return (
              <div key={pair.id} className="flex items-center gap-4">
                {/* Item Esquerdo */}
                <div className="flex-1 p-3 rounded-lg border border-border bg-muted/50">
                  <p className="text-sm text-foreground">{pair.left}</p>
                </div>
                
                {/* Seta */}
                <div className="text-muted-foreground">→</div>
                
                {/* Dropdown Direito */}
                <div className="flex-1">
                  <select
                    value={selectedRightId || ""}
                    onChange={(e) => handleSelectionChange(pair.id, e.target.value)}
                    disabled={readOnly}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border text-sm",
                      "bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      {
                        "bg-muted cursor-default": readOnly,
                      },
                      feedbackClass
                    )}
                    aria-label={`Associar com ${pair.left}`}
                  >
                    <option value="">Selecione...</option>
                    {rightItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Informações */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {stats.matched} de {stats.totalPairs} associações feitas
          </span>
          
          {showFeedback && stats.matched > 0 && (
            <span className={stats.correct === stats.totalPairs ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
              {stats.correct} correto(s)
            </span>
          )}
        </div>
        
        {/* Mensagem quando vazio */}
        {!readOnly && stats.matched === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Associe cada item da esquerda com um da direita
          </p>
        )}
      </div>
    );
  }
);

Matching.displayName = "Matching";
