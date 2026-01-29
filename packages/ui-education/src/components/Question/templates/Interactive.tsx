import * as React from "react";
import { QuestionContent } from "../QuestionContent";

export interface InteractiveData {
  /**
   * Tipo de interação customizada
   */
  interactionType: string;
  
  /**
   * URL ou dados do conteúdo interativo
   */
  content: string | Record<string, any>;
  
  /**
   * Configurações específicas da interação
   */
  config?: Record<string, any>;
}

export interface InteractiveProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão interativa
   */
  data: InteractiveData;
  
  /**
   * Resposta atual
   */
  answer?: any;
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: any) => void;
  
  /**
   * Se a questão está em modo de visualização
   */
  readOnly?: boolean;
  
  /**
   * Se deve mostrar feedback/correção
   */
  showFeedback?: boolean;
  
  /**
   * Componente customizado para renderizar a interação
   */
  renderInteraction?: (data: InteractiveData, answer: any, onChange: (answer: any) => void) => React.ReactNode;
}

/**
 * Template Interactive - Questões interativas customizadas
 * 
 * Template flexível para qualquer tipo de interação customizada:
 * - Canvas para desenho
 * - Simulações interativas
 * - Jogos educacionais
 * - Visualizações 3D
 * - Manipulação de objetos SVG
 * - Drag and drop complexo
 * - Timeline interativa
 * - Mapas interativos
 * 
 * Requer implementação customizada do componente de interação via prop `renderInteraction`.
 * 
 * @example
 * ```tsx
 * <Interactive
 *   content="Desenhe um triângulo no canvas:"
 *   data={{
 *     interactionType: "canvas-drawing",
 *     content: { width: 400, height: 300, tools: ["pencil", "eraser"] },
 *     config: { backgroundColor: "#fff" }
 *   }}
 *   answer={canvasData}
 *   onAnswerChange={(answer) => console.log(answer)}
 *   renderInteraction={(data, answer, onChange) => (
 *     <CanvasDrawing {...data} value={answer} onChange={onChange} />
 *   )}
 * />
 * ```
 */
export const Interactive = React.forwardRef<HTMLDivElement, InteractiveProps>(
  ({ content, data, answer, onAnswerChange, readOnly = false, showFeedback = false, renderInteraction }, ref) => {
    const { interactionType } = data;
    
    /**
     * Handler wrapper para mudança de resposta
     */
    const handleChange = React.useCallback(
      (newAnswer: any) => {
        if (readOnly || !onAnswerChange) return;
        onAnswerChange(newAnswer);
      },
      [readOnly, onAnswerChange]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Área Interativa */}
        <div className="rounded-lg border border-border overflow-hidden bg-background">
          {renderInteraction ? (
            renderInteraction(data, answer, handleChange)
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                  Componente Interativo
                </h4>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Esta questão requer um componente de interação customizado do tipo:{" "}
                  <span className="font-mono bg-muted px-1 py-0.5 rounded">{interactionType}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Implemente o prop <code className="bg-muted px-1 py-0.5 rounded">renderInteraction</code>{" "}
                  para exibir o conteúdo interativo.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Informações */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Tipo: {interactionType}</span>
          {answer !== undefined && (
            <span className="text-primary">
              ✓ Resposta registrada
            </span>
          )}
        </div>
        
        {/* Feedback */}
        {showFeedback && answer !== undefined && (
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm font-medium mb-1">Resposta Interativa</p>
            <p className="text-sm text-muted-foreground">
              Sua resposta foi registrada. A avaliação depende da implementação customizada.
            </p>
          </div>
        )}
      </div>
    );
  }
);

Interactive.displayName = "Interactive";
