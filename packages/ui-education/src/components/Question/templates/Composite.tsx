import * as React from "react";
import { QuestionContent } from "../QuestionContent";

export interface CompositePart {
  /**
   * ID único da parte
   */
  id: string;
  
  /**
   * Tipo da sub-questão
   */
  type: string;
  
  /**
   * Conteúdo da parte
   */
  content: string;
  
  /**
   * Dados específicos da parte
   */
  data: Record<string, any>;
  
  /**
   * Peso/pontuação desta parte
   */
  weight?: number;
}

export interface CompositeData {
  /**
   * Partes/sub-questões da questão composta
   */
  parts: CompositePart[];
  
  /**
   * Se deve numerar as partes automaticamente
   * @default true
   */
  numberParts?: boolean;
}

export interface CompositeProps {
  /**
   * Conteúdo/enunciado principal
   */
  content: string;
  
  /**
   * Dados da questão composta
   */
  data: CompositeData;
  
  /**
   * Respostas atuais (mapa de partId -> resposta)
   */
  answer?: Record<string, any>;
  
  /**
   * Callback quando uma resposta é alterada
   */
  onAnswerChange?: (answer: Record<string, any>) => void;
  
  /**
   * Se a questão está em modo de visualização
   */
  readOnly?: boolean;
  
  /**
   * Se deve mostrar feedback/correção
   */
  showFeedback?: boolean;
  
  /**
   * Componente de renderização para sub-questões
   * (seria o QuestionRenderer, mas evitamos importação circular)
   */
  renderPart?: (part: CompositePart, partAnswer: any, onPartChange: (answer: any) => void) => React.ReactNode;
}

/**
 * Template Composite - Questões compostas com múltiplas partes
 * 
 * Permite criar questões com várias sub-questões de tipos diferentes.
 * Cada parte pode ser de um tipo diferente (múltipla escolha, dissertativa, etc).
 * 
 * @example
 * ```tsx
 * <Composite
 *   content="Leia o texto abaixo e responda:"
 *   data={{
 *     parts: [
 *       { id: "p1", type: "multiple-choice", content: "Qual o tema?", data: {...} },
 *       { id: "p2", type: "essay", content: "Comente o texto:", data: {...} }
 *     ]
 *   }}
 *   answer={{ p1: ["1"], p2: "Meu comentário..." }}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Composite = React.forwardRef<HTMLDivElement, CompositeProps>(
  ({ content, data, answer = {}, onAnswerChange, readOnly = false, showFeedback = false, renderPart }, ref) => {
    const { parts = [], numberParts = true } = data;
    
    /**
     * Handler para mudança em uma parte específica
     */
    const handlePartChange = React.useCallback(
      (partId: string, partAnswer: any) => {
        if (readOnly || !onAnswerChange) return;
        
        onAnswerChange({
          ...answer,
          [partId]: partAnswer,
        });
      },
      [answer, readOnly, onAnswerChange]
    );
    
    // Estatísticas
    const stats = React.useMemo(() => {
      const totalParts = parts.length;
      const answeredParts = parts.filter(p => {
        const partAnswer = answer[p.id];
        // Verifica se tem resposta (não é undefined, null, array vazio, ou string vazia)
        if (partAnswer === undefined || partAnswer === null) return false;
        if (Array.isArray(partAnswer) && partAnswer.length === 0) return false;
        if (typeof partAnswer === "string" && partAnswer.trim().length === 0) return false;
        return true;
      }).length;
      
      return { totalParts, answeredParts };
    }, [parts, answer]);
    
    return (
      <div ref={ref} className="space-y-6">
        {/* Enunciado Principal */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <QuestionContent content={content} />
        </div>
        
        {/* Partes da Questão */}
        <div className="space-y-6">
          {parts.map((part, index) => (
            <div
              key={part.id}
              className="p-4 rounded-lg border border-border bg-background"
            >
              {/* Cabeçalho da Parte */}
              <div className="flex items-start gap-3 mb-4">
                {numberParts && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {numberParts ? `Parte ${index + 1}` : part.id}
                  </h4>
                  {part.weight && (
                    <span className="text-xs text-muted-foreground">
                      {part.weight} {part.weight === 1 ? "ponto" : "pontos"}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Conteúdo da Parte */}
              <div className="ml-0 sm:ml-11">
                {renderPart ? (
                  renderPart(part, answer[part.id], (partAnswer) => handlePartChange(part.id, partAnswer))
                ) : (
                  <div className="space-y-2">
                    <QuestionContent content={part.content} />
                    <p className="text-sm text-muted-foreground italic">
                      Tipo: {part.type} (renderização customizada necessária)
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Progresso */}
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 text-sm">
          <span className="text-muted-foreground">
            Progresso: {stats.answeredParts} de {stats.totalParts} partes respondidas
          </span>
          <div className="flex gap-2">
            {parts.map((_, idx) => {
              const partId = parts[idx].id;
              const isAnswered = answer[partId] !== undefined && answer[partId] !== null;
              
              return (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    isAnswered ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Parte ${idx + 1} ${isAnswered ? "respondida" : "não respondida"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

Composite.displayName = "Composite";
