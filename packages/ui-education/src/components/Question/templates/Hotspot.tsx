import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";

export interface HotspotArea {
  /**
   * ID único da área
   */
  id: string;
  
  /**
   * Coordenada X (percentual, 0-100)
   */
  x: number;
  
  /**
   * Coordenada Y (percentual, 0-100)
   */
  y: number;
  
  /**
   * Largura (percentual, 0-100)
   */
  width: number;
  
  /**
   * Altura (percentual, 0-100)
   */
  height: number;
  
  /**
   * Se esta área é uma resposta correta
   */
  isCorrect: boolean;
  
  /**
   * Label opcional (para acessibilidade)
   */
  label?: string;
}

export interface HotspotData {
  /**
   * URL da imagem
   */
  imageUrl: string;
  
  /**
   * Áreas clicáveis
   */
  areas: HotspotArea[];
  
  /**
   * Se permite múltiplas seleções
   * @default false
   */
  multipleSelection?: boolean;
}

export interface HotspotProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão
   */
  data: HotspotData;
  
  /**
   * Resposta atual (array de IDs de áreas)
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
 * Template Hotspot - Questões com clique em áreas de imagem
 * 
 * Permite selecionar áreas específicas de uma imagem.
 * 
 * @example
 * ```tsx
 * <Hotspot
 *   content="Clique na capital do Brasil:"
 *   data={{
 *     imageUrl: "/maps/brazil.png",
 *     areas: [
 *       { id: "1", x: 50, y: 40, width: 5, height: 5, isCorrect: true, label: "Brasília" }
 *     ]
 *   }}
 *   answer={["1"]}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Hotspot = React.forwardRef<HTMLDivElement, HotspotProps>(
  ({ content, data, answer = [], onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { imageUrl, areas = [], multipleSelection = false } = data;
    const imageRef = React.useRef<HTMLDivElement>(null);
    
    /**
     * Handler para clique em área
     */
    const handleAreaClick = React.useCallback(
      (areaId: string) => {
        if (readOnly || !onAnswerChange) return;
        
        let newAnswer: string[];
        
        if (multipleSelection) {
          // Toggle selection
          newAnswer = answer.includes(areaId)
            ? answer.filter(id => id !== areaId)
            : [...answer, areaId];
        } else {
          // Single selection
          newAnswer = answer.includes(areaId) ? [] : [areaId];
        }
        
        onAnswerChange(newAnswer);
      },
      [answer, multipleSelection, readOnly, onAnswerChange]
    );
    
    /**
     * Obtém status da área para feedback
     */
    const getAreaStatus = React.useCallback(
      (area: HotspotArea): "correct" | "incorrect" | undefined => {
        if (!showFeedback) return undefined;
        
        const isSelected = answer.includes(area.id);
        
        if (isSelected && area.isCorrect) return "correct";
        if (isSelected && !area.isCorrect) return "incorrect";
        
        return undefined;
      },
      [showFeedback, answer]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Imagem com Hotspots */}
        <div
          ref={imageRef}
          className="relative inline-block max-w-full overflow-hidden rounded-lg border border-border"
        >
          <img
            src={imageUrl}
            alt="Imagem da questão"
            className="w-full h-auto display-block"
          />
          
          {/* Áreas clicáveis */}
          {areas.map((area) => {
            const isSelected = answer.includes(area.id);
            const status = getAreaStatus(area);
            
            // Classes de feedback
            const feedbackClass = status
              ? status === "correct"
                ? "bg-green-500/30 border-green-500"
                : "bg-red-500/30 border-red-500"
              : "";
            
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => handleAreaClick(area.id)}
                disabled={readOnly}
                className={cn(
                  "absolute border-2 transition-all duration-200",
                  "hover:bg-primary/20 hover:border-primary",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                  "disabled:cursor-not-allowed",
                  {
                    "bg-primary/30 border-primary": isSelected && !showFeedback,
                    "border-transparent": !isSelected && !showFeedback,
                  },
                  feedbackClass
                )}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
                aria-label={area.label || `Área ${area.id}`}
                aria-pressed={isSelected}
              />
            );
          })}
        </div>
        
        {/* Informações */}
        <div className="text-xs text-muted-foreground">
          <p>
            {multipleSelection
              ? "Clique em uma ou mais áreas na imagem"
              : "Clique em uma área na imagem"}
          </p>
          {answer.length > 0 && (
            <p className="mt-1">
              {answer.length} {answer.length === 1 ? "área selecionada" : "áreas selecionadas"}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Hotspot.displayName = "Hotspot";
