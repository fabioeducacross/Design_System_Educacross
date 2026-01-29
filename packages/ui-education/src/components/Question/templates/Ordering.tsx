import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";

export interface OrderingItem {
  /**
   * ID único do item
   */
  id: string;
  
  /**
   * Conteúdo do item
   */
  content: string;
  
  /**
   * Posição correta (índice, começando em 0)
   */
  correctPosition: number;
}

export interface OrderingData {
  /**
   * Lista de itens para ordenar
   */
  items: OrderingItem[];
  
  /**
   * Se deve embaralhar os itens inicialmente
   * @default true
   */
  shuffle?: boolean;
}

export interface OrderingProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão
   */
  data: OrderingData;
  
  /**
   * Resposta atual (array de IDs na ordem atual)
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
 * Template Ordering - Questões de ordenação/sequência
 * 
 * Permite reordenar items usando botões para cima/baixo.
 * Drag & drop pode ser implementado depois.
 * 
 * @example
 * ```tsx
 * <Ordering
 *   content="Ordene os eventos na ordem cronológica:"
 *   data={{
 *     items: [
 *       { id: "1", content: "Descobrimento do Brasil", correctPosition: 0 },
 *       { id: "2", content: "Independência do Brasil", correctPosition: 1 },
 *       { id: "3", content: "Proclamação da República", correctPosition: 2 }
 *     ]
 *   }}
 *   answer={["1", "2", "3"]}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Ordering = React.forwardRef<HTMLDivElement, OrderingProps>(
  ({ content, data, answer, onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { items = [] } = data;
    
    // Inicializa resposta se não existir
    const currentOrder = answer || items.map(item => item.id);
    
    /**
     * Verifica se a ordenação está correta
     */
    const isOrderCorrect = React.useMemo(() => {
      if (!showFeedback) return undefined;
      
      return currentOrder.every((id, index) => {
        const item = items.find(i => i.id === id);
        return item && item.correctPosition === index;
      });
    }, [currentOrder, items, showFeedback]);
    
    /**
     * Move um item para cima
     */
    const moveUp = React.useCallback(
      (index: number) => {
        if (readOnly || !onAnswerChange || index === 0) return;
        
        const newOrder = [...currentOrder];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        onAnswerChange(newOrder);
      },
      [currentOrder, readOnly, onAnswerChange]
    );
    
    /**
     * Move um item para baixo
     */
    const moveDown = React.useCallback(
      (index: number) => {
        if (readOnly || !onAnswerChange || index === currentOrder.length - 1) return;
        
        const newOrder = [...currentOrder];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        onAnswerChange(newOrder);
      },
      [currentOrder, readOnly, onAnswerChange]
    );
    
    /**
     * Verifica se um item está na posição correta
     */
    const isItemCorrect = React.useCallback(
      (itemId: string, currentIndex: number): boolean | undefined => {
        if (!showFeedback) return undefined;
        
        const item = items.find(i => i.id === itemId);
        return item ? item.correctPosition === currentIndex : undefined;
      },
      [items, showFeedback]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Lista Ordenável */}
        <div className="space-y-2">
          {currentOrder.map((itemId, index) => {
            const item = items.find(i => i.id === itemId);
            if (!item) return null;
            
            const itemCorrect = isItemCorrect(itemId, index);
            
            // Classes de feedback
            const feedbackClass = itemCorrect !== undefined
              ? itemCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-950"
                : "border-red-500 bg-red-50 dark:bg-red-950"
              : "";
            
            return (
              <div
                key={itemId}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  "bg-background",
                  feedbackClass
                )}
              >
                {/* Número da Posição */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1 text-sm text-foreground">
                  {item.content}
                </div>
                
                {/* Botões de Movimento */}
                {!readOnly && (
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para cima"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === currentOrder.length - 1}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para baixo"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Feedback Global */}
        {showFeedback && (
          <div className={cn(
            "p-4 rounded-lg border",
            isOrderCorrect
              ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100"
              : "bg-amber-50 dark:bg-amber-950 border-amber-500 text-amber-900 dark:text-amber-100"
          )}>
            <p className="text-sm font-medium">
              {isOrderCorrect ? "✓ Ordenação correta!" : "⚠ Verifique a ordem dos itens"}
            </p>
          </div>
        )}
        
        {/* Mensagem */}
        {!readOnly && !showFeedback && (
          <p className="text-sm text-muted-foreground italic">
            Use os botões para ordenar os itens
          </p>
        )}
      </div>
    );
  }
);

Ordering.displayName = "Ordering";
